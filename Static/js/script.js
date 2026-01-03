const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// Hamburger menu toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Generic dropdown functionality
function initializeDropdown(dropdownLinkId, dropdownMenuId) {
  const dropdownLink = document.getElementById(dropdownLinkId);
  const dropdownMenu = document.getElementById(dropdownMenuId);

  if (!dropdownLink || !dropdownMenu) return;

  const dropdownLi = dropdownLink.parentElement;

  if (window.innerWidth < 992) {
    // Mobile: use click to toggle
    dropdownLink.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle("show");
      dropdownLink.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
    });

    // Close dropdown when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (!dropdownLi.contains(e.target)) {
        dropdownMenu.classList.remove("show");
        dropdownLink.setAttribute("aria-expanded", "false");
      }
    });
  } else {
    // Desktop: hover behavior with delay
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

    dropdownMenu.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        dropdownMenu.classList.remove("show");
        dropdownLink.setAttribute("aria-expanded", "false");
      }, 200);
    });
  }

  // Close dropdown when clicking any dropdown item
  dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
      dropdownLink.setAttribute("aria-expanded", "false");
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ✅ Automatically initialize all dropdowns
document.querySelectorAll('[id$="Link"]').forEach(link => {
  const dropdownId = link.id.replace('Link', 'Dropdown');
  initializeDropdown(link.id, dropdownId);
});

// ✅ Close hamburger menu when clicking on any nav link (that’s not a dropdown trigger)
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (!link.id.endsWith("Link")) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});
