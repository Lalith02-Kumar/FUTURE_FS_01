document.addEventListener('DOMContentLoaded', () => {

  // --- SPOTLIGHT ---
  const spotlight = document.createElement('div');
  spotlight.style.cssText = [
    'position:fixed',
    'width:1600px',
    'height:1600px',
    'border-radius:50%',
    'pointer-events:none',
    'z-index:0',
    'transform:translate(-50%,-50%)',
    'left:0',
    'top:0',
    'transition:none',
    'will-change: transform',
    'background:radial-gradient(circle, rgba(140,110,235,0.22) 0%, rgba(160,130,245,0.12) 35%, rgba(190,170,255,0.05) 60%, transparent 75%)',
  ].join(';');
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 4;
  let mouseY = window.innerHeight / 3;
  let spotX = mouseX;
  let spotY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateSpotlight = () => {
    spotX += (mouseX - spotX) * 0.04;
    spotY += (mouseY - spotY) * 0.04;
    spotlight.style.transform = `translate(calc(-50% + ${spotX}px), calc(-50% + ${spotY}px))`;
    requestAnimationFrame(animateSpotlight);
  };
  animateSpotlight();

  // --- SCROLL INDICATOR HIDE ---
  const si = document.getElementById('scrollIndicator');
  if (si) {
    window.addEventListener('scroll', () => {
      si.style.opacity = window.scrollY > 60 ? '0' : '1';
    });
    si.addEventListener('click', () => {
      const next = document.querySelector('#about')
        || document.querySelectorAll('section')[1];
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // IntersectionObserver with stagger
  const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        delay += 150;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const fadeSelectors = [
    '.hero-sub',
    '.hero-heading',
    '.hero-bio',
    '.hero-buttons',
    '.section-label',
    '.bio',
    '.skills-group',
    '.academic-info',
    '.connect-link',
    '.cv-link',
    '.work-item',
    '.profiles-intro',
    '.profiles-row',
    '.contact-intro',
    '.contact-form',
    '.contact-info'
  ];

  document.querySelectorAll(fadeSelectors.join(', ')).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });



  // Hamburger toggle & close on link
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });

  // Floating labels
  document.querySelectorAll('.form-field input, .form-field textarea').forEach(field => {
    const label = field.parentElement.querySelector('label');
    field.addEventListener('focus', () => label.classList.add('filled'));
    field.addEventListener('blur', () => {
      if (!field.value.trim()) label.classList.remove('filled');
    });
    field.addEventListener('input', () => {
      if (field.value.trim()) label.classList.add('filled');
      else label.classList.remove('filled');
    });
  });

  // Contact form fetch
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      formError.style.display = 'none';

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
          form.style.display = 'none';
          formSuccess.style.display = 'block';
        } else {
          throw new Error('Failed to send');
        }
      } catch (err) {
        formError.style.display = 'block';
        submitBtn.textContent = 'Send message \u2192';
        submitBtn.disabled = false;
      }
    });
  }



  /* Show social bar only after scrolling past hero */
  const socialBar = document.getElementById('socialBar');
  if (socialBar) {
    socialBar.classList.add('hidden');
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        socialBar.classList.remove('hidden');
      } else {
        socialBar.classList.add('hidden');
      }
    });
  }

});
