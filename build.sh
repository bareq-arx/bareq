#!/bin/bash

# Build Script for BAREQ Landing Page
# This script creates an optimized production build

echo "🚀 Building BAREQ Landing Page..."
echo "=================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create dist directory
echo -e "${BLUE}📁 Creating build directory...${NC}"
rm -rf dist
mkdir -p dist
mkdir -p dist/public/media

# Copy HTML file
echo -e "${BLUE}📄 Copying HTML...${NC}"
cp index.html dist/

# Copy CSS file
echo -e "${BLUE}🎨 Copying CSS...${NC}"
cp styles.css dist/

# Copy JS file
echo -e "${BLUE}⚡ Copying JavaScript...${NC}"
cp script.js dist/

# Copy media files
echo -e "${BLUE}🖼️  Copying media files...${NC}"
cp -r public/media/* dist/public/media/

# Copy additional files
echo -e "${BLUE}📋 Copying documentation...${NC}"
cp README.md dist/ 2>/dev/null || true
cp QUICK-START.md dist/ 2>/dev/null || true
cp project-data.json dist/ 2>/dev/null || true

# Create a simple index for the build
echo -e "${BLUE}📝 Creating build info...${NC}"
cat > dist/BUILD-INFO.txt << EOF
BAREQ Landing Page - Production Build
=====================================

Build Date: $(date)
Build Version: 1.0.0
Build Type: Production

Files Included:
- index.html (Main page)
- styles.css (Stylesheets)
- script.js (JavaScript)
- public/media/* (Images & Videos)
- README.md (Documentation)

Deployment Instructions:
1. Upload all files to your web server
2. Ensure public/media folder maintains its structure
3. Point your domain to index.html
4. Configure SSL certificate for HTTPS

For more information, see README.md

© 2025 BAREQ - بريق
EOF

# Create .htaccess for Apache servers
echo -e "${BLUE}⚙️  Creating .htaccess...${NC}"
cat > dist/.htaccess << EOF
# BAREQ Landing Page - Apache Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType video/mp4 "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Force HTTPS (uncomment when SSL is configured)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Prevent directory browsing
Options -Indexes

# Custom error pages (create these if needed)
# ErrorDocument 404 /404.html
# ErrorDocument 500 /500.html
EOF

# Calculate sizes
echo -e "${BLUE}📊 Calculating sizes...${NC}"
HTML_SIZE=$(du -h dist/index.html | cut -f1)
CSS_SIZE=$(du -h dist/styles.css | cut -f1)
JS_SIZE=$(du -h dist/script.js | cut -f1)
TOTAL_SIZE=$(du -sh dist | cut -f1)

# Build complete
echo ""
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo "=================================="
echo -e "Output directory: ${YELLOW}dist/${NC}"
echo -e "Total size: ${YELLOW}${TOTAL_SIZE}${NC}"
echo ""
echo "File Sizes:"
echo "  - HTML: ${HTML_SIZE}"
echo "  - CSS:  ${CSS_SIZE}"
echo "  - JS:   ${JS_SIZE}"
echo ""
echo -e "${BLUE}📦 Ready to deploy!${NC}"
echo ""
echo "Deployment Options:"
echo "  1. Upload 'dist' folder to your web server"
echo "  2. Deploy to Netlify: Drag 'dist' folder to netlify.com/drop"
echo "  3. Deploy to Vercel: Run 'vercel dist' in terminal"
echo "  4. Use FTP: Upload contents of 'dist' to public_html"
echo ""
echo -e "${GREEN}🎉 Your BAREQ landing page is ready!${NC}"

