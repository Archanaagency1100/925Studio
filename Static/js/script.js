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
    // Desktop: use hover with delay to prevent flickering
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

  // Close dropdown when clicking on any dropdown item
  dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
      dropdownLink.setAttribute("aria-expanded", "false");
    });
  });
}

// Initialize services dropdown
initializeDropdown("servicesLink", "servicesDropdown");

// Close hamburger menu when clicking on any navigation link (except services dropdown)
document.querySelectorAll('#navMenu .nav-link:not(#servicesLink)').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close hamburger menu when clicking on any service item
document.querySelectorAll('#servicesDropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

