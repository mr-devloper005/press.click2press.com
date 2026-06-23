'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const rawBrand = SITE_CONFIG.name.replace(/\.com$/i, '')
  const brand = rawBrand.toLowerCase().includes('click2press') ? 'CLICK2PRESS' : rawBrand.split(/[.\s-]+/)[0].toUpperCase()
  const navItems = [
    { label: 'Network', href: '/search' },
    { label: 'References', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="luxury-topline sticky top-0 z-50 bg-[#e5e5e5] text-black shadow-[0_1px_0_rgba(0,0,0,.35)]">
      <div className="mx-auto grid min-h-[78px] max-w-[1140px] grid-cols-[auto_1fr] items-center px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center border border-black/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="site-wordmark text-3xl text-[#262626] sm:text-4xl">
            {brand}<span className="site-wordmark-accent">|PR</span>
          </Link>
        </div>

        <nav className="ml-auto hidden items-center text-sm font-black uppercase lg:flex">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} className="px-4 py-2 transition hover:text-[var(--slot4-accent-fill)]">
              {index ? <span className="mr-4 text-black">|</span> : null}{item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center justify-end gap-4 lg:hidden">
          {session ? (
            <>
              <Link href="/create" className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Create</Link>
              <button type="button" onClick={logout} className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Logout</button>
            </>
          ) : <Link href="/login" className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Log in</Link>}
          <Link href={session ? '/create' : '/signup'} className="hidden bg-[var(--slot4-accent)] px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] text-white sm:px-6 sm:inline-flex">
            {session ? 'Publish' : 'Subscribe'}
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/15 bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-px bg-black/15">
            {[{ label: 'Home', href: '/' }, ...navItems, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="bg-white px-4 py-3 text-sm font-black uppercase tracking-[.1em]">{item.label}</Link>
            ))}
            {session ? <button type="button" onClick={() => { logout(); setOpen(false) }} className="bg-white px-4 py-3 text-left text-sm font-black uppercase tracking-[.1em]">Logout</button> : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
