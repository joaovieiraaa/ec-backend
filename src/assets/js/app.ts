import { MetisMenu } from "metismenujs";

function initMetisMenu() {
  const menu = document.querySelector("#side-menu");
  if (menu) new MetisMenu("#side-menu");
}

function initLeftMenuCollapse() {
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
      !container.contains(e.target) &&
      !e.target.closest("div.vertical-menu")
    ) {
      document.body.classList.remove("sidebar-enable");
    }
  });
}

function initActiveMenu() {
  const sidebarLinks = document.querySelectorAll("#sidebar-menu a");
  const pageUrl = window.location.href.split(/[?#]/)[0];

  sidebarLinks.forEach(function (link: any) {
    if (link.href === pageUrl) {
      link.classList.add("active");
      link.parentElement.classList.add("mm-active");
      link.parentElement.parentElement.classList.add("mm-show");
      link.parentElement.parentElement.previousElementSibling.classList.add(
        "mm-active"
      );
      link.parentElement.parentElement.parentElement.classList.add("mm-active");
      link.parentElement.parentElement.parentElement.parentElement.classList.add(
        "mm-show"
      );
      const toppos = link.offsetTop;
      setTimeout(function () {
        document.querySelector(".simplebar-content-wrapper").scrollTop =
          toppos - window.innerHeight / 2;
      }, 500);
    }
  });
}

function initDropdownMenu() {
  const dropdownToggleLinks = document.querySelectorAll(
    ".dropdown-menu a.dropdown-toggle"
  );

  dropdownToggleLinks.forEach(function (link: any) {
    link.addEventListener("click", function (e: any) {
      e.preventDefault();
      const subMenu = this.nextElementSibling;

      if (!subMenu.classList.contains("show")) {
        const openSubMenus = document.querySelectorAll(".dropdown-menu .show");
        openSubMenus.forEach(function (menu: any) {
          menu.classList.remove("show");
        });
      }

      subMenu.classList.toggle("show");
    });
  });
}

function init() {
  initMetisMenu();
  initLeftMenuCollapse();
  initActiveMenu();
  initDropdownMenu();
}

init();
