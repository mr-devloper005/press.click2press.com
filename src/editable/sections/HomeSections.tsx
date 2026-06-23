import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Cog, MapPin, Megaphone, Newspaper, Search, Share2, TowerControl } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, getEditableCategory, getEditableExcerpt, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const serviceItems = [
  { title: 'Strategy', icon: TowerControl, copy: 'Clear communication planning for announcements, coverage, and ongoing media activity.' },
  { title: 'B2B PR', icon: Cog, copy: 'Structured updates for specialist audiences, partners, decision makers, and industry readers.' },
  { title: 'Press Releases', icon: Newspaper, copy: 'Publication-ready company news arranged for fast scanning and easy distribution.' },
  { title: 'Social Media', icon: Megaphone, copy: 'Short-form updates and campaign moments connected to the wider story archive.' },
  { title: 'Media Relations', icon: Share2, copy: 'Coverage, references, and external context presented with a calm editorial rhythm.' },
  { title: 'Event PR', icon: BriefcaseBusiness, copy: 'Launches, meetings, and live moments organized for public discovery.' },
]

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function fallbackPosts(posts: SitePost[], start: number, count: number) {
  const slice = posts.slice(start, start + count)
  return slice.length ? slice : posts.slice(0, count)
}

export function EditableHomeHero({ posts }: HomeSectionProps) {
  const lead = posts[0]
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: media updates for public discovery.`

  return (
    <section className="bg-white">
      <div className="relative min-h-[520px] overflow-hidden bg-[#606160] lg:min-h-[650px]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,174,210,.95),rgba(96,97,96,.92)_50%,rgba(209,32,82,.78))]" />
        <div className="absolute left-1/2 top-[46%] w-full max-w-[1140px] -translate-x-1/2 px-4 sm:px-6 lg:px-0">
          <p className="inline-flex bg-[var(--slot4-accent-fill)] px-5 py-2 text-base font-black text-white">
            Standing out from the crowd.
          </p>
          <h1 className="reference-hero-title mt-2 max-w-[760px] text-4xl sm:text-5xl">
            <span>{lead?.title || heroTitle}</span>
            <span>in media.</span>
          </h1>
          <p className="mt-6 max-w-2xl bg-white/88 px-6 py-4 text-base font-semibold leading-7 text-black/68">
            {lead ? getEditableExcerpt(lead, 210) : pagesContent.home.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={dc.button.accent}>Contact <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/search" className="bg-white/90 px-7 py-3.5 text-xs font-black uppercase tracking-[.08em] text-black hover:bg-white">Search updates</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = fallbackPosts(posts, 1, 8)
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-16 text-center lg:py-24`}>
        <div className="mx-auto h-1 w-16 bg-black" />
        <p className="editorial-serif mx-auto mt-12 max-w-5xl text-xl leading-10 text-[#6d737b] sm:text-2xl">
          Target-group oriented media communication across key markets is the focus. Browse announcements, coverage, references, and public updates arranged for a clear reading experience.
        </p>
        <Link href="/about" className="mt-14 inline-flex border-2 border-[var(--slot4-accent-fill)] px-7 py-4 text-xs font-black uppercase text-[var(--slot4-accent-fill)] hover:bg-[var(--slot4-accent-fill)] hover:text-white">
          Learn more about us
        </Link>
      </div>
      {railPosts.length ? (
        <div className={`${dc.shell.section} pb-12`}>
          <div className={dc.layout.rail}>
            {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  return (
    <section className="bg-[#e9e9e9]">
      <div className={`${dc.shell.section} grid gap-y-16 py-16 md:grid-cols-2 lg:grid-cols-3 lg:py-20`}>
        {serviceItems.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="px-5 text-center">
              <div className="service-orb mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#858585] bg-[#f4f4f4] text-[var(--slot4-accent-fill)]">
                <Icon className="h-11 w-11" />
              </div>
              <h2 className="mt-9 text-xl font-black uppercase">{item.title}</h2>
              <p className="mx-auto mt-7 max-w-[330px] text-sm leading-6">{item.copy}</p>
              <span className="mt-6 inline-flex text-sm font-black uppercase text-[var(--slot4-accent-fill)]">Learn more</span>
              <div className="mt-10 h-px bg-black/45" />
            </article>
          )
        })}
      </div>
      <MarketsBlock />
      <ReferenceAndUpdates primaryTask={primaryTask} primaryRoute={primaryRoute} posts={posts} />
    </section>
  )
}

