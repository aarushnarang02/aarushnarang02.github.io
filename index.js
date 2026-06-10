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

    // Hero: deep-space starfield (twinkle + parallax + shooting stars + planet)
    const header = document.getElementById("home");
    const canvas = document.getElementById("hero-canvas");
    if (header && canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext("2d");
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let w = 0, h = 0, stars = [], shooters = [], planet = null;
        // parallax target + smoothed value
        const par = { tx: 0, ty: 0, x: 0, y: 0 };

        // Real lunar near-side photo (Gregory H. Revera, CC BY-SA 3.0)
        const moonImg = new Image();
        let moonReady = false;
        moonImg.onload = () => { moonReady = true; };
        moonImg.src = "assets/images/moon.jpg";

        const STAR_TINTS = [
            "255, 255, 255",   // white
            "203, 225, 255",   // cool blue-white
            "255, 236, 209"    // warm
        ];

        const build = () => {
            w = header.clientWidth;
            h = header.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(260, Math.floor((w * h) / 5200));
            stars = Array.from({ length: count }, () => {
                const depth = Math.random();           // 0 far .. 1 near
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: 0.4 + depth * 1.6,
                    depth,
                    tint: STAR_TINTS[(Math.random() * STAR_TINTS.length) | 0],
                    baseA: 0.35 + Math.random() * 0.5,
                    twAmp: 0.25 + Math.random() * 0.5,
                    twSpd: 0.6 + Math.random() * 1.8,
                    phase: Math.random() * Math.PI * 2
                };
            });

            // distant planet in upper-right
            const pr = Math.max(50, Math.min(w, h) * 0.13);
            planet = { x: w * 0.82, y: h * 0.26, r: pr };
        };
        build();
        window.addEventListener("resize", build);

        header.addEventListener("pointermove", (e) => {
            const r = header.getBoundingClientRect();
            par.tx = (e.clientX - r.left) / w - 0.5;
            par.ty = (e.clientY - r.top) / h - 0.5;
        });
        header.addEventListener("pointerleave", () => { par.tx = 0; par.ty = 0; });

        const spawnShooter = () => {
            const edge = Math.random();
            const startX = edge * w * 0.8;
            const startY = Math.random() * h * 0.4;
            const ang = (Math.PI / 4) + (Math.random() - 0.5) * 0.5; // down-right
            const speed = 9 + Math.random() * 6;
            shooters.push({
                x: startX, y: startY,
                vx: Math.cos(ang) * speed,
                vy: Math.sin(ang) * speed,
                len: 90 + Math.random() * 80,
                life: 0, maxLife: 60 + Math.random() * 30
            });
        };
        let nextShooter = 1200 + Math.random() * 2500;

        const drawMoon = () => {
            const { x, y, r } = planet;
            // soft cool halo
            const glow = ctx.createRadialGradient(x, y, r * 0.85, x, y, r * 1.9);
            glow.addColorStop(0, "rgba(186, 210, 245, 0.12)");
            glow.addColorStop(1, "rgba(186, 210, 245, 0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, r * 1.9, 0, Math.PI * 2);
            ctx.fill();

            if (moonReady) {
                // clip to disc and draw the photo, cropping out the black
                // padding around the lunar disc so it fills edge-to-edge
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.clip();
                const iw = moonImg.naturalWidth, ih = moonImg.naturalHeight;
                const s = Math.min(iw, ih);
                const inset = s * 0.06;            // trim the black border in the photo
                const sx = (iw - s) / 2 + inset;
                const sy = (ih - s) / 2 + inset;
                const ss = s - inset * 2;
                // slight overscan so the disc edge meets the clip circle cleanly
                const o = r * 0.04;
                ctx.drawImage(moonImg, sx, sy, ss, ss,
                    x - r - o, y - r - o, (r + o) * 2, (r + o) * 2);
                ctx.restore();
            } else {
                // fallback disc until image loads
                ctx.fillStyle = "rgba(150, 158, 175, 0.6)";
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        let t = 0, last = performance.now();
        const draw = (now) => {
            const dt = Math.min(50, now - last); last = now;
            t += dt / 1000;

            // smooth parallax
            par.x += (par.tx - par.x) * 0.05;
            par.y += (par.ty - par.y) * 0.05;

            ctx.clearRect(0, 0, w, h);

            drawMoon();

            // stars
            for (const s of stars) {
                const ox = par.x * s.depth * 30;
                const oy = par.y * s.depth * 30;
                const a = Math.max(0, Math.min(1,
                    s.baseA + Math.sin(t * s.twSpd + s.phase) * s.twAmp));
                ctx.fillStyle = `rgba(${s.tint}, ${a})`;
                ctx.beginPath();
                ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
                ctx.fill();
                // glint on the brightest near stars
                if (s.depth > 0.85 && a > 0.7) {
                    ctx.fillStyle = `rgba(${s.tint}, ${(a - 0.7) * 0.5})`;
                    ctx.fillRect(s.x + ox - s.r * 3, s.y + oy - 0.4, s.r * 6, 0.8);
                    ctx.fillRect(s.x + ox - 0.4, s.y + oy - s.r * 3, 0.8, s.r * 6);
                }
            }

            // shooting stars
            nextShooter -= dt;
            if (nextShooter <= 0) { spawnShooter(); nextShooter = 2500 + Math.random() * 4000; }
            for (let i = shooters.length - 1; i >= 0; i--) {
                const sh = shooters[i];
                sh.x += sh.vx; sh.y += sh.vy; sh.life++;
                const k = 1 - sh.life / sh.maxLife;
                if (sh.life >= sh.maxLife || sh.x > w + 100 || sh.y > h + 100) {
                    shooters.splice(i, 1); continue;
                }
                const tailX = sh.x - sh.vx / Math.hypot(sh.vx, sh.vy) * sh.len;
                const tailY = sh.y - sh.vy / Math.hypot(sh.vx, sh.vy) * sh.len;
                const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * k})`);
                grad.addColorStop(0.3, `rgba(125, 211, 252, ${0.5 * k})`);
                grad.addColorStop(1, "rgba(125, 211, 252, 0)");
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sh.x, sh.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
                // bright head
                ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * k})`;
                ctx.beginPath();
                ctx.arc(sh.x, sh.y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }

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
