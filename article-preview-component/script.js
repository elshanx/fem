const toggle = document.querySelector(".share__toggle");
const menu = document.getElementById("share-menu");

function setOpen(open) {
  toggle.setAttribute("aria-expanded", open);
  menu.hidden = !open;
}

toggle.addEventListener("click", () => setOpen(menu.hidden));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !menu.hidden) {
    setOpen(false);
    toggle.focus();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".share")) setOpen(false);
});
