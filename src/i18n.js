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
    aboutTitle: 'Про застосунок',
    aboutIntro:
      'Team Scoreboard — лічильник рахунку для командних ігор, що працює в браузері. Можна додати будь-яку кількість команд; у кожної є назва та рахунок, що редагуються. Бали нараховуються кнопками з налаштовуваним значенням (за замовчуванням +100 / −100); значення кнопок можна змінювати, видаляти або додавати нові, а самі кнопки можуть бути спільними для всіх команд або окремими для кожної. Дані зберігаються локально в браузері (localStorage), реєстрація не потрібна.',
    useCases: [
      'Настільні та карткові ігри',
      'Вікторини й квізи',
      'Дні народження, табір, ігри на природі',
      'Тімбілдинг в офісі',
      'Заняття у школі чи гуртку',
      'Спортивні ігри та естафети без табло',
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
    aboutTitle: 'About',
    aboutIntro:
      'Team Scoreboard is a browser-based score counter for team games. Any number of teams can be added, each with an editable name and score. Points are adjusted with configurable buttons (default +100 / −100); button values can be changed, removed, or added, and buttons can be shared across all teams or set independently per team. Data is stored locally in the browser (localStorage); no account is required.',
    useCases: [
      'Board and card games',
      'Quizzes and trivia',
      'Birthdays, camp, outdoor games',
      'Office team building',
      'Classroom activities',
      'Sports and relay races without a scoreboard',
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
    aboutTitle: 'О приложении',
    aboutIntro:
      'Team Scoreboard — счётчик очков для командных игр, работающий в браузере. Можно добавить любое количество команд; у каждой — редактируемые название и счёт. Баллы начисляются кнопками с настраиваемым значением (по умолчанию +100 / −100); значения кнопок можно менять, удалять или добавлять новые, а сами кнопки могут быть общими для всех команд или отдельными для каждой. Данные хранятся локально в браузере (localStorage), регистрация не требуется.',
    useCases: [
      'Настольные и карточные игры',
      'Викторины и квизы',
      'Дни рождения, лагерь, игры на природе',
      'Тимбилдинг в офисе',
      'Занятия в школе или кружке',
      'Спортивные игры и эстафеты без табло',
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
    aboutTitle: 'Acerca de',
    aboutIntro:
      'Team Scoreboard es un contador de puntuación para juegos en equipo que funciona en el navegador. Se puede añadir cualquier número de equipos, cada uno con nombre y puntuación editables. Los puntos se ajustan con botones configurables (+100 / −100 por defecto); el valor de los botones se puede modificar, eliminar o añadir, y los botones pueden compartirse entre todos los equipos o configurarse de forma independiente para cada uno. Los datos se guardan localmente en el navegador (localStorage); no se requiere cuenta.',
    useCases: [
      'Juegos de mesa y de cartas',
      'Trivias y quizzes',
      'Cumpleaños, campamentos, juegos al aire libre',
      'Team building en la oficina',
      'Actividades escolares',
      'Deportes y relevos sin marcador',
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
    aboutTitle: 'À propos',
    aboutIntro:
      "Team Scoreboard est un compteur de score pour les jeux en équipe, fonctionnant dans le navigateur. Un nombre illimité d'équipes peut être ajouté, chacune avec un nom et un score modifiables. Les points sont ajustés à l'aide de boutons configurables (+100 / −100 par défaut) ; la valeur des boutons peut être modifiée, supprimée ou ajoutée, et les boutons peuvent être partagés entre toutes les équipes ou définis indépendamment pour chacune. Les données sont stockées localement dans le navigateur (localStorage) ; aucun compte n'est requis.",
    useCases: [
      'Jeux de société et de cartes',
      'Quiz et trivia',
      'Anniversaires, colonies, jeux en plein air',
      'Team building au bureau',
      'Activités scolaires',
      'Sports et relais sans tableau de score',
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
    aboutTitle: 'Über die App',
    aboutIntro:
      'Team Scoreboard ist ein browserbasierter Punktezähler für Teamspiele. Es können beliebig viele Teams hinzugefügt werden, jedes mit editierbarem Namen und Punktestand. Punkte werden über konfigurierbare Buttons vergeben (Standard +100 / −100); die Werte der Buttons können geändert, gelöscht oder neu hinzugefügt werden, und die Buttons können für alle Teams gemeinsam oder pro Team unabhängig eingestellt werden. Die Daten werden lokal im Browser gespeichert (localStorage); es ist kein Konto erforderlich.',
    useCases: [
      'Brett- und Kartenspiele',
      'Quiz und Trivia',
      'Geburtstage, Ferienlager, Spiele im Freien',
      'Team-Building im Büro',
      'Schulaktivitäten',
      'Sport und Staffelläufe ohne Anzeigetafel',
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
    aboutTitle: '关于',
    aboutIntro:
      'Team Scoreboard 是一款基于浏览器的团队游戏计分工具。可以添加任意数量的队伍，每支队伍都有可编辑的名称和分数。分数通过可配置的按钮调整（默认 +100 / −100）；按钮的数值可以修改、删除或新增，按钮可以在所有队伍间共享，也可以为每支队伍单独设置。数据保存在浏览器本地（localStorage），无需注册账号。',
    useCases: ['桌游和纸牌游戏', '问答和知识竞赛', '生日聚会、夏令营、户外游戏', '办公室团队建设', '课堂活动', '没有计分板的体育比赛和接力赛'],
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
