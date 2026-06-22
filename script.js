const tabs = document.querySelectorAll(".day-tab");
const details = document.querySelectorAll(".day-detail");
const navLinks = document.querySelectorAll(".navlinks a, .quick-nav a");
const sectionIds = ["route", "days", "budget", "prep"];

function activateDay(dayId, updateHash = true) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.day === dayId);
    tab.setAttribute("aria-selected", String(tab.dataset.day === dayId));
  });

  details.forEach((detail) => {
    detail.classList.toggle("active", detail.id === dayId);
  });

  if (updateHash) {
    history.replaceState(null, "", `#${dayId}`);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateDay(tab.dataset.day));
});

function activateFromHash() {
  const id = location.hash.replace("#", "");
  if (id && document.getElementById(id)?.classList.contains("day-detail")) {
    activateDay(id, false);
  }
}

activateFromHash();
window.addEventListener("hashchange", activateFromHash);

function updateActiveNav() {
  const scrollPosition = window.scrollY + 130;
  let activeId = sectionIds[0];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPosition) {
      activeId = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });

const savedChecks = JSON.parse(localStorage.getItem("tmbChecklist") || "{}");
document.querySelectorAll("[data-check]").forEach((box) => {
  box.checked = Boolean(savedChecks[box.dataset.check]);
  box.addEventListener("change", () => {
    savedChecks[box.dataset.check] = box.checked;
    localStorage.setItem("tmbChecklist", JSON.stringify(savedChecks));
  });
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
