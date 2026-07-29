<script setup>
import { ref, nextTick, computed } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  value: { type: Number, required: true },
})
const emit = defineEmits(['press', 'update', 'remove'])

const editing = ref(false)
const draft = ref(props.value)
const inputEl = ref(null)

const label = computed(() => (props.value > 0 ? `+${props.value}` : `${props.value}`))
const positive = computed(() => props.value >= 0)

function press(event) {
  gsap.fromTo(
    event.currentTarget,
    { scale: 0.86 },
    { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.45)' },
  )
  emit('press')
}

function startEdit() {
  draft.value = props.value
  editing.value = true
  nextTick(() => {
    inputEl.value?.focus()
    inputEl.value?.select()
  })
}

function commit() {
  const n = Math.trunc(Number(draft.value))
  if (!Number.isNaN(n) && n !== 0) emit('update', n)
  editing.value = false
}

function cancel() {
  editing.value = false
}
</script>

<template>
  <div class="score-btn-wrap">
    <input
      v-if="editing"
      ref="inputEl"
      v-model="draft"
      type="number"
      class="score-btn-edit"
      @blur="commit"
      @keydown.enter="commit"
      @keydown.esc="cancel"
    />
    <button
      v-else
      type="button"
      class="score-btn"
      :class="positive ? 'is-positive' : 'is-negative'"
      @click="press"
    >
      {{ label }}
    </button>

    <span v-if="!editing" class="score-btn-controls">
      <button type="button" class="mini-btn" title="Изменить значение" @click.stop="startEdit">✎</button>
      <button type="button" class="mini-btn" title="Удалить кнопку" @click.stop="$emit('remove')">✕</button>
    </span>
  </div>
</template>
