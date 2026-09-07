# VideoTube Backend

A complete REST API backend for a YouTube-style video hosting platform, built with **Node.js, Express, and MongoDB**.

## Features

- **Auth** — register, login, logout, JWT access/refresh tokens, change password
- **Users** — profile update, avatar/cover image upload (Cloudinary), channel profile with subscriber counts, watch history
- **Videos** — upload, list (search/sort/paginate), update, delete, publish toggle, view counter
- **Comments** — add/update/delete comments on videos (paginated)
- **Likes** — like/unlike videos, comments, and tweets; list liked videos
- **Tweets** — a simple "community post" style short-text feature
- **Subscriptions** — subscribe/unsubscribe to channels, list subscribers & subscriptions
- **Playlists** — create playlists, add/remove videos
- **Dashboard** — channel stats (views, subscribers, videos, likes) for the logged-in creator
- **Healthcheck** endpoint for uptime monitoring

## Tech stack

- Node.js + Express
- MongoDB + Mongoose (with aggregation pipelines & pagination)
- JWT auth (access + refresh tokens) via httpOnly cookies
- Cloudinary for file storage (avatars, cover images, video files, thumbnails)
- Multer for handling multipart/form-data uploads

## Getting started locally

```bash
npm install
cp .env.sample .env   # then fill in your own values
npm run dev
```

The server runs on `http://localhost:8000` by default. All endpoints are prefixed with `/api/v1`.

### Environment variables (`.env`)

See `.env.sample` for the full list: `MONGODB_URI`, `CORS_ORIGIN`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`, and Cloudinary credentials.

## API overview

| Resource | Base path |
|---|---|
| Health | `GET /api/v1/healthcheck` |
| Auth/Users | `/api/v1/users` (`/register`, `/login`, `/logout`, `/refresh-token`, `/current-user`, `/update-account`, `/avatar`, `/cover-image`, `/c/:username`, `/history`) |
| Videos | `/api/v1/videos` |
| Comments | `/api/v1/comments/:videoId` |
| Likes | `/api/v1/likes/toggle/v/:videoId`, `/toggle/c/:commentId`, `/toggle/t/:tweetId`, `/videos` |
| Tweets | `/api/v1/tweets` |
| Subscriptions | `/api/v1/subscriptions/c/:channelId`, `/u/:subscriberId` |
| Playlists | `/api/v1/playlists` |
| Dashboard | `/api/v1/dashboard/stats`, `/videos` |

## Deploying for free

This is a stateful Node server (not static), so **Vercel isn't the right fit** — use **Render** (or Railway) instead, both have free tiers well suited to this project.

### 1. Database — MongoDB Atlas (free)
1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Add a database user, and under Network Access allow `0.0.0.0/0` (or Render's IPs)
4. Copy the connection string into `MONGODB_URI`

### 2. File storage — Cloudinary (free)
1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Grab your Cloud Name, API Key, and API Secret from the dashboard

### 3. Hosting — Render (free web service)
1. Push this project to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service → connect your repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all the environment variables from your `.env` in Render's dashboard
6. Deploy — Render gives you a free `https://your-app.onrender.com` URL

> Note: Render's free tier spins the service down after inactivity, so the first request after idle time can take ~30-60 seconds to wake up. That's expected and fine for a portfolio demo.


