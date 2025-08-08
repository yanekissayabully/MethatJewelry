"use client"

import SectionContainer from "./section-container"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'

type Card = {
  title: string
  href: string
  image: string
  subtitle: string
}

const cards: Card[] = [
  {
    title: "Aurelia Classic",
    subtitle: "Вечная классика",
    href: "https://aurelia.example/classic",
    image: "/placeholder.svg?height=900&width=1400",
  },
  {
    title: "Aurelia Minimal",
    subtitle: "Чистые линии",
    href: "https://aurelia.example/minimal",
    image: "/placeholder.svg?height=900&width=1400",
  },
  {
    title: "Aurelia Atelier",
    subtitle: "Арт-коллекции",
    href: "https://aurelia.example/atelier",
    image: "/placeholder.svg?height=900&width=1400",
  },
]

function LikeCard({ c }: { c: Card }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#d9b144]/30 bg-white"
    >
      <Link href={c.href} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={c.image || "/placeholder.svg"}
            alt={c.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        </div>
        <div className="flex items-start justify-between p-5">
          <div>
            <h3
              className="text-xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {c.title}
            </h3>
            <p className="text-sm text-[#1c140a]/60">{c.subtitle}</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b144]/60 text-[#1c140a] group-hover:bg-[#d9b144] group-hover:text-black transition-colors">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function YouMayLike() {
  return (
    <SectionContainer id="you-may-like" className="py-16 md:py-24">
      <div className="mb-8 md:mb-12">
        <p
          className="text-sm tracking-[0.35em] uppercase text-[#9f7823]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Вам может понравиться
        </p>
        <h2
          className="mt-3 text-3xl md:text-4xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Другие наши коллекции
        </h2>
      </div>

      {/* Мобилка: горизонтальный скролл, десктоп: сетка 3 колонки */}
      <div className="-mx-4 md:mx-0 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4">
          {cards.map((c) => (
            <div key={c.href} className="min-w-[85%] snap-center">
              <LikeCard c={c} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-3 gap-6 md:gap-8">
        {cards.map((c) => (
          <LikeCard c={c} key={c.href} />
        ))}
      </div>
    </SectionContainer>
  )
}
