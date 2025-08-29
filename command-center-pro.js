// 全局变量
let map;
let droneMarker;
let flightPath;
let isDemoRunning = false;
let currentTaskIndex = 0;
let telemetryInterval;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeControls();
    startTelemetryUpdates();
    loadDemoData();
});

// 初始化地图
function initializeMap() {
    map = L.map('map').setView([39.9042, 116.4074], 15);
    
    // 添加地图图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // 添加卫星图层（隐藏）
    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
    });

    // 添加无人机标记
    droneMarker = L.marker([39.9042, 116.4074], {
        icon: L.divIcon({
            className: 'drone-marker',
            html: '🚁',
            iconSize: [30, 30]
        })
    }).addTo(map);

    // 添加禁飞区
    addNoFlyZones();
}

// 初始化控制
function initializeControls() {
    // 高度控制
    const altitudeSlider = document.getElementById('altitude');
    const altitudeValue = document.getElementById('altitude-value');
    altitudeSlider.addEventListener('input', function() {
        altitudeValue.textContent = this.value + 'm';
    });

    // 速度控制
    const speedSlider = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    speedSlider.addEventListener('input', function() {
        speedValue.textContent = this.value + 'm/s';
    });
}

// 开始遥测数据更新
function startTelemetryUpdates() {
    telemetryInterval = setInterval(() => {
        updateTelemetryData();
    }, 1000);
}

// 更新遥测数据
function updateTelemetryData() {
    const telemetryItems = document.querySelectorAll('.telemetry-item .value');
    
    // 模拟实时数据更新
    const newData = {
        position: '±' + (0.3 + Math.random() * 0.4).toFixed(1) + 'm',
        snr: Math.floor(40 + Math.random() * 10) + 'dB',
        battery: Math.floor(80 + Math.random() * 15) + '%',
        link: Math.floor(95 + Math.random() * 5) + '%'
    };

    telemetryItems[0].textContent = newData.position;
    telemetryItems[1].textContent = newData.snr;
    telemetryItems[2].textContent = newData.battery;
    telemetryItems[3].textContent = newData.link;

    // 更新状态指示器
    updateStatusIndicators(newData);
}

// 更新状态指示器
function updateStatusIndicators(data) {
    const battery = parseInt(data.battery);
    const link = parseInt(data.link);

    // 更新设备卡片状态
    const deviceCard = document.querySelector('.device-card.online');
    if (battery < 20) {
        deviceCard.classList.add('low-battery');
    } else {
        deviceCard.classList.remove('low-battery');
    }

    // 更新告警
    if (battery < 20) {
        addAlert('warning', `电量低: ${battery}%`);
    }
}

// 执行命令
function executeCommand(command) {
    console.log('执行命令:', command);
    
    switch(command) {
        case 'takeoff':
            executeTakeoff();
            break;
        case 'move':
            executeMove();
            break;
        case 'orbit':
            executeOrbit();
            break;
        case 'land':
            executeLand();
            break;
        case 'emergency':
            executeEmergency();
            break;
    }
}

// 执行起飞
function executeTakeoff() {
    addAlert('info', '开始起飞程序');
    updateTaskStatus(0, 'executing');
    
    // 模拟起飞动画
    let altitude = 0;
    const takeoffInterval = setInterval(() => {
        altitude += 5;
        updateDronePosition(39.9042, 116.4074, altitude);
        
        if (altitude >= 50) {
            clearInterval(takeoffInterval);
            updateTaskStatus(0, 'completed');
            updateTaskStatus(1, 'executing');
            addAlert('success', '起飞完成，高度: 50m');
        }
    }, 100);
}

// 执行移动
function executeMove() {
    addAlert('info', '开始移动到目标点');
    
    // 模拟移动动画
    const targetLat = 39.9142;
    const targetLng = 116.4174;
    let progress = 0;
    
    const moveInterval = setInterval(() => {
        progress += 0.02;
        const currentLat = 39.9042 + (targetLat - 39.9042) * progress;
        const currentLng = 116.4074 + (targetLng - 116.4074) * progress;
        
        updateDronePosition(currentLat, currentLng, 50);
        
        if (progress >= 1) {
            clearInterval(moveInterval);
            updateTaskStatus(1, 'completed');
            updateTaskStatus(2, 'executing');
            addAlert('success', '到达目标点');
        }
    }, 100);
}

// 执行环绕
function executeOrbit() {
    addAlert('info', '开始环绕飞行');
    
    let angle = 0;
    const radius = 0.001; // 约100米
    const centerLat = 39.9142;
    const centerLng = 116.4174;
    
    const orbitInterval = setInterval(() => {
        angle += 0.1;
        const lat = centerLat + radius * Math.cos(angle);
        const lng = centerLng + radius * Math.sin(angle);
        
        updateDronePosition(lat, lng, 50);
        
        if (angle >= 6.28) { // 2π
            clearInterval(orbitInterval);
            updateTaskStatus(2, 'completed');
            updateTaskStatus(3, 'executing');
            addAlert('success', '环绕飞行完成');
        }
    }, 100);
}

// 执行降落
function executeLand() {
    addAlert('info', '开始降落程序');
    
    let altitude = 50;
    const landInterval = setInterval(() => {
        altitude -= 2;
        updateDronePosition(39.9042, 116.4074, altitude);
        
        if (altitude <= 0) {
            clearInterval(landInterval);
            updateTaskStatus(3, 'completed');
            addAlert('success', '降落完成');
            showReplayPanel();
        }
    }, 100);
}

