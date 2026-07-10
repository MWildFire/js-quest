import type { Quiz } from '../../types'

export const quizBasics: Quiz = {
  id: 'quiz-basics',
  moduleId: 'basics',
  title: 'Квиз: Основы',
  xp: 30,
  questions: [
    {
      id: 'qb-1',
      question: 'Что выведет `console.log(typeof 42)`?',
      options: ["'number'", "'42'", "'int'", "'Number'"],
      correct: 0,
      explanation: 'typeof для чисел всегда возвращает строку "number".',
    },
    {
      id: 'qb-2',
      question: 'Какой оператор объявляет переменную, которую нельзя переприсвоить?',
      options: ['var', 'let', 'const', 'define'],
      correct: 2,
      explanation: 'const создаёт константу — переприсвоить её нельзя.',
    },
    {
      id: 'qb-3',
      question: 'Чему равно `7 % 3`?',
      options: ['2', '1', '2.33', '0'],
      correct: 1,
      explanation: '% — это остаток от деления. 7 = 3·2 + 1, остаток 1.',
    },
    {
      id: 'qb-4',
      question: 'Что вернёт `String(10)`?',
      options: ['10', "'10'", 'true', 'NaN'],
      correct: 1,
      explanation: 'String(10) превращает число в строку "10".',
    },
    {
      id: 'qb-5',
      question: 'Как правильно записать шаблонную строку с переменной name?',
      options: ["'Привет, name'", '`Привет, ${name}`', "'Привет, ' + $name", '`Привет, name`'],
      correct: 1,
      explanation: 'В обратных кавычках подстановка пишется как ${name}.',
    },
  ],
}
