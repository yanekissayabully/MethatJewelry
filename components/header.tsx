"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from 'lucide-react'
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Header() {
  const [open, setOpen] = useState(false)

  const nav = [
    { href: "#collections", label: "Коллекции" },
    { href: "#about", label: "О бренде" },
    { href: "#contact", label: "Контакты" },
  ]

  return (
    <header className="fixed top-3 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Glassy bar */}
        <div className="relative grid grid-cols-3 items-center rounded-2xl border border-[#d9b144]/30 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgba(217,177,68,0.12)]">
          {/* Left: nav (desktop), burger (mobile) */}
          <div className="flex items-center gap-6 pl-4 h-16">
            <button
              aria-label="Открыть меню"
              className="md:hidden text-[#1c140a]"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#1c140a]/70 hover:text-[#9f7823] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <div className="flex items-center justify-center">
            <Link href="#" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f2d787] via-[#d9b144] to-[#9f7823] shadow-[0_0_24px_rgba(217,177,68,0.25)]" />
              <span
                className="text-lg tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Aurelia
              </span>
            </Link>
          </div>

          {/* Right: CTA on desktop, phone icon on mobile */}
          <div className="flex items-center justify-end pr-4 gap-3">
            {/* Mobile phone icon */}
            <a
              href="tel:+49123456789"
              aria-label="Позвонить"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b144]/40 text-[#1c140a] hover:bg-[#fff7e3]"
            >
              <Phone className="h-5 w-5" />
            </a>
            {/* Desktop button */}
            <Button
              asChild
              className="hidden md:inline-flex rounded-full px-5 bg-[#d9b144] text-black hover:bg-[#e6c86a] shadow-[0_4px_20px_rgba(217,177,68,0.25)]"
            >
              <a href="#contact">Связаться</a>
            </Button>
          </div>

          {/* Gold glow underline */}
          <div className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-[#d9b144]/70 to-transparent" />
        </div>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-[grid-template-rows] duration-300",
            open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 pb-4 px-4 rounded-b-2xl border-x border-b border-[#d9b144]/30 bg-white/80 backdrop-blur">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[#1c140a]/80 hover:text-[#9f7823] border-b last:border-0 border-black/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
