/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0
   PROJECTS DATABASE ENGINE + PARTICLE CORE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATABASE
       ===================================================== */

    const container = document.getElementById("projects-container");

    if (!container) {
        console.error("X∞ ERROR: #projects-container non trovato.");

        const errorBox = document.createElement("div");
        errorBox.className = "database-error";
        errorBox.innerHTML = `
            <strong>X∞ DATABASE ERROR</strong><br>
            Il contenitore del database non è presente in progetti.html.
        `;

        document.body.appendChild(errorBox);
        return;
    }


    /* =====================================================
       HTML SECURITY
       ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       RENDER PROJECTS
       ===================================================== */

    function renderProjects(projects) {

        container.innerHTML = "";

        projects.forEach((project, index) => {

            const id = project.id || String(index + 1).padStart(3, "0");

            const title =
                project.title ||
                "Untitled Future Technology";

            const category =
                project.category ||
                "Future Technology";

            const description =
                project.description ||
                "Concept tecnologico appartenente all'archivio X∞.";

            const status =
                project.status ||
                "Concept";

            const card = document.createElement("article");

            card.className = "project-card";

            card.innerHTML = `
                <div class="project-code">
                    X∞-${escapeHTML(id)}
                </div>

                <h3>
                    ${escapeHTML(title)}
                </h3>

                <h4>
                    ${escapeHTML(category)}
                </h4>

                <p>
                    ${escapeHTML(description)}
                </p>

                <span class="project-status">
                    ${escapeHTML(status)}
                </span>
            `;

            container.appendChild(card);
        });


        /* =================================================
           OPTIONAL PROJECT COUNTER
           ================================================= */

        const counters =
            document.querySelectorAll("[data-project-count]");

        counters.forEach(counter => {
            counter.textContent = projects.length;
        });


        console.log(
            `X∞ DATABASE ONLINE — ${projects.length} PROJECTS LOADED`
        );
    }


    /* =====================================================
       ERROR DISPLAY
       ===================================================== */

    function showDatabaseError(message) {

        container.innerHTML = `
            <div class="database-error">
                <strong>X∞ DATABASE ERROR</strong>
                <br><br>
                ${escapeHTML(message)}
                <br><br>
                <small>
                    Controlla che <b>projects.json</b> sia nella stessa
                    cartella di <b>progetti.html</b>.
                </small>
            </div>
        `;

        console.error(
            "X∞ DATABASE ERROR:",
            message
        );
    }


    /* =====================================================
       LOAD JSON DATABASE
       ===================================================== */

    async function loadProjects() {

        try {

            console.log(
                "X∞ DATABASE: connessione a projects.json..."
            );


            /*
             * Il parametro timestamp evita che il browser
             * utilizzi una vecchia versione memorizzata.
             */

            const jsonURL =
                `./projects.json?x=${Date.now()}`;


            const response =
                await fetch(jsonURL, {
                    method: "GET",
                    cache: "no-store"
                });


            if (!response.ok) {

                throw new Error(
                    `projects.json non raggiungibile. HTTP ${response.status}`
                );
            }


            const projects =
                await response.json();


            if (!Array.isArray(projects)) {

                throw new Error(
                    "projects.json non contiene un array JSON valido."
                );
            }


            if (projects.length === 0) {

                throw new Error(
                    "projects.json è valido ma non contiene progetti."
                );
            }


            console.log(
                `X∞ DATABASE: ${projects.length} record ricevuti.`
            );


            renderProjects(projects);


        } catch (error) {

            showDatabaseError(
                error.message ||
                "Errore sconosciuto durante il caricamento del database."
            );

        }

    }


    /* =====================================================
       START DATABASE
       ===================================================== */

    loadProjects();


    /* =====================================================
       X∞ DIGITAL SPACE CORE
       ===================================================== */

    const canvas =
        document.getElementById("space");


    if (!canvas) {

        console.warn(
            "X∞ SPACE CORE: canvas #space non trovato."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {

        console.warn(
            "X∞ SPACE CORE: Canvas 2D non disponibile."
        );

        return;
    }


    let width = 0;
    let height = 0;

    let animationFrame;

    const particles = [];

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       PARTICLE SETTINGS
       ===================================================== */

    const particleCount =
        reducedMotion ? 35 : 95;

    const connectionDistance = 120;


    /* =====================================================
       RESIZE CANVAS
       ===================================================== */

    function resizeCanvas() {

        const pixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        canvas.width =
            width * pixelRatio;

        canvas.height =
            height * pixelRatio;


        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;


        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );
    }


    /* =====================================================
       CREATE PARTICLES
       ===================================================== */

    function createParticles() {

        particles.length = 0;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() * width,

                y:
                    Math.random() * height,

                vx:
                    (Math.random() - 0.5) * 0.35,

                vy:
                    (Math.random() - 0.5) * 0.35,

                size:
                    Math.random() * 1.8 + 0.5,

                alpha:
                    Math.random() * 0.65 + 0.15
            });
        }
    }


    /* =====================================================
       UPDATE PARTICLES
       ===================================================== */

    function updateParticles() {

        particles.forEach(particle => {

            particle.x += particle.vx;
            particle.y += particle.vy;


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

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(0,229,255,${particle.alpha})`;


            ctx.shadowBlur = 8;

            ctx.shadowColor =
                "rgba(0,229,255,.8)";


            ctx.fill();

        });


        ctx.shadowBlur = 0;
    }


    /* =====================================================
       CONNECT PARTICLES
       ===================================================== */

    function connectParticles() {

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

                const a =
                    particles[i];

                const b =
                    particles[j];


                const dx =
                    a.x - b.x;

                const dy =
                    a.y - b.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    connectionDistance
                ) {

                    const opacity =
                        (1 - distance / connectionDistance)
                        * 0.18;


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
                        `rgba(0,229,255,${opacity})`;


                    ctx.lineWidth =
                        0.6;


                    ctx.stroke();
                }
            }
        }
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


        if (!reducedMotion) {
            updateParticles();
        }


        connectParticles();

        drawParticles();


        animationFrame =
            requestAnimationFrame(
                animate
            );
    }


    /* =====================================================
       INITIALIZE SPACE CORE
       ===================================================== */

    resizeCanvas();

    createParticles();

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

                    createParticles();

                }, 150);
        }
    );


    /* =====================================================
       CLEANUP
       ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );
            }
        }
    );


    console.log(
        "X∞ CORE SYSTEM ONLINE"
    );

});
