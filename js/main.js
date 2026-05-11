// 国学天师 · 自学笔记
document.addEventListener('DOMContentLoaded', () => {
  // Mobile sidebar toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => { sidebar.classList.toggle('open'); });
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Collapsible nav sections
  document.querySelectorAll('.nav-section-title').forEach(title => {
    title.addEventListener('click', () => {
      const items = title.nextElementSibling;
      const arrow = title.querySelector('.arrow');
      if (items && items.classList.contains('nav-items')) {
        items.classList.toggle('collapsed');
        if (arrow) arrow.classList.toggle('collapsed');
      }
    });
    // Expand if child active
    const items = title.nextElementSibling;
    if (items && items.querySelector('.active')) {
      const arrow = title.querySelector('.arrow');
      if (arrow) arrow.classList.remove('collapsed');
      if (items) items.classList.remove('collapsed');
    }
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.nav-item a').forEach(a => {
        const li = a.closest('.nav-item');
        li.style.display = (!q || a.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
      if (q) {
        document.querySelectorAll('.nav-items.collapsed').forEach(el => {
          el.classList.remove('collapsed');
          const arrow = el.previousElementSibling.querySelector('.arrow');
          if (arrow) arrow.classList.remove('collapsed');
        });
      }
    });
  }

  // Highlight current page
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item a').forEach(a => {
    if (currentPath.endsWith(a.getAttribute('href'))) a.classList.add('active');
  });

  // Back to top
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => { backBtn.classList.toggle('visible', window.scrollY > 400); });
    backBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // TOC smooth scroll
  document.querySelectorAll('.toc a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        target.style.transition = 'background 0.3s';
        target.style.background = 'rgba(201, 168, 76, 0.1)';
        setTimeout(() => { target.style.background = ''; }, 1500);
      }
    });
  });

  // All hash links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (id) {
        const target = document.getElementById(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });
});
