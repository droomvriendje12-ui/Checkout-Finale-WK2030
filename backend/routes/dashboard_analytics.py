"""
Dashboard Analytics API Routes - Supabase based
Channel tracking: Facebook, Instagram, TikTok, Email Marketing
"""
from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timedelta, timezone
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["dashboard-analytics"])

# Supabase client - will be set by main app
supabase = None


def set_supabase_client(client):
    global supabase
    supabase = client


@router.get("/api/admin/dashboard")
async def get_dashboard_analytics(days: int = Query(30, ge=0, le=365)):
    """
    Get dashboard analytics with channel breakdown - FIXED for Supabase
    """
    if supabase is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    try:
        # Calculate date range
        if days == 0:
            # All time
            start_date = None
        else:
            start_date = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        
        # Fetch orders with channel tracking
        query = supabase.table('orders').select('*')
        if start_date:
            query = query.gte('created_at', start_date)
        
        orders_response = query.execute()
        orders = orders_response.data if orders_response.data else []
        
        # Calculate revenue - only PAID orders count
        paid_orders = [o for o in orders if o.get('payment_status') == 'paid']
        total_revenue = sum(float(order.get('total_amount', 0) or 0) for order in paid_orders)
        total_orders = len(orders)
        paid_count = len(paid_orders)
        
        # Klanten count - unique emails
        unique_customers = len(set(o.get('customer_email') for o in orders if o.get('customer_email')))
        
        # Te verzenden - orders with status 'paid' but not 'shipped'
        to_ship = len([o for o in orders if o.get('payment_status') == 'paid' and o.get('order_status') not in ['shipped', 'delivered', 'cancelled']])
        
        # Vandaag orders
        today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0).isoformat()
        today_orders = len([o for o in orders if o.get('created_at', '') >= today_start])
        
        # Average order value - only paid orders
        avg_order_value = total_revenue / paid_count if paid_count > 0 else 0
        
        # Order status breakdown
        status_counts = {
            'pending_orders': len([o for o in orders if o.get('order_status') == 'pending']),
            'paid_orders': paid_count,
            'shipped_orders': len([o for o in orders if o.get('order_status') == 'shipped']),
            'delivered_orders': len([o for o in orders if o.get('order_status') == 'delivered']),
            'cancelled_orders': len([o for o in orders if o.get('order_status') == 'cancelled'])
        }
        
        # Channel breakdown
        channel_stats = {
            'facebook': {'orders': 0, 'revenue': 0, 'conversions': 0},
            'instagram': {'orders': 0, 'revenue': 0, 'conversions': 0},
            'tiktok': {'orders': 0, 'revenue': 0, 'conversions': 0},
            'email': {'orders': 0, 'revenue': 0, 'conversions': 0},
            'organic': {'orders': 0, 'revenue': 0, 'conversions': 0},
            'direct': {'orders': 0, 'revenue': 0, 'conversions': 0}
        }
        
        for order in orders:
            channel = order.get('marketing_channel', 'direct').lower()
            amount = float(order.get('total_amount', 0) or 0)
            
            if channel in channel_stats:
                channel_stats[channel]['orders'] += 1
                if order.get('payment_status') == 'paid':
                    channel_stats[channel]['revenue'] += amount
                    channel_stats[channel]['conversions'] += 1
            else:
                channel_stats['direct']['orders'] += 1
                if order.get('payment_status') == 'paid':
                    channel_stats['direct']['revenue'] += amount
                    channel_stats['direct']['conversions'] += 1
        
        # Calculate conversion rates per channel
        for channel in channel_stats:
            if channel_stats[channel]['orders'] > 0:
                channel_stats[channel]['conversion_rate'] = (
                    channel_stats[channel]['conversions'] / channel_stats[channel]['orders'] * 100
                )
            else:
                channel_stats[channel]['conversion_rate'] = 0
        
        # Get recent orders
        recent_orders_response = supabase.table('orders')\
            .select('*')\
            .order('created_at', desc=True)\
            .limit(10)\
            .execute()
        recent_orders = recent_orders_response.data if recent_orders_response.data else []
        
        # Get popular products (from order items)
        items_response = supabase.table('order_items').select('*').execute()
        items = items_response.data if items_response.data else []
        
        product_sales = {}
        for item in items:
            product_id = item.get('product_id')
            if product_id:
                if product_id not in product_sales:
                    product_sales[product_id] = {
                        'product_id': product_id,
                        'product_name': item.get('product_name', 'Unknown'),
                        'quantity': 0,
                        'revenue': 0
                    }
                product_sales[product_id]['quantity'] += item.get('quantity', 0)
                product_sales[product_id]['revenue'] += float(item.get('unit_price', 0) or 0) * item.get('quantity', 0)
        
        popular_products = sorted(product_sales.values(), key=lambda x: x['quantity'], reverse=True)[:5]
        
        # Conversion funnel
        estimated_views = paid_count * 20  # Rough estimate: 5% conversion
        checkout_started = len([o for o in orders if o.get('order_status') in ['pending', 'paid', 'shipped', 'delivered']])
        
        funnel = {
            'views': estimated_views,
            'add_to_cart': int(checkout_started * 1.5),
            'checkout_started': checkout_started,
            'orders_created': total_orders,
            'completed': paid_count,
            'abandoned_checkouts': checkout_started - paid_count,
            'abandoned_rate': ((checkout_started - paid_count) / checkout_started * 100) if checkout_started > 0 else 0,
            'checkout_to_order_rate': (paid_count / checkout_started * 100) if checkout_started > 0 else 0,
            'payment_failures': total_orders - paid_count,
            'payment_failure_rate': ((total_orders - paid_count) / total_orders * 100) if total_orders > 0 else 0
        }
        
        # Daily breakdown (last 30 days max for performance)
        daily_limit = min(days if days > 0 else 30, 30)
        daily_breakdown = []
        for i in range(daily_limit):
            day_start = (datetime.now(timezone.utc) - timedelta(days=i)).replace(hour=0, minute=0, second=0)
            day_end = day_start + timedelta(days=1)
            
            day_orders = [o for o in orders if day_start.isoformat() <= o.get('created_at', '') < day_end.isoformat()]
            day_paid = [o for o in day_orders if o.get('payment_status') == 'paid']
            day_revenue = sum(float(o.get('total_amount', 0) or 0) for o in day_paid)
            
            daily_breakdown.append({
                'date': day_start.strftime('%Y-%m-%d'),
                'orders': len(day_paid),
                'revenue': day_revenue
            })
        
        daily_breakdown.reverse()
        
        return {
            'stats': {
                'total_revenue': total_revenue,
                'total_orders': paid_count,  # Only paid orders count
                'unique_customers': unique_customers,
                'to_ship': to_ship,
                'today_orders': today_orders,
                'avg_order_value': avg_order_value,
                'conversion_rate': (paid_count / estimated_views * 100) if estimated_views > 0 else 0,
                **status_counts
            },
            'channel_stats': channel_stats,
            'funnel': funnel,
            'daily_breakdown': daily_breakdown,
            'recent_orders': recent_orders,
            'popular_products': popular_products,
            'date_range': {
                'days': days,
                'start': start_date,
                'end': datetime.now(timezone.utc).isoformat()
            },
            'top_customers': [],
            'abandoned_carts': []
        }
        
    except Exception as e:
        logger.error(f"Dashboard analytics error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/admin/channel-performance")
