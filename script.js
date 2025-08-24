// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or respect OS preference
  if (
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("theme"))
  ) {
    document.body.classList.add("dark-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Toggle hamburger icon
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.remove("fa-times");
      hamburger.querySelector("i").classList.add("fa-bars");
    });
  });

  // Sticky navbar on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll animations
  function checkScroll() {
    const elements = document.querySelectorAll(".fade-in, .zoom-in");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.animationPlayState = "running";
      }
    });

    // Show/hide scroll to top button
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", checkScroll);
  // Initial check in case elements are already in view
  checkScroll();

  // Scroll to top functionality
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Here you would typically send the email to your server
      console.log("Newsletter subscription:", email);

      // Show success message (in a real app, you'd want something more user-friendly)
      alert("Thank you for subscribing to our newsletter!");
      this.reset();
    });
  }

  // Add intersection observer for more advanced animations
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in, .zoom-in").forEach((item) => {
      observer.observe(item);
    });
  }

  // Pricing plan hover effect
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(-10px)";
      } else {
        this.style.transform = "scale(1.05) translateY(-5px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(0)";
      } else {
        this.style.transform = "scale(1.05)";
      }
    });
  });
});
