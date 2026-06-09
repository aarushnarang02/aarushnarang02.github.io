// Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new URLSearchParams();
            formData.append("name", form.name.value);
            formData.append("email", form.email.value);
            formData.append("message", form.message.value);

            const scriptURL = "https://script.google.com/macros/s/AKfycbwnHDPAnXdZzsRxSKnhfTz3Aw3KVlV3EFYm5AmKEmYUYifft_qYz-2AtRIgLX2egz8B/exec";

            fetch(scriptURL, {
                method: "POST",
                body: formData
            })
                .then(res => res.text())
                .then(response => {
                    status.textContent = "✅ Message sent successfully!";
                    status.style.color = "green";
                    form.reset();
                })
                .catch(error => {
                    status.textContent = "❌ Failed to send. Try again.";
                    status.style.color = "red";

                    console.error("Error:", error);
                });
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector("nav ul");
    const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("clicked");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("clicked");
            });
        });
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hero typing effect (rotates through roles)
    const typedEl = document.getElementById("typed-roles");
    if (typedEl) {
        const roles = [
            "production AI systems.",
            "Gen AI copilots.",
            "ML pipelines.",
            "data-driven solutions."
        ];
        if (prefersReducedMotion) {
            typedEl.textContent = roles[0];
            const cursor = document.getElementById("type-cursor");
            if (cursor) cursor.style.display = "none";
        } else {
            let roleIndex = 0, charIndex = 0, deleting = false;
            const type = () => {
                const current = roles[roleIndex];
                typedEl.textContent = current.slice(0, charIndex);
                if (!deleting && charIndex < current.length) {
                    charIndex++;
                    setTimeout(type, 70);
                } else if (!deleting && charIndex === current.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                } else if (deleting && charIndex > 0) {
                    charIndex--;
                    setTimeout(type, 35);
                } else {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 350);
                }
            };
            type();
        }
    }

    // Active nav link highlighting on scroll
    const sectionIds = ["home", "about", "experience", "projects", "contact"];
    const navAnchors = {};
    document.querySelectorAll('nav ul li a').forEach(a => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("#")) navAnchors[href.slice(1)] = a;
    });
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Object.values(navAnchors).forEach(a => a.classList.remove("active"));
                const active = navAnchors[entry.target.id];
                if (active) active.classList.add("active");
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });

    // Scroll-triggered animations (Anima-style)
    if (prefersReducedMotion) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe section headings, about container, project cards, contact container, footer
    document.querySelectorAll(".section h2").forEach((el) => observer.observe(el));
    const aboutContainer = document.querySelector(".about-container");
    if (aboutContainer) observer.observe(aboutContainer);
    document.querySelectorAll(".project-card").forEach((el) => observer.observe(el));
    const contactContainer = document.querySelector(".contact-container");
    if (contactContainer) observer.observe(contactContainer);
    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    // Elements with animate-on-scroll class (used in HTML)
    document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right").forEach((el) => observer.observe(el));
});
