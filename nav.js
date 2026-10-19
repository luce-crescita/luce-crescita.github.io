/* ==========================================================================
   Luce e Crescita X∞ — Navigazione condivisa
   Autore: Mastropaolo Antonello Salvatore
   Edizione: 2026
   Uso: <script src="nav.js" defer></script>
   ========================================================================== */
(function () {
    'use strict';

    function initNav() {
        var btn = document.getElementById('mobileMenuBtn');
        var menu = document.getElementById('mobileMenu');

        if (!btn || !menu) return;

        function closeMenu() {
            menu.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
        }

        function openMenu() {
            menu.classList.remove('hidden');
            btn.setAttribute('aria-expanded', 'true');
        }

        function toggleMenu() {
            var isOpen = !menu.classList.contains('hidden');
            if (isOpen) closeMenu();
            else openMenu();
        }

        btn.addEventListener('click', toggleMenu);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
                closeMenu();
                btn.focus();
            }
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        var mq = window.matchMedia('(min-width: 1024px)');
        if (mq.addEventListener) {
            mq.addEventListener('change', function (e) {
                if (e.matches) closeMenu();
            });
        } else if (mq.addListener) {
            mq.addListener(function (e) {
                if (e.matches) closeMenu();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
