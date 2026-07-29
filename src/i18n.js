import { ref, watch } from 'vue'

const STORAGE_KEY = 'team-scoreboard:locale'

const messages = {
  uk: {
    subtitle:
      'Лічильник очок для ігор з друзями — додавайте команди, нараховуйте та знімайте бали своїми кнопками.',
    addTeam: '+ Додати команду',
    resetScores: 'Скинути бали',
    newGame: 'Нова гра',
    hint: 'Дані зберігаються автоматично у цьому браузері.',
    removeTeamTitle: 'Видалити команду',
    resetTeamScore: 'Скинути очки',
    addButton: '+ кнопка',
    addButtonTitle: 'Додати кнопку',
    editValueTitle: 'Змінити значення',
    deleteButtonTitle: 'Видалити кнопку',
    confirmRemoveTeam: (name) => `Видалити команду «${name}»?`,
    confirmNewGame: 'Скинути все і почати заново з налаштуваннями за замовчуванням?',
    defaultTeamName: (n) => `Команда ${n}`,
    teamFallbackName: 'Команда',
  },
  en: {
    subtitle:
      'A score counter for game nights with friends — add teams, add or subtract points with your own buttons.',
    addTeam: '+ Add team',
    resetScores: 'Reset scores',
    newGame: 'New game',
    hint: 'Data is saved automatically in this browser.',
    removeTeamTitle: 'Remove team',
    resetTeamScore: 'Reset score',
    addButton: '+ button',
    addButtonTitle: 'Add button',
    editValueTitle: 'Edit value',
    deleteButtonTitle: 'Delete button',
    confirmRemoveTeam: (name) => `Remove team "${name}"?`,
    confirmNewGame: 'Reset everything and start over with default settings?',
    defaultTeamName: (n) => `Team ${n}`,
    teamFallbackName: 'Team',
  },
}

function loadLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'uk' ? saved : 'uk'
}

export const locale = ref(loadLocale())

watch(
  locale,
  (val) => {
    localStorage.setItem(STORAGE_KEY, val)
    document.documentElement.lang = val
  },
  { immediate: true },
)

export function toggleLocale() {
  locale.value = locale.value === 'uk' ? 'en' : 'uk'
}

export function t(key, ...args) {
  const entry = messages[locale.value][key]
  return typeof entry === 'function' ? entry(...args) : entry
}
