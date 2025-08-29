// 全局变量
let currentScene = 'city';
let dronePosition = { x: 50, y: 50, z: 0 };
let isFlying = false;
let currentChallenge = null;
let playerScore = 1250;
let playerLevel = 5;
let achievementCount = 0;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    showWelcomeMessage();
    setTimeout(() => {
        showConversionBanner();
    }, 10000); // 10秒后显示转化提示
});

// 初始化游戏
function initializeGame() {
    updatePlayerStats();
    initializeScene();
    setupEventListeners();
}

// 更新玩家统计
function updatePlayerStats() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('playerLevel').textContent = playerLevel;
}

// 初始化场景
function initializeScene() {
    const sceneView = document.getElementById('sceneView');
    sceneView.innerHTML = `
        <div class="scene-background ${currentScene}-scene">
            <div class="drone-3d" id="drone3D">🚁</div>
            <div class="scene-elements">
                ${getSceneElements(currentScene)}
            </div>
        </div>
    `;
}

// 获取场景元素
function getSceneElements(scene) {
    switch(scene) {
        case 'city':
            return `
                <div class="building" style="left: 20%; bottom: 0;">🏢</div>
                <div class="building" style="left: 60%; bottom: 0;">🏢</div>
                <div class="building" style="left: 80%; bottom: 0;">🏢</div>
                <div class="road" style="bottom: 0; left: 0; right: 0;">🛣️</div>
            `;
        case 'canyon':
            return `
                <div class="mountain" style="left: 10%; bottom: 0;">🏔️</div>
                <div class="mountain" style="right: 10%; bottom: 0;">🏔️</div>
                <div class="river" style="bottom: 0; left: 40%; right: 40%;">🌊</div>
            `;
        case 'coast':
            return `
                <div class="beach" style="bottom: 0; left: 0; right: 0;">🏖️</div>
                <div class="ocean" style="bottom: 0; left: 0; right: 0;">🌊</div>
                <div class="island" style="left: 70%; bottom: 0;">🏝️</div>
            `;
        default:
            return '';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 场景点击事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.scene-view')) {
            const rect = e.target.closest('.scene-view').getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            moveDroneTo(x, y);
        }
    });
}

