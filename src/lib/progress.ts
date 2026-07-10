import type { ProgressState } from '../store/progress'
import { allTasks, modules, quizzes, getTask } from '../content'
import type { Module } from '../types'

/** Суммарный XP: решённые задачи + лучшие результаты квизов (пропорционально). */
export function totalXp(s: ProgressState): number {
  let xp = 0
  for (const id of Object.keys(s.solved)) {
    const t = getTask(id)
    if (t) xp += t.xp
  }
  for (const q of quizzes) {
    const r = s.quizResults[q.id]
    if (r && r.total > 0) {
      xp += Math.round((q.xp * r.score) / r.total)
    }
  }
  return xp
}

export function solvedCount(s: ProgressState): number {
  return Object.keys(s.solved).filter((id) => !!getTask(id)).length
}

export function totalTaskCount(): number {
  return allTasks.length
}

export function isTaskSolved(s: ProgressState, taskId: string): boolean {
  return !!s.solved[taskId]
}

export interface ModuleStat {
  module: Module
  solved: number
  total: number
  complete: boolean
}

export function moduleStat(s: ProgressState, module: Module): ModuleStat {
  const total = module.tasks.length
  const solved = module.tasks.filter((t) => !!s.solved[t.id]).length
  return { module, solved, total, complete: total > 0 && solved === total }
}

export function allModuleStats(s: ProgressState): ModuleStat[] {
  return modules.map((m) => moduleStat(s, m))
}

export function completedModuleCount(s: ProgressState): number {
  return allModuleStats(s).filter((m) => m.complete).length
}

export function perfectQuizCount(s: ProgressState): number {
  return quizzes.filter((q) => {
    const r = s.quizResults[q.id]
    return r && r.total > 0 && r.score === r.total
  }).length
}
