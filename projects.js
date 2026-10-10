

(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", initDatabase);

  async function initDatabase() {
    const container = document.getElementById("project-database")
      || document.getElementById("project-container")
      || document.getElementById("projects-container");

    const status = document.getElementById("database-status");

    if (!container) {
      showStatus("ERRORE: contenitore del database non trovato.", status);
      return;
    }

    container.innerHTML = `
      <div class="database-loading">
        <span class="loading-symbol">X∞</span>
        <p>AI DATABASE LOADING...</p>
      </div>
    `;

    showStatus("CONNESSIONE AL DATABASE X∞...", status);

    try {
      const response = await fetch(
        new URL("./projects.json?v=" + Date.now(), document.baseURI),
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(
          "projects.json ha risposto con HTTP " + response.status
        );
      }

      const data = await response.json();

      // Accetta sia un array diretto sia un oggetto contenente "projects".
      const projects = Array.isArray(data)
        ? data
        : Array.isArray(data.projects)
          ? data.projects
          : null;

      if (!projects) {
        throw new Error(
          "Formato JSON non riconosciuto: atteso un array di progetti."
        );
      }

      if (projects.length === 0) {
        throw new Error("Il database esiste ma non contiene progetti.");
      }

      container.replaceChildren();

      projects.forEach((project, index) => {
        if (!project || typeof project !== "object") return;

        const card = document.createElement("article");
        card.className = "project-card";

        const rawId = project.id ?? String(index + 1);
        const id = String(rawId).replace(/^X∞-?/i, "").padStart(3, "0");

        const code = document.createElement("span");
        code.className = "project-code";
        code.textContent = "X∞-" + id;

        const title = document.createElement("h3");
        title.textContent = project.title || "Progetto senza titolo";

        const category = document.createElement("h4");
        category.textContent = project.category || "FUTURE TECHNOLOGY";

        const description = document.createElement("p");
        description.textContent =
          project.description || "Descrizione non disponibile.";

        const projectStatus = document.createElement("div");
        projectStatus.className = "project-status";
        projectStatus.textContent = project.status || "CONCEPT";

        card.append(code, title, category, description, projectStatus);

        // Collega il progetto 101 al dossier già esistente.
        if (id === "101") {
          card.classList.add("project-card-energy");

          const link = document.createElement("a");
          link.href = "./energia-eterna.html";
          link.textContent = "APRI DOSSIER E SIMULATORE";
          link.className = "project-link";
          card.appendChild(link);
        }

        container.appendChild(card);
      });

      const count = container.children.length;

      if (count === 0) {
        throw new Error(
          "Il JSON è stato letto, ma nessun progetto valido è stato trovato."
        );
      }

      document.querySelectorAll("[data-project-count]").forEach((element) => {
        element.textContent = String(count);
      });

      showStatus(
        "DATABASE ONLINE • " + count + " PROGETTI CARICATI",
        status
      );
    } catch (error) {
      console.error("Errore database X∞:", error);

      container.innerHTML = `
        <div class="database-error">
          <strong>X∞ DATABASE OFFLINE</strong>
          <p id="database-error-detail"></p>
          <p>Controlla il file projects.json e riprova.</p>
        </div>
      `;

      const detail = document.getElementById("database-error-detail");
      if (detail) {
        detail.textContent = error.message || "Errore di caricamento.";
      }

      showStatus("DATABASE NON DISPONIBILE", status);
    }
  }

  function showStatus(message, element) {
    if (element) element.textContent = message;
  }
})();
