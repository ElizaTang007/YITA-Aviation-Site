// 市场平台交互逻辑
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  initializeFilters();
  initializeProductActions();
  initializeViewToggle();
  initializePagination();
  initializeCart();
});

// 初始化搜索功能
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  searchBtn.addEventListener('click', function() {
    performSearch(searchInput.value);
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });
}

// 执行搜索
function performSearch(query) {
  if (!query.trim()) {
    showNotification('请输入搜索关键词', 'error');
    return;
  }
  
  showNotification(`正在搜索: ${query}`, 'info');
  
  // 模拟搜索延迟
  setTimeout(() => {
    const results = Math.floor(Math.random() * 50) + 10;
    showNotification(`找到 ${results} 个相关产品`, 'success');
    
    // 更新产品数量
    document.querySelector('.product-count').textContent = `共 ${results} 个产品`;
  }, 1000);
}

// 初始化筛选功能
function initializeFilters() {
  const filterItems = document.querySelectorAll('.filter-item input');
  const priceSlider = document.querySelector('.price-slider');
  
  filterItems.forEach(item => {
    item.addEventListener('change', function() {
      applyFilters();
    });
  });
  
  priceSlider.addEventListener('input', function() {
    updatePriceRange(this.value);
  });
  
  priceSlider.addEventListener('change', function() {
    applyFilters();
  });
}

// 更新价格范围显示
function updatePriceRange(value) {
  const priceRange = document.querySelector('.price-range');
  const formattedValue = new Intl.NumberFormat('zh-CN').format(value);
  priceRange.innerHTML = `<span>¥0</span><span>¥${formattedValue}</span>`;
}

// 应用筛选
function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('.category-filters input:checked'))
    .map(input => input.closest('.filter-item').textContent.trim());
  
  const selectedBrands = Array.from(document.querySelectorAll('.brand-filters input:checked'))
    .map(input => input.closest('.filter-item').textContent.trim());
  
  const maxPrice = document.querySelector('.price-slider').value;
  
  showNotification('正在应用筛选条件...', 'info');
  
  setTimeout(() => {
    const results = Math.floor(Math.random() * 20) + 5;
    showNotification(`筛选结果: ${results} 个产品`, 'success');
  }, 500);
}

// 初始化产品操作
function initializeProductActions() {
  // 收藏按钮
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      toggleFavorite(this);
    });
  });
  
  // 加入购物车按钮
  const addToCartBtns = document.querySelectorAll('.product-actions .btn-primary');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      addToCart(this);
    });
  });
  
  // 详情按钮
  const detailBtns = document.querySelectorAll('.product-actions .btn-secondary');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      showProductDetail(this);
    });
  });
}

// 切换收藏状态
function toggleFavorite(btn) {
  const isFavorited = btn.textContent === '❤';
  
  if (isFavorited) {
    btn.textContent = '♡';
    showNotification('已取消收藏', 'info');
  } else {
    btn.textContent = '❤';
    btn.style.background = 'rgba(255, 107, 107, 0.8)';
    showNotification('已添加到收藏', 'success');
  }
}

// 添加到购物车
function addToCart(btn) {
  const productCard = btn.closest('.product-card');
  const productName = productCard.querySelector('h3').textContent;
  const productPrice = productCard.querySelector('.price').textContent;
  const productImage = productCard.querySelector('img').src;
  
  // 更新购物车数量
  const cartCount = document.querySelector('.user-info');
  const currentCount = parseInt(cartCount.textContent.match(/\d+/)[0]);
  cartCount.textContent = `购物车 (${currentCount + 1})`;
  
  showNotification(`${productName} 已添加到购物车`, 'success');
  
  // 这里可以实际添加到购物车数据中
  addToCartData(productName, productPrice, productImage);
}

// 添加到购物车数据
function addToCartData(name, price, image) {
  // 模拟购物车数据存储
  const cartItem = {
    name: name,
    price: price,
    image: image,
    quantity: 1
  };
  
  console.log('添加到购物车:', cartItem);
}

