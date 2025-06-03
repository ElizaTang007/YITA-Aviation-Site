'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const slides = [
    { img: '/images/china.jpg', title: '中国的低空经济愿景', text: '积极推进民用低空空域改革，建设万亿级低空经济体。' },
    { img: '/images/europe.jpg', title: '欧洲的城市空中出行计划', text: '支持UAM立法，注重可持续与城市融合。' },
    { img: '/images/us.jpg', title: '美国AAM国家路线图', text: 'FAA和NASA推进Sky计划，实现商业化点对点飞行。' },
    { img: '/images/seamless.jpg', title: '无缝出行体验', text: 'EVTOL与地面系统协同，实现一体化交通体验。' },
    { img: '/images/sustainable.jpg', title: '绿色低碳技术', text: '以零排放为目标，推动绿色飞行器发展。' },
    { img: '/images/connected.jpg', title: '连接城市与社区', text: '打通城市边缘地带，实现空间公平与无缝连接。' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const offsetTop = container.offsetTop;
      const screenHeight = window.innerHeight;
      const totalScrollHeight = screenHeight * (slides.length - 1); // 5屏高度
      const totalHorizontalScroll = window.innerWidth * (slides.length - 1); // 5屏横向

      const relativeScroll = scrollTop - offsetTop;
      const scrollWrapper = container.querySelector<HTMLElement>('.scroll-wrapper');
      if (!scrollWrapper) return;

      if (relativeScroll >= 0 && relativeScroll <= totalScrollHeight) {
        const progress = relativeScroll / totalScrollHeight;
        scrollWrapper.style.transform = `translateX(-${progress * totalHorizontalScroll}px)`;
      } else if (relativeScroll > totalScrollHeight) {
        scrollWrapper.style.transform = `translateX(-${totalHorizontalScroll}px)`;
      } else {
        scrollWrapper.style.transform = `translateX(0px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides.length]);

  return (
    <main className="relative w-full overflow-hidden text-white">

      {/* 顶部品牌 Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-white text-lg md:text-xl font-extrabold tracking-widest">
          YITA <span className="text-[#B1FF1A]">AVIATION</span>
        </h1>
      </div>

      {/* 固定背景视频 */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 第一屏 */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            A New Mobility Paradigm
          </h1>
        </motion.div>

        {/* 下滑箭头 */}
        <motion.div className="absolute bottom-10 animate-bounce" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          <svg className="w-8 h-8 text-[#00FFAA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* 第二屏 */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Building <span className="text-[#B1FF1A]">Tomorrow.</span><br /> From the <span className="text-[#B1FF1A]">Ground Up.</span>
          </h2>
          <p className="text-lg text-white/80 font-semibold leading-relaxed mb-6">
            Shaping the future of urban air mobility with intelligent and sustainable flight technology.
          </p>
          <button className="mt-4 px-8 py-4 bg-[#B1FF1A] text-black text-lg font-bold rounded-full shadow-md hover:scale-105 transition-transform duration-300">
            Get to know us
          </button>
        </motion.div>
      </section>

      {/* 第三屏：横向滚动介绍 */}
      <section
        ref={scrollContainerRef}
        className="relative z-10 bg-black"
        style={{ height: `${(slides.length - 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="scroll-wrapper flex w-[600vw] h-full transition-transform duration-300 ease-out">
            {slides.map((slide, idx) => (
              <div key={idx} className="w-screen h-full flex flex-col md:flex-row items-center justify-center px-10 gap-12">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full md:w-[30%] max-h-[70vh] object-cover rounded-xl shadow-lg animate-fade-in-left"
                />
                <div className="max-w-lg text-left">
                  <h3 className="text-5xl md:text-6xl font-extrabold mb-6">{slide.title}</h3>
                  <p className="text-xl text-white/80 leading-relaxed">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 向右箭头提示 */}
        <div className="absolute bottom-6 right-6 z-30 animate-bounce">
          <svg className="w-10 h-10 text-[#B1FF1A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </section>

      {/* 第四屏：愿景展示 */}
      <section className="relative z-10 h-screen w-full">
        {/* 背景图 */}
        <div className="absolute inset-0">
          <img
            src="/images/vision.jpg"
            alt="Vision Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* 内容层 */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            We Believe in the Future of Mobility
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-white/80 text-lg md:text-xl leading-relaxed"
          >
            At YITA AVIATION, we are committed to reshaping the way the world moves — through clean, scalable, and intelligent aerial technology.
          </motion.p>
        </div>
      </section>

    </main>
  );
}
