"use client"

import SectionContainer from "./section-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { sendMessage } from "@/app/actions/send-message"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState<{ ok: boolean; message?: string; error?: string } | null>(null)

  return (
    <SectionContainer id="contact" className="py-20 md:py-28">
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
          Связаться
        </p>
        <h2
          className="text-3xl md:text-4xl mt-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Мы рядом, чтобы помочь
        </h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] border border-[#d9b144]/40 bg-white p-5 md:p-6 shadow-[0_20px_60px_rgba(217,177,68,0.12)]"
        >
          <form
            action={async (formData: FormData) => {
              const res = await sendMessage(formData)
              setStatus(res)
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1c140a]">Имя</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ваше имя"
                  className="rounded-2xl bg-white border-[#d9b144]/40 text-[#1c140a] placeholder:text-[#1c140a]/45 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#d9b144]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1c140a]">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-2xl bg-white border-[#d9b144]/40 text-[#1c140a] placeholder:text-[#1c140a]/45 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#d9b144]"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1c140a]">Сообщение</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Расскажите, чем мы можем помочь"
                className="rounded-2xl bg-white border-[#d9b144]/40 text-[#1c140a] placeholder:text-[#1c140a]/45 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#d9b144]"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Button
                type="submit"
                className="bg-[#d9b144] text-black hover:bg-[#e6c86a] rounded-full px-6 shadow-[0_8px_30px_rgba(217,177,68,0.35)]"
              >
                Отправить
              </Button>
              {status && (
                <p
                  role="status"
                  className={status.ok ? "text-emerald-700" : "text-red-600"}
                >
                  {status.ok ? status.message : status.error}
                </p>
              )}
            </div>
          </form>

          <div className="mt-6 grid gap-3 text-[#1c140a]/80">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#9f7823]" />
              hello@aurelia.example
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#9f7823]" />
              +49 123 456 789
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#9f7823]" />
              Kurfürstendamm 100, Berlin
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[28px] overflow-hidden border border-[#d9b144]/40 bg-white"
        >
          <Image
            src="/placeholder.svg?height=900&width=1400"
            alt="Карта расположения бутика"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fff2cc]/50 via-transparent to-white/30" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#d9b144]/40 p-4">
            <p className="text-sm text-[#1c140a]/70">
              Найдите нас в центре города. Парковка для клиентов — бесплатно.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
