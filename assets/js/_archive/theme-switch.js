// assets/js/theme-switch.js
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

if (toggle) {
    toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });

    // persist theme
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
}
