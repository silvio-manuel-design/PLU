/**
 * PYTHON QUEST — Confetti System
 * Canvas-basiertes Particle System
 */

const COLORS = ['#306998', '#FFD43B', '#E67E22', '#27AE60', '#9B59B6', '#E74C3C', '#00D4FF'];
const PARTICLE_COUNT = 150;

let canvas = null;
let ctx = null;
let particles = [];
let animationId = null;

export function initConfetti() {
  canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  resizeCanvas();
  
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function fireConfetti() {
  if (!canvas || !ctx) initConfetti();
  if (!canvas || !ctx) return;
  
  particles = [];
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
  
  if (animationId) cancelAnimationFrame(animationId);
  animate();
}

function createParticle() {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 20,
    vy: (Math.random() - 1) * 20,
    size: Math.random() * 8 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.3,
    drag: 0.98,
    opacity: 1,
    fade: 0.005 + Math.random() * 0.01,
    shape: Math.random() > 0.5 ? 'circle' : 'rect'
  };
}

function animate() {
  if (!ctx || !canvas) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  let activeParticles = 0;
  
  particles.forEach(p => {
    if (p.opacity <= 0) return;
    activeParticles++;
    
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.rotation += p.rotationSpeed;
    p.opacity -= p.fade;
    
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    
    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    }
    
    ctx.restore();
  });
  
  if (activeParticles > 0) {
    animationId = requestAnimationFrame(animate);
  }
}
