document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('nav a');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      scrollTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.fabric-card, .product-card, .production-card, .sector-card, .feature-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    counterObserver.observe(stat);
  });

  function animateCounter(element) {
    const target = element.getAttribute('data-target');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        element.textContent = formatNumber(Math.floor(current));
      }
    }, 16);
  }

  function formatNumber(num) {
    const text = num.toString();
    if (text.includes('+')) return text;
    if (text.includes('%')) return text;
    return num >= 1000 ? num.toLocaleString() : num;
  }

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      
      alert(form.getAttribute('data-success-message') || 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      
      form.reset();
    });
  }
});
