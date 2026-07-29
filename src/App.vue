<script setup>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
import TeamCard from './components/TeamCard.vue'
import { locale, toggleLocale, t } from './i18n'

const STORAGE_KEY = 'team-scoreboard:v1'
const PALETTE = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#06b6d4', '#ec4899', '#84cc16']

function makeButtons() {
  return [
    { id: crypto.randomUUID(), value: 100 },
    { id: crypto.randomUUID(), value: -100 },
  ]
}

function defaultTeams() {
  return [
    { id: crypto.randomUUID(), name: t('defaultTeamName', 1), score: 0, color: PALETTE[0], buttons: makeButtons() },
    { id: crypto.randomUUID(), name: t('defaultTeamName', 2), score: 0, color: PALETTE[1], buttons: makeButtons() },
  ]
}

function loadTeams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultTeams()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length) return parsed
    return defaultTeams()
  } catch {
    return defaultTeams()
  }
}

const teams = reactive(loadTeams())

watch(
  teams,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true },
)

function addTeam() {
  const color = PALETTE[teams.length % PALETTE.length]
  teams.push({
    id: crypto.randomUUID(),
    name: t('defaultTeamName', teams.length + 1),
    score: 0,
    color,
    buttons: makeButtons(),
  })
}

function removeTeam(id) {
  if (teams.length <= 1) return
  const idx = teams.findIndex((team) => team.id === id)
  if (idx === -1) return
  if (!window.confirm(t('confirmRemoveTeam', teams[idx].name))) return
  teams.splice(idx, 1)
}

function resetScores() {
  teams.forEach((team) => (team.score = 0))
}

function newGame() {
  if (!window.confirm(t('confirmNewGame'))) return
  teams.splice(0, teams.length, ...defaultTeams())
}

function onCardEnter(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 28, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.7)', onComplete: done },
  )
}

function onCardLeave(el, done) {
  gsap.to(el, { opacity: 0, y: -18, scale: 0.88, duration: 0.3, ease: 'power1.in', onComplete: done })
}
</script>

<template>
  <div class="page">
    <button type="button" class="lang-switch" @click="toggleLocale">
      {{ locale === 'uk' ? 'EN' : 'UK' }}
    </button>

    <header class="page__header">
      <h1>🏆 Team Scoreboard</h1>
      <p class="page__subtitle">{{ t('subtitle') }}</p>
    </header>

    <main class="board">
      <TransitionGroup
        tag="div"
        class="board__grid"
        name="card"
        :css="false"
        @enter="onCardEnter"
        @leave="onCardLeave"
      >
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :team="team"
          :can-remove="teams.length > 1"
          @remove="removeTeam(team.id)"
        />
      </TransitionGroup>
    </main>

    <footer class="controls">
      <button type="button" class="btn btn--primary" @click="addTeam">{{ t('addTeam') }}</button>
      <button type="button" class="btn" @click="resetScores">{{ t('resetScores') }}</button>
      <button type="button" class="btn btn--danger" @click="newGame">{{ t('newGame') }}</button>
    </footer>

    <p class="page__hint">{{ t('hint') }}</p>
  </div>
</template>