// 切换场景
function switchScene(scene) {
    currentScene = scene;
    
    // 更新场景按钮状态
    document.querySelectorAll('.scene-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 更新场景显示
    initializeScene();
    
    // 重置无人机位置
    resetDronePosition();
    
    // 显示场景切换效果
    showSceneTransition(scene);
}

// 显示场景切换效果
function showSceneTransition(scene) {
    const sceneView = document.getElementById('sceneView');
    sceneView.style.opacity = '0';
    
    setTimeout(() => {
        sceneView.style.opacity = '1';
        showMessage(`切换到${getSceneName(scene)}场景`);
    }, 300);
}

// 获取场景名称
function getSceneName(scene) {
    const names = {
        'city': '城市',
        'canyon': '峡谷',
        'coast': '海岸'
    };
    return names[scene] || scene;
}

// 执行原语操作
function executePrimitive(action) {
    console.log('执行原语:', action);
    
    switch(action) {
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
    }
    
    // 增加积分
    addScore(10);
    
    // 检查成就
    checkAchievements();
}

// 执行起飞
function executeTakeoff() {
    if (isFlying) {
        showMessage('无人机已在空中');
        return;
    }
    
    showMessage('🚁 起飞！');
    isFlying = true;
    
    // 起飞动画
    const drone = document.getElementById('drone3D');
    let height = 0;
    const takeoffInterval = setInterval(() => {
        height += 2;
        drone.style.transform = `translateY(-${height}px)`;
        
        if (height >= 50) {
            clearInterval(takeoffInterval);
            showMessage('起飞完成！');
            addScore(20);
        }
    }, 50);
}

// 执行移动
function executeMove() {
    if (!isFlying) {
        showMessage('请先起飞');
        return;
    }
    
    showMessage('📍 移动到目标点');
    
    // 随机移动
    const targetX = Math.random() * 80 + 10;
    const targetY = Math.random() * 80 + 10;
    
    moveDroneTo(targetX, targetY);
}

// 执行环绕
function executeOrbit() {
    if (!isFlying) {
        showMessage('请先起飞');
        return;
    }
    
    showMessage('🔄 开始环绕飞行');
    
    // 环绕动画
    const drone = document.getElementById('drone3D');
    let angle = 0;
    const centerX = 50;
    const centerY = 50;
    const radius = 30;
    
    const orbitInterval = setInterval(() => {
        angle += 0.1;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        drone.style.left = x + '%';
        drone.style.top = y + '%';
        
        if (angle >= 6.28) { // 2π
            clearInterval(orbitInterval);
            showMessage('环绕完成！');
            addScore(30);
        }
    }, 100);
}

// 执行降落
function executeLand() {
    if (!isFlying) {
        showMessage('无人机已在地面');
        return;
    }
    
    showMessage('🛬 开始降落');
    
    // 降落动画
    const drone = document.getElementById('drone3D');
    let height = 50;
    const landInterval = setInterval(() => {
        height -= 2;
        drone.style.transform = `translateY(-${height}px)`;
        
        if (height <= 0) {
            clearInterval(landInterval);
            isFlying = false;
            showMessage('降落完成！');
            addScore(15);
        }
    }, 50);
}

// 移动无人机到指定位置
function moveDroneTo(x, y) {
    const drone = document.getElementById('drone3D');
    
    // 平滑移动动画
    drone.style.transition = 'all 1s ease-in-out';
    drone.style.left = x + '%';
    drone.style.top = y + '%';
    
    setTimeout(() => {
        drone.style.transition = '';
    }, 1000);
    
    dronePosition = { x, y, z: dronePosition.z };
}

// 重置无人机位置
function resetDronePosition() {
    dronePosition = { x: 50, y: 50, z: 0 };
    const drone = document.getElementById('drone3D');
    drone.style.left = '50%';
    drone.style.top = '50%';
    drone.style.transform = 'translateY(0)';
    isFlying = false;
}

// 开始挑战
function startChallenge(challengeType) {
    currentChallenge = challengeType;
    
    switch(challengeType) {
        case 'tunnel':
            startTunnelChallenge();
            break;
        case 'hover':
            startHoverChallenge();
            break;
        case 'race':
            startRaceChallenge();
            break;
    }
}

// 开始穿越圈挑战
function startTunnelChallenge() {
    showMessage('🕳️ 开始穿越圈挑战！');
    
    // 创建圆环
    createRings();
    
    // 开始计时
    let time = 0;
    const timer = setInterval(() => {
        time++;
        if (time >= 60) { // 60秒时间限制
            clearInterval(timer);
            endChallenge('tunnel', false);
        }
    }, 1000);
}

// 开始定点悬停挑战
function startHoverChallenge() {
    showMessage('🎯 开始定点悬停挑战！保持30秒');
    
    let time = 0;
    const timer = setInterval(() => {
        time++;
        if (time >= 30) {
            clearInterval(timer);
            endChallenge('hover', true);
        }
    }, 1000);
}

// 开始竞速挑战
function startRaceChallenge() {
    showMessage('🏁 开始竞速挑战！');
    
    // 创建赛道
    createRaceTrack();
    
    let time = 0;
    const timer = setInterval(() => {
        time++;
        if (time >= 120) { // 2分钟时间限制
            clearInterval(timer);
            endChallenge('race', false);
        }
    }, 1000);
}

// 结束挑战
function endChallenge(challengeType, success) {
    currentChallenge = null;
    
    if (success) {
        showMessage(`🎉 挑战成功！`);
        addScore(100);
        updateChallengeProgress(challengeType, 100);
    } else {
        showMessage(`❌ 挑战失败，再接再厉！`);
        addScore(20);
    }
    
    // 检查是否解锁新成就
    checkAchievements();
}

// 更新挑战进度
function updateChallengeProgress(challengeType, progress) {
    const challengeItems = document.querySelectorAll('.challenge-item');
    challengeItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        if (getChallengeType(title) === challengeType) {
            const progressBar = item.querySelector('.progress-fill');
            const progressText = item.querySelector('.challenge-progress span');
            
            progressBar.style.width = progress + '%';
            progressText.textContent = progress === 100 ? '完成' : progress + '%';
        }
    });
}

