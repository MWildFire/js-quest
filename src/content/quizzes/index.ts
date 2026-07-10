import type { Quiz } from '../../types'
import { quizBasics } from './basics'
import { quizOperators } from './operators'
import { quizStrings } from './strings'
import { quizLoops } from './loops'
import { quizArrays } from './arrays'
import { quizFunctions } from './functions'
import { quizObjects } from './objects'
import { quizHof } from './hof'
import { quizDom } from './dom'

// Только квизы, где уже есть вопросы, попадают в приложение.
export const quizzes: Quiz[] = [
  quizBasics,
  quizOperators,
  quizStrings,
  quizLoops,
  quizArrays,
  quizFunctions,
  quizObjects,
  quizHof,
  quizDom,
].filter((q) => q.questions.length > 0)
