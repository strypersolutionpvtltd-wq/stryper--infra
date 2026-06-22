# Deployment Guide - Stryper Interior & Infra Website

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings will be auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Configure Domain**
   - Go to Site settings → Domain management
   - Add custom domain: `www.stryperinterior.com`
   - Configure DNS settings as instructed

### Option 2: Vercel

1. **Push to GitHub** (same as above)

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Build settings will be auto-detected from `vercel.json`
   - Click "Deploy"

3. **Configure Domain**
   - Go to Project Settings → Domains
   - Add custom domain: `www.stryperinterior.com`

### Option 3: Manual Deployment (Any Hosting)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder**
   - The `dist` folder contains all production files
   - Upload to your hosting provider (AWS S3, DigitalOcean, etc.)

3. **Configure Server**
   - Ensure all routes redirect to `index.html` (for SPA routing)
   - Enable HTTPS
   - Configure caching headers

## 🔧 Pre-Deployment Checklist

### 1. Update Contact Information
- [ ] Update phone number in all components
- [ ] Update email addresses
- [ ] Update WhatsApp link
- [ ] Update social media links

### 2. SEO Optimization
- [ ] Update meta tags in `index.html`
- [ ] Add proper Open Graph images
- [ ] Set up Google Analytics (optional)
- [ ] Create and upload `sitemap.xml`
- [ ] Create and upload `robots.txt`

### 3. Performance
- [ ] Optimize images (compress and convert to WebP if needed)
- [ ] Test on Lighthouse (aim for 90+ score)
- [ ] Enable gzip/brotli compression on server
- [ ] Configure CDN (optional)

### 4. Testing
- [ ] Test all links
- [ ] Test contact form
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test page load times

## 📝 Post-Deployment

### 1. Add sitemap.xml
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.stryperinterior.com/</loc>
    <lastmod>2026-06-17</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2. Add robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.stryperinterior.com/sitemap.xml
```

### 3. Google Search Console
- Add your site to Google Search Console
- Submit sitemap
- Request indexing

### 4. Set up Analytics (Optional)
```bash
npm install react-ga4
```

Add to `src/main.jsx`:
```javascript
import ReactGA from 'react-ga4'
ReactGA.initialize('YOUR_GA_TRACKING_ID')
```

## 🔐 SSL/HTTPS

Both Netlify and Vercel provide free SSL certificates automatically.
For manual deployment, use Let's Encrypt or your hosting provider's SSL.

## 🌐 DNS Configuration

Point your domain to hosting:

**Netlify:**
- A Record: 75.2.60.5
- AAAA Record: 2600:1f18:24ba:c800::11

**Vercel:**
- CNAME Record: cname.vercel-dns.com

## 📊 Performance Monitoring

- Use Lighthouse for performance audits
- Monitor with Google Analytics
- Set up uptime monitoring (e.g., UptimeRobot)

## 🆘 Troubleshooting

### Build fails
```bash
npm install
npm run build
```

### Blank page after deployment
- Check browser console for errors
- Ensure base URL is correct in `vite.config.js`
- Verify routing configuration

### Images not loading
- Check image paths
- Verify images are in `public` folder or imported correctly

## 🔄 Continuous Deployment

Both Netlify and Vercel support automatic deployments:
- Push to GitHub → Automatic build and deploy
- Great for ongoing updates

## 📧 Support

For deployment issues:
- Email: info@stryperinterior.com
- Phone: +91 9565310410
