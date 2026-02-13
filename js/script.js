const cover = document.getElementById('cover');
const btnArrow = document.getElementById('btn-arrow');
const content = document.getElementById('content');

btnArrow.addEventListener('click', () => {
  cover.classList.add('hidden');
  document.documentElement.classList.add('scrollable');
  content.classList.add('visible');
});
