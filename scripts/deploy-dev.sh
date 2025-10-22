# /scripts/deploy-dev.sh
#!/bin/bash
set -e

echo "🚀 Building and deploying StudioRich DEV → dev.studiorich.shop"
JEKYLL_ENV=development bundle exec jekyll build
git add .
git commit -m "Deploy to dev"
git push origin main
