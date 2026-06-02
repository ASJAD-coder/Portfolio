// --- High-Fidelity Futuristic Portfolio JavaScript Interactivity ---

document.addEventListener("DOMContentLoaded", () => {
  // Global Element Selectors
  const header = document.querySelector(".header");
  const hamburger = document.getElementById("hamburger");
  const navDrawer = document.getElementById("nav-drawer");
  const drawerLinks = document.querySelectorAll("#nav-drawer a");
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("section");

  // --- 1. Header Scrolled Styling ---
  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  // --- 2. Mobile Menu (Hamburger Drawer) ---
  const toggleMobileMenu = () => {
    hamburger.classList.toggle("active");
    navDrawer.classList.toggle("active");
  };

  hamburger.addEventListener("click", toggleMobileMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navDrawer.classList.remove("active");
    });
  });

  // --- 3. Dynamic Accent Theme Switcher ---
  const themePanel = document.getElementById("theme-panel");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const modeDarkBtn = document.getElementById("mode-dark-btn");
  const modeLightBtn = document.getElementById("mode-light-btn");
  const accentButtons = document.querySelectorAll(".accent-btn");

  const accents = {
    cyan: { hex: "#00abf0", rgb: "0, 171, 240" },
    purple: { hex: "#a855f7", rgb: "168, 85, 247" },
    green: { hex: "#10b981", rgb: "16, 185, 129" },
    orange: { hex: "#f97316", rgb: "249, 115, 22" },
    pink: { hex: "#ec4899", rgb: "236, 72, 153" },
  };

  themeToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themePanel.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!themePanel.contains(e.target) && themePanel.classList.contains("active")) {
      themePanel.classList.remove("active");
    }
  });

  const savedThemeMode = localStorage.getItem("portfolio-theme-mode") || "light";
  const savedAccentColor = localStorage.getItem("portfolio-accent-color") || "cyan";

  const setThemeMode = (mode) => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("portfolio-theme-mode", mode);
    if (mode === "dark") {
      modeDarkBtn.classList.add("active");
      modeLightBtn.classList.remove("active");
    } else {
      modeLightBtn.classList.add("active");
      modeDarkBtn.classList.remove("active");
    }
  };

  const setAccentColor = (accentKey) => {
    const accent = accents[accentKey] || accents.cyan;
    document.documentElement.style.setProperty("--main-color", accent.hex);
    document.documentElement.style.setProperty("--main-color-rgb", accent.rgb);
    localStorage.setItem("portfolio-accent-color", accentKey);

    accentButtons.forEach((btn) => {
      if (btn.getAttribute("data-accent") === accentKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  modeDarkBtn.addEventListener("click", () => setThemeMode("dark"));
  modeLightBtn.addEventListener("click", () => setThemeMode("light"));

  accentButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const accent = btn.getAttribute("data-accent");
      setAccentColor(accent);
    });
  });

  setThemeMode(savedThemeMode);
  setAccentColor(savedAccentColor);

  // --- 4. Interactive HTML Canvas Neural Net Particle Field ---
  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  const numberOfParticles = 70;
  let mouse = { x: null, y: null, radius: 100 };

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  };
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1.5;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.speedY = Math.random() * 0.8 - 0.4;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

      if (mouse.x != null && mouse.y != null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x += forceDirectionX * force * 2;
          this.y += forceDirectionY * force * 2;
        }
      }
    }
    draw() {
      const activeColor = getComputedStyle(document.documentElement).getPropertyValue("--main-color").trim();
      ctx.fillStyle = activeColor || "#00abf0";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = () => {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  };
  initParticles();

  const connectParticles = () => {
    const activeColorRgb = getComputedStyle(document.documentElement).getPropertyValue("--main-color-rgb").trim();
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          let opacity = 1 - distance / 110;
          ctx.strokeStyle = `rgba(${activeColorRgb || "0, 171, 240"}, ${opacity * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  const animateCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateCanvas);
  };
  animateCanvas();

  // --- 5. Custom Typewriter Subtitle Animation ---
  const typewriterText = document.getElementById("typewriter-text");
  const titles = [
    "AI Chat Bots",
    "Web Applications",
    "Mobile App Development",
    "Advanced Web Scraping",
    "Software Bug Diagnostics"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  const type = () => {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typewriterText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typewriterText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  };

  if (typewriterText) {
    type();
  }

  // --- 6. Scroll-spy & Active Section Links ---
  const scrollspyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });

          drawerLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: "-15% 0px -40% 0px",
    }
  );

  sections.forEach((section) => {
    scrollspyObserver.observe(section);
  });

  // --- 7. Animating Skill Bars on Scroll ---
  const skillBars = document.querySelectorAll(".skill-progress-bar");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetPercent = bar.getAttribute("data-percent");
          bar.style.width = targetPercent;
          skillsObserver.unobserve(bar);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  skillBars.forEach((bar) => {
    skillsObserver.observe(bar);
  });

  // --- 8. Dynamic Scroll Reveals (NEW & ANIMATED MOVEMENTS) ---
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally unobserve if we want it to stay revealed
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12, // Element triggers when 12% is visible
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // --- 9. Interactive Projects Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hide");
          card.classList.add("show");
        } else {
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });
    });
  });

  // --- 10. Project Details Modal Control ---
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  const modalImgWrapper = document.getElementById("modal-img-wrapper");
  const modalProjectTags = document.getElementById("modal-project-tags");
  const modalProjectTitle = document.getElementById("modal-project-title");
  const modalProjectDesc = document.getElementById("modal-project-desc");
  const modalProjectTech = document.getElementById("modal-project-tech");
  const modalDemoLink = document.getElementById("modal-demo-link");
  const modalSourceLink = document.getElementById("modal-source-link");

  const projectDatabase = {
    "admin-dashboard": {
      title: "Glassmorphic SaaS Admin Hub",
      tags: ["HTML5", "CSS3", "JavaScript"],
      desc: "An elite administrative console featuring real-time data flow telemetry, analytical widget systems, and local settings nodes. Designed for modern web applications to provide clean metric interpretations.",
      tech: ["HTML5 / CSS Grid", "Custom Property Presets", "Vanilla ES6 JS", "Chart.js Library", "LocalStorage Caching"],
      image: "./webdev_project.png",
      demoLink: "#",
      sourceLink: "https://github.com",
    },
    "ai-chatbot": {
      title: "Cybernetic Conversation Bot",
      tags: ["AI Chatbot", "WebSockets"],
      desc: "A conversational console developed with modern context retention, vector-database linkages, and elegant dialog transitions. Supports custom system instructions and fast responsive pipelines.",
      tech: ["HTML5 / CSS3", "Vanilla Javascript", "WebSockets Protocol", "Mock Agent API", "JSON Data Nodes"],
      image: "./chatbot_project.png",
      demoLink: "#",
      sourceLink: "https://github.com",
    },
    "crypto-wallet": {
      title: "Sleek Cryptographic Mobile Wallet",
      tags: ["App Dev", "UX UI"],
      desc: "High-fidelity mock visual layout detailing intuitive wallet configurations, quick biometric payment verification pathways, real-time token tracking widgets, and sleek page states.",
      tech: ["Figma Design", "Atomic UI Systems", "User Experience Auditing", "Cross-Platform Models", "Interactive Wireframes"],
      image: "./appdev_project.png",
      demoLink: "#",
      sourceLink: "https://github.com",
    },
    "crawler-hub": {
      title: "High-Volume Spider Crawler",
      tags: ["Web Scraping", "Python 3"],
      desc: "A powerful, parallel crawling network that parses complex website structural directories, bypassing protection screens to scrape data and output structured files.",
      tech: ["Python 3", "Scrapy Crawlers", "BeautifulSoup4", "Anti-Shield Proxies", "Excel/JSON Exporters"],
      image: "./scraping_project.png",
      demoLink: "#",
      sourceLink: "https://github.com",
    },
    "bug-fixing": {
      title: "Software Code Diagnostic Tool",
      tags: ["Debugging", "Code Optimization"],
      desc: "An visual inspector utility capable of evaluating code logic errors, tracking cumulative browser shift anomalies, and patching layout inconsistencies across codebases instantly.",
      tech: ["Vanilla JavaScript", "CSS Layout Inspectors", "Logic Tracing Models", "Browser Audit Utilities", "Performance Profilers"],
      image: "./bugfixing_project.png",
      demoLink: "#",
      sourceLink: "https://github.com",
    },
  };

  const openModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    modalImgWrapper.innerHTML = `<img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;" />`;
    modalProjectTitle.textContent = data.title;
    modalProjectDesc.textContent = data.desc;
    
    modalProjectTags.innerHTML = "";
    data.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.className = "project-tag";
      tagSpan.textContent = tag;
      modalProjectTags.appendChild(tagSpan);
    });

    modalProjectTech.innerHTML = "";
    data.tech.forEach((techItem) => {
      const techSpan = document.createElement("span");
      techSpan.className = "modal-tech-pill";
      techSpan.textContent = techItem;
      modalProjectTech.appendChild(techSpan);
    });

    modalDemoLink.href = data.demoLink;
    modalSourceLink.href = data.sourceLink;

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id");
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener("click", closeModal);

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeModal();
    }
  });

  // --- 11. Fully Functional Mock Contact Form ---
  const contactForm = document.getElementById("contact-form");
  const formSubmitBtn = document.getElementById("form-submit-btn");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  const showToast = (message) => {
    toastMessage.textContent = message;
    toast.classList.add("active");

    setTimeout(() => {
      toast.classList.remove("active");
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = document.getElementById("form-name").value.trim();
      const emailVal = document.getElementById("form-email").value.trim();
      
      if (!nameVal || !emailVal) return;

      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = "SENDING...";
      formSubmitBtn.style.opacity = "0.7";

      setTimeout(() => {
        showToast(`Thank you, ${nameVal}! Your message has been sent successfully.`);
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = "SEND TRANSMISSION";
        formSubmitBtn.style.opacity = "";
        contactForm.reset();
      }, 1500);
    });
  }
});
