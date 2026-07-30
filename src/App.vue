<script setup>
import { reactive, ref, watch, useTemplateRef } from 'vue'
import gsap from 'gsap'
import TeamCard from './components/TeamCard.vue'
import { locale, LOCALES, setLocale, t } from './i18n'

const aboutEl = useTemplateRef('aboutEl')

function scrollToAbout() {
  aboutEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)

    // Legacy format: a bare array of teams, saved before button-sync existed.
    if (Array.isArray(parsed) && parsed.length) {
      return { teams: parsed, syncButtons: false, sharedButtons: parsed[0].buttons.map((b) => ({ ...b })) }
    }
    if (parsed && Array.isArray(parsed.teams) && parsed.teams.length) {
      return {
        teams: parsed.teams,
        syncButtons: parsed.syncButtons ?? true,
        sharedButtons:
          Array.isArray(parsed.sharedButtons) && parsed.sharedButtons.length
            ? parsed.sharedButtons
            : parsed.teams[0].buttons.map((b) => ({ ...b })),
      }
    }
    return null
  } catch {
    return null
  }
}

const initialState = loadState()
const teams = reactive(initialState?.teams ?? defaultTeams())
const syncButtons = ref(initialState?.syncButtons ?? true)
const sharedButtons = reactive(initialState?.sharedButtons ?? makeButtons())

watch(
  [teams, syncButtons, sharedButtons],
  () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ teams, syncButtons: syncButtons.value, sharedButtons }),
    )
  },
  { deep: true },
)

watch(syncButtons, (on) => {
  if (on) {
    sharedButtons.splice(0, sharedButtons.length, ...teams[0].buttons.map((b) => ({ ...b })))
  } else {
    teams.forEach((team) => {
      team.buttons = sharedButtons.map((b) => ({ ...b, id: crypto.randomUUID() }))
    })
  }
})

function buttonsFor(team) {
  return syncButtons.value ? sharedButtons : team.buttons
}

function addButtonTo(team) {
  buttonsFor(team).push({ id: crypto.randomUUID(), value: 50 })
}

function removeButtonFrom(team, id) {
  const list = buttonsFor(team)
  const idx = list.findIndex((b) => b.id === id)
  if (idx !== -1) list.splice(idx, 1)
}

function updateButtonIn(team, id, value) {
  const btn = buttonsFor(team).find((b) => b.id === id)
  if (btn) btn.value = value
}

function nextColor() {
  const used = new Set(teams.map((team) => team.color))
  const free = PALETTE.find((color) => !used.has(color))
  if (free) return free

  const counts = new Map(PALETTE.map((color) => [color, 0]))
  teams.forEach((team) => counts.set(team.color, (counts.get(team.color) ?? 0) + 1))
  return [...counts.entries()].sort((a, b) => a[1] - b[1])[0][0]
}

function addTeam() {
  teams.push({
    id: crypto.randomUUID(),
    name: t('defaultTeamName', teams.length + 1),
    score: 0,
    color: nextColor(),
    buttons: syncButtons.value ? sharedButtons.map((b) => ({ ...b, id: crypto.randomUUID() })) : makeButtons(),
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
  sharedButtons.splice(0, sharedButtons.length, ...makeButtons())
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
    <select
      class="lang-switch"
      :value="locale"
      aria-label="Language"
      @change="setLocale($event.target.value)"
    >
      <option v-for="l in LOCALES" :key="l.code" :value="l.code">{{ l.label }}</option>
    </select>

    <section class="hero">
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
            :buttons="buttonsFor(team)"
            :can-remove="teams.length > 1"
            @remove="removeTeam(team.id)"
            @add-button="addButtonTo(team)"
            @remove-button="(id) => removeButtonFrom(team, id)"
            @update-button="(id, value) => updateButtonIn(team, id, value)"
          />
        </TransitionGroup>
      </main>

      <label class="sync-toggle">
        <input type="checkbox" v-model="syncButtons" />
        {{ t('syncButtonsLabel') }}
      </label>

      <footer class="controls">
        <button type="button" class="btn btn--primary" @click="addTeam">{{ t('addTeam') }}</button>
        <button type="button" class="btn" @click="resetScores">{{ t('resetScores') }}</button>
        <button type="button" class="btn btn--danger" @click="newGame">{{ t('newGame') }}</button>
      </footer>

      <p class="page__hint">{{ t('hint') }}</p>

      <button type="button" class="scroll-hint" @click="scrollToAbout">
        {{ t('scrollHint') }}
        <span class="scroll-hint__arrow">↓</span>
      </button>
    </section>

    <section ref="aboutEl" class="about">
      <h2>{{ t('aboutTitle') }}</h2>
      <p>{{ t('aboutIntro') }}</p>
      <ul class="about__use-cases">
        <li v-for="useCase in t('useCases')" :key="useCase">{{ useCase }}</li>
      </ul>
    </section>
  </div>
</template>
