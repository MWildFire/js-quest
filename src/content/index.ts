import type { Module, Quiz, Task } from '../types'
import { basics } from './modules/basics'
import { operators } from './modules/operators'
import { strings } from './modules/strings'
import { loops } from './modules/loops'
import { arrays } from './modules/arrays'
import { functions } from './modules/functions'
import { objects } from './modules/objects'
import { hof } from './modules/hof'
import { dom } from './modules/dom'
import { algorithms } from './modules/algorithms'
import { quizzes as allQuizzes } from './quizzes'

export const modules: Module[] = [
  basics,
  operators,
  strings,
  loops,
  arrays,
  functions,
  objects,
  hof,
  dom,
  algorithms,
].sort((a, b) => a.order - b.order)

export const quizzes: Quiz[] = allQuizzes

export const allTasks: Task[] = modules.flatMap((m) => m.tasks)

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getTask(id: string): Task | undefined {
  return allTasks.find((t) => t.id === id)
}

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id)
}

export function quizForModule(moduleId: string): Quiz | undefined {
  return quizzes.find((q) => q.moduleId === moduleId)
}

/** Плоский список задач модуля с индексами — удобно для «след./пред.». */
export function moduleTasks(moduleId: string): Task[] {
  return getModule(moduleId)?.tasks ?? []
}
