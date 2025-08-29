// 开发者门户交互逻辑
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeCodeCopy();
  initializeSDKDownloads();
  initializeSandboxDemo();
  initializeStatsAnimation();
});

// 初始化导航
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.dev-nav-link');
  const sections = document.querySelectorAll('.dev-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      
      // 更新导航状态
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // 显示对应部分
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
          section.classList.add('active');
        }
      });
      
      // 平滑滚动到顶部
      document.querySelector('.dev-main-content').scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
}

// 初始化代码复制功能
function initializeCodeCopy() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  
  copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;
      
      // 复制到剪贴板
      navigator.clipboard.writeText(code).then(() => {
        // 显示成功提示
        const originalText = this.textContent;
        this.textContent = '已复制';
        this.style.background = '#27ca3f';
        this.style.color = '#ffffff';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = '';
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('复制失败:', err);
        showNotification('复制失败，请手动复制', 'error');
      });
    });
  });
}

// 初始化SDK下载
function initializeSDKDownloads() {
  const downloadBtns = document.querySelectorAll('.sdk-actions .btn-primary');
  
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const sdkCard = this.closest('.sdk-card');
      const sdkName = sdkCard.querySelector('h3').textContent;
      const sdkVersion = sdkCard.querySelector('.sdk-version').textContent;
      
      // 模拟下载
      showNotification(`正在下载 ${sdkName} ${sdkVersion}...`, 'info');
      
      setTimeout(() => {
        showNotification(`${sdkName} 下载完成！`, 'success');
      }, 2000);
    });
  });
  
  const docBtns = document.querySelectorAll('.sdk-actions .btn-secondary');
  docBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const sdkCard = this.closest('.sdk-card');
      const sdkName = sdkCard.querySelector('h3').textContent;
      
      showNotification(`正在打开 ${sdkName} 文档...`, 'info');
      
      // 这里可以跳转到具体的文档页面
      setTimeout(() => {
        showNotification(`${sdkName} 文档已在新窗口打开`, 'success');
      }, 1000);
    });
  });
}

// 初始化沙盒演示
function initializeSandboxDemo() {
  const startBtn = document.querySelector('.demo-controls .btn-primary');
  const resetBtn = document.querySelector('.demo-controls .btn-secondary');
  const demoCanvas = document.querySelector('.demo-canvas');
  
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      startSandboxDemo();
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      resetSandboxDemo();
    });
  }
}

// 启动沙盒演示
function startSandboxDemo() {
  const demoCanvas = document.querySelector('.demo-canvas');
  const startBtn = document.querySelector('.demo-controls .btn-primary');
  
  // 更新按钮状态
  startBtn.textContent = '运行中...';
  startBtn.disabled = true;
  
  // 创建3D场景占位符
  demoCanvas.innerHTML = `
    <div class="sandbox-scene">
      <div class="scene-header">
        <span class="scene-title">3D 沙盒环境</span>
        <div class="scene-controls">
          <span class="control-item">视角: 自由</span>
          <span class="control-item">设备: 1台</span>
          <span class="control-item">状态: 运行中</span>
        </div>
      </div>
      <div class="scene-content">
        <div class="drone-model">🚁</div>
        <div class="waypoint" style="left: 20%; top: 30%">📍</div>
        <div class="waypoint" style="left: 60%; top: 50%">📍</div>
        <div class="waypoint" style="left: 80%; top: 20%">📍</div>
        <div class="flight-path"></div>
      </div>
    </div>
  `;
  
  // 添加动画效果
  const drone = demoCanvas.querySelector('.drone-model');
  const path = demoCanvas.querySelector('.flight-path');
  
  // 飞行路径动画
  let progress = 0;
  const animate = () => {
    progress += 0.01;
    if (progress <= 1) {
      const x = 20 + (60 * progress);
      const y = 30 + (20 * Math.sin(progress * Math.PI * 2));
      drone.style.left = `${x}%`;
      drone.style.top = `${y}%`;
      requestAnimationFrame(animate);
    } else {
      showNotification('沙盒演示完成！', 'success');
      startBtn.textContent = '重新启动';
      startBtn.disabled = false;
    }
  };
  
  animate();
  
  showNotification('沙盒环境已启动', 'info');
}