// 显示产品详情
function showProductDetail(btn) {
  const productCard = btn.closest('.product-card');
  const productName = productCard.querySelector('h3').textContent;
  
  showNotification(`正在打开 ${productName} 详情页面...`, 'info');
  
  // 这里可以跳转到产品详情页面
  setTimeout(() => {
    showNotification('产品详情页面已在新窗口打开', 'success');
  }, 1000);
}

// 初始化视图切换
function initializeViewToggle() {
  const viewToggles = document.querySelectorAll('.view-toggle');
  const productGrid = document.getElementById('product-grid');
  
  viewToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const view = this.getAttribute('data-view');
      
      // 更新按钮状态
      viewToggles.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 切换视图
      if (view === 'list') {
        productGrid.style.gridTemplateColumns = '1fr';
        productGrid.classList.add('list-view');
      } else {
        productGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
        productGrid.classList.remove('list-view');
      }
    });
  });
}

// 初始化分页
function initializePagination() {
  const pageBtns = document.querySelectorAll('.page-btn');
  
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.disabled) return;
      
      // 更新按钮状态
      pageBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const page = this.textContent;
      showNotification(`正在加载第 ${page} 页...`, 'info');
      
      setTimeout(() => {
        showNotification(`第 ${page} 页加载完成`, 'success');
      }, 1000);
    });
  });
}

// 初始化购物车
function initializeCart() {
  // 购物车数量按钮
  const cartCount = document.querySelector('.user-info');
  cartCount.addEventListener('click', function() {
    toggleCart();
  });
  
  // 购物车关闭按钮
  const cartClose = document.querySelector('.cart-close');
  cartClose.addEventListener('click', function() {
    toggleCart();
  });
  
  // 购物车商品操作
  initializeCartItems();
}

// 切换购物车显示
function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.toggle('open');
}

// 初始化购物车商品操作
function initializeCartItems() {
  // 数量按钮
  const qtyBtns = document.querySelectorAll('.qty-btn');
  qtyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const quantitySpan = this.parentNode.querySelector('span');
      let quantity = parseInt(quantitySpan.textContent);
      
      if (this.textContent === '+') {
        quantity++;
      } else if (this.textContent === '-' && quantity > 1) {
        quantity--;
      }
      
      quantitySpan.textContent = quantity;
      updateCartTotal();
    });
  });
  
  // 删除按钮
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const productName = cartItem.querySelector('h4').textContent;
      
      cartItem.remove();
      updateCartTotal();
      updateCartCount();
      
      showNotification(`${productName} 已从购物车移除`, 'info');
    });
  });
  
  // 结算按钮
  const checkoutBtn = document.querySelector('.cart-footer .btn-primary');
  checkoutBtn.addEventListener('click', function() {
    showNotification('正在跳转到结算页面...', 'info');
    
    setTimeout(() => {
      showNotification('结算页面已打开', 'success');
    }, 1000);
  });
}

// 更新购物车总价
function updateCartTotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;
  
  cartItems.forEach(item => {
    const price = parseInt(item.querySelector('.cart-item-price').textContent.replace(/[^0-9]/g, ''));
    const quantity = parseInt(item.querySelector('.cart-item-quantity span').textContent);
    total += price * quantity;
  });
  
  const totalPrice = document.querySelector('.total-price');
  totalPrice.textContent = `¥${total.toLocaleString()}`;
}

// 更新购物车数量
function updateCartCount() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartCount = document.querySelector('.user-info');
  cartCount.textContent = `购物车 (${cartItems.length})`;
}

// 排序功能
function initializeSorting() {
  const sortSelect = document.querySelector('.sort-select');
  sortSelect.addEventListener('change', function() {
    const sortBy = this.value;
    showNotification(`正在按 ${this.options[this.selectedIndex].text} 排序...`, 'info');
    
    setTimeout(() => {
      showNotification('排序完成', 'success');
    }, 1000);
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

// 添加列表视图样式
const style = document.createElement('style');
style.textContent = `
  .product-grid.list-view .product-card {
    display: flex;
    height: 200px;
  }
  
  .product-grid.list-view .product-image {
    width: 200px;
    height: 100%;
    flex-shrink: 0;
  }
  
  .product-grid.list-view .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

// 初始化排序功能
initializeSorting(); 