document.addEventListener('DOMContentLoaded', () => {
  // Initialize Accordion Interactive Toggles for Hymns
  const accordionButtons = document.querySelectorAll('.hymn-header-btn');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('.hymn-container');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Toggle active class
      container.classList.toggle('active');
      
      // Update ARIA attribute
      button.setAttribute('aria-expanded', !isExpanded);
      
      // Update Accordion Icon (+ or -)
      const icon = button.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = isExpanded ? '+' : '−';
      }
    });
  });

  // Automatically expand hymn accordion when jumping via a hyperlink
  const hymnLinks = document.querySelectorAll('.hymn-link');
  hymnLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const targetContainer = document.querySelector(targetId);
      
      if (targetContainer && targetContainer.classList.contains('hymn-container')) {
        // Expand the container if it's collapsed
        if (!targetContainer.classList.contains('active')) {
          targetContainer.classList.add('active');
          const button = targetContainer.querySelector('.hymn-header-btn');
          if (button) {
            button.setAttribute('aria-expanded', 'true');
            const icon = button.querySelector('.accordion-icon');
            if (icon) {
              icon.textContent = '−';
            }
          }
        }
      }
    });
  });
  
  // Dynamic Scroll Indicator Header Interaction (Premium effect)
  const header = document.querySelector('.screen-nav');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
        header.style.background = 'rgba(250, 248, 245, 0.95)';
      } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(250, 248, 245, 0.85)';
      }
    });
  }
});
