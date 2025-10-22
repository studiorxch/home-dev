/* Parallax Carousel – StudioRich (vanilla, ~2.1kb min)
   Expects: <main class="rail" id="rail"> <section class="slide">… */
export function initParallaxCarousel({
    railSel = '#rail',
    slideSel = '.slide',
    dotSel = '#dots',
    gapVar = '--slide-gap',
    speed = 80,   // depth (px) per slide offset
    scaleAmt = 0.08, // how much side slides shrink
    blurAmt = 2,    // max blur (px) on side slides
    dimAmt = 0.40, // max darken for side slides
    snap = true
} = {}) {
    const rail = document.querySelector(railSel);
    if (!rail) return;
    const slides = [...rail.querySelectorAll(slideSel)];
    const dots = document.querySelector(dotSel);

    // Dots
    if (dots && dots.childElementCount === 0) {
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.className = 'dot';
            b.setAttribute('role', 'tab');
            b.addEventListener('click', () => go(i));
            dots.appendChild(b);
        });
    }

    // Helpers
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gap = parseFloat(getComputedStyle(rail).getPropertyValue(gapVar)) || 24;
    const unit = () => (rail.clientWidth + gap) || 1;

    let idx = 0, raf;
    function markActive(i) {
        slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
        if (dots) [...dots.children].forEach((d, n) => d.setAttribute('aria-current', n === i ? 'true' : 'false'));
    }
    function go(i) {
        idx = (i + slides.length) % slides.length;
        slides[idx].scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', inline: 'center' });
        markActive(idx);
    }

    // Parallax transform on scroll
    function onScroll() {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const w = unit();
            const x = rail.scrollLeft;
            let closest = 0, closestDist = Infinity;

            slides.forEach((slide, i) => {
                const off = (slide.offsetLeft - x) / w; // 0 when centered
                const dist = Math.abs(off);
                if (dist < closestDist) { closestDist = dist; closest = i; }

                if (!prefersReduced) {
                    slide.style.transform =
                        `translateZ(${-dist * speed}px) scale(${1 - dist * scaleAmt})`;
                    slide.style.filter =
                        `brightness(${1 - dist * dimAmt}) blur(${dist * blurAmt}px)`;
                } else {
                    slide.style.transform = 'none';
                    slide.style.filter = 'none';
                }
            });

            // Set active to the visually closest
            if (closest !== idx) { idx = closest; markActive(idx); }

            // Soft loop illusion: if at the very end, jump to start
            if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) go(0);
        });
    }

    rail.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);

    // Keyboard (optional)
    rail.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') go(idx + 1);
        if (e.key === 'ArrowLeft') go(idx - 1);
    });

    // Init
    markActive(0);
    onScroll();

    // Public API (optional)
    return { next: () => go(idx + 1), prev: () => go(idx - 1), go, refresh: onScroll };
}
