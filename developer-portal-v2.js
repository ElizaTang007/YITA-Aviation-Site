// 全局变量
let currentSection = 'getting-started';
let sandboxKey = null;
let apiCalls = 0;
let errorCount = 0;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeDeveloperPortal();
    setupEventListeners();
    loadUserData();
});

// 初始化开发者门户
function initializeDeveloperPortal() {
    // 高亮当前导航
    updateNavigation();
    
    // 初始化代码高亮
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
    
    // 检查是否有保存的沙箱Key
    const savedKey = localStorage.getItem('sandboxKey');
    if (savedKey) {
        sandboxKey = savedKey;
        updateKeyStatus();
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 代码复制功能
    document.addEventListener('click', function(e) {
        if (e.target.matches('[onclick*="copyCode"]')) {
            e.preventDefault();
            const codeId = e.target.getAttribute('onclick').match(/copyCode\('([^']+)'\)/)[1];
            copyCode(codeId);
        }
    });
}

// 加载用户数据
function loadUserData() {
    // 从localStorage加载用户数据
    const savedApiCalls = localStorage.getItem('apiCalls') || 0;
    const savedErrorCount = localStorage.getItem('errorCount') || 0;
    
    apiCalls = parseInt(savedApiCalls);
    errorCount = parseInt(savedErrorCount);
    
    updateUsageStats();
}

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示指定部分
    document.getElementById(sectionId).classList.add('active');
    
    // 更新导航状态
    currentSection = sectionId;
    updateNavigation();
    
    // 重新高亮代码
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// 更新导航状态
function updateNavigation() {
    // 移除所有活动状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 添加当前活动状态
    const activeLink = document.querySelector(`[onclick="showSection('${currentSection}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 复制代码
function copyCode(codeId) {
    const codeElement = document.getElementById(codeId);
    if (codeElement) {
        const text = codeElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('代码已复制到剪贴板！', 'success');
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('代码已复制到剪贴板！', 'success');
        });
    }
}

// 申请沙箱Key
function requestSandboxKey() {
    if (sandboxKey) {
        showNotification('您已经拥有沙箱Key！', 'info');
        return;
    }
    
    // 模拟API调用
    showNotification('正在申请沙箱Key...', 'info');
    
    setTimeout(() => {
        // 生成模拟的沙箱Key
        sandboxKey = 'sk_test_' + Math.random().toString(36).substr(2, 9);
        
        // 保存到localStorage
        localStorage.setItem('sandboxKey', sandboxKey);
        
        // 更新UI
        updateKeyStatus();
        
        showNotification('沙箱Key申请成功！', 'success');
    }, 2000);
}

// 更新Key状态
function updateKeyStatus() {
    if (sandboxKey) {
        document.getElementById('apiKeyStatus').textContent = '已申请';
        document.getElementById('quotaStatus').textContent = `${apiCalls}/1000`;
        
        // 显示Key详情
        document.getElementById('keyDetails').style.display = 'block';
        document.getElementById('apiKeyDisplay').textContent = sandboxKey;
        document.getElementById('quotaDisplay').textContent = `${apiCalls}/1000`;
        document.getElementById('expiryDisplay').textContent = getExpiryDate();
        
        // 更新按钮
        document.getElementById('requestKeyBtn').textContent = '续期Key';
        document.getElementById('keyStatusBadge').textContent = '有效';
        document.getElementById('keyStatusBadge').className = 'status-badge valid';
    }
}

// 获取过期日期
function getExpiryDate() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    return expiry.toISOString().split('T')[0];
}

// 更新使用统计
function updateUsageStats() {
    document.getElementById('apiCalls').textContent = apiCalls;
    document.getElementById('errorRate').textContent = apiCalls > 0 ? Math.round((errorCount / apiCalls) * 100) + '%' : '0%';
    document.getElementById('responseTime').textContent = Math.floor(Math.random() * 100 + 50) + 'ms';
    
    // 保存到localStorage
    localStorage.setItem('apiCalls', apiCalls);
    localStorage.setItem('errorCount', errorCount);
}

// 尝试API
function tryAPI(apiType) {
    if (!sandboxKey) {
        showNotification('请先申请沙箱Key！', 'warning');
        return;
    }
    
    // 打开API测试弹窗
    openApiModal(apiType);
}

// 打开API测试弹窗
function openApiModal(apiType) {
    const modal = document.getElementById('apiModal');
    const methodSelect = document.getElementById('apiMethod');
    const pathInput = document.getElementById('apiPath');
    
    // 根据API类型设置默认值
    switch(apiType) {
        case 'get-drone-status':
            methodSelect.value = 'GET';
            pathInput.value = '/api/v1/drone/123/status';
            break;
        case 'post-takeoff':
            methodSelect.value = 'POST';
            pathInput.value = '/api/v1/drone/123/takeoff';
            break;
        case 'post-move':
            methodSelect.value = 'POST';
            pathInput.value = '/api/v1/drone/123/move';
            break;
        case 'get-telemetry':
            methodSelect.value = 'GET';
            pathInput.value = '/api/v1/telemetry/123';
            break;
        case 'post-mission':
            methodSelect.value = 'POST';
            pathInput.value = '/api/v1/mission';
            break;
    }
    
    modal.style.display = 'flex';
}

// 关闭API测试弹窗
function closeApiModal() {
    document.getElementById('apiModal').style.display = 'none';
    document.getElementById('apiResponse').style.display = 'none';
}

// 执行API测试
function executeApiTest() {
    const method = document.getElementById('apiMethod').value;
    const path = document.getElementById('apiPath').value;
    const params = document.getElementById('apiParams').value;
    
    // 模拟API调用
    showNotification('正在发送请求...', 'info');
    
    setTimeout(() => {
        // 增加API调用计数
        apiCalls++;
        
        // 模拟响应
        const response = {
            status: 200,
            data: {
                success: true,
                message: 'API调用成功',
                timestamp: new Date().toISOString(),
                method: method,
                path: path,
                params: params ? JSON.parse(params) : null
            }
        };
        
        // 显示响应
        document.getElementById('responseCode').textContent = JSON.stringify(response, null, 2);
        document.getElementById('apiResponse').style.display = 'block';
        
        // 更新统计
        updateUsageStats();
        updateKeyStatus();
        
        showNotification('API调用成功！', 'success');
    }, 1000);
}

// 下载SDK
function downloadSDK(language) {
    const sdkUrls = {
        'rust': 'https://github.com/yita/stratoos-rust-sdk/releases/latest',
        'python': 'https://pypi.org/project/stratoos-python-sdk/',
        'java': 'https://github.com/yita/stratoos-java-sdk/releases/latest',
        'cli': 'https://github.com/yita/stratoos-cli/releases/latest'
    };
    
    showNotification(`正在跳转到 ${language} SDK 下载页面...`, 'info');
    
    setTimeout(() => {
        window.open(sdkUrls[language], '_blank');
    }, 1000);
}

// 查看文档
function viewDocs(language) {
    const docUrls = {
        'rust': 'https://docs.yita.dev/rust',
        'python': 'https://docs.yita.dev/python',
        'java': 'https://docs.yita.dev/java',
        'cli': 'https://docs.yita.dev/cli'
    };
    
    window.open(docUrls[language], '_blank');
}

// 查看示例
function viewExamples(language) {
    const exampleUrls = {
        'rust': 'https://github.com/yita/stratoos-rust-examples',
        'python': 'https://github.com/yita/stratoos-python-examples',
        'java': 'https://github.com/yita/stratoos-java-examples',
        'cli': 'https://github.com/yita/stratoos-cli-examples'
    };
    
    window.open(exampleUrls[language], '_blank');
}

// 安装插件
function installExtension(extensionId) {
    showNotification(`正在安装 ${extensionId} 插件...`, 'info');
    
    setTimeout(() => {
        showNotification('插件安装成功！', 'success');
    }, 2000);
}

// 查看插件详情
function viewExtensionDetails(extensionId) {
    showNotification(`正在加载 ${extensionId} 详情...`, 'info');
    
    // 这里可以打开详情弹窗
    setTimeout(() => {
        showNotification('详情页面即将上线！', 'info');
    }, 1000);
}

// 查看合规详情
function viewComplianceDetails(type) {
    const complianceUrls = {
        'bvlos': 'https://docs.yita.dev/compliance/bvlos',
        'safety': 'https://docs.yita.dev/compliance/safety',
        'airspace': 'https://docs.yita.dev/compliance/airspace',
        'audit': 'https://docs.yita.dev/compliance/audit'
    };
    
    window.open(complianceUrls[type], '_blank');
}

// 打开工具
function openTool(tool) {
    const toolUrls = {
        'simulator': 'https://simulator.yita.dev',
        'debugger': 'https://debugger.yita.dev',
        'monitor': 'https://monitor.yita.dev'
    };
    
    showNotification(`正在打开 ${tool}...`, 'info');
    
    setTimeout(() => {
        window.open(toolUrls[tool], '_blank');
    }, 1000);
}

// 打开社区
function openCommunity(platform) {
    const communityUrls = {
        'github': 'https://github.com/yita',
        'discord': 'https://discord.gg/yita',
        'forum': 'https://forum.yita.dev'
    };
    
    window.open(communityUrls[platform], '_blank');
}

// 打开仿真器
function openSimulator() {
    showNotification('正在启动仿真器...', 'info');
    
    setTimeout(() => {
        window.open('https://simulator.yita.dev', '_blank');
    }, 1000);
}

// 打开日志查看器
function openLogViewer() {
    showNotification('正在打开日志查看器...', 'info');
    
    setTimeout(() => {
        window.open('https://logs.yita.dev', '_blank');
    }, 1000);
}

// 打开Webhook测试器
function openWebhookTester() {
    showNotification('正在打开Webhook测试器...', 'info');
    
    setTimeout(() => {
        window.open('https://webhook-tester.yita.dev', '_blank');
    }, 1000);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || icons.info;
}

// 页面卸载时保存数据
window.addEventListener('beforeunload', function() {
    localStorage.setItem('apiCalls', apiCalls);
    localStorage.setItem('errorCount', errorCount);
}); 