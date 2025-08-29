// 初始化地图
let map;
let droneMarker;
let missionPath;

document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  initializeControls();
  startTelemetrySimulation();
});

// 初始化地图
function initializeMap() {
  // 创建地图实例
  map = L.map('map').setView([39.9042, 116.4074], 15);
  
  // 添加街道图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // 添加无人机标记
  const droneIcon = L.divIcon({
    html: '🚁',
    className: 'drone-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
  
  droneMarker = L.marker([39.9042, 116.4074], { icon: droneIcon }).addTo(map);
  
  // 添加起始点标记
  const homeIcon = L.divIcon({
    html: '🏠',
    className: 'home-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
  });
  
  L.marker([39.9042, 116.4074], { icon: homeIcon }).addTo(map);
  
  // 添加地理围栏
  const geofence = L.circle([39.9042, 116.4074], {
    color: '#00d4ff',
    fillColor: '#00d4ff',
    fillOpacity: 0.1,
    radius: 1000
  }).addTo(map);
}

// 初始化控制
function initializeControls() {
  // 游戏模式选择
  const modeItems = document.querySelectorAll('.mode-item');
  modeItems.forEach(item => {
    item.addEventListener('click', function() {
      modeItems.forEach(d => d.classList.remove('active'));
      this.classList.add('active');
      const modeName = this.querySelector('.mode-name').textContent;
      updateGameMode(modeName);
    });
  });

  // 设备选择
  const deviceItems = document.querySelectorAll('.device-item');
  deviceItems.forEach(item => {
    item.addEventListener('click', function() {
      deviceItems.forEach(d => d.classList.remove('active'));
      this.classList.add('active');
      const deviceName = this.querySelector('.device-name').textContent;
      updateSelectedDevice(deviceName);
    });
  });
  
  // 快速操作按钮
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      executeQuickAction(action);
    });
  });
  
  // 地图图层切换
  const mapBtns = document.querySelectorAll('.map-btn');
  mapBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      mapBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      switchMapLayer(this.getAttribute('data-layer'));
    });
  });
  
  // 任务步骤删除
  const stepRemoveBtns = document.querySelectorAll('.step-remove');
  stepRemoveBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const step = this.closest('.mission-step');
      step.remove();
      updateStepNumbers();
    });
  });
  
  // 添加步骤按钮
  const addStepBtn = document.querySelector('.add-step-btn');
  addStepBtn.addEventListener('click', addNewStep);
  
  // 执行任务按钮
  const executeBtn = document.querySelector('.panel-actions .btn-primary');
  executeBtn.addEventListener('click', executeMission);
  
  // 暂停任务按钮
  const pauseBtn = document.querySelector('.panel-actions .btn-secondary');
  pauseBtn.addEventListener('click', pauseMission);
}

// 更新游戏模式
function updateGameMode(modeName) {
  console.log('切换到模式:', modeName);
  showNotification(`已切换到${modeName}`, 'info');
  
  // 根据模式更新界面
  switch(modeName) {
    case '新手模式':
      updateTaskProgress('新手教程 - 基础飞行', 75);
      break;
    case '竞速模式':
      updateTaskProgress('竞速挑战 - 速度测试', 0);
      break;
    case '创意模式':
      updateTaskProgress('创意飞行 - 自由探索', 0);
      break;
  }
}

// 更新选中的设备
function updateSelectedDevice(deviceName) {
  console.log('选中设备:', deviceName);
  showNotification(`已选择${deviceName}`, 'info');
  // 这里可以更新遥测数据、地图标记等
}

// 更新任务进度
function updateTaskProgress(taskName, progress) {
  const taskNameElement = document.querySelector('.task-name');
  const progressFill = document.querySelector('.task-progress .progress-fill');
  const progressText = document.querySelector('.task-progress span');
  
  if (taskNameElement) taskNameElement.textContent = taskName;
  if (progressFill) progressFill.style.width = `${progress}%`;
  if (progressText) progressText.textContent = `${Math.floor(progress/25)}/4 步骤完成`;
}

