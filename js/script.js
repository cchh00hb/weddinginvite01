/* ============================================
   CONFIGURATION
   ============================================ */
const WEDDING_DATE = new Date('2026-09-12T14:00:00');

/* ============================================
   ELEMENTS
   ============================================ */
const intro = document.getElementById('intro');
const btnOuvrir = document.getElementById('btn-ouvrir');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');

/* ============================================
   BOUTON OUVRIR - Transition intro -> contenu
   ============================================ */
btnOuvrir.addEventListener('click', () => {
  // Lancer la musique
  if (bgMusic) {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {
      // Le navigateur peut bloquer l'autoplay,
      // la musique se lancera au prochain geste utilisateur
    });
  }

  // Animer la couverture vers le haut
  intro.classList.add('hidden');

  // Permettre le scroll et afficher le contenu
  document.documentElement.classList.add('scrollable');
  mainContent.classList.add('visible');

  // Déclencher la vérification initiale des reveals
  setTimeout(() => {
    checkReveals();
  }, 500);
});

/* ============================================
   COUNTDOWN TIMER
   ============================================ */
function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    document.getElementById('countdown-days').textContent = '0';
    document.getElementById('countdown-hours').textContent = '0';
    document.getElementById('countdown-minutes').textContent = '0';
    document.getElementById('countdown-seconds').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('countdown-days').textContent = days;
  document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
}

// Mettre à jour chaque seconde
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================
   SCROLL REVEAL
   ============================================ */
function checkReveals() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const revealPoint = windowHeight - 80;

    if (top < revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', checkReveals, { passive: true });
