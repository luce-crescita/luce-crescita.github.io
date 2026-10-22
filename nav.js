
/* ==========================================================================
   Luce e Crescita X∞ — Navigazione condivisa + pulsante Offrimi globale
   Autore: Mastropaolo Antonello Salvatore
   Edizione: 2026
   Uso: <script src="nav.js" defer></script>
   ========================================================================== */
(function () {
    'use strict';

    function initNav() {
        var btn = document.getElementById('mobileMenuBtn');
        var menu = document.getElementById('mobileMenu');

        if (btn && menu) {
            function closeMenu() {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            function openMenu() {
                menu.classList.remove('hidden');
                btn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
            function toggleMenu() {
                var isOpen = !menu.classList.contains('hidden');
                if (isOpen) closeMenu();
                else openMenu();
            }

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu();
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
                    closeMenu();
                    btn.focus();
                }
            });

            document.addEventListener('click', function (e) {
                if (menu.classList.contains('hidden')) return;
                if (menu.contains(e.target) || btn.contains(e.target)) return;
                closeMenu();
            });

            menu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () { closeMenu(); });
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
    }

    function injectOffrimi() {
        if (document.getElementById('globalOffrimi')) return;
        var a = document.createElement('a');
        a.id = 'globalOffrimi';
        a.href = 'https://ko-fi.com/luceecrescita';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = 'Offrimi';
        a.setAttribute('aria-label', 'Sostieni il progetto su Ko-fi');
        document.body.appendChild(a);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initNav();
            injectOffrimi();
        });
    } else {
        initNav();
        injectOffrimi();
    }
})();
