# Stamp Maker Deployment Guide

## GitHub Pages Deployment

This application is configured to deploy to GitHub Pages with the custom domain `make.stamper.app`.

### Prerequisites

1. GitHub repository with the code
2. Domain `stamper.app` configured to point to GitHub Pages
3. `gh-pages` package installed (already done)

### Deployment Steps

1. **Build and Deploy:**
   ```bash
   npm run deploy
   ```

2. **Configure GitHub Repository:**
   - Go to your GitHub repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Set custom domain to `make.stamper.app`

3. **DNS Configuration:**
   Configure your DNS provider for `stamper.app` domain:
   
   **For the subdomain `make.stamper.app`:**
   - Type: CNAME
   - Name: make
   - Value: [your-github-username].github.io
   
   **For apex domain verification (optional):**
   - Type: A
   - Name: @
   - Values: 
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

### Files Created for Deployment

- `package.json`: Added homepage and deploy scripts
- `public/CNAME`: Contains the custom domain
- `DEPLOYMENT.md`: This deployment guide

### Deployment Commands

- `npm run build`: Creates production build
- `npm run predeploy`: Runs build automatically before deploy
- `npm run deploy`: Deploys to GitHub Pages

### Verification

After deployment, the application will be available at:
- Primary: https://make.stamper.app
- Fallback: https://[your-github-username].github.io/stamp-maker

### Troubleshooting

1. **Custom domain not working:** Check DNS propagation (can take up to 24 hours)
2. **404 errors:** Ensure gh-pages branch is selected in GitHub Pages settings
3. **Build errors:** Check console for any missing dependencies or build issues

### Security Notes

- The application runs entirely in the browser
- No server-side processing required
- All image processing happens client-side
- No data is sent to external servers
