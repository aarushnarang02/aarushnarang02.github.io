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

    // Scroll-triggered animations (Anima-style)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    // Project cards: trigger bounce as you scroll down into the section (slightly earlier)
    const projectCardOptions = {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.08
    };
    const projectCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, projectCardOptions);

    // Observe section headings, about container, contact container, footer
    document.querySelectorAll(".section h2").forEach((el) => observer.observe(el));
    const aboutContainer = document.querySelector(".about-container");
    if (aboutContainer) observer.observe(aboutContainer);
    document.querySelectorAll(".project-card").forEach((el) => projectCardObserver.observe(el));
    const contactContainer = document.querySelector(".contact-container");
    if (contactContainer) observer.observe(contactContainer);
    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    // Elements with animate-on-scroll class (used in HTML)
    document.querySelectorAll(".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right").forEach((el) => observer.observe(el));
});
