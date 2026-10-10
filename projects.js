

"use strict";

document.addEventListener("DOMContentLoaded", initInnovationPortfolio);

async function initInnovationPortfolio() {
  const container =
    document.getElementById("project-container") ||
    document.getElementById("project-database") ||
    document.getElementById("projects-container");

  const status = document.getElementById("database-status");

  if (!container) {
    console.error("INNOVATIONPORTFOLIO: contenitore dei progetti non trovato.");
    return;
  }

  if (status) {
    status.textContent = "Caricamento database X∞...";
  }

  try {
    const response = await fetch("projects.json?v=20261010", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Errore HTTP " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Il database JSON deve contenere un array.");
    }

    const projects = [...data];

    // Aggiunge X∞-101 senza duplicarlo se è già presente nel JSON.
    const energyProject = {
      id: "101",
      title: "ENERGIA ETERNA GRATIS X∞",
      category: "Energia intelligente",
      description:
        "Concept di ricerca per ottimizzare l'impiego delle energie rinnovabili attraverso previsioni, gestione intelligente dei consumi, accumulo, analisi delle perdite e protezione della riserva energetica. Include un simulatore interattivo per confrontare strategie di gestione su dati dichiarati.",
      status: "PROTOTIPO CONCETTUALE • ENERGY AI • SIMULATION"
    };

    const energyExists = projects.some(
      project => String(project.id).replace(/^0+/, "") === "101"
    );

    if (!energyExists) {
      projects.push(energyProject);
    }

    container.replaceChildren();

    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.dataset.projectId = String(project.id);

      const isEnergyProject =
        String(project.id).replace(/^0+/, "") === "101";

      const code = document.createElement("div");
      code.className = "project-code";
      code.textContent = "X∞-" + String(project.id).padStart(3, "0");

      const title = document.createElement("h3");
      title.textContent = project.title || "Progetto senza titolo";

      const category = document.createElement("h4");
      category.textContent = project.category || "Categoria da definire";

      const description = document.createElement("p");
      description.textContent =
        project.description || "Descrizione in fase di aggiornamento.";

      const projectStatus = document.createElement("span");
      projectStatus.className = "project-status";
      projectStatus.textContent = project.status || "CONCEPT";

      card.append(code, title, category, description, projectStatus);

      if (isEnergyProject) {
        const link = document.createElement("a");
        link.href = "energia-eterna.html";
        link.className = "project-open-link";
        link.textContent = "Apri dossier e simulatore →";
        link.setAttribute(
          "aria-label",
          "Apri il dossier e il simulatore Energia Eterna Gratis X∞"
        );

        card.appendChild(link);
        card.classList.add("project-card-energy");
      }

      container.appendChild(card);
    });

    const count = container.querySelectorAll(".project-card").length;

    document.querySelectorAll("[data-project-count]").forEach(element => {
      element.textContent = String(count);
    });

    if (status) {
      status.textContent =
        "DATABASE X∞ ONLINE • " + count + " PROGETTI CARICATI";
    }

    console.info(
      "INNOVATIONPORTFOLIO X∞: caricati",
      count,
      "progetti."
    );
  } catch (error) {
    console.error("Errore nel caricamento del database X∞:", error);

    if (status) {
      status.textContent =
        "Database non disponibile. Controlla projects.json e riprova.";
    }

    // Non cancellare eventuali contenuti statici già presenti.
    if (container.children.length === 0) {
      const message = document.createElement("p");
      message.className = "database-error";
      message.textContent =
        "Impossibile caricare il database. Verifica che projects.json esista e contenga JSON valido.";
      container.appendChild(message);
    }
  }
}
