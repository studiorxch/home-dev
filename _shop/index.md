---
layout: default
title: StudioRich Shop
permalink: /shop/
description: Buy merch, music, cinematic lo-fi visuals, and exclusive digital drops from StudioRich — Brooklyn’s audio-visual lab for ambient beats, glitch art, and collectible experiences.
sitemap: true
redirect_from:
  - /*/account/logout
  - /*/cart*
  - /$%7Bt%7D
  - /cdn/
  - /cdn/shop/
  - /collections/all
  - /collections/canvas-by-studiorich-1
  - /collections/hats
  - /collections/t-shirts
  - /help
  - /pages/customer-service
  - /pages/returns
  - /pages/shipping-policy
  - /policies/privacy-policy
  - /products/
  - /products/2024-summer-vibes-collection-soak-up-the-sun
  - /products/3001-unisex-short-sleeve-jersey-t-shirt
  - /products/adapt-to-every-challenge-new-york-city-unisex-t-shirt
  - /products/brooklyn-breeze-foam-trucker
  - /products/camp-david-inspired-vintage-green-mountain-tee
  - /products/ec8000-organic-cotton-tote-bag
  - /products/felix-the-kats-vinyl-bite-retro-throwies-poster
  - /products/kung-fu-storyteller-flip-flops
  - /products/midnight-prowler-warning-bubble-free-stickers
  - /products/ny-crown-snapback
  - /products/nyc-street-heart-short-sleeve-unisex-t-shirt
  - /products/nyc-subway-sign-graffiti
  - /products/nyc-subway-signature-series-3
  - /products/nyc-subway-signature-series-k-discontinued-series
  - /products/nyc-subway-signature-series-n
  - /products/nyc-subway-signature-series-r
  - /products/set-of-business-cards
  - /products/studiorich-geometrix-unisex-track-pants
  - /products/studiorich-hardcover-bound-notebook
  - /products/studiorich-poppin-oversized-faded-t-shirt
  - /products/studiorichs-meltdown-moment-premium-mens-tank
  - /products/urban-grayscale-collection-sleek-city-style
  - /refund-policy
  - /services/login_with_shop/authorize
  - /terms
redirect_to: /playground/
---

<section class="hero" style="background-image: url(/assets/img/shop/default.webp);">
  <div class="hero-overlay">
    <h1>Where Lo‑Fi Lives</h1>
    <p>Ambient beats. Glitch visuals. Tees and drops that vibe.</p>
  </div>
</section>

<section class="shop-intro">
  <h1 class="center">
    <img src="/assets/ui/store.svg" alt="StudioRich Shop icon" class="icon-sm">  
    StudioRich Shop
  </h1>
  <p class="center">
    Step into the StudioRich vibe — cinematic lo-fi tees, ambient beats, glitch-art zines, and exclusive digital drops. Every piece is crafted with Brooklyn soul and analog dreams.
  </p>
</section>

<section class="shop-featured merch">
  <h2><img src="/assets/ui/baseball-cap.svg" alt="Baseball Cap icon" class="icon-sm">  Featured Merch</h2>
  <div class="product-card">
    <img src="/assets/img/shop/melting-sound-system.webp" alt="Meltdown Boombox Tee">
    <h3>Meltdown Boombox Tee</h3>
    <p>$35 – Oversized tee printed on heavyweight cotton</p>
    <a class="button" href="https://studiorich.printful.me/product/meltdown-boombox-oversized-tee" target="_blank">Buy on Printful</a>
  </div>
</section>

<section class="shop-more">
  <h2><img src="/assets/ui/glasses.svg" alt="Glasses icon" class="icon-sm">  Explore More Goods</h2>
  <ul>
    <li><a href="https://ko-fi.com/studiorich" target="_blank"><img src="/assets/ui/giftbox.svg" alt="Giftbox icon" class="icon-sm">  Exclusive sample packs & digital zines on Ko‑fi</a></li>
    <li><a href="https://studiorich.bandcamp.com/" target="_blank"><img src="/assets/ui/record.svg" alt="Record icon" class="icon-sm">  Albums & EPs on Bandcamp</a></li>
    <li><a href="https://studiorich.printful.me" target="_blank"><img src="/assets/ui/t-shirt.svg" alt="T-shirt icon" class="icon-sm">  Full merch storefront on Printful</a></li>
    <li><a href="https://www.redbubble.com/people/studiorich/shop" target="_blank"><img src="/assets/ui/splatter.svg" alt="Splatter icon" class="icon-sm">  Redbubble (Art Prints & More)</a></li>
  </ul>
</section>
<div class="container-text">
<section class="shop-grid">
  <h2><img src="/assets/ui/grid-sampler.svg" class="icon-sm" alt=""> New in Store</h2>

  <div id="shop-grid" class="grid">
    {% assign products = site.data.printful %}
    {% if products and products.size > 0 %}
      {% for p in products %}
        <a class="tile" href="/shop/{{ p.id }}/">
          <img src="{{ p.thumbnail_url | default: p.thumbnail | default: p.sync_product.thumbnail }}" alt="{{ p.name | default: p.sync_product.name }}" loading="lazy">
          <div class="meta"><h3>{{ p.name | default: p.sync_product.name }}</h3></div>
        </a>
      {% endfor %}
    {% else %}
      <p>No products yet.</p>
    {% endif %}
  </div>
</section>
</div>
<script>
const API = "https://studiorich-api.vercel.app/api/printful";
(async () => {
  try {
    const products = await (await fetch(`${API}/products`)).json();
    if (!Array.isArray(products) || !products.length) return;
    const grid = document.getElementById("shop-grid");
    grid.innerHTML = products.map(p=>{
      const id = p.id;
      const name = p.name || p.sync_product?.name || "Untitled";
      const thumb = p.thumbnail_url || p.thumbnail || p.sync_product?.thumbnail || "";
      return `
        <a class="tile" href="/shop/${id}/">
          <img src="${thumb}" alt="${name}" loading="lazy">
          <div class="meta"><h3>${name}</h3></div>
        </a>`;
    }).join("");
  } catch {}
})();
</script>

<style>
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin:1rem 0}
.tile{display:block;border:1px solid #eee;border-radius:12px;overflow:hidden;background:#fff}
.tile img{width:100%;height:auto;display:block;aspect-ratio:1/1;object-fit:cover}
.tile .meta{padding:.6rem}
.tile h3{margin:0;font-size:.95rem;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
</style>
