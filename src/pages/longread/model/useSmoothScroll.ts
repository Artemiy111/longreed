import { onBeforeUnmount } from 'vue'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/shared/lib'

/** Плавный скролл Lenis, синхронизированный с тикером GSAP */
export function useSmoothScroll() {
  let lenis: Lenis | undefined
  let ticker: gsap.TickerCallback | undefined

  function enable() {
    const instance = new Lenis({ smoothWheel: true, duration: 1.05 })
    instance.on('scroll', ScrollTrigger.update)
    ticker = (time) => instance.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
    lenis = instance
  }

  /** Прокручивает к элементу; возвращает false, если плавный скролл выключен */
  function scrollTo(el: HTMLElement) {
    if (!lenis) return false
    lenis.scrollTo(el, { offset: -35, duration: 1.1 })
    return true
  }

  onBeforeUnmount(() => {
    lenis?.destroy()
    if (ticker) gsap.ticker.remove(ticker)
  })

  return { enable, scrollTo }
}
