(function () {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".nav-drawer");
  if (!toggle || !drawer) return;

  function closeDrawer() {
    drawer.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openDrawer() {
    drawer.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (drawer.classList.contains("open")) closeDrawer();
    else openDrawer();
  });

  drawer.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeDrawer());
  });

  document.addEventListener("click", (e) => {
    if (!drawer.classList.contains("open")) return;
    if (drawer.contains(e.target) || toggle.contains(e.target)) return;
    closeDrawer();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeDrawer();
  });
})();