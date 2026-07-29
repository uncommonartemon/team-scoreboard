<script setup>
import { ref, nextTick } from 'vue'
import gsap from 'gsap'
import ScoreButton from './ScoreButton.vue'
import { t } from '../i18n'

const props = defineProps({
  team: { type: Object, required: true },
  buttons: { type: Array, required: true },
  canRemove: { type: Boolean, default: true },
})
const emit = defineEmits(['remove', 'add-button', 'remove-button', 'update-button'])

const editingName = ref(false)
const nameInput = ref(null)
const cardEl = ref(null)
const scoreEl = ref(null)
const floaters = ref([])
let floaterSeq = 0

function startEditName() {
  editingName.value = true
  nextTick(() => nameInput.value?.focus())
}

function finishEditName() {
  editingName.value = false
  if (!props.team.name.trim()) props.team.name = t('teamFallbackName')
}

function applyDelta(delta) {
  props.team.score += delta
  spawnFloater(delta)
  pulseScore(delta > 0)
  pulseCard(delta > 0)
}

function spawnFloater(delta) {
  const id = ++floaterSeq
  const left = 10 + Math.random() * 60
  floaters.value.push({ id, text: delta > 0 ? `+${delta}` : `${delta}`, positive: delta > 0, left })
  nextTick(() => {
    const el = cardEl.value?.querySelector(`[data-floater="${id}"]`)
    if (!el) return
    gsap.fromTo(
      el,
      { y: 0, opacity: 1, scale: 0.85 },
      {
        y: -52,
        opacity: 0,
        scale: 1.2,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => {
          floaters.value = floaters.value.filter((f) => f.id !== id)
        },
      },
    )
  })
}

function pulseScore(positive) {
  if (!scoreEl.value) return
  gsap.fromTo(
    scoreEl.value,
    { scale: 1.35, color: positive ? '#22c55e' : '#ef4444' },
    { scale: 1, color: 'var(--text-h)', duration: 0.55, ease: 'back.out(2)' },
  )
}

function pulseCard(positive) {
  if (!cardEl.value) return
  const color = positive ? '34, 197, 94' : '239, 68, 68'
  gsap.fromTo(
    cardEl.value,
    { boxShadow: `0 0 0 0 rgba(${color}, 0.5)` },
    { boxShadow: `0 0 0 16px rgba(${color}, 0)`, duration: 0.65, ease: 'power1.out' },
  )
}

function resetScore() {
  props.team.score = 0
  pulseScore(false)
}

</script>

<template>
  <div ref="cardEl" class="team-card" :style="{ '--team-color': team.color }">
    <div class="team-card__header">
      <div
        v-if="!editingName"
        class="team-card__name"
        tabindex="0"
        @click="startEditName"
        @keydown.enter="startEditName"
      >
        {{ team.name }}
        <span class="team-card__name-edit">✎</span>
      </div>
      <input
        v-else
        ref="nameInput"
        v-model="team.name"
        class="team-card__name-input"
        maxlength="24"
        @blur="finishEditName"
        @keydown.enter="finishEditName"
      />
      <button
        v-if="canRemove"
        type="button"
        class="icon-btn team-card__remove"
        :title="t('removeTeamTitle')"
        @click="$emit('remove')"
      >
        ✕
      </button>
    </div>

    <div class="team-card__score-wrap">
      <div ref="scoreEl" class="team-card__score">{{ team.score }}</div>
      <span
        v-for="f in floaters"
        :key="f.id"
        :data-floater="f.id"
        class="floater"
        :class="f.positive ? 'is-positive' : 'is-negative'"
        :style="{ left: f.left + '%' }"
      >
        {{ f.text }}
      </span>
    </div>

    <div class="team-card__buttons">
      <ScoreButton
        v-for="btn in buttons"
        :key="btn.id"
        :value="btn.value"
        @press="applyDelta(btn.value)"
        @update="(v) => $emit('update-button', btn.id, v)"
        @remove="$emit('remove-button', btn.id)"
      />
      <button type="button" class="add-score-btn" :title="t('addButtonTitle')" @click="$emit('add-button')">
        {{ t('addButton') }}
      </button>
    </div>

    <button type="button" class="team-card__reset" @click="resetScore">{{ t('resetTeamScore') }}</button>
  </div>
</template>
