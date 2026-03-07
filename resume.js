// Scroll-triggered animations: content appears as you scroll down
document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = document.querySelector(".container");
    const scrollRoot = container || null;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            root: scrollRoot,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.08
        }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
});
