
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });


  document.body.style.opacity = '1';
});


document.querySelectorAll('a.nav-link, .btn[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      const headerHeight = document.getElementById('mainNav').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      
      setTimeout(() => {
        updateActiveNavLink();
      }, 1000);
    }
  });
});


const backToTopButton = document.getElementById('btn-back-to-top');

window.addEventListener('scroll', () => {
  
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }

  
  updateActiveNavLink();
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const headerHeight = document.getElementById('mainNav').offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(id)) {
          link.classList.add('active');
        }
      });
    }
  });
}


let lastScroll = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});


const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
});