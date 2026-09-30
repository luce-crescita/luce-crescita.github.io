```javascript
/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0
   PROJECTS DATABASE + SPACE PARTICLES + INTERFACE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATABASE
       ===================================================== */

    const container = document.getElementById("projects-container");

    if (container) {

        fetch("projects.json")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Database HTTP error: " + response.status
                    );
                }

                return response.json();
            })

            .then(projects => {

                if (!Array.isArray(projects)) {
                    throw new Error("projects.json non contiene un array valido.");
                }

                container.innerHTML = "";

                projects.forEach((project, index) => {

                    const article = document.createElement("article");

                    article.className = "project-card";

                    const id =
                        project.id !== undefined
                            ? String(project.id).padStart(3, "0")
                            : String(index + 1).padStart(3, "0");

                    const title =
                        project.title ||
                        "Unnamed Future Project";

                    const category =
                        project.category ||
                        "Future Technology";

                    const description =
                        project.description ||
                        "Future technology concept.";

                    const status =
                        project.status ||
                        "CONCEPT";

                    article.innerHTML = `
                        <div class="project-code">
                            X∞-${id}
                        </div>

                        <h3>
                            ${escapeHTML(title)}
                        </h3>

                        <div class="project-category">
                            ${escapeHTML(category)}
                        </div>

                        <p>
                            ${escapeHTML(description)}
                        </p>

                        <div class="project-status">
                            ${escapeHTML(status)}
                        </div>
                    `;

                    container.appendChild(article);
                });

                console.log(
                    "X∞ DATABASE ONLINE — " +
                    projects.length +
                    " PROJECTS LOADED"
                );

            })

            .catch(error => {

                console.error(
                    "X∞ DATABASE ERROR:",
                    error
                );

                container.innerHTML = `
                    <div class="database-error">
                        <strong>X∞ DATABASE OFFLINE</strong>
                        <span>
                            Impossibile caricare il database dei progetti.
                        </span>
                    </div>
                `;
            });
    }


    /* =====================================================
       SAFE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       SPACE CANVAS
       ===================================================== */

    const canvas = document.getElementById("space");

    if (!canvas) {
        console.warn("X∞ SPACE CANVAS NOT FOUND");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        console.warn("X∞ CANVAS CONTEXT NOT AVAILABLE");
        return;
    }


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const isMobile =
        window.matchMedia("(max-width: 700px)").matches;

    const particleCount =
        isMobile ? 55 : 110;

    const particles = [];

    let width = 0;
    let height = 0;

    let animationFrame;


    /* =====================================================
       RESIZE
       ===================================================== */

    function resizeCanvas() {

        const ratio =
            Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );
    }


    /* =====================================================
       PARTICLE CREATION
       ===================================================== */

    function createParticle() {

        return {

            x: Math.random() * width,

            y: Math.random() * height,

            radius:
                Math.random() * 1.7 + 0.35,

            speedX:
                (Math.random() - 0.5) * 0.22,

            speedY:
                (Math.random() - 0.5) * 0.22,

            opacity:
                Math.random() * 0.7 + 0.2,

            pulse:
                Math.random() * Math.PI * 2,

            pulseSpeed:
                Math.random() * 0.015 + 0.005
        };
    }


    /* =====================================================
       INITIALIZE PARTICLES
       ===================================================== */

    function initializeParticles() {

        particles.length = 0;

        for (let i = 0; i < particleCount; i++) {

            particles.push(
                createParticle()
            );
        }
    }


    /* =====================================================
       UPDATE PARTICLES
       ===================================================== */

    function updateParticles() {

        particles.forEach(particle => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            particle.pulse +=
                particle.pulseSpeed;

            if (particle.x < -10) {
                particle.x = width + 10;
            }

            if (particle.x > width + 10) {
                particle.x = -10;
            }

            if (particle.y < -10) {
                particle.y = height + 10;
            }

            if (particle.y > height + 10) {
                particle.y = -10;
            }
        });
    }


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    function drawParticles() {

        particles.forEach(particle => {

            const pulse =
                Math.sin(particle.pulse) * 0.25;

            const alpha =
                Math.max(
                    0.05,
                    particle.opacity + pulse
                );

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(120,240,255,${alpha})`;

            ctx.fill();
        });
    }


    /* =====================================================
       CONNECT PARTICLES
       ===================================================== */

    function connectParticles() {

        const maxDistance =
            isMobile ? 85 : 125;

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const a = particles[i];
                const b = particles[j];

                const dx =
                    a.x - b.x;

                const dy =
                    a.y - b.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance) *
                        0.12;

                    ctx.beginPath();

                    ctx.moveTo(
                        a.x,
                        a.y
                    );

                    ctx.lineTo(
                        b.x,
                        b.y
                    );

                    ctx.strokeStyle =
                        `rgba(80,220,255,${opacity})`;

                    ctx.lineWidth = 0.5;

                    ctx.stroke();
                }
            }
        }
    }


    /* =====================================================
       BACKGROUND GLOW
       ===================================================== */

    function drawBackgroundGlow() {

        const centerX =
            width / 2;

        const centerY =
            height * 0.42;

        const radius =
            Math.min(width, height) * 0.45;

        const gradient =
            ctx.createRadialGradient(
                centerX,
                centerY,
                0,
                centerX,
                centerY,
                radius
            );

        gradient.addColorStop(
            0,
            "rgba(0,220,255,0.045)"
        );

        gradient.addColorStop(
            0.45,
            "rgba(0,120,255,0.018)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );
    }


    /* =====================================================
       ANIMATION LOOP
       ===================================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        drawBackgroundGlow();

        updateParticles();

        connectParticles();

        drawParticles();

        animationFrame =
            requestAnimationFrame(animate);
    }


    /* =====================================================
       START
       ===================================================== */

    resizeCanvas();

    initializeParticles();

    animate();


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(() => {

                    resizeCanvas();

                    initializeParticles();

                }, 150);
        }
    );


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    function handleMotionPreference() {

        if (reducedMotion.matches) {

            cancelAnimationFrame(
                animationFrame
            );

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            drawBackgroundGlow();

            drawParticles();
        }
        else {

            cancelAnimationFrame(
                animationFrame
            );

            animate();
        }
    }

    reducedMotion.addEventListener(
        "change",
        handleMotionPreference
    );

});
```

