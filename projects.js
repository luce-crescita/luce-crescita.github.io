
/* =========================================================
   INNOVATIONPORTFOLIO X∞ 2.0.2
   DIRECT PROJECT DATABASE ENGINE
   100 FUTURE TECHNOLOGY CONCEPTS
   DIGITAL PARTICLE CORE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       DATABASE CONTAINER
       ===================================================== */

    const container =
        document.getElementById("project-database") ||
        document.getElementById("projects-container");

    const databaseStatus =
        document.getElementById("database-status");


    /* =====================================================
       CONTAINER CHECK
       ===================================================== */

    if (!container) {

        console.error(
            "X∞ ERROR: database container not found."
        );

        return;
    }


    /* =====================================================
       X∞ PROJECT DATABASE
       ===================================================== */

    const projects = [

        {
            id: "001",
            title: "CERES-NET",
            category: "AgroBot-Share",
            description: "Rete futura di micro-robot agricoli autonomi alimentati da sistemi sostenibili per la gestione intelligente delle coltivazioni.",
            status: "AGRICULTURE AI • ROBOTICS • GREEN ENERGY"
        },

        {
            id: "002",
            title: "ZEUS-SHIELD",
            category: "Atmo Static Ion-Harvester",
            description: "Concept di piattaforme aerostatiche avanzate per la ricerca di nuove forme di raccolta energetica atmosferica.",
            status: "FUTURE ENERGY • ATMOSPHERE"
        },

        {
            id: "003",
            title: "ANTI-FRAUD NET",
            category: "AI Deep-Fake Shield",
            description: "Sistema concettuale di sicurezza digitale per identificazione di possibili clonazioni vocali e facciali tramite AI.",
            status: "AI • CYBER SECURITY • BIOMETRICS"
        },

        {
            id: "004",
            title: "URBAN-MINING",
            category: "Eco-Extract Network",
            description: "Recupero intelligente di materiali strategici da rifiuti tecnologici attraverso processi automatizzati.",
            status: "CIRCULAR ECONOMY • ECO TECH"
        },

        {
            id: "005",
            title: "SUB-DELIVERY CAPSULES",
            category: "Pneumatic City Mesh",
            description: "Visione futura di una rete sotterranea automatizzata per piccoli trasporti urbani.",
            status: "SMART CITY • LOGISTICS"
        },

        {
            id: "006",
            title: "MYCO-STRUCTURE",
            category: "Bio Synthetic Building Mesh",
            description: "Concept edilizio basato su biomateriali avanzati e costruzioni sostenibili.",
            status: "BIOTECH • FUTURE BUILDING"
        },

        {
            id: "007",
            title: "CARBON-CAPTURE NODES",
            category: "Graphite Transmute System",
            description: "Infrastrutture urbane concettuali per filtrazione CO₂ e nuovi materiali.",
            status: "CLIMATE TECH • MATERIAL SCIENCE"
        },

        {
            id: "008",
            title: "AQUA-DESAL FILTER",
            category: "Graphene Mesh Grid",
            description: "Tecnologia futura dedicata alla gestione sostenibile delle risorse idriche.",
            status: "WATER TECH • NANOTECH"
        },

        {
            id: "009",
            title: "NEURO-LINK LEARNING",
            category: "Synaptic Sync Hub",
            description: "Concept software orientato a nuovi modelli di apprendimento digitale.",
            status: "NEUROTECH • AI LEARNING"
        },

        {
            id: "010",
            title: "MAG-LEV ORBITAL RAMP",
            category: "Kinetic Launch Mesh",
            description: "Visione futuristica di infrastrutture magnetiche per sistemi spaziali avanzati.",
            status: "SPACE TECH • MAGNETISM"
        },

        {
            id: "011",
            title: "FIN-DATA FRACTION",
            category: "Yield Intelligence Mesh",
            description: "Concept di sistemi digitali avanzati per analisi automatizzata dei dati economici e gestione intelligente delle informazioni.",
            status: "FINTECH • DATA AI • AUTOMATION"
        },

        {
            id: "012",
            title: "POWER-FLOW SHARING",
            category: "Virtual Energy Grid",
            description: "Visione di una futura rete digitale per la condivisione intelligente del surplus energetico distribuito.",
            status: "ENERGY • SMART GRID • P2P"
        },

        {
            id: "013",
            title: "AQUA-GEN CONDENSER",
            category: "Atmospheric Water Mesh",
            description: "Sistema concettuale per raccolta futura dell'acqua atmosferica tramite soluzioni biomimetiche.",
            status: "WATER TECH • BIOMIMETICS"
        },

        {
            id: "014",
            title: "SMART-LOGISTICS ROUTING",
            category: "Predictive Delivery Grid",
            description: "Software predittivo per ottimizzazione futura dei flussi logistici.",
            status: "AI • LOGISTICS • BIG DATA"
        },

        {
            id: "015",
            title: "BIO-LUME URBAN LIGHTING",
            category: "Phytoplankton City Glow",
            description: "Concept di illuminazione urbana sostenibile ispirata ai processi biologici luminosi.",
            status: "BIOTECH • SMART CITY"
        },

        {
            id: "016",
            title: "SOUND-HARVESTING BARRIERS",
            category: "Acoustic Eco Grid",
            description: "Infrastrutture intelligenti future capaci di integrare controllo acustico e recupero energetico.",
            status: "ACOUSTIC TECH • ENERGY"
        },

        {
            id: "017",
            title: "AGRO-PREDICT COMMODITIES",
            category: "Crop Intelligence AI",
            description: "Piattaforma concettuale basata su dati climatici e analisi predittiva agricola.",
            status: "AGRITECH • AI • SAAS"
        },

        {
            id: "018",
            title: "LOCAL-BLOCK CHAIN DELIVERY",
            category: "Micro Courier Hub",
            description: "Rete digitale collaborativa per scenari futuri di consegna locale decentralizzata.",
            status: "BLOCKCHAIN • DELIVERY"
        },

        {
            id: "019",
            title: "HELIO-GLASS COATING",
            category: "Photovoltaic Liquid Grid",
            description: "Concept di materiali avanzati per trasformare superfici trasparenti in elementi energetici.",
            status: "SOLAR TECH • NANOMATERIALS"
        },

        {
            id: "020",
            title: "ROBO-WASTE SORTING",
            category: "AI Trash Ranger",
            description: "Sistema robotico intelligente per la futura separazione automatizzata dei materiali.",
            status: "ROBOTICS • AI • RECYCLING"
        },

        {
            id: "021",
            title: "QUANTUM MEMORY VAULT",
            category: "Quantum Data Storage",
            description: "Archivio concettuale basato su tecnologie future per la conservazione avanzata delle informazioni.",
            status: "QUANTUM • DATA • AI"
        },

        {
            id: "022",
            title: "AI MEDICAL SCANNER",
            category: "Future Healthcare",
            description: "Sistema intelligente per analisi preventive tramite sensori e intelligenza artificiale.",
            status: "MEDTECH • AI • DIAGNOSTICS"
        },

        {
            id: "023",
            title: "ORBITAL CLEANER NETWORK",
            category: "Space Environment",
            description: "Rete futura di sistemi robotici dedicati alla gestione dei detriti spaziali.",
            status: "SPACE TECH • ROBOTICS"
        },

        {
            id: "024",
            title: "NEURAL CITY CONTROL",
            category: "Smart City AI",
            description: "Sistema concettuale per coordinare infrastrutture urbane intelligenti.",
            status: "AI • SMART CITY"
        },

        {
            id: "025",
            title: "CRYSTAL ENERGY CORE",
            category: "Advanced Energy",
            description: "Concept di un nuovo sistema energetico ad alta efficienza.",
            status: "ENERGY • MATERIAL SCIENCE"
        },

        {
            id: "026",
            title: "AUTONOMOUS ECO FARM",
            category: "Agriculture Technology",
            description: "Fattoria futura automatizzata con robot e sistemi predittivi.",
            status: "AGRITECH • ROBOTICS"
        },

        {
            id: "027",
            title: "HOLOGRAPHIC LEARNING SPACE",
            category: "Education Technology",
            description: "Ambiente educativo immersivo basato su tecnologie olografiche.",
            status: "EDTECH • HOLOGRAMS"
        },

        {
            id: "028",
            title: "FUTURE TRANSPORT AI",
            category: "Mobility",
            description: "Sistema intelligente per ottimizzazione dei trasporti futuri.",
            status: "MOBILITY • AI"
        },

        {
            id: "029",
            title: "BIO AIR FILTER CITY",
            category: "Environmental Tech",
            description: "Rete urbana futura per migliorare la qualità dell'aria.",
            status: "GREEN TECH • BIOTECH"
        },

        {
            id: "030",
            title: "ROBOT COMPANION SYSTEM",
            category: "Personal Robotics",
            description: "Assistente robotico futuro per supporto quotidiano.",
            status: "ROBOTICS • AI"
        },

        {
            id: "031",
            title: "DIGITAL TWIN PLANET",
            category: "Earth Simulation AI",
            description: "Modello digitale avanzato del pianeta per analisi ambientali, urbane e climatiche future.",
            status: "AI • DIGITAL TWIN • EARTH TECH"
        },

        {
            id: "032",
            title: "NANO-REPAIR MATERIALS",
            category: "Self Healing Structures",
            description: "Concept di materiali intelligenti capaci di adattarsi e migliorare la durata delle infrastrutture.",
            status: "NANOTECH • MATERIAL SCIENCE"
        },

        {
            id: "033",
            title: "OCEAN CLEAN ROBOTS",
            category: "Marine Robotics",
            description: "Flotta robotica futura dedicata al monitoraggio e alla protezione degli ecosistemi marini.",
            status: "OCEAN TECH • ROBOTICS"
        },

        {
            id: "034",
            title: "AI CREATIVE ENGINE",
            category: "Synthetic Creativity",
            description: "Sistema concettuale per supportare la creazione digitale attraverso intelligenza artificiale.",
            status: "AI • CREATIVITY • DESIGN"
        },

        {
            id: "035",
            title: "ZERO WASTE FACTORY",
            category: "Circular Industry",
            description: "Fabbrica futura progettata per ridurre gli sprechi tramite automazione intelligente.",
            status: "INDUSTRY 5.0 • ECO TECH"
        },

        {
            id: "036",
            title: "LUNAR HABITAT NETWORK",
            category: "Moon Infrastructure",
            description: "Visione di strutture modulari future per ambienti extraterrestri.",
            status: "SPACE • HABITAT • ENGINEERING"
        },

        {
            id: "037",
            title: "SMART SKIN BUILDINGS",
            category: "Adaptive Architecture",
            description: "Edifici futuri con superfici intelligenti capaci di adattarsi all'ambiente.",
            status: "ARCHITECTURE • AI • ENERGY"
        },

        {
            id: "038",
            title: "PERSONAL AI MEMORY",
            category: "Digital Assistant Evolution",
            description: "Concept di assistente personale intelligente con memoria digitale avanzata.",
            status: "AI • PERSONAL TECHNOLOGY"
        },

        {
            id: "039",
            title: "GLOBAL WEATHER AI",
            category: "Climate Prediction",
            description: "Sistema futuro per analisi meteorologiche avanzate tramite grandi quantità di dati.",
            status: "CLIMATE AI • BIG DATA"
        },

        {
            id: "040",
            title: "BIO-ENERGY FOREST",
            category: "Living Energy System",
            description: "Concept di ecosistemi futuri integrati con tecnologie energetiche sostenibili.",
            status: "BIOTECH • GREEN ENERGY"
        },

        {
            id: "041",
            title: "QUANTUM COMMUNICATION GRID",
            category: "Quantum Network",
            description: "Concept di rete futura per comunicazioni ultra sicure basate su tecnologie quantistiche.",
            status: "QUANTUM • NETWORK • SECURITY"
        },

        {
            id: "042",
            title: "AI OCEAN MONITOR",
            category: "Marine Intelligence",
            description: "Sistema intelligente per analisi degli oceani e protezione degli ecosistemi marini.",
            status: "OCEAN TECH • AI • ENVIRONMENT"
        },

        {
            id: "043",
            title: "SOLAR SPACE COLLECTOR",
            category: "Orbital Energy",
            description: "Visione di strutture spaziali dedicate alla raccolta energetica solare futura.",
            status: "SPACE ENERGY • SOLAR TECH"
        },

        {
            id: "044",
            title: "ROBOTIC RESCUE NETWORK",
            category: "Emergency Robotics",
            description: "Rete di robot autonomi progettati per supportare operazioni di emergenza.",
            status: "ROBOTICS • SAFETY • AI"
        },

        {
            id: "045",
            title: "AI LANGUAGE BRIDGE",
            category: "Universal Communication",
            description: "Sistema concettuale per traduzione e comunicazione globale intelligente.",
            status: "AI • LANGUAGE • COMMUNICATION"
        },

        {
            id: "046",
            title: "FUTURE FOOD SYNTHESIS",
            category: "Food Technology",
            description: "Concept di produzione alimentare sostenibile tramite tecnologie avanzate.",
            status: "BIOTECH • FOOD TECH"
        },

        {
            id: "047",
            title: "SMART ROAD NETWORK",
            category: "Intelligent Infrastructure",
            description: "Infrastrutture stradali future con sensori e gestione automatizzata.",
            status: "SMART CITY • MOBILITY"
        },

        {
            id: "048",
            title: "AI SPACE NAVIGATOR",
            category: "Autonomous Space AI",
            description: "Sistema intelligente per supporto alla navigazione e missioni spaziali.",
            status: "SPACE • ARTIFICIAL INTELLIGENCE"
        },

        {
            id: "049",
            title: "LIVING WALL ENERGY",
            category: "Bio Architecture",
            description: "Pareti urbane future integrate con sistemi biologici ed energetici.",
            status: "BIOTECH • ARCHITECTURE"
        },

        {
            id: "050",
            title: "HUMAN DIGITAL ARCHIVE",
            category: "Knowledge Preservation",
            description: "Archivio digitale concettuale per conservazione della conoscenza umana.",
            status: "AI • DATA • HISTORY"
        },

        {
            id: "051",
            title: "AI OCEAN FARM",
            category: "Marine Agriculture",
            description: "Concept di coltivazioni marine intelligenti integrate con sistemi automatizzati.",
            status: "BIOTECH • OCEAN TECH • AI"
        },

        {
            id: "052",
            title: "ENERGY STORAGE CRYSTAL",
            category: "Advanced Battery Concept",
            description: "Visione futura di sistemi di accumulo energetico basati su nuovi materiali.",
            status: "ENERGY • MATERIAL SCIENCE"
        },

        {
            id: "053",
            title: "AUTONOMOUS CITY GUARDIAN",
            category: "Urban Safety AI",
            description: "Sistema concettuale di monitoraggio urbano intelligente per città future.",
            status: "AI • SMART CITY • SECURITY"
        },

        {
            id: "054",
            title: "ATMOSPHERIC RESEARCH DRONES",
            category: "Climate Observation",
            description: "Rete di droni avanzati per analisi dell'atmosfera e del clima.",
            status: "DRONES • CLIMATE TECH"
        },

        {
            id: "055",
            title: "AI INVENTION LAB",
            category: "Innovation Engine",
            description: "Piattaforma futura per generazione e sviluppo di nuovi concept tecnologici.",
            status: "AI • RESEARCH • INNOVATION"
        },

        {
            id: "056",
            title: "UNDERGROUND SMART HABITAT",
            category: "Future Living",
            description: "Concept abitativo sotterraneo intelligente per ambienti estremi.",
            status: "ARCHITECTURE • SMART HABITAT"
        },

        {
            id: "057",
            title: "BIO ROBOTIC ASSISTANT",
            category: "Human Support Robotics",
            description: "Robotica futura ispirata a sistemi biologici per assistenza avanzata.",
            status: "ROBOTICS • BIOTECH"
        },

        {
            id: "058",
            title: "GLOBAL KNOWLEDGE CLOUD",
            category: "Digital Intelligence",
            description: "Archivio globale concettuale per condivisione della conoscenza.",
            status: "AI • CLOUD • DATA"
        },

        {
            id: "059",
            title: "FUSION ENERGY LAB",
            category: "Future Energy Research",
            description: "Visione di laboratori avanzati dedicati alla ricerca energetica futura.",
            status: "FUSION • ENERGY • SCIENCE"
        },

        {
            id: "060",
            title: "PLANET RESTORATION AI",
            category: "Environmental Intelligence",
            description: "Sistema futuro per supportare il recupero degli ecosistemi terrestri.",
            status: "AI • ECOLOGY • CLIMATE"
        },

        {
            id: "061",
            title: "AI SPACE WEATHER NETWORK",
            category: "Solar Monitoring AI",
            description: "Sistema futuro per analisi delle condizioni spaziali e attività solari.",
            status: "SPACE • AI • CLIMATE DATA"
        },

        {
            id: "062",
            title: "SMART OCEAN CITY",
            category: "Floating Infrastructure",
            description: "Concept di città galleggianti intelligenti integrate con tecnologie sostenibili.",
            status: "SMART CITY • OCEAN TECH"
        },

        {
            id: "063",
            title: "NEURAL CREATIVE STUDIO",
            category: "AI Design Platform",
            description: "Ambiente digitale futuro per supportare progettazione e creatività.",
            status: "AI • DESIGN • CREATIVITY"
        },

        {
            id: "064",
            title: "AUTONOMOUS DELIVERY SKY",
            category: "Aerial Logistics",
            description: "Rete futura di trasporto aereo automatizzato per consegne intelligenti.",
            status: "DRONES • LOGISTICS • AI"
        },

        {
            id: "065",
            title: "BIO SYNTHETIC MATERIAL LAB",
            category: "Future Materials",
            description: "Laboratorio concettuale per sviluppo di materiali bio-sintetici avanzati.",
            status: "BIOTECH • MATERIAL SCIENCE"
        },

        {
            id: "066",
            title: "AI FOREST PROTECTOR",
            category: "Environmental Robotics",
            description: "Sistema intelligente per monitoraggio e protezione delle foreste.",
            status: "ECOLOGY • ROBOTICS • AI"
        },

        {
            id: "067",
            title: "QUANTUM ENERGY STORAGE",
            category: "Quantum Power",
            description: "Concept di accumulo energetico basato su principi tecnologici futuri.",
            status: "QUANTUM • ENERGY"
        },

        {
            id: "068",
            title: "DIGITAL HERITAGE ARCHIVE",
            category: "Cultural Technology",
            description: "Archivio digitale futuro per conservazione del patrimonio umano.",
            status: "AI • DATA • CULTURE"
        },

        {
            id: "069",
            title: "ROBOTIC SPACE BUILDER",
            category: "Orbital Construction",
            description: "Robot autonomi progettati per costruzione di infrastrutture spaziali.",
            status: "SPACE • ROBOTICS"
        },

        {
            id: "070",
            title: "AI TRAFFIC INTELLIGENCE",
            category: "Mobility Network",
            description: "Sistema predittivo per gestione intelligente della mobilità urbana.",
            status: "AI • TRANSPORT • SMART CITY"
        },

        {
            id: "071",
            title: "PERSONAL HEALTH AI",
            category: "Future Wellness",
            description: "Assistente digitale concettuale per monitoraggio personale intelligente.",
            status: "AI • HEALTH TECH"
        },

        {
            id: "072",
            title: "HYDROGEN CITY GRID",
            category: "Clean Energy",
            description: "Visione di infrastrutture urbane alimentate da sistemi energetici futuri.",
            status: "HYDROGEN • ENERGY • CITY"
        },

        {
            id: "073",
            title: "AI OCEAN EXPLORER",
            category: "Deep Sea Technology",
            description: "Sistema robotico per esplorazione degli ambienti oceanici profondi.",
            status: "ROBOTICS • OCEAN TECH"
        },

        {
            id: "074",
            title: "HOLO-CONFERENCE WORLD",
            category: "Virtual Communication",
            description: "Spazio digitale immersivo per comunicazioni tridimensionali future.",
            status: "HOLOGRAMS • AI • COMMUNICATION"
        },

        {
            id: "075",
            title: "SELF ADAPTIVE ROBOTS",
            category: "Evolutionary Robotics",
            description: "Robot futuri capaci di adattarsi a differenti ambienti operativi.",
            status: "ROBOTICS • MACHINE LEARNING"
        },

        {
            id: "076",
            title: "CLIMATE REPAIR SYSTEM",
            category: "Environmental Engineering",
            description: "Concept di tecnologie future dedicate al supporto degli ecosistemi.",
            status: "CLIMATE TECH • AI"
        },

        {
            id: "077",
            title: "AI KNOWLEDGE ENGINE",
            category: "Universal Learning",
            description: "Motore intelligente per organizzazione e diffusione della conoscenza.",
            status: "AI • EDUCATION • DATA"
        },

        {
            id: "078",
            title: "FUTURE SPACE ELEVATOR",
            category: "Orbital Transport",
            description: "Visione futuristica di infrastrutture per collegamenti spaziali.",
            status: "SPACE • ENGINEERING"
        },

        {
            id: "079",
            title: "BIO DIGITAL INTERFACE",
            category: "Human Technology",
            description: "Concept di interfacce avanzate tra sistemi biologici e digitali.",
            status: "BIOTECH • AI"
        },

        {
            id: "080",
            title: "GLOBAL AI OBSERVATORY",
            category: "Planet Intelligence",
            description: "Sistema globale concettuale per analisi e comprensione dei dati terrestri.",
            status: "AI • DATA • FUTURE SCIENCE"
        },

        {
            id: "081",
            title: "AI GALAXY MAP",
            category: "Space Intelligence",
            description: "Sistema futuro per analisi e rappresentazione avanzata dello spazio conosciuto.",
            status: "SPACE • AI • DATA"
        },

        {
            id: "082",
            title: "SMART ENERGY WINDOWS",
            category: "Transparent Solar Technology",
            description: "Concept di superfici trasparenti capaci di contribuire alla produzione energetica.",
            status: "SOLAR TECH • MATERIALS"
        },

        {
            id: "083",
            title: "ROBOTIC AGRICULTURE NETWORK",
            category: "Autonomous Farming",
            description: "Rete agricola futura con robot intelligenti e gestione automatizzata delle colture.",
            status: "AGRITECH • ROBOTICS"
        },

        {
            id: "084",
            title: "AI OCEAN RESTORATION",
            category: "Marine Ecosystem AI",
            description: "Tecnologia concettuale per supportare il recupero degli ambienti marini.",
            status: "OCEAN TECH • AI"
        },

        {
            id: "085",
            title: "FUTURE CITY BRAIN",
            category: "Urban Intelligence",
            description: "Sistema centrale intelligente per coordinare servizi e infrastrutture urbane.",
            status: "AI • SMART CITY"
        },

        {
            id: "086",
            title: "NANO MEDICAL ROBOTS",
            category: "Future Medicine",
            description: "Concept di micro sistemi robotici per applicazioni mediche future.",
            status: "NANOTECH • MEDTECH"
        },

        {
            id: "087",
            title: "AI SPACE COLONY MANAGER",
            category: "Extra Planetary Systems",
            description: "Sistema intelligente per gestione di future colonie spaziali.",
            status: "SPACE • AI • HABITAT"
        },

        {
            id: "088",
            title: "DIGITAL MEMORY EARTH",
            category: "Planetary Archive",
            description: "Archivio digitale concettuale della storia e dei cambiamenti del pianeta.",
            status: "DATA • AI • EARTH"
        },

        {
            id: "089",
            title: "AUTONOMOUS CLEAN CITY",
            category: "Urban Robotics",
            description: "Rete robotica futura per gestione intelligente della pulizia urbana.",
            status: "ROBOTICS • ECO TECH"
        },

        {
            id: "090",
            title: "AI INVENTION NETWORK",
            category: "Global Innovation",
            description: "Sistema futuro per collegare idee, ricerca e sviluppo tecnologico.",
            status: "AI • INNOVATION"
        },

        {
            id: "091",
            title: "QUANTUM INTERNET HUB",
            category: "Future Connectivity",
            description: "Concept di infrastruttura digitale basata su comunicazioni avanzate.",
            status: "QUANTUM • NETWORK"
        },

        {
            id: "092",
            title: "BIO LIGHT ARCHITECTURE",
            category: "Living Buildings",
            description: "Edifici futuri ispirati a sistemi biologici luminosi.",
            status: "BIOTECH • ARCHITECTURE"
        },

        {
            id: "093",
            title: "AI DEEP SPACE SIGNAL",
            category: "Cosmic Communication",
            description: "Sistema concettuale per analisi e gestione di segnali spaziali.",
            status: "SPACE • COMMUNICATION"
        },

        {
            id: "094",
            title: "FUTURE WATER GENERATOR",
            category: "Atmospheric Resources",
            description: "Tecnologia futura per gestione intelligente delle risorse idriche.",
            status: "WATER TECH • AI"
        },

        {
            id: "095",
            title: "ROBOTIC CONSTRUCTION SWARM",
            category: "Future Building",
            description: "Sciame di robot progettati per costruzioni automatizzate.",
            status: "ROBOTICS • ENGINEERING"
        },

        {
            id: "096",
            title: "AI EMOTION INTERFACE",
            category: "Human Computer Interaction",
            description: "Concept di interazione avanzata tra persone e sistemi intelligenti.",
            status: "AI • INTERFACE"
        },

        {
            id: "097",
            title: "PLANETARY DEFENSE SYSTEM",
            category: "Space Protection",
            description: "Visione futura di sistemi per monitoraggio e protezione planetaria.",
            status: "SPACE • TECHNOLOGY"
        },

        {
            id: "098",
            title: "GLOBAL ECO AI",
            category: "Environmental Intelligence",
            description: "Rete intelligente per analisi ambientale globale.",
            status: "AI • ECOLOGY"
        },

        {
            id: "099",
            title: "INFINITE LEARNING CLOUD",
            category: "Future Education",
            description: "Piattaforma concettuale per apprendimento continuo tramite AI.",
            status: "AI • EDUCATION"
        },

        {
            id: "100",
            title: "X∞ FUTURE CORE",
            category: "Innovation Singularity Archive",
            description: "Progetto simbolico che rappresenta l'archivio definitivo delle visioni tecnologiche future.",
            status: "INNOVATIONPORTFOLIO X∞ • FUTURE 2050+"
        }

    ];


    /* =====================================================
       HTML SECURITY
       ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       RENDER DATABASE
       ===================================================== */

    function renderProjects() {

        container.innerHTML = "";

        projects.forEach((project) => {

            const card =
                document.createElement("article");

            card.className =
                "project-card";

            card.dataset.projectId =
                project.id;

            card.innerHTML = `
                <div class="project-code">
                    X∞-${escapeHTML(project.id)}
                </div>

                <h3>
                    ${escapeHTML(project.title)}
                </h3>

                <h4>
                    ${escapeHTML(project.category)}
                </h4>

                <p>
                    ${escapeHTML(project.description)}
                </p>

                <span class="project-status">
                    ${escapeHTML(project.status)}
                </span>
            `;

            container.appendChild(card);

        });


        /* =================================================
           UPDATE COUNTERS
           ================================================= */

        document
            .querySelectorAll("[data-project-count]")
            .forEach(counter => {

                counter.textContent =
                    projects.length;

            });


        /* =================================================
           UPDATE DATABASE STATUS
           ================================================= */

        if (databaseStatus) {

            databaseStatus.textContent =
                `DATABASE ONLINE • ${projects.length} PROJECTS`;

            databaseStatus.dataset.state =
                "online";
        }


        console.log(
            `X∞ DATABASE ONLINE — ${projects.length} PROJECTS LOADED`
        );

    }


    /* =====================================================
       DATABASE INITIALIZATION
       ===================================================== */

    if (projects.length === 100) {

        renderProjects();

    } else {

        if (databaseStatus) {

            databaseStatus.textContent =
                "DATABASE ERROR";

            databaseStatus.dataset.state =
                "error";

        }

        console.error(
            `X∞ DATABASE ERROR — ${projects.length} PROJECTS FOUND`
        );

    }


    /* =====================================================
       X∞ DIGITAL PARTICLE CORE
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
       PARTICLE SYSTEM
       ===================================================== */

    let width = 0;
    let height = 0;

    let animationFrame = null;

    const particles = [];

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const particleCount =
        reducedMotion ? 35 : 95;

    const connectionDistance =
        120;


    /* =====================================================
       CANVAS RESIZE
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

        particles.forEach(particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            if (particle.x < -10) {

                particle.x =
                    width + 10;

            }


            if (particle.x > width + 10) {

                particle.x =
                    -10;

            }


            if (particle.y < -10) {

                particle.y =
                    height + 10;

            }


            if (particle.y > height + 10) {

                particle.y =
                    -10;

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

            ctx.shadowBlur =
                8;

            ctx.shadowColor =
                "rgba(0,229,255,.8)";

            ctx.fill();

        });

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
       START PARTICLE CORE
       ===================================================== */

    resizeCanvas();

    createParticles();

    animate();


    /* =====================================================
       RESPONSIVE RESIZE
       ===================================================== */

    let resizeTimer = null;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

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


    /* =====================================================
       FINAL SYSTEM STATUS
       ===================================================== */

    console.log(
        "========================================"
    );

    console.log(
        "X∞ INNOVATIONPORTFOLIO 2.0.2"
    );

    console.log(
        "X∞ DATABASE ONLINE"
    );

    console.log(
        `X∞ PROJECTS: ${projects.length}`
    );

    console.log(
        "X∞ DIGITAL PARTICLE CORE ONLINE"
    );

    console.log(
        "========================================"
    );

});
