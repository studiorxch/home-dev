/* ==========================================================
   RXCH Genie — Music Library Engine
   StudioRich (c) 2025
   ----------------------------------------------------------
   Powers the Orb + Chatbar in the Music Library. Parses user
   queries, builds playlists from track cards, and renders
   results as RXCH cards.
   ========================================================== */

(function () {
    /* --- Helpers --- */
    const RXCH = {
        moodMap: {
            dreamy: "dreamy", chill: "chill", gritty: "gritty", nostalgic: "nostalgic",
            dark: "dark", hopeful: "hopeful", melancholic: "melancholy", melancholy: "melancholy",
            energetic: "energetic", cinematic: "cinematic", intimate: "intimate",
            playful: "playful", tense: "tense", haunting: "haunting",
            comforting: "comforting", weightless: "weightless"
        },
        parseQuery(q) {
            q = (q || "").toLowerCase();
            const durMatch = q.match(/(\d+)\s*(min|mins|minutes|m)\b/);
            const durationMin = durMatch ? parseInt(durMatch[1], 10) : null;

            let bpmMin = null, bpmMax = null;
            const range = q.match(/bpm\s*(\d+)\s*[-–]\s*(\d+)/);
            if (range) { bpmMin = +range[1]; bpmMax = +range[2]; }
            const under = q.match(/(?:under|<)\s*(\d+)\s*bpm/);
            if (under) { bpmMax = +under[1]; }
            const over = q.match(/(?:over|>)\s*(\d+)\s*bpm/);
            if (over) { bpmMin = +over[1]; }

            const moods = Object.keys(RXCH.moodMap)
                .filter(k => q.includes(k))
                .map(k => RXCH.moodMap[k]);

            const genreMatch = q.match(/\b(lo-?fi|jazz|ambient|boom bap|house|hip ?hop|trap)\b/);
            const genre = genreMatch ? genreMatch[1].replace(/\s+/g, '-') : null;

            const countMatch = q.match(/\b(\d{1,2})\s*(tracks|songs)\b/);
            const count = countMatch ? +countMatch[1] : null;

            return { durationMin, bpmMin, bpmMax, moods: [...new Set(moods)], genre, count };
        },

        buildFromGrid(filters) {
            const cards = Array.from(document.querySelectorAll('.track-card'));
            let pool = cards.map(c => ({
                slug: (c.getAttribute('href') || '').split('/tracks/')[1]?.split('/')[0],
                title: c.querySelector('.track-title')?.textContent?.trim() || 'Untitled',
                moods: (c.dataset.mood || '').split(' ').filter(Boolean),
                genres: (c.dataset.genre || '').split(' ').filter(Boolean)
            }));

            if (filters.moods?.length) {
                pool = pool.filter(t => t.moods.some(m => filters.moods.includes(m)));
            }
            if (filters.genre) {
                pool = pool.filter(t => t.genres.includes(filters.genre));
            }

            let targetCount = filters.count || (filters.durationMin ? Math.max(5, Math.round(filters.durationMin / 3)) : 10);
            targetCount = Math.min(targetCount, 20);

            pool = pool.sort(() => Math.random() - 0.5).slice(0, targetCount);
            return pool;
        },

        titleize(filters) {
            const moodStr = filters.moods?.length ?
                filters.moods.map(m => m[0].toUpperCase() + m.slice(1)).join(' × ') : 'Orb Surprise';
            const lenStr = filters.durationMin ? ` • ${filters.durationMin}m` : '';
            return `${moodStr}${lenStr}`;
        },

        focusGridTo(slugs) {
            const cards = document.querySelectorAll('.track-card');
            const set = new Set(slugs);
            cards.forEach(c => {
                const slug = (c.getAttribute('href') || '').split('/tracks/')[1]?.split('/')[0];
                c.style.display = set.has(slug) ? '' : 'none';
            });
            window.scrollTo({ top: document.querySelector('.track-grid').offsetTop - 80, behavior: 'smooth' });
        }
    };

    /* --- DOM Hooks --- */
    const rxchForm = document.getElementById('rxch-chat');
    const rxchInput = document.getElementById('rxch-input');
    const rxchResults = document.getElementById('rxch-results');
    const rxchOrb = document.querySelector('.rxch-orb');

    function renderPlaylistCard(title, tracks) {
        const html = `
      <div class="rxch-card">
        <h3>${title}</h3>
        <div class="rxch-meta">${tracks.length} tracks • curated by RXCH</div>
        <div class="rxch-tracks">
          ${tracks.map(t => `
            <div>${t.title}</div>
            <a class="rxch-play" href="/tracks/${t.slug}/?autoplay=1">Play</a>
          `).join('')}
        </div>
        <a class="rxch-play" href="/tracks/${tracks[0]?.slug}/?autoplay=1">Play First</a>
      </div>`;
        rxchResults.innerHTML = html;
    }

    if (rxchForm) {
        rxchForm.addEventListener('submit', e => {
            e.preventDefault();
            const q = rxchInput.value.trim();
            if (!q) return;
            rxchOrb.classList.add('rxch-pulse');

            const filters = RXCH.parseQuery(q);
            const tracks = RXCH.buildFromGrid(filters);
            const title = RXCH.titleize(filters);
            renderPlaylistCard(title, tracks);

            // Optional: narrow grid to chosen tracks
            // RXCH.focusGridTo(tracks.map(t=>t.slug));

            if (typeof SRlog === 'function') {
                SRlog('playlist_start', { feature: 'playlist_genie', meta: { q, filters, count: tracks.length } });
            }

            setTimeout(() => rxchOrb.classList.remove('rxch-pulse'), 400);
        });
    }

    if (rxchOrb) {
        rxchOrb.addEventListener('click', () => rxchInput.focus());
    }
})();