// 执行快速操作
function executeQuickAction(action) {
  console.log('执行操作:', action);
  
  switch(action) {
    case 'takeoff':
      showNotification('🚀 无人机起飞中...', 'info');
      simulateTakeoff();
      break;
    case 'hover':
      showNotification('⏸️ 无人机悬停中...', 'info');
      simulateHover();
      break;
    case 'land':
      showNotification('🛬 无人机降落中...', 'info');
      simulateLanding();
      break;
    case 'photo':
      showNotification('📸 拍照完成！', 'success');
      simulatePhoto();
      break;
    case 'video':
      showNotification('🎥 开始录像...', 'info');
      simulateVideo();
      break;
    case 'emergency':
      showNotification('🚨 紧急停止已激活！', 'error');
      simulateEmergencyStop();
      break;
  }
}

// 切换地图图层
function switchMapLayer(layer) {
  // 移除现有图层
  map.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      map.removeLayer(layer);
    }
  });
  
  // 添加新图层
  switch(layer) {
    case 'satellite':
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
      }).addTo(map);
      break;
    case 'terrain':
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap'
      }).addTo(map);
      break;
    default:
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
  }
  
  // 重新添加标记
  droneMarker.addTo(map);
}

// 添加新步骤
function addNewStep() {
  const missionBuilder = document.querySelector('.mission-builder');
  const addStepBtn = document.querySelector('.add-step-btn');
  
  const newStep = document.createElement('div');
  newStep.className = 'mission-step';
  newStep.innerHTML = `
    <div class="step-header">
      <span class="step-number">5</span>
      <span class="step-type">移动到</span>
      <button class="step-remove">×</button>
    </div>
    <div class="step-params">
      <div class="param-row">
        <label>纬度</label>
        <input type="number" value="39.9042" step="0.0001">
      </div>
      <div class="param-row">
        <label>经度</label>
        <input type="number" value="116.4074" step="0.0001">
      </div>
      <div class="param-row">
        <label>高度</label>
        <input type="number" value="150" min="10" max="500">
      </div>
    </div>
  `;
  
  missionBuilder.insertBefore(newStep, addStepBtn);
  
  // 添加删除事件
  const removeBtn = newStep.querySelector('.step-remove');
  removeBtn.addEventListener('click', function() {
    newStep.remove();
    updateStepNumbers();
  });
  
  updateStepNumbers();
}

// 更新步骤编号
function updateStepNumbers() {
  const steps = document.querySelectorAll('.mission-step');
  steps.forEach((step, index) => {
    const number = step.querySelector('.step-number');
    number.textContent = index + 1;
  });
}

// 执行任务
function executeMission() {
  const steps = document.querySelectorAll('.mission-step');
  if (steps.length === 0) {
    showNotification('请先添加任务步骤', 'error');
    return;
  }
  
  showNotification('开始执行任务...', 'info');
  
  // 模拟任务执行
  let currentStep = 0;
  const executeStep = () => {
    if (currentStep >= steps.length) {
      showNotification('任务执行完成！', 'success');
      return;
    }
    
    const step = steps[currentStep];
    const stepType = step.querySelector('.step-type').textContent;
    
    showNotification(`执行步骤 ${currentStep + 1}: ${stepType}`, 'info');
    
    // 模拟步骤执行时间
    setTimeout(() => {
      currentStep++;
      executeStep();
    }, 2000);
  };
  
  executeStep();
}

// 暂停任务
function pauseMission() {
  showNotification('任务已暂停', 'info');
}

// 模拟起飞
function simulateTakeoff() {
  const startPos = [39.9042, 116.4074];
  const endPos = [39.9042, 116.4074];
  
  // 动画效果
  let altitude = 0;
  const interval = setInterval(() => {
    altitude += 10;
    if (altitude >= 100) {
      clearInterval(interval);
      showNotification('起飞完成', 'success');
    }
  }, 100);
}

