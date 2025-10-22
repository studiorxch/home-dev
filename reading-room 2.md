---
layout: reading-room
title: The Reading Room - Focus Music & Book Lover's Quotes — Ambient Focus Timer
description: A distraction-light reading timer with lo-fi audio and rotating literary quotes by HollowBookCo.
image: /assets/img/share/reading-room-share.webp
permalink: /reading-room/
version: 4.0
---

<style>
  :root{
    --text:#e8eaed; --muted:#aab1bb; --accent:#8b5cf6;
    --bg1:hsl(250 42% 10%); --bg2:hsl(274 45% 14%);
    --bg3:hsl(298 42% 11%); --bg4:hsl(322 48% 13%);
  }
  html,body{height:100%}
  body{
    margin:0;color:var(--text);font-family:Inter,system-ui,sans-serif;
    background:
      radial-gradient(80vmax 80vmax at 15% 85%, rgba(255,255,255,.05), transparent 60%),
      linear-gradient(-45deg,var(--bg1),var(--bg2),var(--bg3),var(--bg4));
    background-size:100% 100%, 400% 400%; animation:gradientShift 24s ease-in-out infinite;
  }
  @keyframes gradientShift{
    0%{background-position:0% 50%, 0% 50%}
    50%{background-position:0% 50%, 100% 50%}
    100%{background-position:0% 50%, 0% 50%}
  }

  .container{max-width:1080px;margin:0 auto;padding:4rem 1.25rem 6rem}
  header{display:flex;align-items:center;justify-content:space-between;gap:1rem}
  header h1{margin:0 .0 0 .5rem;font-weight:600}
  header .sub{color:var(--muted);font-size:.95rem;margin:.25rem 0 0 .5rem;line-height:1.5;letter-spacing:.02em}

  .logo-hollowbookco{position:fixed;top:1rem;left:2rem;z-index:1000}
  .logo-hollowbookco img{height:50px;opacity:.75;transition:opacity .2s}
  .logo-hollowbookco:hover img{opacity:1}

  .controls{display:flex;gap:.5rem;flex-wrap:wrap}
  .btn{display:inline-flex;align-items:center;gap:.55rem;border:1px solid rgba(255,255,255,.12);
       background:rgba(255,255,255,.03);color:var(--text);padding:.55rem .8rem;border-radius:999px;
       cursor:pointer;transition:background .15s, transform .12s}
  .btn:hover{background:rgba(255,255,255,.08);transform:translateY(-1px)}
  .btn[aria-pressed="true"]{background:rgba(139,92,246,.18);border-color:rgba(139,92,246,.35)}
  .btn.primary{background:var(--accent);color:#0b0d12;border-color:var(--accent)}
  .btn img{width:1.5em;vertical-align:middle}

  .grid{margin-top:2rem;display:grid;grid-template-columns:1fr;gap:2rem}

  /* Quote stage */
  #quoteStage{position:relative;min-height:48vh;display:grid;place-items:center}
  .quote-text{text-align:center;font-size:clamp(1.6rem,1.2rem + 2.2vw,3rem);line-height:1.3; max-width: 720px; /* or whatever looks good */}
  .quote-meta{display:flex;justify-content:center;align-items:center;gap:.75rem;margin: 1rem auto 0 auto;}
  .muted{color:var(--muted)}

  /* Bottom center dock (Collections + quote nav) */
  .dock{
    position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
    display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;
    padding:.6rem .8rem;border-radius:14px;z-index:22;
    background:rgba(10,12,16,.55);backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,.12)
  }
  .dock label{margin-right:.25rem}
  .dock select{
    background:rgba(255,255,255,.04);color:var(--text);
    border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:.45rem .6rem
  }

  /* Timer bar + big timer */
  #countdown-wrap{position:fixed;left:0;right:0;bottom:0;height:8px;background:rgba(255,255,255,.06)}
  #countdown-bar{height:100%;width:0%;background:var(--accent);transition:width 1s linear}
  #bigTimer{
    position:fixed;top:20px;right:28px;font-family:"IBM Plex Mono",ui-monospace,monospace;
    font-weight:300;font-size:3.25rem;letter-spacing:.02em;display:none;z-index:20
  }

  /* Fullscreen overlay */
  #fs-overlay{position:fixed;inset:0;display:none;place-items:center;text-align:center;padding:2rem;z-index:15}
  #fs-overlay.active{display:grid}
  .fs-card{
    max-width:720px;background:rgba(0,0,0,.2);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
    border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:2rem;animation:fadeIn .4s ease
  }
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)}}
  .faded{opacity:.07;pointer-events:none;filter:blur(1px);transition:opacity .35s, filter .35s}

  /* Floating timer settings */
  #timerPanel{
    position:fixed;right:16px;bottom:90px;width:min(360px,92vw);
    border:1px solid rgba(255,255,255,.12);background:rgba(10,12,16,.6);
    backdrop-filter:blur(8px);border-radius:16px;padding:.9rem;display:none;z-index:18
  }
  #timerPanel .row{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
  #timerPanel input[type="number"]{
    background:rgba(255,255,255,.04);color:var(--text);
    border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:.45rem .6rem;width:88px
  }

  footer{height:32vh}