// 获取挑战类型
function getChallengeType(title) {
    const types = {
        '穿越圈': 'tunnel',
        '定点悬停': 'hover',
        '竞速飞行': 'race'
    };
    return types[title] || '';
}

// 创建圆环
function createRings() {
    const sceneView = document.getElementById('sceneView');
    const rings = document.createElement('div');
    rings.className = 'rings';
    rings.innerHTML = `
        <div class="ring" style="left: 30%; top: 30%;">⭕</div>
        <div class="ring" style="left: 60%; top: 40%;">⭕</div>
        <div class="ring" style="left: 70%; top: 60%;">⭕</div>
    `;
    sceneView.appendChild(rings);
}

// 创建赛道
function createRaceTrack() {
    const sceneView = document.getElementById('sceneView');
    const track = document.createElement('div');
    track.className = 'race-track';
    track.innerHTML = `
        <div class="checkpoint" style="left: 20%; top: 20%;">🏁</div>
        <div class="checkpoint" style="left: 80%; top: 30%;">🏁</div>
        <div class="checkpoint" style="left: 60%; top: 70%;">🏁</div>
        <div class="checkpoint" style="left: 20%; top: 80%;">🏁</div>
    `;
    sceneView.appendChild(track);
}

// 增加积分
function addScore(points) {
    playerScore += points;
    updatePlayerStats();
    
    // 检查升级
    if (playerScore >= playerLevel * 500) {
        levelUp();
    }
}

// 升级
function levelUp() {
    playerLevel++;
    showMessage(`🎉 升级到 ${playerLevel} 级！`);
    updatePlayerStats();
}

// 检查成就
function checkAchievements() {
    // 模拟成就检查
    if (playerScore >= 1000 && achievementCount === 0) {
        unlockAchievement('精准射手', '完成10次定点悬停');
    }
    
    if (playerLevel >= 5 && achievementCount === 1) {
        unlockAchievement('速度之王', '竞速挑战用时<2分钟');
    }
}

// 解锁成就
function unlockAchievement(title, description) {
    achievementCount++;
    
    // 显示成就弹窗
    document.getElementById('achievementText').textContent = `${title} - ${description}`;
    document.getElementById('achievementPopup').style.display = 'flex';
    
    // 播放成就音效（模拟）
    console.log('🎵 成就解锁音效');
    
    // 更新成就列表
    updateAchievementList();
}

// 更新成就列表
function updateAchievementList() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        if (index < achievementCount) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
        }
    });
}

// 关闭成就弹窗
function closeAchievement() {
    document.getElementById('achievementPopup').style.display = 'none';
}

// 预约VR体验
function bookVR() {
    showMessage('🥽 VR体验预约功能即将上线！');
    // 这里可以跳转到预约页面
}

// 报名飞行营
function bookCamp() {
    showMessage('🏕️ 线下飞行营报名功能即将上线！');
    // 这里可以跳转到报名页面
}

// 注册账号
function register() {
    showMessage('📝 跳转到注册页面...');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// 关闭转化横幅
function closeBanner() {
    document.getElementById('conversionBanner').style.display = 'none';
}

// 显示转化横幅
function showConversionBanner() {
    document.getElementById('conversionBanner').style.display = 'flex';
}

// 显示欢迎消息
function showWelcomeMessage() {
    showMessage('🎮 欢迎来到YITA玩家版！点击场景或使用按钮控制无人机');
}

// 显示消息
function showMessage(text) {
    // 创建消息元素
    const message = document.createElement('div');
    message.className = 'game-message';
    message.textContent = text;
    
    // 添加到页面
    document.body.appendChild(message);
    
    // 3秒后自动移除
    setTimeout(() => {
        message.remove();
    }, 3000);
} 