// 执行紧急降落
function executeEmergency() {
    addAlert('error', '执行紧急降落！');
    
    // 立即停止所有任务
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.classList.remove('executing');
        item.classList.add('cancelled');
    });
    
    // 快速降落
    let altitude = 50;
    const emergencyInterval = setInterval(() => {
        altitude -= 5;
        updateDronePosition(39.9042, 116.4074, altitude);
        
        if (altitude <= 0) {
            clearInterval(emergencyInterval);
            addAlert('error', '紧急降落完成');
        }
    }, 50);
}

// 更新无人机位置
function updateDronePosition(lat, lng, altitude) {
    droneMarker.setLatLng([lat, lng]);
    
    // 更新飞行路径
    if (!flightPath) {
        flightPath = L.polyline([[39.9042, 116.4074]], {color: 'red'}).addTo(map);
    }
    flightPath.addLatLng([lat, lng]);
    
    // 更新任务信息
    updateTaskInfo(lat, lng, altitude);
}

// 更新任务状态
function updateTaskStatus(index, status) {
    const taskItems = document.querySelectorAll('.task-item');
    if (taskItems[index]) {
        taskItems[index].className = `task-item ${status}`;
    }
}

// 更新任务信息
function updateTaskInfo(lat, lng, altitude) {
    const taskItems = document.querySelectorAll('.task-item');
    if (taskItems[1]) {
        const info = taskItems[1].querySelector('p');
        info.textContent = `坐标: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E | 高度: ${altitude}m`;
    }
}

// 添加告警
function addAlert(type, message) {
    const alertList = document.querySelector('.alert-list');
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${type}`;
    alertItem.innerHTML = `
        <span class="alert-icon">${type === 'error' ? '🚨' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <span class="alert-text">${message}</span>
    `;
    
    alertList.appendChild(alertItem);
    
    // 5秒后自动移除
    setTimeout(() => {
        alertItem.remove();
    }, 5000);
}

// 地图控制
function switchMapType(type) {
    const mapBtns = document.querySelectorAll('.map-btn');
    mapBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (type === 'satellite') {
        map.removeLayer(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
        satelliteLayer.addTo(map);
    } else {
        map.removeLayer(satelliteLayer);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
}

// 切换禁飞区显示
function toggleNoFlyZones() {
    const noFlyZones = document.querySelectorAll('.no-fly-zone');
    noFlyZones.forEach(zone => {
        zone.style.display = zone.style.display === 'none' ? 'block' : 'none';
    });
}

// 显示飞行路径
function showFlightPath() {
    if (flightPath) {
        flightPath.setStyle({color: 'blue', weight: 3});
    }
}

// 添加禁飞区
function addNoFlyZones() {
    // 模拟禁飞区数据
    const noFlyZones = [
        {lat: 39.9142, lng: 116.4174, radius: 500, name: '机场禁飞区'},
        {lat: 39.8942, lng: 116.3974, radius: 300, name: '政府机关'}
    ];
    
    noFlyZones.forEach(zone => {
        L.circle([zone.lat, zone.lng], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: zone.radius
        }).addTo(map).bindPopup(zone.name);
    });
}

// 开始演示
function startDemo() {
    if (isDemoRunning) return;
    
    isDemoRunning = true;
    addAlert('info', '开始3分钟标准演示');
    
    // 清除之前的任务状态
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.classList.remove('completed', 'cancelled');
        item.classList.add('pending');
    });
    
    // 重置无人机位置
    droneMarker.setLatLng([39.9042, 116.4074]);
    if (flightPath) {
        map.removeLayer(flightPath);
        flightPath = null;
    }
    
    // 开始演示序列
    setTimeout(() => executeTakeoff(), 1000);
    setTimeout(() => executeMove(), 10000);
    setTimeout(() => executeOrbit(), 20000);
    setTimeout(() => executeLand(), 30000);
    setTimeout(() => {
        isDemoRunning = false;
        addAlert('success', '演示完成');
    }, 35000);
}

// 导出日志
function exportLogs() {
    const logs = [
        '时间: ' + new Date().toLocaleString(),
        '设备: DJI Mavic 3 Pro',
        '任务: 标准演示飞行',
        '状态: 完成',
        '遥测数据: 正常'
    ].join('\n');
    
    const blob = new Blob([logs], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flight-log-' + new Date().toISOString().slice(0, 10) + '.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    addAlert('info', '日志已导出');
}

// 显示回放面板
function showReplayPanel() {
    document.getElementById('replayPanel').style.display = 'block';
}

// 关闭回放面板
function closeReplay() {
    document.getElementById('replayPanel').style.display = 'none';
}

// 回放控制
function playReplay() {
    addAlert('info', '开始回放');
}

function pauseReplay() {
    addAlert('info', '暂停回放');
}

function resetReplay() {
    addAlert('info', '重置回放');
}

// 视频控制
function startRecording() {
    addAlert('info', '开始录制视频');
}

function takePhoto() {
    addAlert('info', '拍照完成');
}

function switchCamera() {
    addAlert('info', '切换相机视角');
}

// 加载演示数据
function loadDemoData() {
    // 模拟加载历史数据
    console.log('加载演示数据完成');
} 