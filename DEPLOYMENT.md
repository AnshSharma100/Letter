# 💕 Love Letter - Deployment Guide

## 🚀 EASIEST Option: Netlify Drop (Recommended!)

**No GitHub account needed! Takes 30 seconds:**

1. Build your site:
```powershell
npm run build
```

2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. You'll get a URL like: `https://random-name-123.netlify.app`
5. Send that URL to your girlfriend! 💕

**To customize the URL:** Sign up (free) and change the site name in settings.

---

## 🌐 Option 2: GitHub Pages (Free Forever)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name it `letter`
3. Make it **public** (or private if you have GitHub Pro)
4. Don't initialize with anything

### Step 2: Update vite.config.js
In `vite.config.js`, change the base to match your repo name:
```js
base: '/letter/',  // Must match your repo name!
```

### Step 3: Push Your Code
```powershell
git init
git add .
git commit -m "Initial commit: Love letter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/letter.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. The workflow will auto-deploy!

### Your Site:
`https://YOUR_USERNAME.github.io/letter/`

---

## 🎯 Option 3: Vercel (Also Super Easy)

1. Build:
```powershell
npm run build
```

2. Install Vercel CLI:
```powershell
npm install -g vercel
```

3. Deploy:
```powershell
vercel --prod
```

Follow the prompts, and you'll get a URL!

---

## 🔒 Making It Private

**Netlify:** Upgrade to password-protect pages ($19/mo)
**GitHub Pages:** Private repos only work with GitHub Pro
**Best for privacy:** Send her the link and ask her not to share it 😊

---

## 💡 My Recommendation

**For you:** Use **Netlify Drop** - it's instant, free, and requires zero setup!
