#!/bin/bash
# deploy-main.sh
# StudioRich | Deploy studiorich.shop
# ====================================

set -e
BRANCH_MAIN="main"
BRANCH_DEV="dev"
CNAME_FILE="CNAME"

read -p "⚠️ Deploy to LIVE (studiorich.shop)? (y/N): " confirm
[[ $confirm == [yY] ]] || { echo "❌ Canceled."; exit 1; }

CURRENT_BRANCH=$(git branch --show-current)

echo "🌿 Switching to $BRANCH_MAIN..."
git checkout $BRANCH_MAIN
git pull origin $BRANCH_MAIN

echo "🔁 Merging latest changes from $BRANCH_DEV..."
git pull origin $BRANCH_DEV
git merge $BRANCH_DEV --no-ff -m "Merge dev → main ($(date '+%Y-%m-%d %H:%M:%S'))"

echo "🧱 Building Jekyll site for PRODUCTION..."
JEKYLL_ENV=production bundle exec jekyll build

echo "🌐 Setting CNAME for studiorich.shop..."
echo "studiorich.shop" > _site/$CNAME_FILE

echo "🚀 Deploying to GitHub..."
git add .
git commit -m "Deploy: main build $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️ Nothing new to commit."
git push origin $BRANCH_MAIN

echo "✅ Deployment complete → https://studiorich.shop"

echo "↩️ Returning to $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH
