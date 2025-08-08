"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, X } from 'lucide-react'

export type ProductItem = {
  id: number
  title: string
  subtitle: string
  price: string
  description?: string
  gallery?: string[]
  video?: string | null
}

const fallbackItem: ProductItem = {
  id: 0,
  title: "Украшение",
  subtitle: "Материал",
  price: "€0",
  description:
    "Изысканное изделие с вниманием к каждой детали. Подчёркивает индивидуальность и стиль.",
  gallery: ["/placeholder.svg?height=900&width=1200"],
  video: null,
}

export default function ProductModal({
  open = false,
  onOpenChange = () => {},
  item = fallbackItem,
}: {
  open?: boolean
  onOpenChange?: (v: boolean) => void
  item?: ProductItem
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = item.gallery && item.gallery.length > 0 ? item.gallery : fallbackItem.gallery!
  const hasVideo = !!item.video

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Полноэкранная модалка */}
      <DialogContent
        className="
          fixed inset-0 m-0 translate-x-0 translate-y-0
          max-w-none w-[100vw] h-[100dvh]
          p-0 rounded-none border-0 bg-white
          shadow-none
          data-[state=open]:animate-in data-[state=closed]:animate-out
        "
      >
        {/* Кнопка закрытия */}
        <DialogClose asChild>
          <button
            aria-label="Закрыть"
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/85 backdrop-blur hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogClose>

        {/* Контент модалки: всегда на всю высоту, прокрутка только внутри колонок при необходимости */}
        <div className="grid h-full grid-cols-1 lg:grid-cols-12">
          {/* Левая колонка: медиа */}
          <div className="relative flex flex-col lg:col-span-8">
            {/* Основное медиа занимает доступную высоту */}
            <div className="relative flex-1 min-h-[40vh]">
              {hasVideo && activeIndex === images.length ? (
                <video
                  key="video"
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  poster={images[0]}
                >
                  <source src={item.video || ""} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={
                    images[Math.min(activeIndex, images.length - 1)] ||
                    "/placeholder.svg?height=900&width=1200&query=luxury%20jewelry%20photo"
                   || "/placeholder.svg"
                  }
                  alt={item.title || "Фото изделия"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1536px) 58vw, (min-width: 1024px) 56vw, 100vw"
                />
              )}
            </div>

            {/* Превью снизу: горизонтальный скролл, фиксированная высота */}
            <div className="px-4 py-4 sm:px-6 sm:py-5 bg-white">
              <div className="flex gap-3 sm:gap-4 overflow-x-auto">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Показать фото ${idx + 1}`}
                    className={`relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-2xl border ring-offset-2 focus:outline-none focus-visible:ring-2 ${
                      activeIndex === idx ? "border-[#d9b144] ring-[#d9b144]/40" : "border-black/10"
                    }`}
                  >
                    <Image
                      src={src || "/placeholder.svg?height=150&width=200&query=thumb%20photo"}
                      alt={`Превью ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                ))}
                {hasVideo && (
                  <button
                    onClick={() => setActiveIndex(images.length)}
                    aria-label="Показать видео"
                    className={`relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-2xl border flex items-center justify-center ${
                      activeIndex === images.length ? "border-[#d9b144]" : "border-black/10"
                    }`}
                  >
                    <Play className="h-7 w-7 text-[#9f7823]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Правая колонка: детали, прокручивается отдельно при переполнении */}
          <div className="flex flex-col lg:col-span-4 bg-white">
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
              <DialogHeader className="space-y-2">
                <DialogTitle
                  className="text-2xl sm:text-3xl lg:text-4xl leading-tight"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {item.title}
                </DialogTitle>
                <DialogDescription className="text-[#1c140a]/70">
                  {item.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#d9b144] to-transparent" />

              <p className="mt-4 text-xl sm:text-2xl text-[#9f7823]">{item.price}</p>

              <p className="mt-3 text-[#1c140a]/80 leading-relaxed">
                {item.description ||
                  "Изысканное изделие с вниманием к каждой детали. Подчёркивает индивидуальность и стиль."}
              </p>

              <ul className="mt-4 grid gap-1.5 text-sm text-[#1c140a]/70">
                <li>• Бесплатная доставка по Европе</li>
                <li>• Возврат в течение 30 дней</li>
                <li>• Подарочная упаковка</li>
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button className="rounded-full bg-[#d9b144] px-7 py-3 text-black hover:bg-[#e6c86a]">
                  Добавить в список желаний
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-[#d9b144]/60 px-7 py-3 text-[#1c140a] hover:bg-[#fff7e3]"
                >
                  Консультация
                </Button>
              </div>

              <div className="mt-6 text-xs text-[#1c140a]/60">
                Код товара: AU-{String(item.id).padStart(4, "0")}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
