const scrollWrapper = document.getElementById('scrollWrapper');
const container = document.getElementById('scrollContainer');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const offsetTop = container.offsetTop;
  const screenHeight = window.innerHeight;
  const totalScrollHeight = screenHeight * 4;
  const totalHorizontalScroll = window.innerWidth * 5;
  const relativeScroll = scrollTop - offsetTop;
  if (relativeScroll >= 0 && relativeScroll <= totalScrollHeight) {
    const progress = relativeScroll / totalScrollHeight;
    scrollWrapper.style.transform = `translateX(-${progress * totalHorizontalScroll}px)`;
  }
});
document.querySelectorAll('.fade').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });