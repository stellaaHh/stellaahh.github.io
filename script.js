
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

const gallery = document.querySelector('.life-gallery');
const track = gallery ? gallery.querySelector('.life-track') : null;

if (gallery && track) {
  [...track.children].forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  let isDown = false;
  let startX = 0;
  let dragX = 0;
  let lastX = 0;

  const setDrag = (x) => {
    dragX = x;
    gallery.style.setProperty('--drag-x', `${x}px`);
  };

  gallery.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    setDrag(dragX - event.deltaY);
    event.preventDefault();
  }, { passive: false });

  gallery.addEventListener('pointerdown', (event) => {
    isDown = true;
    startX = event.clientX;
    lastX = dragX;
    gallery.classList.add('is-dragging');
    gallery.setPointerCapture(event.pointerId);
  });

  gallery.addEventListener('pointermove', (event) => {
    if (!isDown) return;
    setDrag(lastX + (event.clientX - startX));
  });

  const stopDrag = () => {
    isDown = false;
    gallery.classList.remove('is-dragging');
  };

  gallery.addEventListener('pointerup', stopDrag);
  gallery.addEventListener('pointercancel', stopDrag);
}
