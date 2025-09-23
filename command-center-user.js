// 用户端指挥中心交互功能

document.addEventListener('DOMContentLoaded', function() {
  initializeUserCommandCenter();
});

function initializeUserCommandCenter() {
  // 初始化标签页切换
  initializeTabs();
  
  // 初始化飞行器选择
  initializeAircraftSelection();
  
  // 初始化表单验证
  initializeFormValidation();
  
  // 设置默认时间
  setDefaultDateTime();
}

// 标签页切换功能
function showTab(tabName) {
  // 隐藏所有标签页内容
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // 移除所有标签页的激活状态
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // 显示选中的标签页
  document.getElementById(tabName + '-tab').classList.add('active');
  
  // 激活对应的标签按钮
  event.target.classList.add('active');
}

// 飞行器选择功能
function initializeAircraftSelection() {
  const aircraftCards = document.querySelectorAll('.aircraft-card');
  
  aircraftCards.forEach(card => {
    card.addEventListener('click', function() {
      // 移除所有选中状态
      aircraftCards.forEach(c => c.classList.remove('selected'));
      
      // 添加选中状态到当前卡片
      this.classList.add('selected');
      
      // 更新价格显示
      updatePriceDisplay();
    });
  });
}

// 更新价格显示
function updatePriceDisplay() {
  const selectedAircraft = document.querySelector('.aircraft-card.selected');
  const passengers = parseInt(document.getElementById('passengers').value) || 1;
  
  if (selectedAircraft) {
    const priceText = selectedAircraft.querySelector('.price').textContent;
    const pricePerPerson = parseInt(priceText.replace(/[¥,]/g, ''));
    const totalPrice = pricePerPerson * passengers;
    
    // 这里可以添加价格显示逻辑
    console.log(`总价格: ¥${totalPrice}`);
  }
}

// 表单验证
function initializeFormValidation() {
  const form = document.querySelector('.booking-form');
  const inputs = form.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    input.addEventListener('change', validateForm);
  });
}

function validateForm() {
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const departureTime = document.getElementById('departure-time').value;
  const passengers = document.getElementById('passengers').value;
  
  const isValid = departure && destination && departureTime && passengers;
  
  const submitBtn = document.querySelector('.btn-primary');
  submitBtn.disabled = !isValid;
  
  if (isValid) {
    submitBtn.classList.add('btn-enabled');
  } else {
    submitBtn.classList.remove('btn-enabled');
  }
}

// 设置默认时间
function setDefaultDateTime() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  
  const datetimeString = tomorrow.toISOString().slice(0, 16);
  document.getElementById('departure-time').value = datetimeString;
}

// 确认预订
function confirmBooking() {
  const departure = document.getElementById('departure').value;
  const destination = document.getElementById('destination').value;
  const departureTime = document.getElementById('departure-time').value;
  const passengers = document.getElementById('passengers').value;
  const specialRequirements = document.getElementById('special-requirements').value;
  
  const selectedAircraft = document.querySelector('.aircraft-card.selected');
  const aircraftType = selectedAircraft ? selectedAircraft.dataset.type : 'medium';
  
  if (!departure || !destination || !departureTime || !passengers) {
    showNotification('请填写完整的预订信息', 'error');
    return;
  }
  
  if (departure === destination) {
    showNotification('出发地和目的地不能相同', 'error');
    return;
  }
  
  // 生成航班号
  const flightNumber = generateFlightNumber();
  
  // 计算价格
  const pricePerPerson = getAircraftPrice(aircraftType);
  const totalPrice = pricePerPerson * parseInt(passengers);
  
  // 创建预订数据
  const bookingData = {
    flightNumber: flightNumber,
    departure: departure,
    destination: destination,
    departureTime: departureTime,
    passengers: passengers,
    aircraftType: aircraftType,
    specialRequirements: specialRequirements,
    totalPrice: totalPrice,
    status: 'booked',
    bookingTime: new Date().toISOString()
  };
  
  // 保存到本地存储
  saveBooking(bookingData);
  
  // 显示成功消息
  showNotification(`预订成功！航班号: ${flightNumber}`, 'success');
  
  // 切换到订单页面
  setTimeout(() => {
    showTab('orders');
    loadOrders();
  }, 2000);
}

