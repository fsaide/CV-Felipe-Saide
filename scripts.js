document.addEventListener("DOMContentLoaded", () => {
    const root = document.body;
    const themeButton = document.querySelector(".theme-toggle");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const downloadMenu = document.querySelector(".download-menu");
    const filterButtons = document.querySelectorAll(".filter-button");
    const skillCards = document.querySelectorAll(".skill-card");
    const revealElements = document.querySelectorAll(".reveal");

    const setTheme = (theme) => {
        const isDark = theme === "dark";
        root.dataset.theme = isDark ? "dark" : "light";
        themeButton.setAttribute("aria-pressed", String(isDark));
        themeButton.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
        themeColor.setAttribute("content", isDark ? "#111827" : "#f5f7fb");
    };

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("cv-theme");
    } catch (error) {
        console.warn("No se pudo leer la preferencia de tema guardada.", error);
        savedTheme = null;
    }
    setTheme(savedTheme === "dark" ? "dark" : "light");

    themeButton.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        try {
            localStorage.setItem("cv-theme", nextTheme);
        } catch (error) {
            console.warn("No se pudo guardar la preferencia de tema.", error);
        }
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;
            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;
                filterButton.classList.toggle("is-active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });
            skillCards.forEach((card) => {
                const isVisible = selectedFilter === "all" || card.dataset.category === selectedFilter;
                card.hidden = !isVisible;
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!downloadMenu.contains(event.target)) {
            downloadMenu.open = false;
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            downloadMenu.open = false;
        }
    });

    if ("IntersectionObserver" in window) {
        root.classList.add("js-ready");
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => observer.observe(element));
    }
});