</style>

<!-- Logo -->
<a href="/hollowbookco/" class="logo-hollowbookco" aria-label="HollowBookCo home">
  <img src="/assets/img/logos/studiorich-x-hollowbookco-symbol.svg" alt="StudioRich × HollowBookCo">
</a>

<div class="container" id="top">
  <header>
    <div>
      <h1>The Reading&nbsp;Room</h1>
      <div class="sub">In the right mood, music becomes ink’s echo.</div>
    </div>
    <div class="controls" aria-label="Controls">
      <button id="focusBtn" class="btn primary" title="Focus mode">
        <img src="/assets/ui/read.svg" alt="Read">
      </button>
      <button id="timerBtn" class="btn" aria-pressed="false" title="Start / Stop Timer">
        <img src="/assets/ui/clock.svg" alt="Timer">
      </button>
      <button id="settingsBtn" class="btn" title="Settings">
        <img src="/assets/ui/gear.svg" alt="Settings">
      </button>
      <button id="fsBtn" class="btn" aria-pressed="false" title="Toggle fullscreen">
        <img src="/assets/ui/fullscreen.svg" alt="Fullscreen">
      </button>
      <button id="audioBtn" class="btn" aria-pressed="false" title="Play / Pause">
        <img src="/assets/ui/volume.svg" alt="Audio">
      </button>
    </div>
  </header>

  <section class="grid" id="mainGrid">
    <div id="quoteStage">
      <div class="quote-text" id="quoteText">
        Some loops don’t distract — they draw you further into the page.
      </div>
      <div class="quote-meta">
        <div class="muted" id="quoteSource">— Reading Room</div>
        <div class="muted" id="quoteIndex">1/1</div>
      </div>
    </div>
  </section>
</div>

<!-- Bottom-center dock -->
<div class="dock" role="group" aria-label="Collections and quote controls">
  <label for="packSel" class="muted">Collections</label>
  <select id="packSel" aria-label="Choose a collection">
    <option value="hollow">HollowBookCo</option>
    <option value="studiorich">StudioRich</option>
    <option value="literary">Literary</option>
  </select>
  <button class="btn" id="prevQuote" title="Previous quote">◀</button>
  <button class="btn" id="nextQuote" title="Next quote">▶</button>
  <button class="btn" id="rotateBtn" aria-pressed="false" title="Auto‑rotate quotes">Auto</button>
</div>

<!-- Timer & progress -->
<div id="bigTimer">30:00</div>
<div id="countdown-wrap" aria-hidden="true" role="progressbar" aria-valuemin="0" aria-valuemax="1800" aria-valuenow="0">
  <div id="countdown-bar"></div>
</div>

<!-- Floating timer settings -->
<div id="timerPanel" role="dialog" aria-label="Timer settings">
  <div class="row" style="margin-bottom:.5rem">
    <span class="muted">Preset:</span>
    <button class="btn" data-preset="15">15m</button>
    <button class="btn" data-preset="25">25m</button>
    <button class="btn" data-preset="30">30m</button>
    <button class="btn" data-preset="45">45m</button>
    <label class="muted" style="margin-left:.5rem">Custom</label>
    <input type="number" id="customMinutes" min="1" max="180" value="30" aria-label="Custom minutes">
  </div>
  <div class="row">
    <span class="muted">Extend:</span>
    <button class="btn" id="add5">+5m</button>
    <button class="btn" id="add10">+10m</button>
  </div>
  <p class="muted" style="margin:.6rem 0 0">
    Focus hides UI and shows a large timer. Toggle features separately if you prefer.
  </p>
