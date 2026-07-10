import type { ProgressState } from '../store/progress'
import {
  solvedCount,
  completedModuleCount,
  perfectQuizCount,
  totalXp,
  moduleStat,
} from './progress'
import { getModule, modules, quizzes, allTasks } from '../content'
import { levelForXp } from './leveling'

export interface Badge {
  id: string
  emoji: string
  title: string
  description: string
  /** Достигнут ли бейдж при данном состоянии. */
  earned: (s: ProgressState) => boolean
}

function quizzesDone(s: ProgressState): number {
  return quizzes.filter((q) => {
    const r = s.quizResults[q.id]
    return r && r.total > 0
  }).length
}

function moduleComplete(s: ProgressState, id: string): boolean {
  const m = getModule(id)
  return m ? moduleStat(s, m).complete : false
}

export const BADGES: Badge[] = [
  {
    id: 'first-blood',
    emoji: '🩸',
    title: 'Первая кровь',
    description: 'Реши свою первую задачу',
    earned: (s) => solvedCount(s) >= 1,
  },
  {
    id: 'getting-started',
    emoji: '🚀',
    title: 'Разгон',
    description: 'Реши 5 задач',
    earned: (s) => solvedCount(s) >= 5,
  },
  {
    id: 'ten-tasks',
    emoji: '🔟',
    title: 'Десятка',
    description: 'Реши 10 задач',
    earned: (s) => solvedCount(s) >= 10,
  },
  {
    id: 'quarter',
    emoji: '🎯',
    title: 'Четверть пути',
    description: 'Реши 25 задач',
    earned: (s) => solvedCount(s) >= 25,
  },
  {
    id: 'half-way',
    emoji: '⚡',
    title: 'Полпути',
    description: 'Реши половину всех задач',
    earned: (s) => solvedCount(s) >= Math.ceil(allTasks.length / 2),
  },
  {
    id: 'centurion',
    emoji: '💯',
    title: 'Все задачи',
    description: 'Реши абсолютно все задачи',
    earned: (s) => allTasks.length > 0 && solvedCount(s) >= allTasks.length,
  },
  {
    id: 'module-master',
    emoji: '🏅',
    title: 'Мастер модуля',
    description: 'Пройди любой модуль полностью',
    earned: (s) => completedModuleCount(s) >= 1,
  },
  {
    id: 'all-modules',
    emoji: '👑',
    title: 'Император кода',
    description: 'Пройди все модули',
    earned: (s) => completedModuleCount(s) >= modules.filter((m) => m.tasks.length > 0).length,
  },
  {
    id: 'dom-master',
    emoji: '🌐',
    title: 'Повелитель DOM',
    description: 'Пройди модуль «DOM и события»',
    earned: (s) => moduleComplete(s, 'dom'),
  },
  {
    id: 'quiz-novice',
    emoji: '🧩',
    title: 'Знаток',
    description: 'Пройди любой квиз',
    earned: (s) => quizzesDone(s) >= 1,
  },
  {
    id: 'quiz-perfect',
    emoji: '⭐',
    title: 'Идеально!',
    description: 'Набери 100% в любом квизе',
    earned: (s) => perfectQuizCount(s) >= 1,
  },
  {
    id: 'quiz-all',
    emoji: '🎓',
    title: 'Отличник',
    description: 'Пройди все квизы',
    earned: (s) => quizzes.length > 0 && quizzesDone(s) >= quizzes.length,
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    title: 'Три дня подряд',
    description: 'Стрик 3 дня',
    earned: (s) => s.streak.count >= 3,
  },
  {
    id: 'streak-7',
    emoji: '🔥',
    title: 'Неделя огня',
    description: 'Стрик 7 дней',
    earned: (s) => s.streak.count >= 7,
  },
  {
    id: 'level-5',
    emoji: '✨',
    title: 'Пятый уровень',
    description: 'Достигни 5 уровня',
    earned: (s) => levelForXp(totalXp(s)) >= 5,
  },
  {
    id: 'level-10',
    emoji: '🌟',
    title: 'Десятый уровень',
    description: 'Достигни 10 уровня',
    earned: (s) => levelForXp(totalXp(s)) >= 10,
  },
]

export function earnedBadges(s: ProgressState): Badge[] {
  return BADGES.filter((b) => b.earned(s))
}

export function earnedBadgeIds(s: ProgressState): string[] {
  return earnedBadges(s).map((b) => b.id)
}
