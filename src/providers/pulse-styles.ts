const STYLE_ID = 'an-pulse-keyframes';

export function injectPulseStyles(): void {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
@keyframes an-pulse-ring {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes an-card-pulse {
  0% { transform: scale(0); opacity: 0.5; }
  100% { transform: scale(4); opacity: 0; }
}`;
  document.head.appendChild(style);
}

export function createCardPulse(e: MouseEvent, card: HTMLElement, color: string): void {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const size = Math.max(rect.width, rect.height) * 0.4;

  const el = document.createElement('span');
  Object.assign(el.style, {
    position: 'absolute',
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: color,
    opacity: '0.3',
    pointerEvents: 'none',
    zIndex: '5',
    animation: 'an-card-pulse 600ms ease-out forwards',
  });

  card.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

let colorIndex = 0;

export function createPulseElement(x: number, y: number, container: HTMLElement): void {
  const colors = [
    getComputedStyle(container).getPropertyValue('--an-color-primary').trim(),
    getComputedStyle(container).getPropertyValue('--an-color-secondary').trim(),
    getComputedStyle(container).getPropertyValue('--an-color-info').trim(),
    getComputedStyle(container).getPropertyValue('--an-color-pink').trim(),
    getComputedStyle(container).getPropertyValue('--an-color-accent').trim(),
  ];

  const color = colors[colorIndex % colors.length] || '#FD9450';
  colorIndex++;

  const el = document.createElement('span');
  Object.assign(el.style, {
    position: 'fixed',
    left: `${x - 20}px`,
    top: `${y - 20}px`,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `2px solid ${color}`,
    pointerEvents: 'none',
    zIndex: '99999',
    animation: 'an-pulse-ring 600ms ease-out forwards',
  });

  container.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
