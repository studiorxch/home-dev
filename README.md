# StudioRich Site Architecture — October 2025

## 🧠 Core Structure

- **Platform:** Jekyll + Sass Tokens System
- **Focus:** Simplified layout + unified includes + persistent theme toggle

---

## 📁 Key Directories

### `_layouts/`

| File           | Purpose                           | Status                       |
| -------------- | --------------------------------- | ---------------------------- |
| `default.html` | Base layout wrapper for all pages | ✅ Active                    |
| `post.html`    | Blog article layout               | ✅ Active                    |
| `track.html`   | Music library entry layout        | ✅ Active                    |
| `station.html` | Subway station page layout        | ✅ Active                    |
| `404.html`     | Not found page                    | ✅ Active                    |
| `events.html`  | Archived (no active use)          | 🗃️ Moved to `/archive--bak/` |

---

### `_includes/`

Flattened for clarity.  
| File | Role |
|------|------|
| `head.html` | Meta + links (merged head/meta/head-links) |
| `sidebar.html` | Fixed left navigation (home, library, map, blog) |
| `footer.html` | Social links + subscribe form + theme toggle |
| `hero.html` | Reusable hero image section (used for stations) |
| `schedule.html` | Twitch/Events section include |
| `station-visualizer.html` | Audio-reactive visualizer |
| `reading-room-hero.html` | HollowBookCo hero include |
| `player-src.html` | Music player source |
| `share-buttons.html` | Blog + track share buttons |
| `event-card.html` | Events card module |
| `youtube-carousel.html` | Video reel section |

---

## 🧩 Includes Archived

Stored in `_includes/archive--bak/`  
→ Auto gitignored and safe for deletion after 30 days.

---

## 🧭 Next Steps

1. ✅ Verify **homepage render** using `layout: default`
2. ✅ Confirm sidebar + footer visibility + theme persistence
3. 🔄 Re-enable `station.html` and `track.html`
4. 🧠 Merge `event-card.html` + `schedule.html` into `/events/` page
5. 🌆 Add `hero.html` and `station-visualizer.html` for stations
6. 🧹 Final purge of `/archive--bak/` folders (after stability)

---

**Maintainer:** Mr. Richie  
**Studio:** StudioRich  
**Location:** Brooklyn, NY  
**Last Updated:** October 8, 2025
