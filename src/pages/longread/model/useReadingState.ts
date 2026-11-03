import { ref, onBeforeUnmount } from 'vue'

/** Текущая глава и доля прочитанного */
export function useReadingState(initial: string) {
  const active = ref(initial)
  const progress = ref(0)
  let observer: IntersectionObserver | undefined

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max ? Math.min(1, window.scrollY / max) : 0
  }

  function observe(selector: string) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active.value = e.target.id
      },
      { rootMargin: '-10% 0px -65% 0px', threshold: 0 },
    )
    document.querySelectorAll(selector).forEach((el) => observer!.observe(el))
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', updateProgress)
  })

  return { active, progress, observe }
}
