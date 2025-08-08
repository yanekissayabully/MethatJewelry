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
    title: "Слияние",
    subtitle: "«Слияние» — это не просто кольцо. Это главное обещание, которое вы далидруг другу на всю жизнь.",
    price: "285 000 ₸",
    image: "/sliyanie.jpg?height=900&width=720",
    description:
      "«Слияние» — это молчаливое обещание идти вместе всю жизнь. Кольца символизируют любовь, уважение и общее будущее. Каждая линия, каждый орнамент — знак переплетённой судьбы. Золото и бриллианты — о нежности, серебро — о прочности. «Слияние» — это не просто кольцо. Это обет, с которого начинается ваша история.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
  {
    id: 2,
    title: "Бесконечность",
    subtitle: "«Бесконечность» — это чувство без границ. Любовь, которая с годами не угасает и не меняется, а становится только глубже. Эти кольца — обещание, данное перед самым Временем.",
    price: "295 000 ₸",
    image: "/infinity.jpg?height=900&width=720",
    description:
      "«Бесконечность» — пара колец, символизирующая вечность любви. В дизайне сочетаются простота и глубокий смысл. Это не просто золото и серебро — это отражение доверия и верности друг другу.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 3,
    title: "Любовь",
    subtitle: "«Любовь» — это не только начало. Это путь. Чувство, воплощённое в форме кольца: многослойное, яркое, глубокое. Вы сумели сохранить его вместе — а теперь сможете передать дальше, своим потомкам.",
    price: "365 000 ₸",
    image: "/love.jpg?height=900&width=720",
    description:
      "«Любовь» — это не просто чувство. Это — настоящая, глубокая и уникальная связь между вами. Каждая грань — символ пережитых вместе моментов. А бриллиант — сияющее доказательство этой любви.",
    gallery: ["/placeholder.svg?height=1200&width=900"],
    video: null,
  },
  {
    id: 4,
    title: "Классика",
    subtitle: "Эти кольца кажутся скромными и ненавязчивыми, но именно эта простота придаёт им особую ценность.",
    price: "275 000 ₸",
    image: "/classic.jpg?height=900&width=720",
    description:
      "«Классика» — воплощение любви, неподвластной времени. Лёгкий и элегантный дизайн гармонирует с любым временем и стилем. Эта пара колец — для тех, кто ценит искренность, стабильность и чистоту чувств. Мода проходит. Классика — остаётся.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 5,
    title: "Авангард",
    subtitle: "Его форма неидеально ровная, с лёгкими гранями — как и в любви: пусть не всё идеально, но всё — по- настоящему. Это кольцо — для смелых и честных чувств, таких, как ваши.",
    price: "355 000 ₸",
    image: "/avangard.jpg?height=900&width=720",
    description:
      "«Авангард» — для тех, кто уходит от классики и верит в свой стиль и свои решения. Не глянцевая, не матовая — особенная, как вы. Это кольцо — отражение вашей нестандартной любви. «Авангард» — значит быть впереди, выделяться, не быть как все.",
    gallery: ["/placeholder.svg?height=1200&width=900"],
    video: null,
  },
  {
    id: 6,
    title: "Доверие",
    subtitle: "«Доверие» — это сердце любви. Там, где есть любовь, есть и доверие. Это кольцо — безмолвное, но вечное обещание: «Я тебе верю».",
    price: "325 000 ₸",
    image: "/doverie.jpg?height=900&width=720",
    description:
      "«Доверие» — прочнейшая основа любви. Доверие, не измеряемое временем. Символ спокойного и устойчивого чувства. Эти кольца — о безусловной вере и понимании без слов.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 7,
    title: "Связанные",
    subtitle: "«Связанные» — это как два человека, чьи сердца бьются как одно. Простые линии — путь, по которому вы идёте вместе, а бриллиант — яркая точка света на этом пути.",
    price: "375 000 ₸",
    image: "/svyazanie.jpg?height=900&width=720",
    description:
      "«Связанные» — связь, рождающаяся, когда два сердца бьются в одном ритме. Эта пара колец — отражение внутренней гармонии, согласия и глубины чувств. Два разных металла — золото и серебро — дополняют друг друга, находя идеальное сочетание.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 8,
    title: "Тепло",
    subtitle: "«Тепло» — самая тонкая и самая прочная грань любви. Со временем чувства становятся спокойнее, но если между вами есть тепло — всё сохраняется.",
    price: "345 000 ₸",
    image: "/teplo.jpg?height=900&width=720",
    description:
      "«Тепло» — кольцо, воплощающее нежность и душевную заботу двух людей друг о друге. Его дизайн прост, но глубоко трогает сердце. Это выбор тех, кто умеет любить мягко, без громких слов.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 9,
    title: "Тайна",
    subtitle: "«Тайна» — это невидимая, но самая прочная часть любви. На первый взгляд — просто кольцо. Но в нём скрыта особая связь, которую понимаете только вы двое.",
    price: "355 000 ₸",
    image: "/tayna.jpg?height=900&width=720",
    description:
      "«Тайна» — для тех моментов, когда чувства невозможно выразить словами. Безмолвное понимание, внутреннее единение, сила невидимой связи. Дизайн необычен: выемка и бриллиант на женском кольце отражают ту самую таинственную гармонию. Две разные формы — одно целое.",
    gallery: [
      "/placeholder.svg?height=1200&width=900",
      "/placeholder.svg?height=1200&width=900",
    ],
    video: null,
  },
  {
    id: 10,
    title: "Вечное",
    subtitle: "Словно воспоминание, которое не тускнеет. Словно обещание, данное навсегда.",
    price: "395 000 ₸",
    image: "/vechnoe.jpg?height=900&width=720",
    description:
      "«Вечное» — кольца для тех, чья любовь не боится времени. Лаконичные, благородные, с тонкой фактурой и сияющим бриллиантом — эти украшения созданы быть с вами всегда.",
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
