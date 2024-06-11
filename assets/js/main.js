(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Funcionalidad de bolas de colores
  const colors = [
    'rgba(240, 248, 255, 0.5)',  // Alice azul
    'rgba(230, 230, 250, 0.5)',  // Lavanda
    'rgba(176, 224, 230, 0.5)',  // Azul pálido
    'rgba(173, 216, 230, 0.5)',  // Azul claro
    'rgba(135, 206, 250, 0.5)',  // Cielo azul claro
    'rgba(135, 206, 235, 0.5)',  // Cielo azul
    'rgba(0, 191, 255, 0.5)',    // Deepskyblue
    'rgba(176, 196, 222, 0.5)',  // Azul claro (Light Steel Blue)
    'rgba(30, 144, 255, 0.5)',   // Dodgerblue
    'rgba(100, 149, 237, 0.5)',  // Azul aciano
    'rgba(70, 130, 180, 0.5)',   // Azul acero
    'rgba(95, 158, 160, 0.5)',   // Cadete azul
    'rgba(123, 104, 238, 0.5)',  // Medio pizarra azul
    'rgba(106, 90, 205, 0.5)',   // Pizarra azul
    'rgba(72, 61, 139, 0.5)',    // Azul oscuro
    'rgba(65, 105, 225, 0.5)',   // Azul real
    'rgba(0, 0, 255, 0.5)',      // Azul
    'rgba(0, 0, 205, 0.5)',      // Azul medio
    'rgba(0, 0, 139, 0.5)',      // Azul oscuro (Dark Blue)
    'rgba(0, 0, 128, 0.5)',      // Armada
    'rgba(25, 25, 112, 0.5)',    // Medianoche azul
    'rgba(138, 43, 226, 0.5)',   // Violeta Azul
    'rgba(75, 0, 130, 0.5)'      // Índigo
  ];

  function createBall() {
    const ball = document.createElement('div');
    const size = Math.random() * 100 + 50; // Tamaño entre 50 y 150px
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
    // Restringir la posición top entre el 10% y el 90% de la altura de la ventana
    const windowHeight = window.innerHeight;
    const minTop = windowHeight * 0.1; // 10% de la altura de la ventana
    const maxTop = windowHeight * 0.95 - size; // 90% de la altura de la ventana menos el tamaño de la bola
    ball.style.top = `${Math.random() * (maxTop - minTop) + minTop}px`;
  
    // Restringir la posición left entre el 10% y el 90% del ancho de la ventana
    const windowWidth = window.innerWidth;
    const minLeft = windowWidth * 0.1; // 10% del ancho de la ventana
    const maxLeft = windowWidth * 1 - size; // 90% del ancho de la ventana menos el tamaño de la bola
    ball.style.left = `${Math.random() * (maxLeft - minLeft) + minLeft}px`;
  
    // Restringir la posición bottom entre el 10% y el 90% de la altura de la ventana
    const minBottom = windowHeight * 0.1; // 10% de la altura de la ventana
    const maxBottom = windowHeight * 0.90 - size; // 90% de la altura de la ventana menos el tamaño de la bola
    ball.style.bottom = `${Math.random() * (maxBottom - minBottom) + minBottom}px`;
  
    // Restringir la posición right entre el 10% y el 90% del ancho de la ventana
    const minRight = windowWidth * 0.1; // 10% del ancho de la ventana
    const maxRight = windowWidth * 0.90 - size; // 90% del ancho de la ventana menos el tamaño de la bola
    ball.style.right = `${Math.random() * (maxRight - minRight) + minRight}px`;
  
    ball.classList.add('ball');
    document.body.appendChild(ball);
  
    // Elimina la bola después de 10 segundos
    setTimeout(() => {
      ball.remove();
    }, 10000);
  }
  
  // Crear bolas de colores continuamente
  setInterval(createBall, 800);
  

})();
