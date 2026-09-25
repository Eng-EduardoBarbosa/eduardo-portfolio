document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navbar = document.querySelector(".navbar");

    // Esconde a tela de carregamento depois que a página abre
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 800);
    }

    // Inicia as animações das seções
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            disable: window.innerWidth < 480
        });
    }

    // Abre e fecha o menu no celular
    if (menuBtn && navMenu) {
        menuBtn.setAttribute("aria-label", "Abrir menu");
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuBtn.classList.toggle("active", isOpen);
            menuBtn.setAttribute("aria-expanded", isOpen);
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        // Fecha o menu depois que o usuário escolhe uma seção
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Abrir menu");
                document.body.classList.remove("menu-open");
            });
        });
    }

    // Muda o visual da navbar quando a página é rolada
    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();

    // Destaca no menu a seção que está sendo visualizada
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Move levemente os brilhos do fundo seguindo o mouse
    const glowElements = document.querySelectorAll(".glow-1, .glow-2");

    if (
        glowElements.length &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        document.addEventListener("mousemove", event => {
            const x = event.clientX;
            const y = event.clientY;

            glowElements.forEach((element, index) => {
                const speed = index === 0 ? 0.02 : -0.015;

                element.style.transform = `
                    translate(${x * speed}px, ${y * speed}px)
                `;
            });
        });
    }

    // Dá um pequeno efeito 3D nos cards dos projetos
    const projectCards = document.querySelectorAll(".project-card");

    if (
        projectCards.length &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        projectCards.forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                `;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    // Escreve o texto inicial aos poucos
    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
        const text = typingElement.textContent.trim();
        typingElement.textContent = "";

        let index = 0;

        function typeText() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 35);
            }
        }

        setTimeout(typeText, 500);
    }

    // Fecha o menu se a tela voltar para o tamanho desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800 && navMenu && menuBtn) {
            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Abrir menu");
            document.body.classList.remove("menu-open");
        }
    });
});