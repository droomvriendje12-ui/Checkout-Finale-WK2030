"""
Viral Referral System API Routes
- Generate unique referral codes
- Track shares, clicks, and conversions
- Leaderboard system
- Reward tracking
"""
from fastapi import APIRouter, HTTPException, Query, Request
from typing import Optional
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
import logging
import uuid
import random
import string

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/referrals", tags=["referrals"])

# Supabase client - will be set by main app
supabase = None

def set_supabase_client(client):
    """Set the Supabase client"""
    global supabase
    supabase = client
    logger.info("✅ Supabase client set for referrals route")


def generate_referral_code(length: int = 6) -> str:
    """Generate a unique referral code"""
    chars = string.ascii_uppercase + string.digits
    # Remove confusing characters
    chars = chars.replace('O', '').replace('0', '').replace('I', '').replace('1', '').replace('L', '')
    return ''.join(random.choices(chars, k=length))


class ReferralCreate(BaseModel):
    name: str
    email: Optional[str] = None


class ReferralShare(BaseModel):
    referral_code: str
    platform: str  # whatsapp, instagram, tiktok, facebook, email, sms, copy


class ReferralClick(BaseModel):
    referral_code: str


class ReferralConversion(BaseModel):
    referral_code: str
    order_id: str
    order_amount: float


