// /assets/js/player-playground.js
(() => {
    /*** DOM *************/
    const audio = document.getElementById('audio');
    const ppBtn = document.getElementById('ppBtn');
    const dock = document.getElementById('dock');
    const progress = document.getElementById('dock-progress');
    const progressBar = document.getElementById('progress-bar');

    if (!audio || !ppBtn || !dock || !progress || !progressBar) {
        console.error('[player] Required elements missing. Check playground-dock.html IDs.');
        return;
    }

    /*** CONFIG **********/
    const SRC = {
        stranger: '/assets/playlist/echoes-of-the-jungle.json',
        releases: '/assets/playlist/peace-token-playlist.json',
    };

    /*** STATE ***********/
    let currentPL = null;           // 'stranger' | 'releases'
    let tracks = [];             // normalized [{src,title,duration,cover}]
    let i = 0;              // index
    let loaded = false;

    /*** UTILS ***********/
    const byAttr = (val) => dock.querySelector(`.dock-item[data-pl="${val}"]`);
    const setActiveDot = (val) => {
        dock.querySelectorAll('.dock-item').forEach(b => b.classList.remove('is-active'));
        if (val) byAttr(val)?.classList.add('is-active');
    };
    const setPP = (playing) => { ppBtn.textContent = playing ? '⏸' : '▶'; };
    const showProgress = (show) => progress.classList.toggle('is-active', !!show);

    const normalize = (arr) =>
        arr.map(t => {
            const src = t.url || t.src || t.path || t.file || '';
            return {
                src: src.startsWith('/') ? src : `/${src.replace(/^\/?/, '')}`,
                title: t.title || t.name || '',
                duration: t.duration || null,
                cover: t.cover || t.image || null
            };
        }).filter(t => !!t.src);

    async function loadPlaylist(which) {
        currentPL = which;
        setActiveDot(which);
        loaded = false;
        setPP(false);
        showProgress(false);
        progressBar.style.width = '0%';

        const url = SRC[which];
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const raw = Array.isArray(data) ? data : (data.tracks || []);
            tracks = normalize(raw);
            if (!tracks.length) throw new Error('Empty or invalid playlist');
            i = 0;
            await loadTrack(i);
            loaded = true;
        } catch (err) {
            console.error('[player] Playlist load error for', which, err);
        }
    }

    async function loadTrack(idx) {
        const t = tracks[idx];
        if (!t) return;
        // reset progress before swapping src
        progressBar.style.width = '0%';
        showProgress(false);
        audio.src = t.src;
        audio.currentTime = 0;
    }

    async function play() {
        if (!loaded) return;
        try {
            await audio.play();      // in user gesture
            setPP(true);
            showProgress(true);
        } catch (e) {
            // Safari will fail if not within a gesture; we always call from a click below.
            console.error('[player] play() blocked:', e);
            setPP(false);
            showProgress(false);
        }
    }
    function pause() {
        audio.pause();
        setPP(false);
        showProgress(false);
        progressBar.style.width = '0%';
    }
    function next() {
        if (!tracks.length) return;
        i = (i + 1) % tracks.length;
        loadTrack(i).then(play);
    }

    /*** EVENTS **********/
    // Play/Pause button:
    ppBtn.addEventListener('click', async () => {
        // if nothing selected yet, default to Stranger and start
        if (!currentPL) {
            await loadPlaylist('stranger');
            return play();
        }
        if (audio.paused) return play();
        pause();
    });

    // Playlist icons:
    dock.querySelectorAll('.dock-item[data-pl]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pl = btn.getAttribute('data-pl');
            // If same playlist: toggle
            if (pl === currentPL) return audio.paused ? play() : pause();
            await loadPlaylist(pl);
            play();
        });
    });

    // Progress
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration || !Number.isFinite(audio.duration)) return;
        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    });
    audio.addEventListener('ended', next);
    audio.addEventListener('pause', () => {
        // keep bar visible only while actively playing
        showProgress(false);
        progressBar.style.width = '0%';
    });

    // Initial UI
    setPP(false);
    showProgress(false);
})();
