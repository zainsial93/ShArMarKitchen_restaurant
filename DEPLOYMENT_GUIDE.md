# 🚀 Sial Foodies Deployment Guide

Congrats on building **Sial Foodies**! This guide will show you how to host your website for **FREE** so anyone can visit it.

We will use 3 free services:
1.  **Neon.tech** (For the Database)
2.  **Render.com** (For the Backend API)
3.  **Vercel** (For the Frontend Website)

---

## 🛑 Files to NEVER Upload
When uploading code (especially to GitHub), **NEVER** include these files/folders:
*   `node_modules` (These are huge and auto-installed by the server)
*   `.env` (Contains your passwords! We will set these securely in the dashboard)
*   `.git` (Hidden folder, usually ignored automatically)
*   `dist` (Build folder, auto-created)

---

## PHASE 1: Prepare Your Code (GitHub)
The easiest way to deploy is to put your code on GitHub.
1.  Create a **New Repository** on [GitHub.com](https://github.com).
2.  Upload your **entire project folder** (excluding `node_modules`).
    *   *Tip: You can use "GitHub Desktop" to drag and drop your project folder.*

---

## PHASE 2: The Database (Neon)
Since we use PostgreSQL, we need a cloud database.
1.  Go to [Neon.tech](https://neon.tech) and Sign Up (Free).
2.  Create a **New Project**.
3.  Copy the **Connection String** (It looks like `postgres://user:pass@ep-xyz.neon.tech/neondb...`).
    *   *Save this for the next step!*

---

## PHASE 3: The Backend (Render)
This runs your `server.js`.
1.  Go to [Render.com](https://render.com) and Sign Up.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Settings**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables** (Scroll down to "Advanced"):
    *   Key: `DB_USER` | Value: *(From your Neon connection string)*
    *   Key: `DB_PASSWORD` | Value: *(From your Neon connection string)*
    *   Key: `DB_HOST` | Value: *(From your Neon connection string)*
    *   Key: `DB_NAME` | Value: `neondb` (or whatever your string says)
    *   *Alternative:* Just add one key `DATABASE_URL` with the full string.
6.  Click **Create Web Service**.
    *   *Wait a few minutes. You will get a URL like `https://sial-foodies-api.onrender.com`.*
    *   **Copy this URL.**

---

## PHASE 4: The Frontend (Vercel)
This displays your React app.
1.  Go to [Vercel.com](https://vercel.com) and Sign Up.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Select **Vite**.
5.  **Root Directory**: Click "Edit" and select `client`.
6.  **Environment Variables**:
    *   Key: `VITE_API_URL`
    *   Value: *(Paste your Render Backed URL here, e.g., `https://sial-foodies-api.onrender.com`)*
    *   **IMPORTANT**: Do not add a trailing slash `/` at the end.
7.  Click **Deploy**.

---

## 🎉 Done!
Vercel will give you a link (e.g., `https://sial-foodies.vercel.app`).
**Share this link with your users!**

### Troubleshooting
*   **"Network Error"**: Check if your `VITE_API_URL` in Vercel is correct.
*   **"Database Connection Failed"**: Check your Neon credentials in Render.
