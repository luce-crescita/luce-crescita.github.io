
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let allProjects = [];
    let activeCategory = 'Tutti';

    // Caricamento asincrono sicuro da percorso relativo
    async function loadProjects() {
        try {
            const response = await fetch('./projects.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}: Impossibile reperire projects.json`);
            allProjects = await response.json();
            renderProjects();
        } catch (error) {
            console.error('Errore nel caricamento dei progetti:', error);
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12 text-slate-400">
                        <p class="text-base font-cinzel text-amber-200">Archivio temporaneamente non disponibile</p>
                        <p class="text-xs text-purple-400 mt-2 font-mono-code">${error.message}</p>
                        <p class="text-[11px] text-slate-500 mt-3 font-mono-code">Verifica che projects.json sia presente nella root del repository.</p>
                    </div>
                `;
            }
        }
    }

    // Rendering delle tessere dei progetti
    function renderProjects() {
        if (!container) return;
        
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const filtered = allProjects.filter(p => {
            const title = (p.title || '').toLowerCase();
            const desc = (p.description || '').toLowerCase();
            const cat = (p.category || '').toLowerCase();

            const matchesCategory = activeCategory === 'Tutti' || (p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
            const matchesSearch = !query || title.includes(query) || desc.includes(query) || cat.includes(query);

            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <div class="text-3xl mb-2">🌌</div>
                    <p class="text-sm font-mono-code italic">Nessun progetto trovato con i criteri correnti.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => {
            const isExternal = (p.link || '').startsWith('http');
            const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';

            return `
                <div class="card-glass p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:border-purple-400/50 hover:-translate-y-1">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-3xl transform group-hover:scale-110 transition-transform">${p.icon || '💠'}</span>
                            <span class="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                                ${p.tag || 'X∞'}
                            </span>
                        </div>
                        <span class="text-xs font-mono-code text-slate-400 uppercase tracking-wider">${p.category || 'Generale'}</span>
                        <h3 class="font-cinzel font-bold text-lg text-white group-hover:text-sky-300 transition-colors mt-1 mb-2">
                            ${p.title || 'Progetto Senza Titolo'}
                        </h3>
                        <p class="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                            ${p.description || 'Nessuna descrizione disponibile.'}
                        </p>
                    </div>
                    <a href="${p.link || '#'}" ${targetAttr} class="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all">
                        <span>Accedi al modulo</span>
                        <span>→</span>
                    </a>
                </div>
            `;
        }).join('');
    }

    // Gestione dei Filtri Categoria
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-purple-600', 'text-white', 'border-purple-500');
                b.classList.add('bg-white/5', 'text-slate-300', 'border-white/10');
            });
            btn.classList.add('bg-purple-600', 'text-white', 'border-purple-500');
            btn.classList.remove('bg-white/5', 'text-slate-300', 'border-white/10');

            activeCategory = btn.dataset.category || 'Tutti';
            renderProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', renderProjects);
    }

    loadProjects();
});
