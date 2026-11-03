# Облака и капитал

Мультимедийный лонгрид об инфраструктуре цифровых финансов: облака, ИИ и цифровые активы в банках и на биржах.

Стек: Vue 3, Vite, GSAP, Lenis, Chart.js.

## Запуск

Нужны Node.js 20.19+ и pnpm.

```bash
pnpm install
pnpm dev            # dev-сервер
pnpm build          # production-сборка в dist/
pnpm preview        # просмотр собранной версии
pnpm build:single   # один HTML-файл со всеми ресурсами в singlefile/
```

SVG-иллюстрации в `src/assets/figures/` генерируются скриптом `node generate-figures.mjs`.

## Деплой

Vercel: настройки берутся из `vercel.json` (Vite, `pnpm build`, каталог `dist`).
