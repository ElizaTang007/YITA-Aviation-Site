'use client';

import { motion } from "framer-motion";

export default function TechnologyPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col">

      {/* 顶部 Hero 区 */}
      <section className="flex flex-col items-center justify-center min-h-screen p-8">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-[#00FFAA]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Technology
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl text-gray-400 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Empowering the future of urban air mobility with cutting-edge eVTOL innovation.
        </motion.p>
      </section>

      {/* 技术特点块 */}
      <section className="flex flex-col gap-20 p-8 md:p-20 bg-black text-white">
        
        {/* 块1 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-[#00FFAA]">
            Intelligent Flight Systems
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Our eVTOL aircrafts are equipped with AI-driven navigation, autonomous safety protocols, and real-time adaptive control systems to ensure seamless urban operations.
          </p>
        </motion.div>

        {/* 块2 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-[#00FFAA]">
            Sustainable Energy Solutions
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            We are committed to reducing carbon emissions through electric propulsion, lightweight materials, and renewable energy integrations for a cleaner future.
          </p>
        </motion.div>

        {/* 块3 */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-[#00FFAA]">
            Advanced Aerodynamic Design
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Our engineering breakthroughs in aerodynamics minimize noise pollution, maximize energy efficiency, and ensure smooth, safe vertical take-offs and landings.
          </p>
        </motion.div>

      </section>

    </main>
  );
}
