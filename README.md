# JS Quest 🎮

Интерактивный тренажёр JavaScript — учись, решая задачи прямо в браузере.

- **103 задачи** в **10 модулях** + **9 квизов**
- Геймификация: XP, уровни, стрики, бейджи
- Код ученика исполняется изолированно в **Web Worker**, DOM-задачи — в **iframe sandbox**
- Мета-тесты (`solutions.spec.ts`) проверяют, что все эталонные решения проходят свои проверки

## Стек

Vite · React 18 · TypeScript · Tailwind CSS v4 · React Router (HashRouter) · Zustand · Vitest

## Команды

```bash
npm install       # установка зависимостей
npm run dev       # локальный дев-сервер
npm run verify    # typecheck + lint + test + build (должен быть зелёным)
npm run build     # прод-сборка
```

## Деплой

Пуш в `main` → GitHub Actions собирает и публикует на GitHub Pages.

Сайт: https://mwildfire.github.io/js-quest/