@router.post("/create")
async def create_referral(data: ReferralCreate):
    """Create a new referral account and generate unique code"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # Generate unique code
        max_attempts = 10
        code = None
        
        for _ in range(max_attempts):
            potential_code = generate_referral_code()
            # Check if code exists
            existing = supabase.table("referrals").select("id").eq("code", potential_code).limit(1).execute()
            if not existing.data:
                code = potential_code
                break
        
        if not code:
            raise HTTPException(status_code=500, detail="Could not generate unique code")
        
        # Create referral record
        referral_data = {
            "id": str(uuid.uuid4()),
            "name": data.name.strip(),
            "email": data.email.strip().lower() if data.email else None,
            "code": code,
            "shares_count": 0,
            "clicks_count": 0,
            "conversions_count": 0,
            "rewards_earned": 0,
            "total_revenue": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "last_share_at": None,
            "badges": []
        }
        
        result = supabase.table("referrals").insert(referral_data).execute()
        
        return {
            "success": True,
            "referral": {
                "id": referral_data["id"],
                "name": referral_data["name"],
                "code": code,
                "link": f"https://droomvriendjes.nl/ref/{code}",
                "shares_count": 0,
                "conversions_count": 0
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating referral: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/code/{code}")
async def get_referral_by_code(code: str):
    """Get referral info by code"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        result = supabase.table("referrals").select("*").eq("code", code.upper()).limit(1).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Referral code niet gevonden")
        
        referral = result.data[0]
        
        return {
            "id": referral["id"],
            "name": referral["name"],
            "code": referral["code"],
            "link": f"https://droomvriendjes.nl/ref/{referral['code']}",
            "shares_count": referral.get("shares_count", 0),
            "clicks_count": referral.get("clicks_count", 0),
            "conversions_count": referral.get("conversions_count", 0),
            "rewards_earned": referral.get("rewards_earned", 0),
            "badges": referral.get("badges", [])
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting referral: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/track-share")
async def track_share(data: ReferralShare):
    """Track when someone shares their referral link"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # Get referral
        result = supabase.table("referrals").select("*").eq("code", data.referral_code.upper()).limit(1).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Referral code niet gevonden")
        
        referral = result.data[0]
        
        # Update shares count
        new_shares = (referral.get("shares_count", 0) or 0) + 1
        
        supabase.table("referrals").update({
            "shares_count": new_shares,
            "last_share_at": datetime.now(timezone.utc).isoformat()
        }).eq("id", referral["id"]).execute()
        
        # Log share event
        share_log = {
            "id": str(uuid.uuid4()),
            "referral_id": referral["id"],
            "platform": data.platform,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        supabase.table("referral_shares").insert(share_log).execute()
        
        # Check for badges
        badges = referral.get("badges", []) or []
        if new_shares >= 5 and "first_5_shares" not in badges:
            badges.append("first_5_shares")
            supabase.table("referrals").update({"badges": badges}).eq("id", referral["id"]).execute()
        if new_shares >= 25 and "super_deler" not in badges:
            badges.append("super_deler")
            supabase.table("referrals").update({"badges": badges}).eq("id", referral["id"]).execute()
        
        return {
            "success": True,
            "shares_count": new_shares,
            "platform": data.platform
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error tracking share: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/track-click")
async def track_click(data: ReferralClick):
    """Track when someone clicks a referral link"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # Get referral
        result = supabase.table("referrals").select("*").eq("code", data.referral_code.upper()).limit(1).execute()
        
        if not result.data:
            return {"success": False, "message": "Code not found"}
        
        referral = result.data[0]
        
        # Update clicks count
        new_clicks = (referral.get("clicks_count", 0) or 0) + 1
        
        supabase.table("referrals").update({
            "clicks_count": new_clicks
        }).eq("id", referral["id"]).execute()
        
        return {
            "success": True,
            "referrer_name": referral["name"],
            "discount_percent": 10
        }
    except Exception as e:
        logger.error(f"Error tracking click: {e}")
        return {"success": False, "message": str(e)}


@router.post("/track-conversion")
async def track_conversion(data: ReferralConversion):
    """Track when a referred friend makes a purchase"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # Get referral
        result = supabase.table("referrals").select("*").eq("code", data.referral_code.upper()).limit(1).execute()
        
        if not result.data:
            raise HTTPException(status_code=404, detail="Referral code niet gevonden")
        
        referral = result.data[0]
        
        # Calculate reward (10% of order)
        reward = round(data.order_amount * 0.10, 2)
        
        # Update referral stats
        new_conversions = (referral.get("conversions_count", 0) or 0) + 1
        new_rewards = (referral.get("rewards_earned", 0) or 0) + reward
        new_revenue = (referral.get("total_revenue", 0) or 0) + data.order_amount
        
        supabase.table("referrals").update({
            "conversions_count": new_conversions,
            "rewards_earned": new_rewards,
            "total_revenue": new_revenue
        }).eq("id", referral["id"]).execute()
        
        # Log conversion
        conversion_log = {
            "id": str(uuid.uuid4()),
            "referral_id": referral["id"],
            "order_id": data.order_id,
            "order_amount": data.order_amount,
            "reward_amount": reward,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        supabase.table("referral_conversions").insert(conversion_log).execute()
        
        # Check for badges
        badges = referral.get("badges", []) or []
        if new_conversions >= 1 and "first_conversion" not in badges:
            badges.append("first_conversion")
        if new_conversions >= 5 and "top_mama" not in badges:
            badges.append("top_mama")
        if new_conversions >= 10 and "slaapheld" not in badges:
            badges.append("slaapheld")
        if new_conversions >= 25 and "legend" not in badges:
            badges.append("legend")
        
        if badges != (referral.get("badges", []) or []):
            supabase.table("referrals").update({"badges": badges}).eq("id", referral["id"]).execute()
        
        return {
            "success": True,
            "conversions_count": new_conversions,
            "reward_earned": reward,
            "total_rewards": new_rewards,
            "badges": badges
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error tracking conversion: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/leaderboard")
async def get_leaderboard(limit: int = Query(default=20, le=100)):
    """Get top referrers leaderboard"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        result = supabase.table("referrals").select(
            "id, name, code, shares_count, conversions_count, rewards_earned, badges, created_at"
        ).order("conversions_count", desc=True).limit(limit).execute()
        
        leaderboard = []
        for i, ref in enumerate(result.data or []):
            leaderboard.append({
                "rank": i + 1,
                "name": ref.get("name", ""),
                "code": ref.get("code", ""),
                "shares": ref.get("shares_count", 0) or 0,
                "conversions": ref.get("conversions_count", 0) or 0,
                "rewards": ref.get("rewards_earned", 0) or 0,
                "badges": ref.get("badges", []) or [],
                "member_since": ref.get("created_at", "")
            })
        
        return {
            "leaderboard": leaderboard,
            "total_referrers": len(leaderboard)
        }
    except Exception as e:
        logger.error(f"Error getting leaderboard: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_referral_stats():
    """Get overall referral program statistics"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        # Get all referrals
        result = supabase.table("referrals").select("*").execute()
        referrals = result.data or []
        
        total_referrers = len(referrals)
        total_shares = sum(r.get("shares_count", 0) or 0 for r in referrals)
        total_conversions = sum(r.get("conversions_count", 0) or 0 for r in referrals)
        total_rewards = sum(r.get("rewards_earned", 0) or 0 for r in referrals)
        total_revenue = sum(r.get("total_revenue", 0) or 0 for r in referrals)
        
        # Get top referrer
        top_referrer = None
        if referrals:
            sorted_refs = sorted(referrals, key=lambda x: x.get("conversions_count", 0) or 0, reverse=True)
            if sorted_refs:
                top_referrer = {
                    "name": sorted_refs[0].get("name"),
                    "conversions": sorted_refs[0].get("conversions_count", 0)
                }
        
        return {
            "total_referrers": total_referrers,
            "total_shares": total_shares,
            "total_conversions": total_conversions,
            "total_rewards_paid": total_rewards,
            "total_revenue_generated": total_revenue,
            "conversion_rate": round(total_conversions / total_shares * 100, 1) if total_shares > 0 else 0,
            "top_referrer": top_referrer
        }
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))
