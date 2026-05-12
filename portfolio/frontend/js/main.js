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

  // Simply observe any element that has the fade-up class
  const observeElements = () => {
    document.querySelectorAll('.fade-up').forEach(el => {
      observer.observe(el);
    });
  };
  observeElements();



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
    if (label) {
      field.addEventListener('focus', () => label.classList.add('filled'));
      field.addEventListener('blur', () => {
        if (!field.value.trim()) label.classList.remove('filled');
      });
      field.addEventListener('input', () => {
        if (field.value.trim()) label.classList.add('filled');
        else label.classList.remove('filled');
      });
    }
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
        // Use localhost:5000 for local development, otherwise relative path for Vercel
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:5000/api/contact' 
          : '/api/contact';

        const response = await fetch(apiUrl, {
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

  // --- BLOG LOGIC ---
  const blogModal = document.getElementById('blogModal');
  const openBlogModalBtn = document.getElementById('openBlogModalBtn');
  const closeBlogModalBtn = document.getElementById('closeBlogModalBtn');
  const blogForm = document.getElementById('blogForm');
  const blogSubmitBtn = document.getElementById('blogSubmitBtn');
  const blogError = document.getElementById('blogError');
  const blogListContainer = document.getElementById('blogListContainer');
  const noBlogsMsg = document.getElementById('noBlogsMsg');

  // Determine API URL (handle localhost vs Vercel)
  const apiUrlBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000/api' 
    : '/api';

  // Toggle modal
  if (openBlogModalBtn && blogModal && closeBlogModalBtn) {
    openBlogModalBtn.addEventListener('click', () => {
      blogModal.classList.remove('hidden');
    });
    closeBlogModalBtn.addEventListener('click', () => {
      blogModal.classList.add('hidden');
      blogForm.reset();
      blogError.style.display = 'none';
    });
    // Close on overlay click
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        blogModal.classList.add('hidden');
        blogForm.reset();
      }
    });
  }

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      console.log('Fetching blogs from:', `${apiUrlBase}/blogs`);
      const response = await fetch(`${apiUrlBase}/blogs`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      
      // Always clear the container first
      blogListContainer.innerHTML = '';
      if (noBlogsMsg) blogListContainer.appendChild(noBlogsMsg);

      if (data.blogs && data.blogs.length > 0) {
        if (noBlogsMsg) noBlogsMsg.style.display = 'none';
        
        data.blogs.forEach(blog => {
          const date = new Date(blog.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });
          
          const blogCard = document.createElement('div');
          blogCard.className = 'blog-card fade-up';
          blogCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span class="blog-date">${date}</span>
              <button class="delete-blog-btn" data-id="${blog.id}" aria-label="Delete Blog" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 1.5rem; padding: 0; line-height: 1;">&times;</button>
            </div>
            <h3 class="blog-title">${blog.title}</h3>
            <div class="blog-content">${blog.content.replace(/\n/g, '<br>')}</div>
          `;
          blogListContainer.insertBefore(blogCard, noBlogsMsg);
          observer.observe(blogCard);
        });
      } else {
        if (noBlogsMsg) noBlogsMsg.style.display = 'block';
        console.log('No blogs found');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  // Submit blog
  if (blogForm) {
    blogForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('blogTitle').value;
      const content = document.getElementById('blogContent').value;
      
      blogSubmitBtn.textContent = 'Publishing...';
      blogSubmitBtn.disabled = true;
      blogError.style.display = 'none';

      try {
        const response = await fetch(`${apiUrlBase}/blogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });

        if (response.ok) {
          blogModal.classList.add('hidden');
          blogForm.reset();
          await fetchBlogs(); // Refresh list
        } else {
          throw new Error('Failed to post');
        }
      } catch (err) {
        blogError.style.display = 'block';
      } finally {
        blogSubmitBtn.textContent = 'Publish Post';
        blogSubmitBtn.disabled = false;
      }
    });
  }

  // Initial fetch
  if (blogListContainer) {
    fetchBlogs();

    // Delegate delete events
    blogListContainer.addEventListener('click', async (e) => {
      const deleteBtn = e.target.closest('.delete-blog-btn');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        console.log('Attempting to delete blog with ID:', id);
        
        if (confirm('Are you sure you want to delete this blog post?')) {
          try {
            const url = `${apiUrlBase}/blogs/${id}`;
            console.log('Delete URL:', url);
            
            const response = await fetch(url, {
              method: 'DELETE'
            });
            
            console.log('Delete response status:', response.status);
            
            if (response.ok) {
              console.log('Blog deleted successfully');
              await fetchBlogs();
            } else {
              const errorData = await response.json().catch(() => ({}));
              console.error('Failed to delete blog:', errorData);
              alert('Failed to delete blog. ' + (errorData.message || ''));
            }
          } catch (err) {
            console.error('Error deleting blog:', err);
            alert('An error occurred while deleting the blog.');
          }
        }
      }
    });
  }

});
