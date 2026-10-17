
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
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            allProjects = await response.json();
            renderProjects();
        } catch (error) {
            console.error('Errore nel caricamento dei progetti:', error);
            if (container) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12 text-slate-400">
                        <p class="text-lg">Caricamento dell'archivio in corso o archivio temporaneamente offline.</p>
                        <p class="text-xs text-purple-400 mt-2 font-mono-code">${error.message}</p>
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
            const matchesCategory = activeCategory === 'Tutti' || p.category === activeCategory;
            const matchesSearch = p.title.toLowerCase().includes(query) || 
                                  p.description.toLowerCase().includes(query) ||
                                  p.category.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <p class="text-base italic">Nessun progetto trovato con i criteri attuali.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(p => `
            <div class="card-glass p-6 rounded-2xl flex flex-col justify-between group">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-3xl transform group-hover:scale-110 transition-transform">${p.icon}</span>
                        <span class="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                            ${p.tag}
                        </span>
                    </div>
                    <span class="text-xs font-mono-code text-slate-400 uppercase tracking-wider">${p.category}</span>
                    <h3 class="font-cinzel font-bold text-lg text-white group-hover:text-sky-300 transition-colors mt-1 mb-2">
                        ${p.title}
                    </h3>
                    <p class="text-xs text-slate-300 leading-relaxed mb-6">
                        ${p.description}
                    </p>
                </div>
                <a href="${p.link}" class="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all">
                    <span>Accedi al progetto</span>
                    <span>→</span>
                </a>
            </div>
        `).join('');
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
