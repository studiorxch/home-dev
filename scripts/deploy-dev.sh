#!/bin/bash
# deploy-dev.sh
# StudioRich | Deploy dev.studiorich.shop
# ========================================

set -e
BRANCH="dev"
CNAME_FILE="CNAME"
CONFIG="_config.yml,_config_dev.yml"

echo "🧱 Building Jekyll site for DEV..."
JEKYLL_ENV=development bundle exec jekyll build --config $CONFIG

echo "🌐 Setting CNAME for dev.studiorich.shop..."
echo "dev.studiorich.shop" > _site/$CNAME_FILE

echo "🚀 Pushing to $BRANCH branch..."
git checkout $BRANCH
git pull origin $BRANCH --rebase
git add .
git commit -m "Deploy: dev build $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️ Nothing to commit."
git push origin $BRANCH

echo "✅ Dev deployment complete → https://dev.studiorich.shop"
git checkout -