async def get_channel_performance(days: int = Query(30, ge=1, le=365)):
    """
    Detailed channel performance metrics
    """
    if supabase is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    try:
        start_date = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        
        # Fetch orders with channel info
        orders_response = supabase.table('orders')\
            .select('*')\
            .gte('created_at', start_date)\
            .execute()
        
        orders = orders_response.data if orders_response.data else []
        
        channels = {}
        for order in orders:
            channel = order.get('marketing_channel', 'direct')
            if channel not in channels:
                channels[channel] = {
                    'channel': channel,
                    'orders': 0,
                    'revenue': 0,
                    'paid_orders': 0,
                    'abandoned': 0
                }
            
            channels[channel]['orders'] += 1
            channels[channel]['revenue'] += order.get('total_amount', 0)
            
            if order.get('payment_status') == 'paid':
                channels[channel]['paid_orders'] += 1
            elif order.get('order_status') == 'abandoned':
                channels[channel]['abandoned'] += 1
        
        # Calculate metrics
        for channel_data in channels.values():
            if channel_data['orders'] > 0:
                channel_data['conversion_rate'] = (channel_data['paid_orders'] / channel_data['orders']) * 100
                channel_data['avg_order_value'] = channel_data['revenue'] / channel_data['orders']
            else:
                channel_data['conversion_rate'] = 0
                channel_data['avg_order_value'] = 0
        
        return {
            'channels': list(channels.values()),
            'total_orders': len(orders),
            'date_range': {'days': days, 'start': start_date}
        }
        
    except Exception as e:
        logger.error(f"Channel performance error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
