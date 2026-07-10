import type { Quiz } from '../../types'

export const quizArrays: Quiz = {
  id: 'quiz-arrays',
  moduleId: 'arrays',
  title: 'Квиз: Массивы',
  xp: 30,
  questions: [
    {
      id: 'qarr-1',
      question: 'Чему равен `list[0]` для массива `list = [7, 8, 9]`?',
      options: ['7', '8', '9', '0'],
      correct: 0,
      explanation: 'Индексы начинаются с 0, поэтому `list[0]` — это первый элемент, 7.',
    },
    {
      id: 'qarr-2',
      question: 'Как получить количество элементов в массиве `list`?',
      options: ['list.size', 'list.count()', 'list.length', 'length(list)'],
      correct: 2,
      explanation: 'У массива есть свойство `.length` — оно и хранит количество элементов.',
    },
    {
      id: 'qarr-3',
      question: 'Как обратиться к последнему элементу массива `list`?',
      options: [
        'list[list.length]',
        'list[list.length - 1]',
        'list[-1]',
        'list.last',
      ],
      correct: 1,
      explanation:
        'Длина на 1 больше последнего индекса, поэтому последний элемент — `list[list.length - 1]`.',
    },
    {
      id: 'qarr-4',
      question: 'Что вернёт `[3, 5, 8].includes(5)`?',
      options: ['true', 'false', '1', '5'],
      correct: 0,
      explanation: 'Метод `.includes` возвращает `true`, потому что 5 есть в массиве.',
    },
    {
      id: 'qarr-5',
      question: 'Что вернёт `[10, 20, 30].indexOf(40)`?',
      options: ['0', '3', '-1', 'undefined'],
      correct: 2,
      explanation:
        'Если элемента нет в массиве, `.indexOf` возвращает -1.',
    },
  ],
}
