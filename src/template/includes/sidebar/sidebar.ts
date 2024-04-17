import { MetisMenu } from "metismenujs";

export function init() {
  initMetisMenu();

  const verticalMenu = document.getElementById("vertical-menu-btn");

  if (verticalMenu) {
    verticalMenu.addEventListener("click", function (event: any) {
      event.preventDefault();
      document.body.classList.toggle("sidebar-enable");
      if (window.innerWidth >= 992) {
        document.body.classList.toggle("vertical-collpsed");
      } else {
        document.body.classList.remove("vertical-collpsed");
      }
    });
  }

  document.body.addEventListener("click", function (e: any) {
    const container = document.getElementById("vertical-menu-btn");
    if (
      container &&
      !container.contains(e.target) &&
      !e.target.closest("div.vertical-menu")
    ) {
      document.body.classList.remove("sidebar-enable");
    }
  });
}

function initMetisMenu() {
  const menu = document.querySelector("#side-menu");
  if (menu) new MetisMenu("#side-menu") as any;
}
