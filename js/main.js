// 国学天师 · 自学笔记
// Navigation & Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // ===== Sidebar Toggle (Mobile) =====
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar on click outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          !sidebar.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ===== Collapsible Nav Sections =====
  document.querySelectorAll('.nav-section-title').forEach(title => {
    title.addEventListener('click', () => {
      const items = title.nextElementSibling;
      const arrow = title.querySelector('.arrow');
      if (items && items.classList.contains('nav-items')) {
        items.classList.toggle('collapsed');
        if (arrow) arrow.classList.toggle('collapsed');
      }
    });

    // Expand if any child is active
    const items = title.nextElementSibling;
    if (items && items.querySelector('.active')) {
      const arrow = title.querySelector('.arrow');
      if (arrow) arrow.classList.remove('collapsed');
      if (items) items.classList.remove('collapsed');
    }
  });

  // ===== Search =====
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('.nav-item a');

      items.forEach(a => {
        const li = a.closest('.nav-item');
        const text = a.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });

      // Expand all visible sections when searching
      if (q) {
        document.querySelectorAll('.nav-items.collapsed').forEach(el => {
          el.classList.remove('collapsed');
          const arrow = el.previousElementSibling?.querySelector('.arrow');
          if (arrow) arrow.classList.remove('collapsed');
        });
      }
    });
  }

  // ===== Auto-highlight current page =====
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      a.classList.add('active');
    }
  });

  // ===== Fade in on page load =====
  document.querySelector('.article')?.classList.add('visible');
});
