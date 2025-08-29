// 标签切换功能
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const authForms = document.querySelectorAll('.auth-form');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // 移除所有活动状态
      tabBtns.forEach(b => b.classList.remove('active'));
      authForms.forEach(form => form.classList.remove('active'));
      
      // 添加活动状态
      this.classList.add('active');
      document.getElementById(targetTab + '-form').classList.add('active');
    });
  });

  // 表单提交处理
  const loginForm = document.querySelector('#login-form form');
  const registerForm = document.querySelector('#register-form form');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleLogin();
  });

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleRegister();
  });

  // 密码确认验证
  const registerPassword = document.getElementById('register-password');
  const registerConfirm = document.getElementById('register-confirm');

  registerConfirm.addEventListener('input', function() {
    if (this.value !== registerPassword.value) {
      this.setCustomValidity('密码不匹配');
    } else {
      this.setCustomValidity('');
    }
  });

  // 社交登录按钮
  const socialBtns = document.querySelectorAll('.btn-social');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      handleSocialLogin(this.textContent.trim());
    });
  });
});

// 登录处理
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const remember = document.querySelector('#login-form input[type="checkbox"]').checked;

  // 显示加载状态
  const submitBtn = document.querySelector('#login-form button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '登录中...';
  submitBtn.disabled = true;

  // 模拟API调用
  setTimeout(() => {
    // 这里应该是实际的API调用
    console.log('登录信息:', { email, password, remember });
    
    // 模拟成功登录
    showNotification('登录成功！正在跳转...', 'success');
    
    // 存储登录状态
    if (remember) {
      localStorage.setItem('yita_user', JSON.stringify({ email, loggedIn: true }));
    } else {
      sessionStorage.setItem('yita_user', JSON.stringify({ email, loggedIn: true }));
    }
    
    // 跳转到主页
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    
  }, 2000);
}

// 注册处理
function handleRegister() {
  const formData = {
    firstname: document.getElementById('register-firstname').value,
    lastname: document.getElementById('register-lastname').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-password').value,
    role: document.getElementById('register-role').value
  };

  // 显示加载状态
  const submitBtn = document.querySelector('#register-form button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '创建账户中...';
  submitBtn.disabled = true;

  // 模拟API调用
  setTimeout(() => {
    // 这里应该是实际的API调用
    console.log('注册信息:', formData);
    
    // 模拟成功注册
    showNotification('账户创建成功！请登录您的邮箱验证账户。', 'success');
    
    // 切换到登录标签
    document.querySelector('[data-tab="login"]').click();
    
    // 恢复按钮状态
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
  }, 2000);
}

// 社交登录处理
function handleSocialLogin(provider) {
  console.log('社交登录:', provider);
  
  // 模拟社交登录
  showNotification(`正在通过 ${provider} 登录...`, 'info');
  
  setTimeout(() => {
    showNotification(`${provider} 登录成功！`, 'success');
    
    // 存储登录状态
    localStorage.setItem('yita_user', JSON.stringify({ 
      email: `user@${provider.toLowerCase()}.com`, 
      loggedIn: true,
      provider: provider 
    }));
    
    // 跳转到主页
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  }, 2000);
}

// 通知系统
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // 添加样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff6b6b' : '#666666'};
    color: ${type === 'success' ? '#000000' : '#ffffff'};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // 添加到页面
  document.body.appendChild(notification);
  
  // 显示动画
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // 关闭按钮
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  // 自动关闭
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// 表单验证
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff6b6b';
      isValid = false;
    } else {
      input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });
  
  return isValid;
}

// 密码强度检查
function checkPasswordStrength(password) {
  const strength = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };
  
  const score = Object.values(strength).filter(Boolean).length;
  
  return {
    score,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
    details: strength
  };
}

// 实时密码强度显示
document.getElementById('register-password')?.addEventListener('input', function() {
  const strength = checkPasswordStrength(this.value);
  const strengthIndicator = document.querySelector('.password-strength') || createPasswordStrengthIndicator();
  
  strengthIndicator.className = `password-strength strength-${strength.strength}`;
  strengthIndicator.textContent = `密码强度: ${strength.strength === 'weak' ? '弱' : strength.strength === 'medium' ? '中' : '强'}`;
});

function createPasswordStrengthIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'password-strength';
  indicator.style.cssText = `
    font-size: 0.875rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    text-align: center;
  `;
  
  document.getElementById('register-password').parentNode.appendChild(indicator);
  return indicator;
}

// 添加密码强度样式
const style = document.createElement('style');
style.textContent = `
  .password-strength {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    text-align: center;
  }
  
  .strength-weak {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
  }
  
  .strength-medium {
    background: rgba(255, 189, 46, 0.2);
    color: #ffbd2e;
  }
  
  .strength-strong {
    background: rgba(0, 212, 255, 0.2);
    color: #00d4ff;
  }
`;
document.head.appendChild(style); 