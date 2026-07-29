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
    aboutTitle: 'Для чого потрібен цей рахунок',
    aboutIntro:
      'Team Scoreboard — простий інструмент для ведення рахунку в командних іграх з друзями. Не треба паперу й ручки чи рахувати в голові — відкрийте сторінку на телефоні чи ноутбуці та ведіть рахунок разом.',
    useCases: [
      'Настільні та карткові ігри великою компанією',
      'Вікторини й квізи (pub quiz, "Своя гра")',
      'Ігри на дні народження, у таборі чи на природі',
      'Командний тімбілдинг в офісі',
      'Змагання на уроках у школі чи в гуртку',
      'Домашні спортивні ігри та естафети без табло',
    ],
    faqTitle: 'Питання і відповіді',
    faq: [
      {
        q: 'Це безкоштовно?',
        a: 'Так, повністю безкоштовно, без реклами і без реєстрації.',
      },
      {
        q: 'Де зберігаються дані рахунку?',
        a: 'Локально у вашому браузері (localStorage) — нічого не надсилається на сервер, тому дані бачите тільки ви.',
      },
      {
        q: 'Скільки команд можна додати?',
        a: 'Скільки завгодно — додавайте нову команду на кожну компанію гравців кнопкою «Додати команду».',
      },
      {
        q: 'Чи можна налаштувати свої бали для кнопок?',
        a: 'Так, значення кожної кнопки (наприклад +100 чи −50) можна змінити або видалити, а також додати власні кнопки.',
      },
    ],
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
    aboutTitle: 'What this scoreboard is for',
    aboutIntro:
      "Team Scoreboard is a simple tool for keeping score in team games with friends. No paper, pen, or mental math needed — open the page on a phone or laptop and track the score together.",
    useCases: [
      'Board and card games with a group of friends',
      'Pub quizzes and trivia nights',
      'Birthday parties, summer camp, or outdoor games',
      'Team-building activities at the office',
      'Classroom competitions and school clubs',
      'Backyard sports and relay races without a scoreboard',
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'Is it free?',
        a: 'Yes, completely free, with no ads and no sign-up.',
      },
      {
        q: 'Where is the score data stored?',
        a: 'Locally in your browser (localStorage) — nothing is sent to a server, so only you can see it.',
      },
      {
        q: 'How many teams can I add?',
        a: 'As many as you need — add a new team for every group of players with the "Add team" button.',
      },
      {
        q: 'Can I customize the point buttons?',
        a: 'Yes, every button\'s value (e.g. +100 or −50) can be changed or removed, and you can add your own buttons.',
      },
    ],
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
