/* ============================================
   PORTFOLIO - script.js
   All interactivity, animations, and effects
   ============================================ */

(function () {
  "use strict";

  // ============================================
  // THEME MANAGEMENT
  // ============================================
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  function setTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    moonIcon.style.display = isDark ? "block" : "none";
    sunIcon.style.display = isDark ? "none" : "block";
  }

  // Initialize theme
  (function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setTheme(isDark);
  })();

  themeToggle.addEventListener("click", function () {
    const isDark = !document.documentElement.classList.contains("dark");
    setTheme(isDark);
  });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById("navbar");

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);

  // ============================================
  // OVERLAY MENU
  // ============================================
  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");
  const overlayMenu = document.getElementById("overlayMenu");
  const overlayBackdrop = document.getElementById("overlayBackdrop");
  const navLinksOverlay = document.querySelectorAll(".nav-link-overlay");

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    overlayMenu.classList.toggle("open", menuOpen);
    menuIcon.style.display = menuOpen ? "none" : "block";
    closeIcon.style.display = menuOpen ? "block" : "none";
    menuToggle.setAttribute("aria-expanded", menuOpen);
    menuToggle.setAttribute("aria-label", menuOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlayBackdrop.addEventListener("click", function () {
    if (menuOpen) toggleMenu();
  });

  navLinksOverlay.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (menuOpen) toggleMenu();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById("scrollProgress");

  function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);

  // ============================================
  // CURSOR GLOW (non-touch only)
  // ============================================
  const cursorGlow = document.getElementById("cursorGlow");

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", function (e) {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  } else {
    cursorGlow.style.display = "none";
  }

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById("backToTop");

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", handleBackToTop);

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ============================================
  // SCROLL REVEAL (IntersectionObserver)
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  initScrollReveal();

  // ============================================
  // ============================================
  // TYPEWRITER EFFECT (looping: type + delete)
  // - Uses existing #typewriterText and .typewriter-cursor in the hero
  // - Adjustable speeds below
  // ============================================
  (function initTypewriter() {
    const el = document.getElementById("typewriterText");
    const cursor = document.querySelector('.typewriter-cursor');
    if (!el) return;

    const words = [
      'Full Stack Developer',
      'UI Enthusiast',
      'MERN Stack Developer',
      'Geospatial Data Analyst',
    ];

    const typingSpeed = 70; // ms per character (adjustable)
    const deletingSpeed = 35; // ms per character when deleting
    const pauseAfter = 1400; // ms pause after a word is typed

    let wordIndex = 0;
    let text = '';
    let isDeleting = false;

    function tick() {
      const current = words[wordIndex % words.length];
      if (isDeleting) {
        text = current.substring(0, text.length - 1);
      } else {
        text = current.substring(0, text.length + 1);
      }

      el.textContent = text;

      let delta = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === current) {
        delta = pauseAfter;
        isDeleting = true;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        wordIndex++;
        delta = 300;
      }

      setTimeout(tick, delta);
    }

    // cursor blink
    if (cursor) cursor.classList.add('blink');
    tick();
  })();

  // ============================================
  // PARTICLES GENERATION
  // ============================================
  (function initParticles() {
    const container = document.getElementById("particles");
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 3 + Math.random() * 6;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animation = "particleFloat " + (5 + Math.random() * 10) + "s ease-in-out infinite";
      p.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(p);
    }
  })();

  // ============================================
  // SKILLS - IntersectionObserver for cards
  // ============================================
  (function initSkillCards() {
    const cards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.getAttribute("data-delay") || "0", 10);

            setTimeout(function () {
              card.classList.add("visible");

              // Animate progress bars
              const fills = card.querySelectorAll(".progress-fill");
              fills.forEach(function (fill, i) {
                setTimeout(function () {
                  fill.style.width = fill.getAttribute("data-width") + "%";
                }, i * 80);
              });
            }, delay * 100);

            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  })();

  // ============================================
  // PROJECTS - Data, Filtering, Rendering
  // ============================================
  const projects = [
    {
      title: "MedLink",
      description: "A comprehensive healthcare platform connecting patients with doctors. Features real-time appointment scheduling, medical records management, and secure communication.",
      category: "Full Stack",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      color: "#088395",
      progress: 72,
      github: "https://github.com/ashwinbaral2/medlink",
      demo: "https://ashwinbaral2.github.io/medlink"
    },
    {
      title: "Quake Alert",
      description: "Earthquake monitoring and alert system with real-time data visualization, push notifications, and interactive seismic maps for disaster preparedness.",
      category: "Full Stack",
      tech: ["Next.js", "Node.js", "MongoDB", "REST API", "Recharts"],
      color: "#E8952C",
      progress: 40,
      github: "https://github.com/ashwinbaral2/QuakeAlert",
      demo: "https://ashwinbaral2.github.io/quake-alert"
    },
    {
      title: "CartMandu",
      description: "Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard for inventory management.",
      category: "Full Stack",
      tech: ["React", "Redux", "Node.js", "MongoDB", "Stripe"],
      color: "#47A248",
      progress: 85,
      github: "https://github.com/ashwinbaral2/Cart-Mandu",
      demo: "https://ashwinbaral2.github.io/cartmandu"
    },
    {
      title: "Bipad-Sewa",
      description: "Disaster management and relief coordination platform enabling real-time reporting, resource allocation, and volunteer coordination during emergencies.",
      category: "Full Stack",
      tech: ["React", "Express", "MongoDB", "GraphQL", "Tailwind"],
      color: "#3178C6",
      progress: 10,
      github: "https://github.com/ashwinbaral2/bipad-sewa",
      demo: "https://ashwinbaral2.github.io/bipad-sewa"
    },
    {
      title: "Portfolio Website",
      description: "A modern animated portfolio built with futuristic design, smooth animations, glassmorphism effects, and full theme switching.",
      category: "Frontend",
      tech: ["HTML", "CSS", "JavaScript", "Vanilla JS"],
      color: "#61DAFB",
      progress: 90,
      github: "https://github.com/ashwinbaral2/my-portfolio",
      demo: "https://ashwinbaral2.github.io/my-portfolio"
    },
    {
      title: "Data Structures Library",
      description: "Comprehensive implementation of data structures and algorithms including linked lists, trees, graphs, and sorting algorithms.",
      category: "C/C++",
      tech: ["C++", "STL", "Algorithms", "OOP"],
      color: "#659AD2",
      progress: 50,
      github: "https://github.com/ashwinbaral2/data-structures-library",
      demo: "https://ashwinbaral2.github.io/data-structures-library"
    },
    {
      title: "Web Scraper",
      description: "Automated web scraping tool with data cleaning, export capabilities, and scheduled extraction from multiple sources.",
      category: "Python",
      tech: ["Python", "BeautifulSoup", "Pandas", "Selenium"],
      color: "#3776AB",
      progress: 70,
      github: "https://github.com/ashwinbaral2/web-scraper",
      demo: "https://ashwinbaral2.github.io/web-scraper"
    },
    {
      title: "Weather Dashboard",
      description: "Mini weather dashboard displaying real-time weather data with interactive charts and location-based forecasting.",
      category: "Mini Projects",
      tech: ["React", "API", "CSS3", "Chart.js"],
      color: "#FF6384",
      progress: 80,
      github: "https://github.com/ashwinbaral2/weather-dashboard",
      demo: "https://ashwinbaral2.github.io/weather-dashboard"
    }
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  const filterButtons = document.getElementById("filterButtons");
  let activeFilter = "All";

  function renderProjects(filter) {
    const filtered = filter === "All" ? projects : projects.filter(function (p) { return p.category === filter; });
    projectsGrid.innerHTML = "";

    filtered.forEach(function (project, i) {
      const card = document.createElement("div");
      card.className = "glass-card project-card";
      card.setAttribute("data-delay", i);
      card.setAttribute("data-progress", project.progress || 0); // <-- new: attach progress

      const techBadges = project.tech.map(function (t) {
        return '<span class="tech-badge">' + t + '</span>';
      }).join("");

      // Build GitHub link only when project.github exists
      var githubLink = '';
      if (project.github) {
        githubLink = '<a href="' + project.github + '" class="link-github ripple" target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository for ' + project.title + '">View on GitHub</a>';
      }
      // Build Live Demo link only when project.demo exists
      var demoLink = '';
      if (project.demo) {
        demoLink = '<a href="' + project.demo + '" class="link-demo ripple" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ' + project.title + '">' +
                   '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>' +
                   'Live Demo</a>';
      }

      card.innerHTML =
        '<div class="project-accent-bar" style="background-color:' + project.color + '"></div>' +
        '<div class="project-glow" style="box-shadow:inset 0 0 0 2px ' + project.color + '40, 0 0 20px ' + project.color + '15" aria-hidden="true"></div>' +
        '<div class="project-body">' +
          '<span class="project-category" style="background-color:' + project.color + '15;color:' + project.color + '">' + project.category + '</span>' +
          '<h3>' + project.title + '</h3>' +
          '<div class="project-status" data-progress="' + (project.progress || 0) + '">' +
            '<div class="progress-track"><div class="progress-fill" aria-hidden="true"></div></div>' +
            '<div class="progress-label">0% Complete</div>' +
          '</div>' +
          '<p>' + project.description + '</p>' +
          '<div class="tech-badges">' + techBadges + '</div>' +
          '<div class="project-links">' +
            demoLink +
            githubLink +
          '</div>' +
        '</div>';

      projectsGrid.appendChild(card);
    });

    // Observe new cards
    const newCards = projectsGrid.querySelectorAll(".project-card");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              card.classList.add("visible");
            }, delay * 100);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    newCards.forEach(function (card) {
      observer.observe(card);
    });
  }

  // Filter buttons
  filterButtons.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    const filter = btn.getAttribute("data-filter");
    activeFilter = filter;

    // Update active state
    filterButtons.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === filter);
    });

    renderProjects(filter);
  });

  // Initial render
  renderProjects("All");

  // ============================================
  // COURSES (TIMELINE) - IntersectionObserver
  // ============================================
  (function initTimeline() {
    const items = document.querySelectorAll(".timeline-item");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const item = entry.target;
            const delay = parseInt(item.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              item.classList.add("visible");
            }, delay * 150);
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  })();

  // ============================================
  // EDUCATION - IntersectionObserver
  // ============================================
  (function initEducation() {
    const cards = document.querySelectorAll(".education-card");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              card.classList.add("visible");
            }, delay * 200);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  })();

  // ============================================
  // INTERESTS - IntersectionObserver + hover glow
  // ============================================
  (function initInterests() {
    const cards = document.querySelectorAll(".interest-card");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              card.classList.add("visible");
            }, delay * 100);
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(function (card) {
      observer.observe(card);

      // Hover glow on icon
      const iconEl = card.querySelector(".interest-icon");
      const color = card.getAttribute("data-color");

      if (iconEl && color) {
        card.addEventListener("mouseenter", function () {
          iconEl.style.boxShadow = "0 0 20px " + color + "30";
        });
        card.addEventListener("mouseleave", function () {
          iconEl.style.boxShadow = "none";
        });
      }
    });
  })();

  // ============================================
  // CONTACT - IntersectionObserver + Form validation
  // ============================================
  (function initContact() {
    // Animate contact link cards and form
    const linkCards = document.querySelectorAll(".contact-link-card");
    const formWrapper = document.getElementById("contactFormWrapper");

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              el.classList.add("visible");
            }, delay * 100);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    linkCards.forEach(function (card) {
      observer.observe(card);
    });

    if (formWrapper) {
      observer.observe(formWrapper);
    }

    // Form validation
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");

    function clearErrors() {
      nameError.classList.remove("show");
      emailError.classList.remove("show");
      messageError.classList.remove("show");
      nameInput.classList.remove("error");
      emailInput.classList.remove("error");
      messageInput.classList.remove("error");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      let valid = true;

      if (!nameInput.value.trim()) {
        nameError.querySelector("span").textContent = "Name is required";
        nameError.classList.add("show");
        nameInput.classList.add("error");
        valid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.querySelector("span").textContent = "Email is required";
        emailError.classList.add("show");
        emailInput.classList.add("error");
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.querySelector("span").textContent = "Please enter a valid email";
        emailError.classList.add("show");
        emailInput.classList.add("error");
        valid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.querySelector("span").textContent = "Message is required";
        messageError.classList.add("show");
        messageInput.classList.add("error");
        valid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.querySelector("span").textContent = "Message must be at least 10 characters";
        messageError.classList.add("show");
        messageInput.classList.add("error");
        valid = false;
      }

      if (valid) {
        successMessage.classList.add("show");
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        setTimeout(function () {
          successMessage.classList.remove("show");
        }, 4000);
      }
    });
  })();

  // ============================================
  // FOOTER YEAR
  // ============================================
  document.getElementById("footerYear").textContent =
    "\u00A9 " + new Date().getFullYear() + " All rights reserved.";

  // ============================================
  // SMOOTH SCROLL for logo link
  // ============================================
  document.querySelector(".navbar .logo").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });

  // Hero contact button smooth scroll
  // Only treat an explicit hero contact link (href="#contact") as the contact button.
  var heroContactBtn = document.querySelector('.hero-buttons a[href="#contact"]');
  if (heroContactBtn) {
    heroContactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Add this function near other helper functions (inside the same IIFE):
  function updateProjectProgress() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      const progress = parseInt(card.getAttribute('data-progress') || '0', 10);
      const fill = card.querySelector('.project-status .progress-fill');
      const label = card.querySelector('.project-status .progress-label');

      if (fill) {
        // start from 0 to enable transition when card is inserted/visible
        fill.style.width = '0%';
        // small delay so transition applies after insertion
        setTimeout(function () {
          fill.style.width = Math.max(0, Math.min(100, progress)) + '%';
        }, 50);
      }

      if (label) {
        if (progress >= 100) {
          label.textContent = 'Completed';
          card.classList.add('completed');
        } else {
          label.textContent = progress + '% Complete';
          card.classList.remove('completed');
        }
      }
    });
  }

  // Ensure this is invoked after renderProjects() completes its DOM insertion.
  // At the end of renderProjects(), add:
  updateProjectProgress();

})();
