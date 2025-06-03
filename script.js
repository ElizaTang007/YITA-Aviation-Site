// 横向滚动逻辑
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


// 滑入淡出动画逻辑
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 触发一次就不再监听
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));
});
