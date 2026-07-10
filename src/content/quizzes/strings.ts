import type { Quiz } from '../../types'

export const quizStrings: Quiz = {
  id: 'quiz-strings',
  moduleId: 'strings',
  title: 'Квиз: Строки',
  xp: 30,
  questions: [
    {
      id: 'qstr-1',
      question: 'Что вернёт выражение `"кот".length`?',
      options: ['2', '3', '4', '"кот"'],
      correct: 1,
      explanation: 'Свойство `.length` — это количество символов. В слове «кот» их три.',
    },
    {
      id: 'qstr-2',
      question: 'Как превратить строку `text` в ВЕРХНИЙ регистр?',
      options: ['text.toUpperCase()', 'text.toUpper()', 'text.upperCase', 'toUpperCase(text)'],
      correct: 0,
      explanation: 'Правильный метод — `text.toUpperCase()`, вызывается с круглыми скобками.',
    },
    {
      id: 'qstr-3',
      question: 'Что вернёт `"привет".indexOf("и")`?',
      options: ['-1', '2', '3', 'true'],
      correct: 1,
      explanation:
        'Индексы считаются с нуля: п(0) р(1) и(2). Буква «и» стоит на позиции 2.',
    },
    {
      id: 'qstr-4',
      question: 'Что вернёт `"a,b,c".split(",")`?',
      options: ['"abc"', '["a", "b", "c"]', '["a,b,c"]', '3'],
      correct: 1,
      explanation: '`.split(",")` разбивает строку по запятой и возвращает массив из трёх элементов.',
    },
    {
      id: 'qstr-5',
      question: 'Что вернёт `"пока".slice(0, 2)`?',
      options: ['"по"', '"пок"', '"ка"', '"пока"'],
      correct: 0,
      explanation: '`.slice(0, 2)` берёт символы с индекса 0 по 2, не включая 2. Это «по».',
    },
  ],
}
