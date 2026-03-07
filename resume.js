// Scroll-triggered animations on resume page
document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
});
