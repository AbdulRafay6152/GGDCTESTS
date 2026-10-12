# GGDC Tests - Deployment Guide

## ✅ Firebase Credentials Updated

Your Firebase configuration has been updated with the new project credentials:
- Project ID: `ggdc-3902b`
- Auth Domain: `ggdc-3902b.firebaseapp.com`

---

## 📤 Part 1: Push Code to GitHub

### Step 1: Initialize Git (if not already done)

```bash
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Commit Changes

```bash
git commit -m "Update Firebase credentials and add new features"
```

### Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon in top right → **New repository**
3. Repository name: `ggdc-tests` (or your preferred name)
4. Keep it **Public** or **Private** (your choice)
5. **Don't** initialize with README (we already have code)
6. Click **Create repository**

### Step 5: Connect Local Repository to GitHub

Copy the commands GitHub shows you, or use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/ggdc-tests.git
git branch -M main
git push -u origin main
```

### Step 6: Authenticate

When prompted:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your GitHub password)

#### How to Create Personal Access Token:

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token** → **Generate new token (classic)**
3. Note: `GGDC Tests Deployment`
4. Expiration: `90 days` (or no expiration)
5. Select scopes: ✅ **repo** (full control)
6. Click **Generate token**
7. **Copy the token immediately** (you won't see it again!)
8. Use this token as password when pushing

---

## 🚀 Part 2: Deploy to Vercel

### Step 1: Go to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **Sign Up** (use your GitHub account)
3. Authorize Vercel to access your GitHub

### Step 2: Import Your Project

1. Click **Add New...** → **Project**
2. Find your `ggdc-tests` repository
3. Click **Import**

### Step 3: Configure Build Settings

Vercel will auto-detect most settings. Verify these:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables

Click **Environment Variables** and add these (optional but recommended):

```
VITE_FIREBASE_API_KEY=AIzaSyDdX_1pzM1kzBCbX-bxJxBlP0U8v9zdH8A
VITE_FIREBASE_AUTH_DOMAIN=ggdc-3902b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ggdc-3902b
VITE_FIREBASE_STORAGE_BUCKET=ggdc-3902b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=403055599158
VITE_FIREBASE_APP_ID=1:403055599158:web:ae7ab80d6162b3489e8297
```

**Note:** Since we hardcoded the Firebase config in `src/firebase.ts`, these environment variables are optional. But it's good practice to have them.

### Step 5: Deploy

1. Click **Deploy**
2. Wait 2-3 minutes
3. Your site will be live at: `https://ggdc-tests.vercel.app` (or similar)

### Step 6: Verify Deployment

1. Open your Vercel URL
2. Test the application:
   - ✅ Sign up works
   - ✅ Login works
   - ✅ Create test works
   - ✅ Take test works
   - ✅ View results works

---

## 🔄 Part 3: Update Deployment (Future Changes)

Whenever you make changes to your code:

```bash
# 1. Make your changes in the code

# 2. Add changes
git add .

# 3. Commit with descriptive message
git commit -m "Describe your changes here"

# 4. Push to GitHub
git push origin main
```

**Vercel will automatically redeploy!** No need to manually deploy again.

---

## 🌐 Part 4: Custom Domain (Optional)

If you want to use a custom domain like `ggdctests.com`:

### Step 1: Buy a Domain

Purchase from:
- [Namecheap](https://namecheap.com)
- [GoDaddy](https://godaddy.com)
- [Google Domains](https://domains.google)

### Step 2: Add Domain to Vercel

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Enter your domain: `ggdctests.com`
4. Click **Add**

### Step 3: Configure DNS

Vercel will show you DNS records to add. Typically:

**For root domain (ggdctests.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.ggdctests.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these records at your domain registrar's DNS settings.

### Step 4: Wait for DNS Propagation

DNS changes can take 5 minutes to 48 hours. Usually it's ready in 10-30 minutes.

---

## 🔧 Troubleshooting

### Issue: "Failed to push to GitHub"

**Solution:**
```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/ggdc-tests.git

# Try pushing again
git push -u origin main
```

### Issue: "Authentication failed"

**Solution:**
- Make sure you're using a **Personal Access Token**, not your GitHub password
- Token must have **repo** scope enabled
- Generate a new token if the old one expired

### Issue: "Build failed on Vercel"

**Solution:**
1. Check Vercel deployment logs
2. Common fixes:
   - Make sure `package.json` has all dependencies
   - Check for syntax errors in code
   - Verify build command is `npm run build`

### Issue: "Firebase not connecting"

**Solution:**
1. Verify Firebase credentials are correct
2. Check Firebase Console → Authentication → Sign-in method
   - Enable **Email/Password**
3. Check Firebase Console → Firestore Database
   - Database should be created
   - Rules should allow read/write

---

## 📋 Quick Reference Commands

### Push to GitHub

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Check Git Status

```bash
git status
```

### View Git Log

```bash
git log --oneline
```

### Pull Latest Changes (if working on multiple devices)

```bash
git pull origin main
```

---

## ✅ Deployment Checklist

- [ ] Firebase credentials updated in `src/firebase.ts`
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added (optional)
- [ ] Deployment successful
- [ ] Website tested and working
- [ ] Firebase Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] Firestore rules configured

---

## 🎯 Next Steps

1. **Test the deployed website** thoroughly
2. **Share the URL** with teachers/students
3. **Create test accounts** for testing
4. **Set up custom domain** (optional)
5. **Monitor Firebase usage** in Firebase Console

---

## 📞 Support

If you encounter any issues:

1. Check Vercel deployment logs
2. Check browser console for errors (F12)
3. Verify Firebase Console settings
4. Review this guide again

---

**Your GGDC Tests platform is now ready for deployment!** 🚀
