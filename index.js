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
});
