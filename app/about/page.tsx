'use client';

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Our Mission
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          At <span className="text-[#00FFAA] font-semibold">YITA Aviation</span>, we are committed to transforming how the world moves.
          We aim to pioneer the development of cutting-edge eVTOL aircrafts that are safe, sustainable, and accessible to all.
          Our mission is to build a smarter, greener future for urban air mobility—where flight is no longer a privilege, but a part of everyday life.
        </p>
      </motion.div>
    </main>
  );
}
