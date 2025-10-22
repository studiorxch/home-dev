#!/bin/bash
# StudioRich – Local rebuild utility

# Navigate to the project root (make sure path is correct)
cd ~/Projects/home || {
  echo "❌ Directory not found: ~/Projects/home"
  exit 1
}

echo "🧹 Cleaning Jekyll cache..."
bundle exec jekyll clean

echo "🎨 Building CSS..."
npm run build:css

echo "🚀 Serving site..."
bundle exec jekyll serve

echo "✅ StudioRich site live at http://127.0.0.1:4000"
