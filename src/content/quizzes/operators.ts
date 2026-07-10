import type { Quiz } from '../../types'

export const quizOperators: Quiz = {
  id: 'quiz-operators',
  moduleId: 'operators',
  title: 'Квиз: Операторы и условия',
  xp: 30,
  questions: [
    {
      id: 'qop-1',
      question: 'Что вернёт выражение `3 === "3"`?',
      options: ['true', 'false', 'Ошибку'],
      correct: 1,
      explanation:
        'Оператор `===` строгий: он не приводит типы. Число 3 и строка "3" разного типа, поэтому результат `false`.',
    },
    {
      id: 'qop-2',
      question: 'Чему равно `true && false`?',
      options: ['true', 'false', 'undefined'],
      correct: 1,
      explanation: 'Логическое И (`&&`) даёт `true`, только когда оба операнда истинны. Здесь один из них `false`.',
    },
    {
      id: 'qop-3',
      question: 'Что вернёт тернарное выражение `5 > 2 ? "да" : "нет"`?',
      options: ['"да"', '"нет"', 'true'],
      correct: 0,
      explanation: 'Условие `5 > 2` истинно, поэтому берётся ветка после `?` — строка `"да"`.',
    },
    {
      id: 'qop-4',
      question: 'Что делает оператор `!` перед булевым значением?',
      options: [
        'Инвертирует его (`true` ↔ `false`)',
        'Всегда возвращает `true`',
        'Сравнивает два значения',
      ],
      correct: 0,
      explanation: 'Логическое НЕ (`!`) переворачивает значение: `!true` → `false`, `!false` → `true`.',
    },
    {
      id: 'qop-5',
      question: 'Зачем в `switch` нужен `break` (или `return`) в конце ветки `case`?',
      options: [
        'Иначе выполнение «провалится» в следующие ветки',
        'Он ускоряет работу программы',
        'Без него switch не скомпилируется',
      ],
      correct: 0,
      explanation:
        'Без `break`/`return` после совпавшего `case` выполнение продолжится в следующие ветки (fall-through). Обычно это не то, что нужно.',
    },
  ],
}
