"""
AI Marketing Campaign Creator
Auto-generates and posts content to Facebook, Instagram, TikTok
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
import logging
import os
import json
import httpx
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter(tags=["ai-campaigns"])

# API Keys will be loaded from environment
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
FACEBOOK_ACCESS_TOKEN = os.environ.get("FACEBOOK_ACCESS_TOKEN", "")
INSTAGRAM_ACCESS_TOKEN = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "")
TIKTOK_ACCESS_TOKEN = os.environ.get("TIKTOK_ACCESS_TOKEN", "")

# Platform IDs
FACEBOOK_PAGE_ID = os.environ.get("FACEBOOK_PAGE_ID", "")
INSTAGRAM_ACCOUNT_ID = os.environ.get("INSTAGRAM_ACCOUNT_ID", "")
TIKTOK_ACCOUNT_ID = os.environ.get("TIKTOK_ACCOUNT_ID", "")


class CampaignRequest(BaseModel):
    product_name: str
    product_description: str
    target_audience: str = "Ouders met baby's"
    platforms: List[str] = ["facebook", "instagram", "tiktok"]
    campaign_goal: str = "sales"  # or 'awareness', 'engagement'
    tone: str = "warm"  # or 'professional', 'casual', 'playful'
    image_url: Optional[str] = None


class CampaignResponse(BaseModel):
    campaign_id: str
    status: str
    generated_content: dict
    scheduled_posts: List[dict]


async def generate_ai_content(product_name: str, product_description: str, platform: str, tone: str) -> dict:
    """
    Generate marketing content using OpenAI GPT
    """
    if not OPENAI_API_KEY:
        logger.warning("OpenAI API key not configured, using fallback content")
        return {
            'caption': f"✨ Ontdek {product_name}! {product_description} 🌟",
            'hashtags': '#droomvriendjes #baby #slaapknuffel #newborn',
            'cta': 'Shop nu op droomvriendjes.nl'
        }
    
    try:
        # Platform-specific prompts
        prompts = {
            'facebook': f"""Schrijf een engagerende Facebook post voor {product_name}. 
                        Product: {product_description}
                        Tone: {tone}
                        Doelgroep: Ouders met baby's
                        Inclusief emoji's en call-to-action. Max 200 woorden.""",
            
            'instagram': f"""Schrijf een Instagram caption voor {product_name}.
                          Product: {product_description}
                          Tone: {tone}
                          Inclusief relevante hashtags (#droomvriendjes #baby #slaapknuffel)
                          Max 150 woorden, visueel aantrekkelijk.""",
            
            'tiktok': f"""Schrijf een korte, pakkende TikTok beschrijving voor {product_name}.
                       Product: {product_description}
                       Tone: {tone}
                       Kort, trending, met hashtags. Max 100 woorden."""
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4",
                    "messages": [
                        {"role": "system", "content": "Je bent een marketing expert voor baby producten in Nederland."},
                        {"role": "user", "content": prompts.get(platform, prompts['facebook'])}
                    ],
                    "max_tokens": 300,
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result['choices'][0]['message']['content']
                
                # Parse content
                lines = content.split('\n')
                caption = '\n'.join([l for l in lines if not l.startswith('#')])
                hashtags = ' '.join([l for l in lines if l.startswith('#')])
                
                return {
                    'caption': caption.strip(),
                    'hashtags': hashtags.strip() if hashtags else '#droomvriendjes #baby #slaapknuffel',
                    'cta': 'Shop nu op droomvriendjes.nl',
                    'full_text': content
                }
            else:
                logger.error(f"OpenAI API error: {response.status_code}")
                raise Exception("AI content generation failed")
                
    except Exception as e:
        logger.error(f"Content generation error: {e}")
        # Fallback
        return {
            'caption': f"✨ Ontdek {product_name}!\n\n{product_description}\n\n🌙 Perfect voor een rustgevende nacht",
            'hashtags': '#droomvriendjes #baby #slaapknuffel #newborn #babyslaap',
            'cta': 'Bestel nu op droomvriendjes.nl 🛍️'
        }


async def post_to_facebook(content: dict, image_url: str = None) -> dict:
    """
    Post to Facebook Page
    """
    if not FACEBOOK_ACCESS_TOKEN or not FACEBOOK_PAGE_ID:
        return {'status': 'skipped', 'reason': 'No Facebook credentials configured'}
    
    try:
        full_message = f"{content['caption']}\n\n{content['hashtags']}\n\n{content['cta']}"
        
        async with httpx.AsyncClient() as client:
            payload = {
                'message': full_message,
                'access_token': FACEBOOK_ACCESS_TOKEN
            }
            
            if image_url:
                payload['link'] = image_url
            
            response = await client.post(
                f"https://graph.facebook.com/v18.0/{FACEBOOK_PAGE_ID}/feed",
                data=payload,
                timeout=30.0
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    'status': 'success',
                    'platform': 'facebook',
                    'post_id': result.get('id'),
                    'url': f"https://facebook.com/{result.get('id')}"
                }
            else:
                return {'status': 'failed', 'error': response.text}
                
    except Exception as e:
        logger.error(f"Facebook post error: {e}")
        return {'status': 'error', 'message': str(e)}


