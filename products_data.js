// 产品数据 - 使用真实图片
const products = [
    {
        id: 1,
        name: '亿航EH216-S 载人级自动驾驶飞行器',
        description: '全球首款载人级自动驾驶飞行器，双座设计，最大航程35公里，适用于城市空中交通。',
        price: 2800000,
        originalPrice: 3200000,
        rating: 4.9,
        reviewCount: 28,
        brand: '亿航智能',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '2座',
            range: '35公里',
            speed: '130公里/小时',
            weight: '220kg',
            battery: '锂离子电池',
            certification: 'CAAC认证'
        }
    },
    {
        id: 2,
        name: '盛世龙 多旋翼eVTOL',
        description: '未来感十足的多旋翼eVTOL，采用先进材料制造，配备八个螺旋桨，适合城市空中交通。',
        price: 3500000,
        originalPrice: 4000000,
        rating: 4.8,
        reviewCount: 22,
        brand: '盛世龙',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '2座',
            range: '40公里',
            speed: '140公里/小时',
            weight: '250kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 3,
        name: '零重九 ZG-T6 载人eVTOL',
        description: '采用倾转旋翼技术的载人eVTOL，具备水上起降能力，适合多种应用场景。',
        price: 4200000,
        originalPrice: 4800000,
        rating: 4.7,
        reviewCount: 18,
        brand: '零重九',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '2座',
            range: '50公里',
            speed: '160公里/小时',
            weight: '280kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 4,
        name: '羽兔A100 个人飞行器',
        description: '单座个人飞行器，配备八个螺旋桨，采用同轴配置，适合个人出行和娱乐体验。',
        price: 1800000,
        originalPrice: 2200000,
        rating: 4.6,
        reviewCount: 25,
        brand: '羽兔',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '1座',
            range: '30公里',
            speed: '120公里/小时',
            weight: '150kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 5,
        name: 'AirCab 城市空中出租车',
        description: '专为城市空中出租车服务设计的eVTOL，配备四个螺旋桨，适合短途通勤。',
        price: 2500000,
        originalPrice: 3000000,
        rating: 4.8,
        reviewCount: 30,
        brand: 'AirCab',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '2座',
            range: '35公里',
            speed: '130公里/小时',
            weight: '200kg',
            battery: '锂离子电池',
            certification: 'FAA认证'
        }
    },
    {
        id: 6,
        name: '鸿鹄MARK1 倾转旋翼eVTOL',
        description: '采用倾转旋翼技术的eVTOL，兼具直升机和固定翼优势，航程远，效率高。',
        price: 3800000,
        originalPrice: 4300000,
        rating: 4.9,
        reviewCount: 20,
        brand: '鸿鹄',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '4座',
            range: '200公里',
            speed: '180公里/小时',
            weight: '400kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 7,
        name: 'LE200 多旋翼eVTOL',
        description: '配备分布式电动推进系统的eVTOL，拥有两个长翼，适合中短途运输。',
        price: 3200000,
        originalPrice: 3700000,
        rating: 4.7,
        reviewCount: 26,
        brand: 'LE200',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '4座',
            range: '180公里',
            speed: '170公里/小时',
            weight: '350kg',
            battery: '锂离子电池',
            certification: 'EASA认证'
        }
    },
    {
        id: 8,
        name: 'BlackBird 个人飞行器',
        description: '未来感十足的个人飞行器，配备多个导管风扇，适合个人出行和娱乐体验。',
        price: 1500000,
        originalPrice: 1800000,
        rating: 4.5,
        reviewCount: 32,
        brand: 'BlackBird',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '1座',
            range: '25公里',
            speed: '110公里/小时',
            weight: '120kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 9,
        name: 'TW5000 复合翼eVTOL',
        description: '复合翼设计的eVTOL，结合多旋翼和固定翼特点，适合多种应用场景。',
        price: 2800000,
        originalPrice: 3200000,
        rating: 4.6,
        reviewCount: 24,
        brand: 'TW5000',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '3座',
            range: '150公里',
            speed: '140公里/小时',
            weight: '300kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 10,
        name: '峰飞V1500M 大型货运eVTOL',
        description: '专为货运设计的大型eVTOL，载重1500kg，航程250公里，适合中短途物流运输。',
        price: 4500000,
        originalPrice: 5000000,
        rating: 4.8,
        reviewCount: 15,
        brand: '峰飞航空',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '货运专用',
            range: '250公里',
            speed: '180公里/小时',
            weight: '1500kg',
            battery: '锂离子电池',
            certification: 'CAAC认证'
        }
    },
    {
        id: 11,
        name: '小鹏汇天X2 双人智能电动飞行器',
        description: '双人座智能电动飞行器，配备先进的自动驾驶系统，适合个人出行和观光体验。',
        price: 1200000,
        originalPrice: 1500000,
        rating: 4.7,
        reviewCount: 32,
        brand: '小鹏汇天',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '2座',
            range: '25公里',
            speed: '120公里/小时',
            weight: '180kg',
            battery: '锂离子电池',
            certification: '测试阶段'
        }
    },
    {
        id: 12,
        name: 'Joby Aviation S4 城市空中出租车',
        description: '美国Joby Aviation开发的5座eVTOL，航程240公里，专为城市空中出租车服务设计。',
        price: 3200000,
        originalPrice: 3600000,
        rating: 4.8,
        reviewCount: 42,
        brand: 'Joby Aviation',
        category: 'evtol',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
        specs: {
            seats: '5座',
            range: '240公里',
            speed: '200公里/小时',
            weight: '450kg',
            battery: '锂离子电池',
            certification: 'FAA认证'
        }
    }
];