function MarketsBlock() {
  const markets = [
    { title: 'Europe', copy: 'Regional context, audience nuance, and public updates for established markets.', color: 'var(--slot4-accent-fill)' },
    { title: 'Asia', copy: 'Large-market communication notes and specialist updates for fast-moving sectors.', color: 'var(--slot4-orange)' },
    { title: 'Worldwide', copy: 'Distributed stories and reference material arranged for international discovery.', color: 'var(--slot4-magenta)' },
  ]

  return (
    <section className="overflow-hidden bg-white">
      <div className={`${dc.shell.section} relative py-20 text-center lg:py-24`}>
        <div className="pointer-events-none absolute -right-64 top-10 hidden h-[560px] w-[560px] rounded-full border border-black/5 lg:block">
          <div className="absolute left-20 top-24 h-5 w-5 rounded-full bg-[var(--slot4-accent-fill)]/35" />
          <div className="absolute bottom-28 left-48 h-6 w-6 rounded-full bg-[var(--slot4-accent-fill)]/35" />
          <div className="absolute right-36 top-64 h-6 w-6 rounded-full bg-[var(--slot4-accent-fill)]/35" />
        </div>
        <h2 className="text-3xl font-black uppercase">Markets we believe in</h2>
        <div className="mx-auto mt-5 h-1 w-16 bg-black" />
        <p className="editorial-serif mx-auto mt-14 max-w-4xl text-xl leading-9 text-[#6d737b]">
          A clean distribution surface helps readers move between local updates, regional notes, and worldwide public information without losing context.
        </p>
        <div className="mt-28 grid gap-7 md:grid-cols-3">
          {markets.map((market) => (
            <article key={market.title} className="relative bg-[#e9e9e9] px-6 pb-9 pt-10">
              <div className="absolute -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-[#666] shadow-lg">
                <MapPin className="h-12 w-12 text-white" />
                <span style={{ backgroundColor: market.color }} className="absolute top-4 h-7 w-7 rounded-full border-4 border-white" />
              </div>
              <h3 className="mt-2 text-xl font-black uppercase">{market.title}</h3>
              <p className="mx-auto mt-7 max-w-[310px] text-sm leading-6">{market.copy}</p>
              <span className="mt-6 inline-flex text-sm font-black uppercase text-[var(--slot4-accent-fill)]">Learn more</span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--slot4-accent-fill)]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReferenceAndUpdates({ primaryTask, primaryRoute, posts }: { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[] }) {
  const logos = ['WEST.', 'Gebrüder Weiss', 'Blaser.', 'AFFOLTER', 'SILVERSTREAM', 'HATEBUR']
  const updates = fallbackPosts(posts, 0, 4)

  return (
    <section className="bg-[#e9e9e9]">
      <div className={`${dc.shell.section} grid gap-8 py-16 lg:grid-cols-2`}>
        <div>
          <h2 className="text-xl font-black uppercase">References</h2>
          <div className="mt-5 bg-white p-10">
            <div className="grid grid-cols-2 border-l border-t border-black/18">
              {logos.map((logo) => (
                <div key={logo} className="flex h-32 items-center justify-center border-b border-r border-black/18 text-2xl font-black text-[#8a8a8a] sm:text-3xl">{logo}</div>
              ))}
            </div>
            <Link href="/about" className="mt-10 inline-flex border-2 border-[var(--slot4-accent-fill)] px-6 py-3 text-xs font-black uppercase text-[var(--slot4-accent-fill)]">More</Link>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black uppercase">Latest updates</h2>
          <div className="relative mt-5 bg-white p-10">
            <div className="absolute -top-8 right-8 service-orb flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#858585] bg-white text-[var(--slot4-accent-fill)]">
              <Newspaper className="h-8 w-8" />
            </div>
            <div className="mt-3">
              {updates.map((post, index) => (
                <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
              {!updates.length ? <p className="py-10 text-sm text-black/60">Fresh updates will appear here automatically.</p> : null}
            </div>
            <div className="mt-8 flex items-center justify-between text-sm">
              <span className="font-black text-[var(--slot4-accent-fill)]">1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;...&nbsp;&nbsp;12</span>
              <span className="text-black/55">follow us on <strong className="text-[var(--slot4-accent-fill)]">updates</strong></span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--slot4-accent-fill)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : fallbackPosts(posts, 3, 8)
  if (!source.length) return null

  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-16`}>
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-black/20 pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[var(--slot4-accent-fill)]">{taskLabel(primaryTask)}</p>
            <h2 className="mt-2 text-3xl font-black uppercase">Editorial discovery</h2>
          </div>
          <Link href="/search" className="inline-flex items-center gap-2 text-xs font-black uppercase text-[var(--slot4-accent-fill)]">Search <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {source.slice(0, 8).map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={index % 4 === 0 ? 'group bg-[#606160] text-white md:col-span-2' : 'group bg-[#f1f1f1]'}>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
                <h3 className="mt-3 text-2xl font-black leading-tight">{post.title}</h3>
                <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getEditableExcerpt(post, 170) || 'Details will appear here once available.'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-16`}>
        <form action="/search" className="grid border-y-4 border-[var(--slot4-accent-fill)] bg-[#e9e9e9] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
          <div>
            <h3 className="text-3xl font-black uppercase">Search the full archive</h3>
            <p className="mt-2 text-sm text-black/60">Explore media distribution posts, references, categories, and public updates.</p>
          </div>
          <label className="mt-5 flex border border-black/30 bg-white sm:mt-0 sm:min-w-[420px]">
            <Search className="ml-4 mt-4 h-4 w-4 text-[var(--slot4-accent-fill)]" />
            <input name="q" placeholder="Search updates" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-[var(--slot4-accent-fill)] px-5 text-xs font-black uppercase tracking-[.1em] text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}
