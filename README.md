# 🏆 Team Scoreboard

**Free online score calculator for team games** — keep score for board games, pub quizzes, parties, and team building, right in your browser. No install, no sign-up, no ads.

**Безкоштовний онлайн-рахунок для командних ігор** з друзями — настільні ігри, вікторини, тімбілдинг. Без встановлення й реєстрації.

🔗 **Live demo:** https://uncommonartemon.github.io/team-scoreboard/

UI language: **Ukrainian / English** (switch with the button in the top-right corner).

## Use cases / Для чого це підходить

- Board and card games with a group of friends / Настільні та карткові ігри великою компанією
- Pub quizzes and trivia nights / Вікторини й квізи
- Birthday parties, summer camp, outdoor games / Дні народження, табір, ігри на природі
- Team-building activities at the office / Командний тімбілдинг в офісі
- Classroom competitions and school clubs / Змагання на уроках у школі
- Backyard sports and relay races without a scoreboard / Домашні спортивні ігри та естафети

## Features

- Any number of teams — add and remove on the fly
- Editable team name (click the name)
- Score buttons (default +100 / −100)
  - change any button's value
  - add custom buttons (e.g. +10, −25)
  - delete buttons you don't need
- Reset a single team's score or all scores at once
- "New game" — full reset to defaults
- State auto-saved to browser `localStorage` — nothing is sent to a server
- Smooth animations (GSAP): cards entering/leaving, floating +/- score popups, score pulse
- Responsive layout for phone, tablet and desktop
- Ukrainian / English interface with a one-click switch

## FAQ

**Is it free?** Yes, completely free, no ads, no account needed.

**Where is my data stored?** Locally in your browser (`localStorage`). Nothing is sent anywhere, so only you can see it.

**How many teams can I add?** As many as you need.

**Can I customize the point buttons?** Yes — edit or delete any button's value, or add your own.

## Tech stack

Vue 3 (`<script setup>`) + Vite + GSAP. Frontend-only, deployed as a static site to GitHub Pages via GitHub Actions.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build     # production build into dist/
npm run preview   # preview the production build
```

Every push to `main` auto-deploys to GitHub Pages (see `.github/workflows/deploy.yml`).

## License

MIT — see [LICENSE](LICENSE).
