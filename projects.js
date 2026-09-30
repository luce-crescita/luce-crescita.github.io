```javascript
/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0
   PROJECT DATABASE ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("projects-container");

    /* Controllo contenitore */
    if (!container) {

        console.error(
            "X∞ ERROR: elemento #projects-container non trovato."
        );

        return;
    }


    /* Caricamento database */
    fetch("projects.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Impossibile caricare projects.json: HTTP ${response.status}`
                );

            }

            return response.json();

        })


        .then(projects => {

            /* Controllo formato database */

            if (!Array.isArray(projects)) {

                throw new Error(
                    "Il database projects.json non contiene un array valido."
                );

            }


            /* Svuota eventuali contenuti precedenti */

            container.innerHTML = "";


            /* Generazione PROJECT CARDS */

            projects.forEach(project => {


                const card =
                    document.createElement("article");


                card.className = "project-card";


                card.innerHTML = `

                    <div class="code">
                        X∞-${String(project.id).padStart(3, "0")}
                    </div>


                    <h3>
                        ${project.title || "UNTITLED PROJECT"}
                    </h3>


                    <h4>
                        ${project.category || "FUTURE TECHNOLOGY"}
                    </h4>


                    <p>
                        ${project.description || "Concept tecnologico futuro."}
                    </p>


                    <span class="project-status">
                        ${project.status || "CONCEPT • X∞ ARCHIVE"}
                    </span>

                `;


                container.appendChild(card);

            });


            console.log(
                `X∞ DATABASE ONLINE — ${projects.length} PROJECTS LOADED`
            );


        })


        .catch(error => {


            console.error(
                "X∞ DATABASE ERROR:",
                error
            );


            container.innerHTML = `

                <div class="holo database-error">

                    <h3>
                        X∞ DATABASE OFFLINE
                    </h3>

                    <p>
                        Il database dei progetti non è
                        temporaneamente disponibile.
                    </p>

                    <small>
                        Verifica che <strong>projects.json</strong>
                        sia presente nella stessa cartella
                        di progetti.html.
                    </small>

                </div>

            `;

        });

});
```

