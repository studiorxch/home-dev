// /assets/js/player-fab.js

(() => {
    const audio = document.getElementById('audio');
    const btn = document.getElementById('ppBtnFloating');
    if (!audio || !btn) return;

    const SRC = {
        default: '/assets/playlists/default-playlist.json',
        cityHall: '/assets/playlists/brooklyn-bridge-city-hall.json',
    };

    let currentPL = null, tracks = [], i = 0, loaded = false;

    const setPP = (playing) => { btn.textContent = playing ? '⏸' : '▶'; };

    const normalize = (arr) =>
        arr.map(t => {
            const src = t.url || t.src || t.path || t.file || '';
            return {
                src: src.startsWith('/') ? src : `/${src.replace(/^\/?/, '')}`,
                title: t.title || t.name || ''
            };
        }).filter(t => !!t.src);

    async function loadPlaylist(which) {
        currentPL = which;
        loaded = false; setPP(false);
        try {
            const res = await fetch(SRC[which], { cache: 'no-store' });
            const data = await res.json();
            tracks = normalize(Array.isArray(data) ? data : (data.tracks || []));
            i = 0;
            await loadTrack(i);
            loaded = true;
        } catch (e) { console.error('[player-fab] load error', e); }
    }
    async function loadTrack(idx) {
        const t = tracks[idx]; if (!t) return;
        audio.src = t.src; audio.currentTime = 0;
    }
    async function play() {
        if (!loaded) return;
        try { await audio.play(); setPP(true); } catch (e) { setPP(false); }
    }
    function pause() { audio.pause(); setPP(false); }
    function next() { if (!tracks.length) return; i = (i + 1) % tracks.length; loadTrack(i).then(play); }

    // Button toggles: first click loads default playlist and plays
    btn.addEventListener('click', async () => {
        if (!currentPL) { await loadPlaylist('stranger'); return play(); }
        if (audio.paused) return play();
        pause();
    });

    audio.addEventListener('ended', next);
    setPP(false);
})();
