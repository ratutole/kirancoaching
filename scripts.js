document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-item");
    const dotsContainer = document.querySelector(".carousel-dots");

    let currentIndex = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    const updateCarousel = () => {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        const dots = document.querySelectorAll(".carousel-dot");
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    };

    window.addEventListener("resize", () => {
        // Recalculate position on resize
        updateCarousel();
    });


    // Optional: Auto-scroll
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 8000); // 8 seconds

    window.addEventListener("resize", updateCarousel);

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const gainSection = document.querySelector('.gain-section');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gainSection.style.opacity = 1;
                        gainSection.style.animationPlayState = 'running';
                        observer.unobserve(gainSection);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(gainSection);
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');

            // Close other items
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});
// Smooth scroll for anchor links
