"use client"

import Image from "next/image"
import SectionContainer from "./section-container"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import ProductModal, { type ProductItem } from "./product-modal"

type Item = ProductItem & {
  image: string
}

const items: Item[] = [
  {
    id: 1,
    title: "Колье Aurora",
    subtitle: "18K золото, бриллианты",
    price: "€4 900",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Колье ручной работы с огранёнными бриллиантами и деликатной линией. Идеально для вечерних выходов и особых случаев.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 2,
    title: "Кольцо Serene",
    subtitle: "Платина, бриллиант",
    price: "€7 200",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Элегантное платиновое кольцо с центральным бриллиантом — классика, проверенная временем.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 3,
    title: "Серьги Eclat",
    subtitle: "Белое золото, сапфиры",
    price: "€3 300",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Серьги с сапфирами насыщенного оттенка. Игра света подчёркивает чистоту камней.",
    gallery: ["/placeholder.svg?height=1200&width=900"],
    video: null,
  },
  {
    id: 4,
    title: "Браслет Helios",
    subtitle: "Жёлтое золото",
    price: "€2 450",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Минималистичный браслет из жёлтого золота с безупречной полировкой.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 5,
    title: "Кольцо Nocturne",
    subtitle: "Чёрное золото, оникс",
    price: "€2 900",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Драматичное сочетание чёрного золота и матового оникса — для смелых образов.",
    gallery: ["/placeholder.svg?height=1200&width=900"],
    video: null,
  },
  {
    id: 6,
    title: "Брошь Muse",
    subtitle: "Розовое золото, жемчуг",
    price: "€2 100",
    image: "/placeholder.svg?height=900&width=720",
    description:
      "Брошь с жемчугом и тёплым оттенком розового золота. Тонкий акцент на силуэте.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
]

function useTilt() {
  const ref = useRef<HTMLDivElement | null>(null)
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotX = (py - 0.5) * -8
    const rotY = (px - 0.5) * 8
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
  }
  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
  }
  return { ref, onMouseMove, onLeave }
}

function Card({
  item,
  onClick,
}: {
  item: Item
  onClick: () => void
}) {
  const { ref, onMouseMove, onLeave } = useTilt()
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-[28px]"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Soft gold frame */}
      <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-[#f2d787]/20 to-transparent opacity-70" />
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
        className="relative overflow-hidden rounded-[28px] border border-[#d9b144]/30 bg-white"
      >
        <div className="relative h-80">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{
              clipPath:
                "path('M 0 40 Q 80 0 160 30 T 340 10 T 520 30 T 720 0 L 720 320 Q 620 300 540 340 T 360 300 T 200 340 T 0 320 Z')",
            }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-[#1c140a]/60">{item.subtitle}</p>
            </div>
            <span className="text-[#9f7823] font-medium">{item.price}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Collections() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Item | null>(null)

  return (
    <SectionContainer id="collections" className="py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10 md:mb-14"
      >
        <p
          className="text-sm tracking-[0.35em] uppercase text-[#9f7823]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Избранное
        </p>
        <h2
          className="text-3xl md:text-4xl mt-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Коллекции
        </h2>
      </motion.div>

      {/* Mobile: horizontal scroll, single row */}
      <div className="-mx-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {items.map((item) => (
            <div key={item.id} className="min-w-[85%] snap-center">
              <Card
                item={item}
                onClick={() => {
                  setSelected(item)
                  setOpen(true)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid gap-6 md:gap-8 grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.id}
            item={item}
            onClick={() => {
              setSelected(item)
              setOpen(true)
            }}
          />
        ))}
      </div>

      <ProductModal
        open={open}
        onOpenChange={setOpen}
        item={
          selected || {
            id: 0,
            title: "",
            subtitle: "",
            price: "",
            image: "/placeholder.svg?height=900&width=720",
            description: "",
            gallery: ["/placeholder.svg?height=1200&width=900"],
            video: null,
          }
        }
      />
    </SectionContainer>
  )
}
