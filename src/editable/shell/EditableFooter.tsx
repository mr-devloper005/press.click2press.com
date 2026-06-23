'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const rawBrand = SITE_CONFIG.name.replace(/\.com$/i, '')
  const brand = rawBrand.toLowerCase().includes('click2press') ? 'CLICK2PRESS' : rawBrand.split(/[.\s-]+/)[0].toUpperCase()

  return (
    <footer className="border-t-4 border-[var(--slot4-accent)] bg-[#606160] text-white">
      <div className="mx-auto max-w-[1140px] px-4 py-14 sm:px-6 lg:px-0 lg:py-16">
        <div className="grid gap-12 md:grid-cols-[1.1fr_.8fr_.8fr]">
          <div>
            <Link href="/" className="site-wordmark text-4xl text-white sm:text-5xl">
              {brand}<span className="site-wordmark-accent">|PR</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/78">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase text-white">PR Desk</h3>
            <div className="mt-5 grid gap-2 text-sm leading-6 text-white/85">
              <Link href="/search" className="hover:text-[var(--slot4-accent)]">Network</Link>
              <Link href="/about" className="hover:text-[var(--slot4-accent)]">References</Link>
              <Link href="/contact" className="hover:text-[var(--slot4-accent)]">Contact</Link>
            </div>
          </div>

          <div>
            <div className="grid gap-2 text-sm font-black text-[var(--slot4-accent)]">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Privacy Policy / Data Protection</Link>
              {session ? (
                <>
                  <Link href="/create">Publish</Link>
                  <button onClick={logout} className="text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login">Log in</Link>
                  <Link href="/signup">Subscribe</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-5 text-center text-[10px] font-black uppercase tracking-[.18em] text-white/50">
        © {year} {SITE_CONFIG.name}. Media distribution and public information.
      </div>
    </footer>
  )
}
