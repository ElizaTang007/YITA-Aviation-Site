// 性能优化：节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 导航栏滚动效果（使用节流优化）
window.addEventListener('scroll', throttle(function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
  }
}, 16));

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 滚动动画
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.tech-item, .feature-card, .solution-card, .career-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// 平台预览动画
function animatePlatformPreview() {
  const screenItems = document.querySelectorAll('.screen-item');
  const indicators = document.querySelectorAll('.indicator');
  
  // 如果元素不存在，直接返回
  if (screenItems.length === 0 || indicators.length === 0) {
    return;
  }
  
  let currentIndex = 0;
  
  setInterval(() => {
    // 重置所有屏幕
    screenItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 激活当前屏幕
    if (screenItems[currentIndex] && indicators[currentIndex]) {
      screenItems[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
    }
    
    // 更新索引
    currentIndex = (currentIndex + 1) % screenItems.length;
  }, 2000);
}

// 技术数字动画
function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) {
    return;
  }
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
    const suffix = stat.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 30);
  });
}

// 应用商店动画
function animateAppStore() {
  const appItems = document.querySelectorAll('.app-item');
  
  if (appItems.length === 0) {
    return;
  }
  
  appItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transform = 'scale(1.05)';
      setTimeout(() => {
        item.style.transform = 'scale(1)';
      }, 200);
    }, index * 200);
  });
}

// 页面加载完成后启动动画
document.addEventListener('DOMContentLoaded', function() {
  // 启动平台预览动画
  setTimeout(animatePlatformPreview, 1000);
  
  // 观察统计数字
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  // 观察应用商店
  const appStore = document.querySelector('.app-store');
  if (appStore) {
    const appStoreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateAppStore();
          appStoreObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    appStoreObserver.observe(appStore);
  }
});

