
```javascript
/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0
   DATABASE ENGINE + SPACE PARTICLES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PROJECT DATABASE
       ===================================================== */

    const container = document.getElementById("projects-container");

    if (container) {

        loadProjects(container);
    }


    async function loadProjects(container) {

        try {

            const response = await fetch("./projects.json", {
                cache: "no-store"
            });

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status} — impossibile caricare projects.json`
                );
            }

            const projects = await response.json();

            if (!Array.isArray(projects)) {

                throw new Error(
                    "projects.json non contiene un array valido."
                );
            }

            container.innerHTML = "";

            projects.forEach((project, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "project-card";

                const projectId =
                    String(
                        project.id ?? index + 1
                    ).padStart(3, "0");

                const title =
                    project.title ||
                    "Untitled Future Project";

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
                        X∞-${projectId}
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
                `X∞ DATABASE ONLINE — ${projects.length} PROJECTS`
            );


            /* =================================================
               DATABASE COUNTER
               ================================================= */

            updateDatabaseCounters(projects.length);

        }

        catch (error) {

            console.error(
                "X∞ DATABASE ERROR:",
                error
            );

            container.innerHTML = `

                <div class="database-error">

                    <strong>
                        X∞ DATABASE OFFLINE
                    </strong>

                    <span>
                        Impossibile caricare projects.json.
                    </span>

                    <small>
                        Controlla che projects.json si trovi
                        nella stessa cartella di progetti.html.
                    </small>

                </div>

            `;
        }
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
       OPTIONAL DATABASE COUNTERS
       ===================================================== */

    function updateDatabaseCounters(total) {

        const counters =
            document.querySelectorAll(
                "[data-project-count]"
            );

        counters.forEach(counter => {

            counter.textContent =
                total;
        });
    }


    /* =====================================================
       X∞ SPACE CANVAS
       ===================================================== */

    const canvas =
        document.getElementById("space");

    if (!canvas) {

        console.warn(
            "X∞ SPACE CANVAS NOT FOUND"
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");

    if (!ctx) {

        console.warn(
            "X∞ CANVAS CONTEXT NOT AVAILABLE"
        );

        return;
    }


    /* =====================================================
       CANVAS SETTINGS
       ===================================================== */

    let width = 0;
    let height = 0;

    let animationFrame = null;

    const particles = [];

    const mobile =
        window.innerWidth <= 700;

    const particleCount =
        mobile ? 45 : 100;


    /* =====================================================
       RESIZE
       ===================================================== */

    function resizeCanvas() {

        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

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
       CREATE PARTICLE
       ===================================================== */

    function createParticle() {

        return {

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            radius:
                Math.random() * 1.5 + 0.35,

            velocityX:
                (Math.random() - 0.5) * 0.20,

            velocityY:
                (Math.random() - 0.5) * 0.20,

            opacity:
                Math.random() * 0.65 + 0.15,

            pulse:
                Math.random() *
                Math.PI *
                2,

            pulseSpeed:
                Math.random() *
                0.015 +
                0.005
        };
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initializeParticles() {

        particles.length = 0;

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                createParticle()
            );
        }
    }


    /* =====================================================
       UPDATE
       ===================================================== */

    function updateParticles() {

        particles.forEach(particle => {

            particle.x +=
                particle.velocityX;

            particle.y +=
                particle.velocityY;

            particle.pulse +=
                particle.pulseSpeed;


            if (particle.x < -10)
                particle.x = width + 10;

            if (particle.x > width + 10)
                particle.x = -10;

            if (particle.y < -10)
                particle.y = height + 10;

            if (particle.y > height + 10)
                particle.y = -10;

        });
    }


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    function drawParticles() {

        particles.forEach(particle => {

            const pulse =
                Math.sin(
                    particle.pulse
                ) * 0.2;

            const opacity =
                Math.max(
                    0.04,
                    particle.opacity +
                    pulse
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
                `rgba(120,240,255,${opacity})`;

            ctx.fill();
        });
    }


    /* =====================================================
       CONNECT PARTICLES
       ===================================================== */

    function connectParticles() {

        const maxDistance =
            mobile ? 75 : 115;

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

                const first =
                    particles[i];

                const second =
                    particles[j];

                const dx =
                    first.x -
                    second.x;

                const dy =
                    first.y -
                    second.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) * 0.11;

                    ctx.beginPath();

                    ctx.moveTo(
                        first.x,
                        first.y
                    );

                    ctx.lineTo(
                        second.x,
                        second.y
                    );

                    ctx.strokeStyle =
                        `rgba(80,220,255,${opacity})`;

                    ctx.lineWidth =
                        0.5;

                    ctx.stroke();
                }
            }
        }
    }


    /* =====================================================
       BACKGROUND GLOW
       ===================================================== */

    function drawGlow() {

        const centerX =
            width / 2;

        const centerY =
            height * 0.42;

        const radius =
            Math.min(
                width,
                height
            ) * 0.5;

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
            0.5,
            "rgba(0,100,255,0.015)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );
    }


    /* =====================================================
       ANIMATION
       ===================================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        drawGlow();

        updateParticles();

        connectParticles();

        drawParticles();

        animationFrame =
            requestAnimationFrame(
                animate
            );
    }


    /* =====================================================
       START CANVAS
       ===================================================== */

    resizeCanvas();

    initializeParticles();

    animate();


    /* =====================================================
       RESIZE EVENT
       ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

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

    function checkMotion() {

        if (
            reducedMotion.matches
        ) {

            cancelAnimationFrame(
                animationFrame
            );

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            drawGlow();

            drawParticles();

        } else {

            cancelAnimationFrame(
                animationFrame
            );

            animate();

        }
    }

    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            checkMotion
        );

    }

});
```
