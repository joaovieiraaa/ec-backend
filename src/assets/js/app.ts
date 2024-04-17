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
  initActiveMenu();
  initDropdownMenu();
}

init();