// 按钮点击效果
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
  button.addEventListener('click', function(e) {
    // 创建涟漪效果
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// 添加涟漪效果样式
const style = document.createElement('style');
style.textContent = `
  .btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// 鼠标跟随效果
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    const cursorElement = document.createElement('div');
    cursorElement.className = 'cursor';
    cursorElement.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursorElement);
  }
  
  const cursorElement = document.querySelector('.cursor');
  cursorElement.style.left = e.clientX - 10 + 'px';
  cursorElement.style.top = e.clientY - 10 + 'px';
});

// 悬停效果
document.addEventListener('mouseover', function(e) {
  if (e.target.matches('.btn-primary, .btn-secondary, .nav-link, .feature-card, .tech-item, .solution-card, .career-card')) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'rgba(0, 212, 255, 0.8)';
    }
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.matches('.btn-primary, .btn-secondary, .nav-link, .feature-card, .tech-item, .solution-card, .career-card')) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'rgba(0, 212, 255, 0.5)';
    }
  }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.display = 'none';
    }
  }
});

document.addEventListener('mousedown', function() {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.transform = 'scale(0.8)';
  }
});

document.addEventListener('mouseup', function() {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.transform = 'scale(1)';
  }
});

// 性能优化：防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
  // 滚动相关的性能敏感操作
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// 预加载关键资源
function preloadCriticalResources() {
  // 预加载应用场景图片
  const criticalImages = [
    'images/team.jpg',
    'images/bridge.jpg',
    'images/drone-inspection.jpg',
    'images/evtol-transport.jpg',
    'images/logistics-delivery.jpg',
    'images/emergency-rescue.jpg',
    'images/agriculture-spraying.jpg',
    'images/survey-mapping.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// 图片懒加载
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 性能监控
function initPerformanceMonitoring() {
  // 监控页面加载时间
  window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('页面加载时间:', loadTime + 'ms');
    
    // 如果加载时间过长，可以显示优化提示
    if (loadTime > 3000) {
      console.warn('页面加载时间较长，建议优化');
    }
  });
}

// 页面加载完成后预加载资源
window.addEventListener('load', preloadCriticalResources);

// 滚动到指定区域
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// 市场平台滚动动画控制
let currentProductIndex = 0;
let isMarketplaceAnimating = false;
let isInMarketplaceArea = false;
let scrollStartY = 0;

function initMarketplaceScrollAnimation() {
  const marketplaceSection = document.getElementById('marketplace');
  const productItems = document.querySelectorAll('.product-item');
  
  if (!marketplaceSection || productItems.length === 0) {
    console.log('Marketplace section or product items not found');
    return;
  }
  
  console.log('Found', productItems.length, 'product items');
  
  // 初始化：只显示第一个产品
  productItems.forEach((item, index) => {
    if (index === 0) {
      item.classList.add('active');
    } else {
      item.classList.remove('active', 'prev');
    }
  });
  
  // 监听滚动事件
  window.addEventListener('scroll', () => {
    const rect = marketplaceSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
    
    // 进入市场平台区域
    if (isInView && !isInMarketplaceArea) {
      isInMarketplaceArea = true;
      scrollStartY = window.scrollY;
      console.log('Entered marketplace area');
    }
    
    // 离开市场平台区域
    if (!isInView && isInMarketplaceArea) {
      isInMarketplaceArea = false;
      console.log('Left marketplace area');
    }
    
    // 在市场平台区域内处理滚动
    if (isInView && isInMarketplaceArea && !isMarketplaceAnimating) {
      const scrollDelta = window.scrollY - scrollStartY;
      const sectionHeight = marketplaceSection.offsetHeight;
      const progress = Math.min(scrollDelta / (sectionHeight * 0.5), 1);
      
      // 根据滚动进度计算应该显示的产品
      const targetIndex = Math.min(Math.floor(progress * productItems.length), productItems.length - 1);
      
      if (targetIndex !== currentProductIndex && targetIndex < productItems.length) {
        console.log('Switching to product', targetIndex, 'progress:', progress);
        switchToProduct(targetIndex);
      }
    }
  });
}

function switchToProduct(targetIndex) {
  if (isMarketplaceAnimating) return;
  
  const productItems = document.querySelectorAll('.product-item');
  if (targetIndex < 0 || targetIndex >= productItems.length) return;
  
  isMarketplaceAnimating = true;
  
  // 移除所有产品的active和prev类
  productItems.forEach(item => {
    item.classList.remove('active', 'prev');
  });
  
  // 设置目标产品为active
  productItems[targetIndex].classList.add('active');
  
  // 设置之前的产品为prev（向左滑出）
  if (currentProductIndex < targetIndex) {
    for (let i = 0; i < targetIndex; i++) {
      productItems[i].classList.add('prev');
    }
  }
  
  currentProductIndex = targetIndex;
  
  console.log('Switched to product', currentProductIndex);
  
  setTimeout(() => {
    isMarketplaceAnimating = false;
  }, 800);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initMarketplaceScrollAnimation();
  initLanguageSwitcher();
  initLazyLoading();
  initPerformanceMonitoring();
  initMobileMenu();
});

// 移动端菜单功能
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const menuSection = document.querySelector('.menu-section');
  
  if (mobileToggle && menuSection) {
    mobileToggle.addEventListener('click', function() {
      menuSection.classList.toggle('mobile-active');
    });
  }
}

// 语言切换功能
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-option');

  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 移除所有active类
      langButtons.forEach(btn => btn.classList.remove('active'));
      // 添加active类到当前按钮
      this.classList.add('active');

      const lang = this.getAttribute('data-lang');
      console.log('切换到语言:', lang);

      // 根据当前页面和选择的语言进行跳转
      const currentPath = window.location.pathname;
      
      if (lang === 'en') {
        // 切换到英文版
        if (currentPath === '/' || currentPath === '/index.html') {
          window.location.href = '/index-en.html';
        } else {
          // 其他页面也跳转到英文首页
          window.location.href = '/index-en.html';
        }
      } else if (lang === 'zh') {
        // 切换到中文版
        if (currentPath === '/index-en.html') {
          window.location.href = '/';
        } else {
          // 其他页面也跳转到中文首页
          window.location.href = '/';
        }
      }
    });
  });
}

// 飞行体验注册弹窗功能
function openExperienceModal() {
  const modal = document.getElementById('experienceModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  }
}

function closeExperienceModal() {
  const modal = document.getElementById('experienceModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // 恢复滚动
  }
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
  const modal = document.getElementById('experienceModal');
  if (e.target === modal) {
    closeExperienceModal();
  }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeExperienceModal();
  }
});

// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
  const experienceForm = document.querySelector('.experience-form');
  if (experienceForm) {
    experienceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 收集表单数据
      const formData = new FormData(this);
      const data = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        phone: this.querySelector('input[type="tel"]').value,
        experienceTypes: Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
        preference: this.querySelector('select').value,
        notes: this.querySelector('textarea').value
      };
      
      // 验证必填字段
      if (!data.name || !data.email || !data.phone || !data.preference) {
        alert('请填写所有必填字段');
        return;
      }
      
      if (data.experienceTypes.length === 0) {
        alert('请至少选择一种体验类型');
        return;
      }
      
      // 模拟提交（实际项目中这里会发送到服务器）
      console.log('提交的体验申请数据:', data);
      
      // 显示成功消息
      alert('申请提交成功！我们将在24小时内联系您，为您安排专属的飞行体验。');
      
      // 关闭弹窗并重置表单
      closeExperienceModal();
      this.reset();
    });
  }
});

// 增强按钮交互效果
document.addEventListener('DOMContentLoaded', function() {
  const experienceBtn = document.querySelector('.entertainment-cta .btn-primary');
  if (experienceBtn) {
    experienceBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    experienceBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }
});

// 性能监控
function initPerformanceMonitoring() {
  // 监控页面加载时间
  window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);
    
    // 监控LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`最大内容绘制时间: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  });
}

// 初始化性能监控
initPerformanceMonitoring();
