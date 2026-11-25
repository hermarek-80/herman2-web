const buttons = document.querySelectorAll('.filter');
const projects = [...document.querySelectorAll('.project')];
const count = document.querySelector('#workCount');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    let visible = 0;
    projects.forEach((project) => {
      const show = category === 'all' || project.dataset.category === category;
      project.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    count.textContent = visible;
  });
});

const slides = [...document.querySelectorAll('.hero-slide')];
const projectLabels = [...document.querySelectorAll('.hero-project')];
const dots = [...document.querySelectorAll('.hero-dot')];
const arrows = document.querySelectorAll('.hero-arrow');
let currentSlide = 0;
let carouselTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
  projectLabels.forEach((label, i) => label.classList.toggle('is-active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
}

function restartCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(currentSlide + 1), 6000);
}

arrows.forEach((arrow) => arrow.addEventListener('click', () => {
  showSlide(currentSlide + (arrow.dataset.direction === 'next' ? 1 : -1));
  restartCarousel();
}));
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restartCarousel(); }));
restartCarousel();
