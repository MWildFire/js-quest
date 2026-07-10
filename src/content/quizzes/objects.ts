import type { Quiz } from '../../types'

// Заполняется в Ф3.
export const quizObjects: Quiz = {
  id: 'quiz-objects',
  moduleId: 'objects',
  title: 'Квиз: Объекты',
  xp: 30,
  questions: [
    {
      id: 'qobj-1',
      question: 'Как правильно обратиться к свойству `name` объекта `user`?',
      options: ['user->name', 'user.name', 'user::name', 'name(user)'],
      correct: 1,
      explanation: 'К свойству объекта обращаются через точку: `user.name` (или `user["name"]`).',
    },
    {
      id: 'qobj-2',
      question: 'Что вернёт `Object.keys({ a: 1, b: 2, c: 3 })`?',
      options: ['3', '["a", "b", "c"]', '[1, 2, 3]', '{ a, b, c }'],
      correct: 1,
      explanation: '`Object.keys` возвращает массив имён свойств: `["a", "b", "c"]`.',
    },
    {
      id: 'qobj-3',
      question: 'Что получится в результате `{ ...{ x: 1, y: 2 }, ...{ y: 9 } }`?',
      options: ['{ x: 1, y: 2 }', '{ x: 1, y: 9 }', '{ y: 9 }', 'Ошибка'],
      correct: 1,
      explanation:
        'Свойства второго объекта перезаписывают одинаковые ключи первого, поэтому `y` становится 9.',
    },
    {
      id: 'qobj-4',
      question: 'Как проверить, что в объекте `obj` есть ключ `"age"`?',
      options: ['obj.has("age")', '"age" in obj', 'obj = "age"', 'keyOf(obj, "age")'],
      correct: 1,
      explanation: 'Оператор `in` проверяет наличие ключа: `"age" in obj` вернёт `true` или `false`.',
    },
    {
      id: 'qobj-5',
      question: 'Что вернёт `Object.values({ a: 2, b: 3 })`?',
      options: ['["a", "b"]', '[2, 3]', '5', '{ 2, 3 }'],
      correct: 1,
      explanation: '`Object.values` возвращает массив значений свойств: `[2, 3]`.',
    },
  ],
}
