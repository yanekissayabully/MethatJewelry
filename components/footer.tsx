import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const links = [
    { href: "#collections", label: "Коллекции" },
    { href: "#about", label: "О бренде" },
    { href: "#contact", label: "Контакты" },
  ]
  const socials = [
    { href: "#", label: "Instagram", icon: Instagram },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "#", label: "YouTube", icon: Youtube },
  ]
  return (
    <footer className="mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d9b144] to-transparent opacity-70" />
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f2d787] via-[#d9b144] to-[#9f7823] shadow-[0_0_24px_rgba(217,177,68,0.35)]" />
            <div>
              <p
                className="text-lg tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Aurelia
              </p>
              <p className="text-sm text-[#1c140a]/60">Ювелирный Дом</p>
            </div>
          </div>

          <nav className="flex gap-6 md:justify-center">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#1c140a]/70 hover:text-[#9f7823] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-4 md:justify-end">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[#d9b144]/40 text-[#1c140a]/70 hover:text-black hover:bg-[#d9b144] hover:border-[#d9b144] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#1c140a]/60">
          <p>© {new Date().getFullYear()} Aurelia. Все права защищены.</p>
          <p>Политика конфиденциальности · Условия использования</p>
        </div>
      </div>
    </footer>
  )
}
