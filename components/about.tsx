"use client"

import SectionContainer from "./section-container"
import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
  return (
    <SectionContainer id="about" className="py-20 md:py-28">
      <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-sm tracking-[0.35em] uppercase text-[#9f7823]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            История
          </p>
          <h2
            className="text-3xl md:text-4xl mt-3"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Наследие мастерства
          </h2>
          <p className="mt-5 text-[#1c140a]/70">
            Сочетая традиции высокой ювелирной школы и современные технологии,
            мы создаём уникальные украшения, где каждая грань — продуманная
            деталь. Ручная полировка и ювелирная точность дают сияние,
            которое невозможно забыть.
          </p>
          <p className="mt-4 text-[#1c140a]/70">
            Используем благородные металлы и камни исключительного качества,
            подтверждённые международными сертификатами.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-[#d9b144]/30 bg-white shadow-[0_20px_60px_rgba(217,177,68,0.12)]"
        >
          <Image
            src="/placeholder.svg?height=1000&width=1400"
            alt="Мастерская ювелирного дома"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {/* Removed gold vignette overlay to avoid photo shines */}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