// 重置沙盒演示
function resetSandboxDemo() {
  const demoCanvas = document.querySelector('.demo-canvas');
  const startBtn = document.querySelector('.demo-controls .btn-primary');
  
  // 恢复原始状态
  demoCanvas.innerHTML = `
    <div class="demo-placeholder">
      <div class="demo-overlay">
        <span class="demo-icon">🎮</span>
        <span>3D 沙盒环境</span>
        <p>点击启动按钮开始体验</p>
      </div>
    </div>
  `;
  
  startBtn.textContent = '启动';
  startBtn.disabled = false;
  
  showNotification('沙盒环境已重置', 'info');
}

// 初始化统计数字动画
function initializeStatsAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// 数字动画
function animateNumber(element) {
  const finalValue = element.textContent;
  const isPercentage = finalValue.includes('%');
  const isPlus = finalValue.includes('+');
  
  let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
  let currentValue = 0;
  const increment = numericValue / 50;
  
  const animate = () => {
    currentValue += increment;
    if (currentValue < numericValue) {
      let displayValue = Math.floor(currentValue);
      if (isPercentage) {
        element.textContent = `${displayValue}%`;
      } else if (isPlus) {
        element.textContent = `${displayValue.toLocaleString()}+`;
      } else {
        element.textContent = displayValue.toLocaleString();
      }
      requestAnimationFrame(animate);
    } else {
      element.textContent = finalValue;
    }
  };
  
  animate();
}

// 概览卡片交互
function initializeOverviewCards() {
  const overviewCards = document.querySelectorAll('.overview-card');
  
  overviewCards.forEach(card => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', function() {
      const cardTitle = card.querySelector('h3').textContent;
      
      switch(cardTitle) {
        case '快速上手':
          showNotification('正在跳转到快速上手教程...', 'info');
          setTimeout(() => {
            document.querySelector('[href="#tutorials"]').click();
          }, 1000);
          break;
        case '完整文档':
          showNotification('正在打开文档中心...', 'info');
          setTimeout(() => {
            document.querySelector('[href="#docs"]').click();
          }, 1000);
          break;
        case '开发工具':
          showNotification('正在跳转到SDK下载...', 'info');
          setTimeout(() => {
            document.querySelector('[href="#sdk"]').click();
          }, 1000);
          break;
        case '沙盒环境':
          showNotification('正在进入沙盒环境...', 'info');
          setTimeout(() => {
            document.querySelector('[href="#sandbox"]').click();
          }, 1000);
          break;
      }
    });
  });
}

// 通知系统
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#27ca3f' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
    color: ${type === 'success' ? '#ffffff' : type === 'error' ? '#ffffff' : '#000000'};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 4000);
}

// 添加沙盒场景样式
const style = document.createElement('style');
style.textContent = `
  .sandbox-scene {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    position: relative;
    overflow: hidden;
  }
  
  .scene-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }
  
  .scene-title {
    color: #ffffff;
    font-weight: 600;
  }
  
  .scene-controls {
    display: flex;
    gap: 1rem;
  }
  
  .control-item {
    color: #cccccc;
    font-size: 0.875rem;
  }
  
  .scene-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .drone-model {
    position: absolute;
    font-size: 2rem;
    transition: all 0.1s ease;
    z-index: 5;
  }
  
  .waypoint {
    position: absolute;
    font-size: 1.5rem;
    z-index: 3;
  }
  
  .flight-path {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 49%, rgba(0, 212, 255, 0.3) 50%, transparent 51%);
    background-size: 20px 20px;
    animation: pathMove 2s linear infinite;
    z-index: 2;
  }
  
  @keyframes pathMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 20px;
    }
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    cursor: pointer;
    margin-left: 1rem;
  }
`;
document.head.appendChild(style);

// 初始化概览卡片
initializeOverviewCards(); 