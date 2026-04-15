# Railway Deployment (Backend + toekomstige n8n-koppeling)

Deze repo is nu voorbereid om op **Railway** te draaien met één backend service.

## 1) Start command
Railway start met:

```bash
uvicorn backend.server:app --host 0.0.0.0 --port ${PORT:-8001}
```

Dit staat in zowel `Procfile` als `railway.json`.

## 2) Verplichte environment variables
Zet minimaal deze variabelen in Railway:

- `PORT` (Railway zet deze automatisch)
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY` (of `SUPABASE_ANON_KEY`)
- `MOLLIE_API_KEY` (test/live)
- `FRONTEND_URL` (bijv. je Railway frontend domein)
- `API_URL` (bijv. je Railway backend domein)
- `NEXT_PUBLIC_SUPABASE_URL=https://qoykbhocordugtbvpvsl.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YF4GPyjldX3RInjVK-EPWg_byEZhb7T`

## 3) Aanbevolen voor productie
- `CORS_ORIGINS=https://jouw-frontend.up.railway.app,https://jouwdomein.nl`
- `USE_SUPABASE=true`
- SMTP/Postmark variabelen indien mail actief is

## 4) n8n-ready (optioneel, alvast voorbereid)
Voor latere n8n workflows kun je nu al toevoegen:

- `N8N_WEBHOOK_URL=https://<jouw-n8n>/webhook/<pad>`
- `N8N_WEBHOOK_SECRET=<sterke-geheime-token>`
- `N8N_TIMEOUT_SECONDS=8`

Test endpoint:

```bash
POST /api/integrations/n8n/test
{
  "event": "railway_test",
  "payload": {"hello": "world"}
}
```

Als `N8N_WEBHOOK_URL` niet is gezet, geeft de API een veilige no-op response terug.

## 5) Frontend in Railway
Als je frontend als aparte Railway service draait, zet in de frontend service:

- `REACT_APP_BACKEND_URL=https://<jouw-backend>.up.railway.app`
- `REACT_APP_SUPABASE_URL=https://qoykbhocordugtbvpvsl.supabase.co`
- `REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YF4GPyjldX3RInjVK-EPWg_byEZhb7T`

Als je frontend build in dezelfde container staat (`frontend/build`), serveert FastAPI deze automatisch als fallback SPA.

## 6) Belangrijk over Supabase snippets (Next.js vs dit project)
De snippets met `page.tsx`, `utils/supabase/server.ts` en `middleware.ts` zijn voor **Next.js**.
Dit project draait frontend op **React CRA**, daarom is een CRA-compatibele Supabase client + fallback in `ProductsContext` toegevoegd.
