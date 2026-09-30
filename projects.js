
/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0
   PROJECT DATABASE ENGINE + DIGITAL PARTICLE CORE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DATABASE ENGINE
       ===================================================== */

    const container =
        document.getElementById("project-database");

    const databaseStatus =
        document.getElementById("database-status");


    /* =====================================================
       DATABASE CONTAINER CHECK
       ===================================================== */

    if (!container) {

        console.error(
            "X∞ ERROR: #project-database non trovato."
        );

        const errorBox =
            document.createElement("div");

        errorBox.className =
            "database-error";

        errorBox.innerHTML = `
            <strong>X∞ DATABASE ERROR</strong>
            <br><br>
            Il contenitore
            <b>#project-database</b>
            non è presente in progetti.html.
        `;

        document.body.appendChild(errorBox);

        return;
    }


    /* =====================================================
       HTML SECURITY
       ===================================================== */

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {
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
       DATABASE STATUS
       ===================================================== */

    function updateDatabaseStatus(
        message,
        state = "online"
    ) {

        if (!databaseStatus) {
            return;
        }

        databaseStatus.textContent =
            message;

        databaseStatus.dataset.state =
            state;
    }


    /* =====================================================
       RENDER PROJECTS
       ===================================================== */

    function renderProjects(projects) {

        container.innerHTML = "";


        projects.forEach((project, index) => {

            const id =
                project.id ||
                String(index + 1).padStart(3, "0");


            const title =
                project.title ||
                "Untitled Future Technology";


            const category =
                project.category ||
                "FUTURE TECHNOLOGY";


            const description =
                project.description ||
                "Concept tecnologico appartenente all'archivio X∞.";


            const status =
                project.status ||
                "CONCEPT";


            /* =============================================
               CARD
               ============================================= */

            const card =
                document.createElement("article");

            card.className =
                "project-card";

            card.dataset.projectId =
                id;


            /* =============================================
               CARD CONTENT
               ============================================= */

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
           PROJECT COUNTERS
           ================================================= */

        const counters =
            document.querySelectorAll(
                "[data-project-count]"
            );


        counters.forEach(counter => {

            counter.textContent =
                projects.length;

        });


        /* =================================================
           DATABASE STATUS
           ================================================= */

        updateDatabaseStatus(
            `DATABASE ONLINE • ${projects.length} PROJECTS`,
            "online"
        );


        console.log(
            `X∞ DATABASE ONLINE — ${projects.length} PROJECTS LOADED`
        );
    }


    /* =====================================================
       DATABASE ERROR
       ===================================================== */

    function showDatabaseError(message) {

        container.innerHTML = `
            <div class="database-error">

                <strong>
                    X∞ DATABASE ERROR
                </strong>

                <br><br>

                ${escapeHTML(message)}

                <br><br>

                <small>
                    Controlla che
                    <b>projects.json</b>
                    sia presente nella stessa cartella
                    di <b>progetti.html</b>.
                </small>

            </div>
        `;


        updateDatabaseStatus(
            "DATABASE OFFLINE",
            "error"
        );


        console.error(
            "X∞ DATABASE ERROR:",
            message
        );
    }


    /* =====================================================
       LOAD PROJECTS.JSON
       ===================================================== */

    async function loadProjects() {

        try {

            updateDatabaseStatus(
                "DATABASE INITIALIZING...",
                "loading"
            );


            console.log(
                "X∞ DATABASE: connessione a projects.json..."
            );


            /*
             * Percorso relativo compatibile
             * con GitHub Pages.
             *
             * Il parametro timestamp
             * impedisce il caricamento
             * di una vecchia versione in cache.
             */

            const jsonURL =
                `./projects.json?x=${Date.now()}`;


            const response =
                await fetch(
                    jsonURL,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            /* =============================================
               HTTP CHECK
               ============================================= */

            if (!response.ok) {

                throw new Error(
                    `projects.json non raggiungibile. HTTP ${response.status}`
                );
            }


            /* =============================================
               JSON PARSE
               ============================================= */

            const projects =
                await response.json();


            /* =============================================
               ARRAY CHECK
               ============================================= */

            if (!Array.isArray(projects)) {

                throw new Error(
                    "projects.json non contiene un array JSON valido."
                );
            }


            /* =============================================
               EMPTY DATABASE CHECK
               ============================================= */

            if (projects.length === 0) {

                throw new Error(
                    "projects.json è valido ma non contiene progetti."
                );
            }


            console.log(
                `X∞ DATABASE: ${projects.length} record ricevuti.`
            );


            /* =============================================
               RENDER
               ============================================= */

            renderProjects(projects);


        } catch (error) {

            showDatabaseError(
                error.message ||
                "Errore sconosciuto durante il caricamento del database."
            );

        }

    }


    /* =====================================================
       START DATABASE ENGINE
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


    /* =====================================================
       CORE VARIABLES
       ===================================================== */

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
        reducedMotion
            ? 35
            : 95;


    const connectionDistance =
        120;


    /* =====================================================
       RESIZE CANVAS
       ===================================================== */

    function resizeCanvas() {

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


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

        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                /* LEFT */

                if (
                    particle.x < -10
                ) {

                    particle.x =
                        width + 10;

                }


                /* RIGHT */

                if (
                    particle.x >
                    width + 10
                ) {

                    particle.x = -10;

                }


                /* TOP */

                if (
                    particle.y < -10
                ) {

                    particle.y =
                        height + 10;

                }


                /* BOTTOM */

                if (
                    particle.y >
                    height + 10
                ) {

                    particle.y = -10;

                }

            }
        );
    }


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    function drawParticles() {

        particles.forEach(
            particle => {

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


                ctx.shadowBlur =
                    8;


                ctx.shadowColor =
                    "rgba(0,229,255,.8)";


                ctx.fill();

            }
        );


        ctx.shadowBlur =
            0;
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
                        (
                            1 -
                            distance /
                            connectionDistance
                        ) * 0.18;


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

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        resizeCanvas();

                        createParticles();

                    },
                    150
                );

        }
    );


    /* =====================================================
       PAGE CLEANUP
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


    /* =====================================================
       SYSTEM ONLINE
       ===================================================== */

    console.log(
        "X∞ CORE SYSTEM ONLINE"
    );

});