// 生成航班号
function generateFlightNumber() {
  const chars = '0123456789abcdef';
  let result = '#';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 获取飞行器价格
function getAircraftPrice(type) {
  const prices = {
    'light': 299,
    'medium': 399,
    'luxury': 599
  };
  return prices[type] || 399;
}

// 保存预订
function saveBooking(bookingData) {
  let bookings = JSON.parse(localStorage.getItem('evtolBookings') || '[]');
  bookings.push(bookingData);
  localStorage.setItem('evtolBookings', JSON.stringify(bookings));
}

// 加载订单
function loadOrders() {
  const bookings = JSON.parse(localStorage.getItem('evtolBookings') || '[]');
  const ordersList = document.querySelector('.orders-list');
  
  if (bookings.length === 0) {
    ordersList.innerHTML = '<div class="no-orders">暂无订单</div>';
    return;
  }
  
  ordersList.innerHTML = bookings.map(booking => `
    <div class="order-card">
      <div class="order-status ${booking.status}">${getStatusText(booking.status)}</div>
      <div class="order-details">
        <div class="flight-info">
          <div class="aircraft-type">${getAircraftTypeText(booking.aircraftType)}</div>
          <div class="flight-number">${booking.flightNumber}</div>
        </div>
        <div class="route-info">
          <div class="location">${getLocationName(booking.departure)}</div>
          <div class="route-connector">✈️</div>
          <div class="location">${getLocationName(booking.destination)}</div>
        </div>
        <div class="time-info">
          <span class="time">${formatDateTime(booking.departureTime)}</span>
          <span class="passengers">${booking.passengers}人</span>
        </div>
        <div class="cost">¥${booking.totalPrice}</div>
      </div>
      <button class="btn-secondary" onclick="viewOrderDetails('${booking.flightNumber}')">查看详情</button>
    </div>
  `).join('');
}

// 获取状态文本
function getStatusText(status) {
  const statusMap = {
    'booked': '已预订',
    'confirmed': '已确认',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || '未知';
}

// 获取飞行器类型文本
function getAircraftTypeText(type) {
  const typeMap = {
    'light': '轻型eVTOL',
    'medium': '中型eVTOL',
    'luxury': '豪华eVTOL'
  };
  return typeMap[type] || '中型eVTOL';
}

// 获取地点名称
function getLocationName(code) {
  const locationMap = {
    'beijing-cbd': '北京CBD',
    'shanghai-lujiazui': '上海陆家嘴',
    'shenzhen-qianhai': '深圳前海',
    'guangzhou-tianhe': '广州天河',
    'hangzhou-binjiang': '杭州滨江'
  };
  return locationMap[code] || code;
}

// 格式化日期时间
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${month}月${day}日 ${hours}:${minutes}`;
}

// 查看订单详情
function viewOrderDetails(flightNumber) {
  const bookings = JSON.parse(localStorage.getItem('evtolBookings') || '[]');
  const booking = bookings.find(b => b.flightNumber === flightNumber);
  
  if (!booking) {
    showNotification('订单不存在', 'error');
    return;
  }
  
  // 显示模态框
  showOrderModal(booking);
}

// 显示订单模态框
function showOrderModal(booking) {
  const modal = document.getElementById('order-modal');
  const modalBody = modal.querySelector('.modal-body');
  
  modalBody.innerHTML = `
    <div class="flight-details">
      <div class="aircraft-info">
        <div class="aircraft-icon">✈️</div>
        <span>${getAircraftTypeText(booking.aircraftType)}</span>
      </div>
      <div class="flight-number">航班号: ${booking.flightNumber}</div>
      
      <div class="route-details">
        <div class="location-detail">
          <div class="location-icon">📍</div>
          <div class="location-info">
            <div class="location-name">${getLocationName(booking.departure)}</div>
            <div class="time-label">出发时间</div>
            <div class="time-value">${formatFullDateTime(booking.departureTime)}</div>
          </div>
        </div>
        
        <div class="route-connector">
          <div class="flight-line">✈️</div>
        </div>
        
        <div class="location-detail">
          <div class="location-icon">📍</div>
          <div class="location-info">
            <div class="location-name">${getLocationName(booking.destination)}</div>
            <div class="time-label">预计到达</div>
            <div class="time-value">${formatFullDateTime(getArrivalTime(booking.departureTime, booking.aircraftType))}</div>
          </div>
        </div>
      </div>

      <div class="flight-summary">
        <div class="summary-item">
          <div class="summary-icon">👥</div>
          <div class="summary-info">
            <div class="summary-label">乘客数量</div>
            <div class="summary-value">${booking.passengers}人</div>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-icon">⏱️</div>
          <div class="summary-info">
            <div class="summary-label">飞行时长</div>
            <div class="summary-value">${getFlightDuration(booking.aircraftType)}分钟</div>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-icon">💳</div>
          <div class="summary-info">
            <div class="summary-label">总费用</div>
            <div class="summary-value">¥${booking.totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
}

// 关闭模态框
function closeModal() {
  document.getElementById('order-modal').style.display = 'none';
}

// 格式化完整日期时间
function formatFullDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

// 获取到达时间
function getArrivalTime(departureTime, aircraftType) {
  const departure = new Date(departureTime);
  const duration = getFlightDuration(aircraftType);
  const arrival = new Date(departure.getTime() + duration * 60000);
  return arrival.toISOString();
}

// 获取飞行时长
function getFlightDuration(type) {
  const durations = {
    'light': 15,
    'medium': 12,
    'luxury': 10
  };
  return durations[type] || 12;
}

// 显示通知
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// 初始化标签页
function initializeTabs() {
  // 默认显示预订页面
  showTab('booking');
}
