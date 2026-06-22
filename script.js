const tabs = document.querySelectorAll(".day-tab");
const details = document.querySelectorAll(".day-detail");

function activateDay(dayId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.day === dayId);
    tab.setAttribute("aria-selected", String(tab.dataset.day === dayId));
  });

  details.forEach((detail) => {
    detail.classList.toggle("active", detail.id === dayId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateDay(tab.dataset.day));
});

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
