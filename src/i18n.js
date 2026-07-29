import { ref, watch } from 'vue'

const STORAGE_KEY = 'team-scoreboard:locale'

const messages = {
  uk: {
    subtitle:
      'Лічильник очок для ігор з друзями — додавайте команди, нараховуйте та знімайте бали своїми кнопками.',
    addTeam: '+ Додати команду',
    syncButtonsLabel: 'Однакові кнопки для всіх команд',
    resetScores: 'Скинути бали',
    newGame: 'Нова гра',
    hint: 'Дані зберігаються автоматично у цьому браузері.',
    scrollHint: 'Дізнатися більше',
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
    syncButtonsLabel: 'Same buttons for all teams',
    resetScores: 'Reset scores',
    newGame: 'New game',
    hint: 'Data is saved automatically in this browser.',
    scrollHint: 'Learn more',
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
  ru: {
    subtitle:
      'Счётчик очков для игр с друзьями — добавляйте команды, начисляйте и вычитайте баллы своими кнопками.',
    addTeam: '+ Добавить команду',
    syncButtonsLabel: 'Одинаковые кнопки для всех команд',
    resetScores: 'Сбросить баллы',
    newGame: 'Новая игра',
    hint: 'Данные сохраняются автоматически в этом браузере.',
    scrollHint: 'Узнать больше',
    removeTeamTitle: 'Удалить команду',
    resetTeamScore: 'Сбросить очки',
    addButton: '+ кнопка',
    addButtonTitle: 'Добавить кнопку',
    editValueTitle: 'Изменить значение',
    deleteButtonTitle: 'Удалить кнопку',
    confirmRemoveTeam: (name) => `Удалить команду «${name}»?`,
    confirmNewGame: 'Сбросить всё и начать заново с настройками по умолчанию?',
    defaultTeamName: (n) => `Команда ${n}`,
    teamFallbackName: 'Команда',
    aboutTitle: 'Для чего нужен этот счётчик',
    aboutIntro:
      'Team Scoreboard — простой инструмент для ведения счёта в командных играх с друзьями. Не нужна бумага и ручка или счёт в уме — откройте страницу на телефоне или ноутбуке и ведите счёт вместе.',
    useCases: [
      'Настольные и карточные игры большой компанией',
      'Викторины и квизы (pub quiz, «Своя игра»)',
      'Дни рождения, летний лагерь, игры на природе',
      'Командный тимбилдинг в офисе',
      'Соревнования на уроках в школе или в кружке',
      'Домашние спортивные игры и эстафеты без табло',
    ],
    faqTitle: 'Вопросы и ответы',
    faq: [
      {
        q: 'Это бесплатно?',
        a: 'Да, полностью бесплатно, без рекламы и без регистрации.',
      },
      {
        q: 'Где хранятся данные счёта?',
        a: 'Локально в вашем браузере (localStorage) — ничего не отправляется на сервер, поэтому данные видите только вы.',
      },
      {
        q: 'Сколько команд можно добавить?',
        a: 'Сколько угодно — добавляйте новую команду на каждую компанию игроков кнопкой «Добавить команду».',
      },
      {
        q: 'Можно ли настроить свои баллы для кнопок?',
        a: 'Да, значение каждой кнопки (например +100 или −50) можно изменить или удалить, а также добавить свои кнопки.',
      },
    ],
  },
  es: {
    subtitle:
      'Un contador de puntos para noches de juego con amigos: añade equipos y suma o resta puntos con tus propios botones.',
    addTeam: '+ Añadir equipo',
    syncButtonsLabel: 'Mismos botones para todos los equipos',
    resetScores: 'Reiniciar puntos',
    newGame: 'Nueva partida',
    hint: 'Los datos se guardan automáticamente en este navegador.',
    scrollHint: 'Saber más',
    removeTeamTitle: 'Eliminar equipo',
    resetTeamScore: 'Reiniciar puntuación',
    addButton: '+ botón',
    addButtonTitle: 'Añadir botón',
    editValueTitle: 'Editar valor',
    deleteButtonTitle: 'Eliminar botón',
    confirmRemoveTeam: (name) => `¿Eliminar el equipo "${name}"?`,
    confirmNewGame: '¿Reiniciar todo y empezar de nuevo con la configuración predeterminada?',
    defaultTeamName: (n) => `Equipo ${n}`,
    teamFallbackName: 'Equipo',
    aboutTitle: 'Para qué sirve este marcador',
    aboutIntro:
      'Team Scoreboard es una herramienta sencilla para llevar la puntuación en juegos en equipo con amigos. Sin papel, boli ni cálculo mental: abre la página en el móvil o portátil y llevad la cuenta juntos.',
    useCases: [
      'Juegos de mesa y de cartas con un grupo de amigos',
      'Trivias y noches de preguntas (pub quiz)',
      'Cumpleaños, campamentos de verano o juegos al aire libre',
      'Actividades de team building en la oficina',
      'Competiciones en clase o en actividades extraescolares',
      'Deportes y relevos caseros sin marcador',
    ],
    faqTitle: 'Preguntas frecuentes',
    faq: [
      {
        q: '¿Es gratis?',
        a: 'Sí, totalmente gratis, sin anuncios y sin registro.',
      },
      {
        q: '¿Dónde se guardan los datos?',
        a: 'Localmente en tu navegador (localStorage): no se envía nada a ningún servidor, así que solo tú puedes verlos.',
      },
      {
        q: '¿Cuántos equipos puedo añadir?',
        a: 'Los que necesites: añade un equipo nuevo por cada grupo de jugadores con el botón «Añadir equipo».',
      },
      {
        q: '¿Puedo personalizar los botones de puntos?',
        a: 'Sí, puedes cambiar o eliminar el valor de cualquier botón (por ejemplo +100 o −50) y añadir tus propios botones.',
      },
    ],
  },
  fr: {
    subtitle:
      "Un compteur de points pour les soirées jeux entre amis — ajoutez des équipes et ajoutez ou retirez des points avec vos propres boutons.",
    addTeam: '+ Ajouter une équipe',
    syncButtonsLabel: 'Mêmes boutons pour toutes les équipes',
    resetScores: 'Réinitialiser les points',
    newGame: 'Nouvelle partie',
    hint: 'Les données sont enregistrées automatiquement dans ce navigateur.',
    scrollHint: 'En savoir plus',
    removeTeamTitle: "Supprimer l'équipe",
    resetTeamScore: 'Réinitialiser le score',
    addButton: '+ bouton',
    addButtonTitle: 'Ajouter un bouton',
    editValueTitle: 'Modifier la valeur',
    deleteButtonTitle: 'Supprimer le bouton',
    confirmRemoveTeam: (name) => `Supprimer l'équipe « ${name} » ?`,
    confirmNewGame: 'Tout réinitialiser et recommencer avec les réglages par défaut ?',
    defaultTeamName: (n) => `Équipe ${n}`,
    teamFallbackName: 'Équipe',
    aboutTitle: 'À quoi sert ce compteur',
    aboutIntro:
      "Team Scoreboard est un outil simple pour tenir le score dans les jeux en équipe entre amis. Plus besoin de papier, de stylo ou de calcul mental : ouvrez la page sur votre téléphone ou ordinateur et comptez ensemble.",
    useCases: [
      'Jeux de société et de cartes entre amis',
      'Quiz et soirées trivia (pub quiz)',
      'Anniversaires, colonies de vacances, jeux en plein air',
      'Activités de team building au bureau',
      'Compétitions en classe ou en club scolaire',
      'Sports et relais improvisés sans tableau de score',
    ],
    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'Est-ce gratuit ?',
        a: 'Oui, entièrement gratuit, sans publicité et sans inscription.',
      },
      {
        q: 'Où sont stockées les données ?',
        a: "Localement dans votre navigateur (localStorage) — rien n'est envoyé à un serveur, vous seul pouvez les voir.",
      },
      {
        q: "Combien d'équipes puis-je ajouter ?",
        a: 'Autant que nécessaire — ajoutez une équipe pour chaque groupe de joueurs avec le bouton « Ajouter une équipe ».',
      },
      {
        q: 'Puis-je personnaliser les boutons de points ?',
        a: "Oui, la valeur de chaque bouton (par ex. +100 ou −50) peut être modifiée ou supprimée, et vous pouvez ajouter vos propres boutons.",
      },
    ],
  },
  de: {
    subtitle:
      'Ein Punktezähler für Spieleabende mit Freunden — Teams hinzufügen und mit eigenen Buttons Punkte addieren oder abziehen.',
    addTeam: '+ Team hinzufügen',
    syncButtonsLabel: 'Gleiche Buttons für alle Teams',
    resetScores: 'Punkte zurücksetzen',
    newGame: 'Neues Spiel',
    hint: 'Die Daten werden automatisch in diesem Browser gespeichert.',
    scrollHint: 'Mehr erfahren',
    removeTeamTitle: 'Team entfernen',
    resetTeamScore: 'Punktzahl zurücksetzen',
    addButton: '+ Button',
    addButtonTitle: 'Button hinzufügen',
    editValueTitle: 'Wert bearbeiten',
    deleteButtonTitle: 'Button löschen',
    confirmRemoveTeam: (name) => `Team „${name}" entfernen?`,
    confirmNewGame: 'Alles zurücksetzen und mit den Standardeinstellungen neu beginnen?',
    defaultTeamName: (n) => `Team ${n}`,
    teamFallbackName: 'Team',
    aboutTitle: 'Wofür dieser Punktezähler gedacht ist',
    aboutIntro:
      'Team Scoreboard ist ein einfaches Werkzeug, um bei Teamspielen mit Freunden Punkte zu zählen. Kein Papier, kein Stift, kein Kopfrechnen nötig — öffnet die Seite auf dem Handy oder Laptop und zählt gemeinsam mit.',
    useCases: [
      'Brett- und Kartenspiele mit einer Gruppe von Freunden',
      'Pub-Quiz und Trivia-Abende',
      'Geburtstagsfeiern, Ferienlager oder Spiele im Freien',
      'Team-Building-Aktivitäten im Büro',
      'Wettbewerbe im Unterricht oder in der Schul-AG',
      'Sport und Staffelläufe im Garten ohne Anzeigetafel',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faq: [
      {
        q: 'Ist es kostenlos?',
        a: 'Ja, komplett kostenlos, ohne Werbung und ohne Registrierung.',
      },
      {
        q: 'Wo werden die Daten gespeichert?',
        a: 'Lokal in deinem Browser (localStorage) — es wird nichts an einen Server gesendet, nur du siehst die Daten.',
      },
      {
        q: 'Wie viele Teams kann ich hinzufügen?',
        a: 'So viele wie nötig — fügt für jede Spielergruppe mit dem Button „Team hinzufügen" ein neues Team hinzu.',
      },
      {
        q: 'Kann ich die Punkte-Buttons anpassen?',
        a: 'Ja, der Wert jedes Buttons (z. B. +100 oder −50) kann geändert oder gelöscht werden, und ihr könnt eigene Buttons hinzufügen.',
      },
    ],
  },
  zh: {
    subtitle: '与朋友一起游戏之夜的计分器——添加队伍，用自己设置的按钮加减分数。',
    addTeam: '+ 添加队伍',
    syncButtonsLabel: '所有队伍使用相同按钮',
    resetScores: '重置分数',
    newGame: '新游戏',
    hint: '数据会自动保存在此浏览器中。',
    scrollHint: '了解更多',
    removeTeamTitle: '删除队伍',
    resetTeamScore: '重置比分',
    addButton: '+ 按钮',
    addButtonTitle: '添加按钮',
    editValueTitle: '编辑数值',
    deleteButtonTitle: '删除按钮',
    confirmRemoveTeam: (name) => `删除队伍 "${name}"？`,
    confirmNewGame: '要重置所有内容并恢复默认设置吗？',
    defaultTeamName: (n) => `队伍 ${n}`,
    teamFallbackName: '队伍',
    aboutTitle: '这个计分器是做什么用的',
    aboutIntro:
      'Team Scoreboard 是一个简单的工具，用于和朋友一起在团队游戏中记分。无需纸笔或心算——在手机或电脑上打开页面，一起记分。',
    useCases: ['和一群朋友玩桌游或纸牌游戏', '酒吧问答之夜和知识竞赛', '生日聚会、夏令营或户外游戏', '办公室团队建设活动', '课堂或社团比赛', '没有计分板的家庭体育比赛和接力赛'],
    faqTitle: '常见问题',
    faq: [
      {
        q: '这是免费的吗？',
        a: '是的，完全免费，没有广告，无需注册。',
      },
      {
        q: '分数数据保存在哪里？',
        a: '保存在您浏览器的本地存储（localStorage）中——不会发送到任何服务器，只有您能看到。',
      },
      {
        q: '我可以添加多少支队伍？',
        a: '可以按需添加——为每一组玩家用「添加队伍」按钮新增一支队伍。',
      },
      {
        q: '可以自定义加减分按钮吗？',
        a: '可以，每个按钮的数值（例如 +100 或 −50）都可以修改或删除，也可以添加自己的按钮。',
      },
    ],
  },
}

export const LOCALES = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
]

const SUPPORTED_CODES = LOCALES.map((l) => l.code)

function detectBrowserLocale() {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const lang of candidates) {
    const code = lang.slice(0, 2).toLowerCase()
    if (SUPPORTED_CODES.includes(code)) return code
  }
  return null
}

function loadLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (SUPPORTED_CODES.includes(saved)) return saved
  return detectBrowserLocale() || 'uk'
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

export function setLocale(code) {
  if (SUPPORTED_CODES.includes(code)) locale.value = code
}

export function t(key, ...args) {
  const entry = messages[locale.value][key]
  return typeof entry === 'function' ? entry(...args) : entry
}