</div>

<!-- Fullscreen overlay -->
<div id="fs-overlay" aria-live="polite">
  <div class="fs-card" id="fsCard">
    <h2 id="fsTitle" style="margin:.2rem 0 .5rem">Create less distraction.</h2>
    <p id="fsBody" class="muted" style="margin:0 0 1rem">Just read. Your session begins now…</p>
    <div class="row" style="justify-content:center;gap:.75rem">
      <button class="btn" id="exitFs">Exit</button>
    </div>
  </div>
</div>

<audio id="bgMusic" src="/assets/loops/loops-between-pages.mp3" preload="none" loop></audio>

<script>
  // ---------- Utilities
  const $ = (sel) => document.querySelector(sel);
  const params = new URLSearchParams(location.search);
  function setParam(k,v){ params.set(k,v); history.replaceState(null,"","?"+params.toString()); }

  // ---------- State
  const state = {
    music:false, timer:false, fullscreen:false,
    durationMin: parseInt(params.get("duration") || "30",10),
    secondsLeft:0, pack:"hollow",
    rotateMs: parseInt(params.get("interval") || "12",10)*60*1000,
    timerPanelOpen:false
  };

  // ---------- Elements
  const focusBtn=$("#focusBtn"), timerBtn=$("#timerBtn"), settingsBtn=$("#settingsBtn"),
        fsBtn=$("#fsBtn"), audioBtn=$("#audioBtn"),
        bigTimer=$("#bigTimer"), barWrap=$("#countdown-wrap"), bar=$("#countdown-bar"),
        fsOverlay=$("#fs-overlay"), mainGrid=$("#mainGrid"), musicEl=$("#bgMusic"),
        packSel=$("#packSel"), qText=$("#quoteText"), qSource=$("#quoteSource"),
        qIndexEl=$("#quoteIndex"), prevQuoteBtn=$("#prevQuote"), nextQuoteBtn=$("#nextQuote"),
        rotateBtn=$("#rotateBtn"), timerPanel=$("#timerPanel"),
        customMinutes=$("#customMinutes"), add5=$("#add5"), add10=$("#add10");

  document.querySelectorAll("[data-preset]").forEach(b =>
    b.addEventListener("click", () => setDuration(parseInt(b.dataset.preset,10)))
  );

  // ---------- Collections (quote packs)
  const QUOTE_PACKS = {
    hollow: [
      { t:"A hollow book holds two worlds: the one you read and the one you hide.", s:"HollowBookCo" },
      { t:"Every library is a labyrinth, and some doors open only for the patient.", s:"HollowBookCo" },
      { t:"The weight of a book isn’t measured in paper, but in the secrets it keeps.", s:"HollowBookCo" },
      { t:"Between the covers, the clock forgets how to tick.", s:"HollowBookCo" },
      { t:"Some stories are keys, some are locks—you only know which when you turn the last page.", s:"HollowBookCo" },
      { t:"A hidden chapter is the truest kind of treasure.", s:"HollowBookCo" },
      { t:"Light falls differently on a page when it’s read in silence.", s:"HollowBookCo" }
    ],
    studiorich: [
      { t:"Some pages are meant to be read. Others are meant to be lived until the ink runs out.", s:"StudioRich" },
      { t:"Every book is a subway line. Some take you home. Some take you where you didn’t know you belonged.", s:"StudioRich" },
      { t:"A reading room isn’t quiet because no one’s talking. It’s quiet because every mind is somewhere else entirely.", s:"StudioRich" },
      { t:"In the margins, we write the parts of ourselves we don’t say out loud.", s:"StudioRich" },
      { t:"The city hums outside, but here—inside these walls—the only trains that matter run on paper.", s:"StudioRich" },
      { t:"Stories are just graffiti you can’t scrub off your soul.", s:"StudioRich" }
    ],
    literary: [
      { t:"I go back to the reading room... My favorite feeling in the world.", s:"Kafka on the Shore (2002)" },
      { t:"Since the library has just opened... I love the comfortable sofa.", s:"Haruki Murakami, library scene" },
      { t:"If you only read the books that everyone else is reading...", s:"Norwegian Wood" },
      { t:"Lost opportunities, lost possibilities... your own private library.", s:"Kafka on the Shore" },
      { t:"With my eyes closed, I would touch a familiar book...", s:"Haruki Murakami" }
    ]
  };

  let QUOTES=[], qIndex=0, rotateInt=null;

  async function loadPack(name){
    state.pack = name; setParam("pack", name);
    QUOTES = [];
    try{
      const res = await fetch(`/assets/quotes/${name}.json`, { cache:"no-store" });
      if(res.ok){
        const json = await res.json();
        if(Array.isArray(json)) QUOTES = json;
        else if (Array.isArray(json[name])) QUOTES = json[name];
      }
    }catch(e){}
    if(!Array.isArray(QUOTES) || !QUOTES.length) QUOTES = (QUOTE_PACKS[name] || QUOTE_PACKS.hollow);

    const qParam = parseInt(params.get("q") || "0",10);
    qIndex = Number.isFinite(qParam) ? Math.max(0, Math.min(QUOTES.length-1, qParam)) : 0;
    renderQuote(); updateQuoteCount();
  }

  function updateQuoteCount(){ qIndexEl.textContent = `${qIndex+1}/${QUOTES.length}`; }

  function renderQuote(){
    const q = QUOTES[qIndex]; if(!q) return;
    qText.textContent = q.t; qSource.textContent = "— " + q.s; setParam("q", qIndex);
    const h = [250,210,180,320,140,30,12,196][qIndex % 8];
    document.documentElement.style.setProperty("--bg1", `hsl(${h} 48% 12%)`);
    document.documentElement.style.setProperty("--bg2", `hsl(${(h+24)%360} 52% 16%)`);
    document.documentElement.style.setProperty("--bg3", `hsl(${(h+48)%360} 46% 13%)`);
    document.documentElement.style.setProperty("--bg4", `hsl(${(h+72)%360} 50% 15%)`);
  }

  prevQuoteBtn.addEventListener("click", () => {
    qIndex = (qIndex - 1 + QUOTES.length) % QUOTES.length;
    renderQuote(); updateQuoteCount(); stopRotation();
  });
  nextQuoteBtn.addEventListener("click", () => {
    qIndex = (qIndex + 1) % QUOTES.length;
    renderQuote(); updateQuoteCount(); stopRotation();
  });

  function startRotation(){
    if(rotateInt) return;
    rotateInt = setInterval(() => {
      qIndex = (qIndex + 1) % QUOTES.length;
      renderQuote(); updateQuoteCount();
    }, state.rotateMs);
    rotateBtn.setAttribute("aria-pressed","true"); setParam("rotate","1");
  }
  function stopRotation(){
    clearInterval(rotateInt); rotateInt=null;
    rotateBtn.setAttribute("aria-pressed","false"); setParam("rotate","0");
  }
  rotateBtn.addEventListener("click", () => rotateInt ? stopRotation() : startRotation());

  // ---------- Timer
  let timerInt=null;
  function setDuration(mins){
    state.durationMin = mins; customMinutes.value = String(mins);
    setParam("duration", String(mins)); if(!state.timer) bigTimer.textContent = fmt(mins*60);
  }
  function fmt(s){ const m=Math.floor(s/60), sec=s%60; return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`; }
  function updateBar(){
    const total = state.durationMin * 60;
    const pct = Math.min(100, ((total - state.secondsLeft)/total)*100);
    bar.style.width = pct + "%"; barWrap.setAttribute("aria-valuenow", total - state.secondsLeft);
  }

  function startTimer(){
    if(state.timer) return;
    state.timer = true; timerBtn.setAttribute("aria-pressed","true");
    barWrap.setAttribute("aria-hidden","false");
    state.secondsLeft = state.durationMin * 60; bigTimer.style.display="block";
    clearInterval(timerInt);
    timerInt = setInterval(() => {
      bigTimer.textContent = fmt(state.secondsLeft); updateBar(); state.secondsLeft--;
      if(state.secondsLeft < 0){
        clearInterval(timerInt); state.timer=false; timerBtn.setAttribute("aria-pressed","false");
      }
    },1000);
  }
  function stopTimer(){
    state.timer=false; timerBtn.setAttribute("aria-pressed","false");
    clearInterval(timerInt); bar.style.width="0%"; barWrap.setAttribute("aria-hidden","true");
    bigTimer.style.display="none";
  }

  add5.addEventListener("click", () => {
    if(state.timer){ state.secondsLeft += 5*60; bigTimer.textContent = fmt(state.secondsLeft); }
  });
  add10.addEventListener("click", () => {
    if(state.timer){ state.secondsLeft += 10*60; bigTimer.textContent = fmt(state.secondsLeft); }
  });
  customMinutes.addEventListener("change", () => {
    const v = Math.max(1, Math.min(180, parseInt(customMinutes.value || "30",10)));
    setDuration(v);
  });

  // Start/Stop Timer button ONLY
  timerBtn.addEventListener("click", () => (state.timer ? stopTimer() : startTimer()));

  // Settings toggles the panel ONLY
  settingsBtn.addEventListener("click", () => {
    state.timerPanelOpen = !state.timerPanelOpen;
    timerPanel.style.display = state.timerPanelOpen ? "block" : "none";
  });

  // ---------- Fullscreen + Audio
  async function enterFs(){
    if(!document.fullscreenElement){
      try{ await document.documentElement.requestFullscreen(); }catch(e){}
    }
    state.fullscreen=true; fsBtn.setAttribute("aria-pressed","true");
    fsOverlay.classList.add("active"); fadeNonessential(true);
  }
  async function exitFs(){
    if(document.fullscreenElement){
      try{ await document.exitFullscreen(); }catch(e){}
    }
    state.fullscreen=false; fsBtn.setAttribute("aria-pressed","false");
    fsOverlay.classList.remove("active"); fadeNonessential(false);
  }
  function fadeNonessential(v){
    const hdr = document.querySelector("#top header");
    if(v){ mainGrid.classList.add("faded"); hdr.classList.add("faded"); }
    else { mainGrid.classList.remove("faded"); hdr.classList.remove("faded"); }
  }

  async function playAudio(){
    try{ await musicEl.play(); state.music=true; audioBtn.setAttribute("aria-pressed","true"); }catch(e){}
  }
  function pauseAudio(){ musicEl.pause(); state.music=false; audioBtn.setAttribute("aria-pressed","false"); }

  async function focusMode(){ await enterFs(); setDuration(state.durationMin); startTimer(); await playAudio(); }

  // Wire non-timer controls
  focusBtn.addEventListener("click", focusMode);
  fsBtn.addEventListener("click", () => state.fullscreen ? exitFs() : enterFs());
  audioBtn.addEventListener("click", () => state.music ? pauseAudio() : playAudio());
  $("#exitFs").addEventListener("click", () => exitFs());
  packSel.addEventListener("change", async () => { await loadPack(packSel.value); });

  document.addEventListener("keydown", (e) => {
    if(e.key==="f"||e.key==="F") (state.fullscreen ? exitFs() : enterFs());
    if(e.key==="t"||e.key==="T") (state.timer ? stopTimer() : startTimer());
    if(e.key==="m"||e.key==="M") (state.music ? pauseAudio() : playAudio());
    if(e.key==="ArrowLeft") prevQuoteBtn.click();
    if(e.key==="ArrowRight") nextQuoteBtn.click();
    if(e.key==="Escape") exitFs();
  });

  // ---------- Init
  (async function init(){
    const p = params.get("pack"); if(p) packSel.value = p;
    await loadPack(packSel.value);

    const qParam = params.get("q");
    if(qParam){
      const i = parseInt(qParam,10);
      if(Number.isFinite(i)){ qIndex = Math.max(0, Math.min(QUOTES.length-1, i)); renderQuote(); updateQuoteCount(); }
    }
    if(params.get("rotate")==="1") startRotation();
    setDuration(state.durationMin);
    if(params.get("autostart")==="1") focusMode();
  })();

  // Pause rotation when tab hidden
  document.addEventListener("visibilitychange", () => {
    if(document.hidden && rotateInt){ clearInterval(rotateInt); }
    else if(!document.hidden && params.get("rotate")==="1" && !rotateInt){ startRotation(); }
  });
</script>