async def post_to_instagram(content: dict, image_url: str = None) -> dict:
    """
    Post to Instagram Business Account
    """
    if not INSTAGRAM_ACCESS_TOKEN or not INSTAGRAM_ACCOUNT_ID:
        return {'status': 'skipped', 'reason': 'No Instagram credentials configured'}
    
    try:
        caption_text = f"{content['caption']}\n\n{content['hashtags']}\n\n{content['cta']}"
        
        async with httpx.AsyncClient() as client:
            # Step 1: Create container
            container_payload = {
                'image_url': image_url or 'https://droomvriendjes.nl/products/lion-main.png',
                'caption': caption_text,
                'access_token': INSTAGRAM_ACCESS_TOKEN
            }
            
            container_response = await client.post(
                f"https://graph.facebook.com/v18.0/{INSTAGRAM_ACCOUNT_ID}/media",
                data=container_payload,
                timeout=30.0
            )
            
            if container_response.status_code == 200:
                container_id = container_response.json().get('id')
                
                # Step 2: Publish container
                publish_payload = {
                    'creation_id': container_id,
                    'access_token': INSTAGRAM_ACCESS_TOKEN
                }
                
                publish_response = await client.post(
                    f"https://graph.facebook.com/v18.0/{INSTAGRAM_ACCOUNT_ID}/media_publish",
                    data=publish_payload,
                    timeout=30.0
                )
                
                if publish_response.status_code == 200:
                    result = publish_response.json()
                    return {
                        'status': 'success',
                        'platform': 'instagram',
                        'post_id': result.get('id'),
                        'url': f"https://instagram.com/p/{result.get('id')}"
                    }
            
            return {'status': 'failed', 'error': container_response.text}
                
    except Exception as e:
        logger.error(f"Instagram post error: {e}")
        return {'status': 'error', 'message': str(e)}


async def post_to_tiktok(content: dict, video_url: str = None) -> dict:
    """
    Post to TikTok (Note: TikTok requires video content)
    """
    if not TIKTOK_ACCESS_TOKEN or not TIKTOK_ACCOUNT_ID:
        return {'status': 'skipped', 'reason': 'No TikTok credentials configured'}
    
    # TikTok API is more complex and requires video upload
    # For now, return scheduled status
    return {
        'status': 'scheduled',
        'platform': 'tiktok',
        'message': 'TikTok posting requires video content. Please upload manually with generated caption.',
        'caption': f"{content['caption']}\n\n{content['hashtags']}"
    }


@router.post("/api/ai-campaigns/create", response_model=CampaignResponse)
async def create_ai_campaign(request: CampaignRequest, background_tasks: BackgroundTasks):
    """
    Create and auto-post AI-generated marketing campaign
    """
    try:
        campaign_id = f"camp_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        generated_content = {}
        scheduled_posts = []
        
        # Generate content for each platform
        for platform in request.platforms:
            logger.info(f"Generating content for {platform}")
            
            content = await generate_ai_content(
                request.product_name,
                request.product_description,
                platform,
                request.tone
            )
            
            generated_content[platform] = content
            
            # Auto-post based on platform
            if platform == 'facebook':
                result = await post_to_facebook(content, request.image_url)
                scheduled_posts.append(result)
            
            elif platform == 'instagram':
                result = await post_to_instagram(content, request.image_url)
                scheduled_posts.append(result)
            
            elif platform == 'tiktok':
                result = await post_to_tiktok(content)
                scheduled_posts.append(result)
        
        return CampaignResponse(
            campaign_id=campaign_id,
            status='completed',
            generated_content=generated_content,
            scheduled_posts=scheduled_posts
        )
        
    except Exception as e:
        logger.error(f"Campaign creation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/ai-campaigns/config-status")
async def get_config_status():
    """
    Check which platforms are configured
    """
    return {
        'openai': bool(OPENAI_API_KEY),
        'facebook': bool(FACEBOOK_ACCESS_TOKEN and FACEBOOK_PAGE_ID),
        'instagram': bool(INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID),
        'tiktok': bool(TIKTOK_ACCESS_TOKEN and TIKTOK_ACCOUNT_ID),
        'ready': bool(OPENAI_API_KEY)
    }