// 模拟降落
function simulateLanding() {
  showNotification('降落完成', 'success');
}

// 模拟返航
function simulateReturn() {
  // 创建返航路径
  const path = [
    [39.9042, 116.4074],
    [39.9042, 116.4074]
  ];
  
  if (missionPath) {
    map.removeLayer(missionPath);
  }
  
  missionPath = L.polyline(path, { color: '#00d4ff', weight: 3 }).addTo(map);
  
  // 动画效果
  let progress = 0;
  const interval = setInterval(() => {
    progress += 0.1;
    if (progress >= 1) {
      clearInterval(interval);
      showNotification('返航完成', 'success');
    }
  }, 100);
}

// 模拟悬停
function simulateHover() {
  if (droneMarker) {
    // 保持当前位置
    const currentPos = droneMarker.getLatLng();
    droneMarker.setLatLng(currentPos);
  }
  
  // 更新遥测数据
  updateTelemetryData();
}

// 模拟拍照
function simulatePhoto() {
  // 模拟拍照效果
  const videoPlaceholder = document.querySelector('.video-placeholder');
  if (videoPlaceholder) {
    videoPlaceholder.style.filter = 'brightness(1.2)';
    setTimeout(() => {
      videoPlaceholder.style.filter = 'none';
    }, 200);
  }
  
  // 更新统计
  updateGameStats();
}

// 模拟录像
function simulateVideo() {
  const videoBtn = document.querySelector('.video-btn');
  if (videoBtn) {
    const isRecording = videoBtn.textContent.includes('停止');
    if (isRecording) {
      videoBtn.textContent = '🎥 录像';
      showNotification('📹 录像已保存', 'success');
    } else {
      videoBtn.textContent = '⏹️ 停止';
      showNotification('🎥 开始录像...', 'info');
    }
  }
}

// 模拟紧急停止
function simulateEmergencyStop() {
  showNotification('紧急停止完成', 'success');
}

// 更新游戏统计
function updateGameStats() {
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length >= 6) {
    // 模拟数据更新
    const newValues = ['2:45', '1.3km', '28m/s', '125m', '82%', '强'];
    statValues.forEach((value, index) => {
      if (index < newValues.length) {
        value.textContent = newValues[index];
      }
    });
  }
}

// 遥测数据模拟
function startTelemetrySimulation() {
  setInterval(() => {
    updateTelemetryData();
  }, 1000);
}

// 更新遥测数据
function updateTelemetryData() {
  const telemetryItems = document.querySelectorAll('.telemetry-item');
  
  telemetryItems.forEach(item => {
    const label = item.querySelector('.telemetry-label').textContent;
    const value = item.querySelector('.telemetry-value');
    
    switch(label) {
      case '位置':
        // 模拟位置变化
        const lat = 39.9042 + (Math.random() - 0.5) * 0.001;
        const lon = 116.4074 + (Math.random() - 0.5) * 0.001;
        value.textContent = `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`;
        
        // 更新地图标记
        droneMarker.setLatLng([lat, lon]);
        break;
        
      case '高度':
        const altitude = 100 + Math.random() * 50;
        value.textContent = `${altitude.toFixed(1)} m`;
        break;
        
      case '速度':
        const speed = 10 + Math.random() * 10;
        value.textContent = `${speed.toFixed(1)} m/s`;
        break;
        
      case '电量':
        const battery = 70 + Math.random() * 20;
        const batteryLevel = value.querySelector('.battery-level');
        batteryLevel.style.width = `${battery}%`;
        value.textContent = `${battery.toFixed(0)}%`;
        break;
    }
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
  }, 3000);
}

// 添加地图标记样式
const style = document.createElement('style');
style.textContent = `
  .drone-marker {
    background: none;
    border: none;
  }
  
  .home-marker {
    background: none;
    border: none;
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