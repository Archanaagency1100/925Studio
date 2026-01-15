// Reusable function to load external HTML and activate inline scripts if any
function loadHTML(elementId, filePath, callback) {
  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${filePath}`);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(elementId);
      container.innerHTML = data;

      // Execute callback (like initializing nav)
      if (typeof callback === "function") callback();
    })
    .catch(err => console.error(err));
}

// ✅ Navbar JS logic
function initializeNavbar() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!navToggle || !navMenu) return;

  // Hamburger toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Dropdown initializer
  function initializeDropdown(dropdownLinkId, dropdownMenuId) {
    const dropdownLink = document.getElementById(dropdownLinkId);
    const dropdownMenu = document.getElementById(dropdownMenuId);

    if (!dropdownLink || !dropdownMenu) return;
    const dropdownLi = dropdownLink.parentElement;

    if (window.innerWidth < 992) {
      // Mobile click toggle
      dropdownLink.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
        dropdownLink.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
      });

      document.addEventListener("click", (e) => {
        if (!dropdownLi.contains(e.target)) {
          dropdownMenu.classList.remove("show");
          dropdownLink.setAttribute("aria-expanded", "false");
        }
      });
    } else {
      // Desktop hover behavior
      let timeout;
      dropdownLi.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        dropdownMenu.classList.add("show");
        dropdownLink.setAttribute("aria-expanded", "true");
      });

      dropdownLi.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
          dropdownMenu.classList.remove("show");
          dropdownLink.setAttribute("aria-expanded", "false");
        }, 200);
      });
    }

    // Close dropdown when clicking a dropdown item
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        dropdownLink.setAttribute("aria-expanded", "false");
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Initialize all dropdowns
  document.querySelectorAll('[id$="Link"]').forEach(link => {
    const dropdownId = link.id.replace('Link', 'Dropdown');
    initializeDropdown(link.id, dropdownId);
  });

  // Close hamburger menu when any nav link (non-dropdown) is clicked
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (!link.id.endsWith("Link")) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

// ✅ Load header & footer
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "header.html", initializeNavbar);
  loadHTML("footer", "footer.html");
});
