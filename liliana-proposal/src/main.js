import './style.css';
import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const flap = document.getElementById('flap');
  const card = document.getElementById('card');
  const instruction = document.getElementById('instruction');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const rejectionMessage = document.getElementById('rejectionMessage');

  let isOpen = false;

  // Open Envelope
  envelopeWrapper.addEventListener('click', () => {
    if (!isOpen) {
      openEnvelope();
    }
  });

  function openEnvelope() {
    isOpen = true;
    flap.classList.add('open');
    instruction.style.opacity = '0';

    // Wait for flap animation then slide card
    setTimeout(() => {
      card.classList.add('open');
      // If mobile, checking styles to see if we apply special classes or just rely on CSS
      if (window.innerWidth <= 600) {
        envelopeWrapper.classList.add('open');
      }
    }, 500);
  }

  // Yes Button - Confetti
  btnYes.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerConfetti();
    // Maybe change text or show love
    document.querySelector('.question').innerText = "¡Sabía que dirías que sí! Te amo ❤️";
    btnYes.style.display = 'none';
    btnNo.style.display = 'none';
  });

  // No Button - Message
  btnNo.addEventListener('click', (e) => {
    e.stopPropagation();
    showRejection();
  });

  function showRejection() {
    rejectionMessage.style.display = 'block';
    rejectionMessage.classList.add('bounce');
  }

  function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Also one big blast immediately
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
});
