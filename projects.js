
/**
 * projects.js — Archivio progetti dinamico
 * Autore: Mastropaolo Antonello Salvatore
 * Carica e filtra i progetti da projects.json
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-container');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let allProjects = [];
  let activeCategory = 'Tutti';
  let searchTimeout = null;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = String(str == null ? '' : str);
    return div.innerHTML;
  }

  function safeLink(link) {
    if (!link) return '#';
    try {
      const url = new URL(link, window.location.href);
      return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : '#';
    } catch (e) {
      return '#';
    }
  }

  function isExternalLink(link) {
    if (!link) return false;
    try {
      const url = new URL(link, window.location.href);
      return url.origin !== window.location.origin;
    } catch (e) {
      return false;
    }
  }

  async function loadProjects() {
    if (!container) {
      console.warn('projects.js: #projects-container non trovato nel DOM');
      return;
    }
    container.innerHTML = '<p class="col-span-full text-center text-slate-400 py-12">Caricamento archivio...</p>';

    try {
      const response = await fetch('./projects.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('HTTP ' + response.status);

      const data = await response.json();
      allProjects = Array.isArray(data)
        ? data
        : (Array.isArray(data.projects) ? data.projects : []);

      if (allProjects.length === 0) {
        container.innerHTML = `
          <div class="col-span-full text-center py-12 text-slate-400">
            <p class="text-sm font-mono-code">Archivio vuoto.</p>
          </div>`;
        return;
      }
      renderProjects();
    } catch (error) {
      console.error('Errore nel caricamento dei progetti:', error);
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400">
          <p class="text-base font-cinzel text-amber-200">Archivio temporaneamente non disponibile</p>
          <p class="text-[11px] text-slate-500 mt-3 font-mono-code">Riprova più tardi.</p>
        </div>`;
    }
  }

  function renderProjects() {
    if (!container) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const catActive = activeCategory.toLowerCase();

    const filtered = allProjects.filter(p => {
      const title = (p.title || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const tag = (p.tag || '').toLowerCase();

      const matchesCategory = catActive === 'tutti' || cat === catActive;
      const matchesSearch = !query || title.includes(query) || desc.includes(query) || cat.includes(query) || tag.includes(query);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400">
          <div class="text-3xl mb-2" aria-hidden="true">🌌</div>
          <p class="text-sm font-mono-code italic">Nessun progetto trovato con i criteri correnti.</p>
        </div>`;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const link = safeLink(p.link);
      const isExternal = isExternalLink(p.link);
      const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      const id = escapeHtml(p.id || '');
      const icon = typeof p.icon === 'string' && p.icon.length < 10 ? p.icon : '💠';
      const tag = p.tag && p.tag.trim() ? escapeHtml(p.tag) : 'X∞';
      const title = escapeHtml(p.title || 'Progetto Senza Titolo');
      const description = escapeHtml(p.description || 'Nessuna descrizione disponibile.');
      const category = escapeHtml(p.category || 'Generale');
      const hasLink = p.link && p.link.trim();

      return `
        <article ${id ? `id="${id}"` : ''} class="card-glass p-6 rounded-2xl flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-3xl transform group-hover:scale-110 transition-transform" aria-hidden="true">${icon}</span>
              <span class="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                ${tag}
              </span>
            </div>
            <span class="text-xs font-mono-code text-slate-400 uppercase tracking-wider">${category}</span>
            <h3 class="font-cinzel font-bold text-lg text-white group-hover:text-sky-300 transition-colors mt-1 mb-2">
              ${title}
            </h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-6 font-light">
              ${description}
            </p>
          </div>
          ${hasLink ? `
            <a href="${link}" ${targetAttr} class="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all">
              <span>Accedi al modulo</span>
              <span aria-hidden="true">→</span>
            </a>` : `
            <span class="text-xs text-slate-500 font-mono-code">Non ancora disponibile</span>
          `}
        </article>
      `;
    }).join('');
  }

  function updateFilterButtons(selected) {
    filterButtons.forEach(b => {
      b.classList.remove('bg-purple-600', 'text-white', 'border-purple-500');
      b.classList.add('bg-white/5', 'text-slate-400', 'border-white/10');
      b.setAttribute('aria-pressed', 'false');
    });
    if (selected) {
      selected.classList.add('bg-purple-600', 'text-white', 'border-purple-500');
      selected.classList.remove('bg-white/5', 'text-slate-400', 'border-white/10');
      selected.setAttribute('aria-pressed', 'true');
    }
  }

  if (filterButtons.length === 0) {
    console.warn('projects.js: nessun .filter-btn trovato nel DOM');
  }
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category || 'Tutti';
      updateFilterButtons(btn);
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(renderProjects, 150);
    });
  }

  loadProjects().catch(err => console.error('Errore fatale:', err));
});
