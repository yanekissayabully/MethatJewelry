"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function Sparkles() {
  const items = Array.from({ length: 22 })
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((_, i) => {
        const size = 4 + ((i * 7) % 10)
        const left = (i * 37) % 100
        const top = (i * 19) % 100
        const delay = (i % 7) * 0.35
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(242,215,135,0.9) 40%, rgba(217,177,68,0.35) 60%, transparent 70%)",
              filter: "blur(0.3px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.25, 0.8] }}
            transition={{ duration: 3 + (i % 5), delay, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      })}
    </div>
  )
}

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 15 })
  const sy = useSpring(my, { stiffness: 60, damping: 15 })
  const translateX = useTransform(sx, [-50, 50], ["-1%", "1%"])
  const translateY = useTransform(sy, [-50, 50], ["-1%", "1%"])

  function onMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    mx.set(((x - cx) / cx) * 50)
    my.set(((y - cy) / cy) * 50)
  }

  return (
    <section onMouseMove={onMouseMove} className="relative min-h-[92vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fff6e6] to-white" />
        <div className="absolute -top-1/3 -left-1/4 h-[120vh] w-[80vw] rounded-full opacity-50 blur-3xl"
             style={{ background: "radial-gradient(circle, rgba(242,215,135,0.35), transparent 60%)" }} />
        <div className="absolute -bottom-1/3 -right-1/4 h-[120vh] w-[80vw] rounded-full opacity-50 blur-3xl"
             style={{ background: "radial-gradient(circle, rgba(217,177,68,0.25), transparent 60%)" }} />
        <Sparkles />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <p className="mb-3 text-xs md:text-sm tracking-[0.35em] uppercase text-[#9f7823]" style={{ fontFamily: "var(--font-inter)" }}>
              Новая коллекция
            </p>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b89033] via-[#d9b144] to-[#f2d787]">
                Свет роскоши
              </span>{" "}
              в каждом изделии
            </h1>
            <p className="text-[#1c140a]/70 max-w-xl mb-10">
              Чистые линии, благородные материалы и сияние, которое невозможно забыть. Украшения, созданные для тех, кто ценит совершенство.
            </p>
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="h-12 md:h-14 rounded-full px-8 md:px-10 font-normal text-[1.05rem] md:text-[1.125rem] bg-[#d9b144] text-black hover:bg-[#e6c86a] shadow-[0_8px_30px_rgba(217,177,68,0.35)]"
              >
                <a href="#collections">Смотреть коллекции</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-12 md:h-14 rounded-full px-8 md:px-10 font-normal text-[1.05rem] md:text-[1.125rem] border-2 border-[#d9b144]/60 text-[#1c140a] hover:bg-[#fff7e3]"
              >
                <a href="#about">О бренде</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            style={{ x: translateX, y: translateY }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[999px] border border-[#d9b144]/30 bg-white shadow-[0_30px_80px_rgba(217,177,68,0.20)]"
          >
            <Image
              src="/main.jpg"
              alt="Люксовое ювелирное изделие на светлом фоне"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
