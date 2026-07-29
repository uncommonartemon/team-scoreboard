# 🏆 Team Scoreboard

Free online score calculator for team games / безкоштовний онлайн-калькулятор рахунку для командних ігор з друзями. Frontend-only, no backend, no sign-up. UI: **Ukrainian / English** (toggle in the top-right corner).

**Demo:** https://uncommonartemon.github.io/team-scoreboard/

## Features

- Any number of teams — add and remove on the fly
- Editable team name (click the name)
- Score buttons (default +100 / −100)
  - change any button's value
  - add custom buttons (e.g. +10, −25)
  - delete buttons you don't need
- Reset a single team's score or all scores at once
- "New game" — full reset to defaults
- State auto-saved to browser `localStorage`
- Smooth animations (GSAP): cards entering/leaving, floating +/- score popups, score pulse
- Responsive layout for phone, tablet and desktop
- Ukrainian / English interface with a one-click switch

## Технологии

Vue 3 (`<script setup>`) + Vite + GSAP. Чистый фронтенд, деплоится статикой на GitHub Pages.

## Разработка

```bash
npm install
npm run dev      # локальный сервер разработки
npm run build     # прод-сборка в dist/
npm run preview   # предпросмотр прод-сборки
```

Деплой на GitHub Pages происходит автоматически через GitHub Actions при пуше в `main` (см. `.github/workflows/deploy.yml`).
