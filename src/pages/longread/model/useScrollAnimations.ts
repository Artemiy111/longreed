import { onBeforeUnmount } from 'vue'
import { gsap } from '@/shared/lib'

/** Появление заголовков и карточек, закреплённый блок тезисов */
export function useScrollAnimations() {
  let ctx: gsap.Context | undefined

  function enable() {
    ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.chapter-header,.conclusion').forEach((el) =>
        gsap.from(el, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        }),
      )
      gsap.from('.case-card', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.cases-grid', start: 'top 90%', once: true },
      })
      gsap.matchMedia().add('(min-width: 1100px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.thesis-line')
        gsap
          .timeline({ scrollTrigger: { trigger: '.thesis', start: 'top 18%', end: '+=950', pin: true, scrub: 1 } })
          .fromTo(rows[1]!, { opacity: 0.18 }, { opacity: 1, duration: 1 })
          .fromTo(rows[2]!, { opacity: 0.18 }, { opacity: 1, duration: 1 })
      })
    })
  }

  onBeforeUnmount(() => ctx?.revert())

  return { enable }
}
