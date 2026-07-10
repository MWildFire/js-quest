import type { Module } from '../../types'

export const functions: Module = {
  id: 'functions',
  order: 6,
  title: 'Функции',
  emoji: '⚙️',
  summary:
    'Возврат значений, параметры по умолчанию, стрелки, рекурсия и функции, которые работают с другими функциями.',
  tasks: [
    {
      id: 'functions-01',
      moduleId: 'functions',
      title: 'Верни результат',
      kind: 'js',
      difficulty: 1,
      xp: 10,
      prompt:
        'Функция `square(n)` должна вернуть квадрат числа `n` (число, умноженное само на себя). Не забудь `return` — без него функция вернёт `undefined`.',
      hints: [
        'Квадрат числа — это `n * n`.',
        'Результат нужно именно вернуть через `return`, а не просто посчитать.',
      ],
      starter: 'function square(n) {\n  // верни n в квадрате\n}\n',
      solution: 'function square(n) {\n  return n * n\n}\n',
      fn: 'square',
      cases: [
        { name: '3 → 9', args: [3], expected: 9 },
        { name: '5 → 25', args: [5], expected: 25 },
        { name: '0 → 0', args: [0], expected: 0 },
      ],
    },
    {
      id: 'functions-02',
      moduleId: 'functions',
      title: 'Параметр по умолчанию',
      kind: 'js',
      difficulty: 1,
      xp: 10,
      prompt:
        'Функция `greet(name)` возвращает строку `Привет, <имя>!`. Если имя не передали — используй значение по умолчанию `друг`. Например, `greet()` → `Привет, друг!`, а `greet(\'Аня\')` → `Привет, Аня!`.',
      hints: [
        'Значение по умолчанию задаётся прямо в параметре: `function greet(name = \'друг\')`.',
        'Собери строку через шаблон: `` `Привет, ${name}!` ``.',
      ],
      starter: 'function greet(name = \'друг\') {\n  \n}\n',
      solution: "function greet(name = 'друг') {\n  return `Привет, ${name}!`\n}\n",
      fn: 'greet',
      cases: [
        { name: 'без имени → "Привет, друг!"', args: [], expected: 'Привет, друг!' },
        { name: '"Аня" → "Привет, Аня!"', args: ['Аня'], expected: 'Привет, Аня!' },
      ],
    },
    {
      id: 'functions-03',
      moduleId: 'functions',
      title: 'Стрелочная функция',
      kind: 'js',
      difficulty: 2,
      xp: 15,
      prompt:
        'Объяви `cube` как стрелочную функцию, которая возвращает куб числа (`n * n * n`). Запиши её через `const cube = (n) => ...`.',
      hints: [
        'Короткая стрелка сразу возвращает выражение: `const cube = (n) => n * n * n`.',
        'В такой записи `return` и фигурные скобки не нужны.',
      ],
      starter: 'const cube = (n) => {\n  // верни куб числа\n}\n',
      solution: 'const cube = (n) => n * n * n\n',
      fn: 'cube',
      cases: [
        { name: '2 → 8', args: [2], expected: 8 },
        { name: '3 → 27', args: [3], expected: 27 },
      ],
    },
    {
      id: 'functions-04',
      moduleId: 'functions',
      title: 'Функция вызывает функцию',
      kind: 'js',
      difficulty: 2,
      xp: 15,
      prompt:
        'Сначала напиши вспомогательную функцию `addTen(x)`, которая прибавляет 10. Затем напиши `applyTwice(n)`, которая применяет `addTen` два раза подряд. Например, `applyTwice(5)` → `addTen(addTen(5))` → 25.',
      hints: [
        'Одна функция может вызывать другую по имени.',
        'Внутри `applyTwice` верни `addTen(addTen(n))`.',
      ],
      starter:
        'function addTen(x) {\n  \n}\n\nfunction applyTwice(n) {\n  // вызови addTen дважды\n}\n',
      solution:
        'function addTen(x) {\n  return x + 10\n}\n\nfunction applyTwice(n) {\n  return addTen(addTen(n))\n}\n',
      fn: 'applyTwice',
      cases: [
        { name: '5 → 25', args: [5], expected: 25 },
        { name: '0 → 20', args: [0], expected: 20 },
        { name: '-4 → 16', args: [-4], expected: 16 },
      ],
    },
    {
      id: 'functions-05',
      moduleId: 'functions',
      title: 'Сумма любого числа аргументов',
      kind: 'js',
      difficulty: 3,
      xp: 20,
      prompt:
        'Функция `sumAll(...nums)` принимает сколько угодно чисел и возвращает их сумму. Если не передали ничего — верни 0.',
      hints: [
        'Rest-параметр `...nums` собирает все аргументы в массив.',
        'Сложить массив удобно через `nums.reduce((a, b) => a + b, 0)`.',
      ],
      starter: 'function sumAll(...nums) {\n  \n}\n',
      solution: 'function sumAll(...nums) {\n  return nums.reduce((a, b) => a + b, 0)\n}\n',
      fn: 'sumAll',
      cases: [
        { name: '1 + 2 + 3 = 6', args: [1, 2, 3], expected: 6 },
        { name: 'без аргументов = 0', args: [], expected: 0 },
        { name: '10 + 20 = 30', args: [10, 20], expected: 30 },
      ],
    },
    {
      id: 'functions-06',
      moduleId: 'functions',
      title: 'Композиция функций',
      kind: 'js',
      difficulty: 3,
      xp: 20,
      prompt:
        'Напиши две маленькие функции: `increment(n)` (прибавляет 1) и `square(n)` (возводит в квадрат). Затем напиши `process(n)`, которая сначала прибавляет 1, а потом возводит результат в квадрат. Например, `process(2)` → сначала 3, потом 9.',
      hints: [
        'Композиция — это вызов одной функции от результата другой.',
        'Внутри `process` верни `square(increment(n))`.',
      ],
      starter:
        'function increment(n) {\n  \n}\n\nfunction square(n) {\n  \n}\n\nfunction process(n) {\n  \n}\n',
      solution:
        'function increment(n) {\n  return n + 1\n}\n\nfunction square(n) {\n  return n * n\n}\n\nfunction process(n) {\n  return square(increment(n))\n}\n',
      fn: 'process',
      cases: [
        { name: '2 → 9', args: [2], expected: 9 },
        { name: '4 → 25', args: [4], expected: 25 },
        { name: '0 → 1', args: [0], expected: 1 },
      ],
    },
    {
      id: 'functions-07',
      moduleId: 'functions',
      title: 'Факториал через рекурсию',
      kind: 'js',
      difficulty: 4,
      xp: 25,
      prompt:
        'Функция `factorial(n)` возвращает факториал числа — произведение всех чисел от 1 до `n`. Например, `factorial(5)` = 1·2·3·4·5 = 120. Считаем, что `factorial(0)` = 1. Сделай это через рекурсию (функция вызывает саму себя).',
      hints: [
        'База рекурсии: если `n <= 1`, верни 1 — дальше делить не нужно.',
        'Иначе верни `n * factorial(n - 1)`.',
      ],
      starter: 'function factorial(n) {\n  \n}\n',
      solution:
        'function factorial(n) {\n  if (n <= 1) return 1\n  return n * factorial(n - 1)\n}\n',
      fn: 'factorial',
      cases: [
        { name: '0! = 1', args: [0], expected: 1 },
        { name: '3! = 6', args: [3], expected: 6 },
        { name: '5! = 120', args: [5], expected: 120 },
      ],
    },
    {
      id: 'functions-08',
      moduleId: 'functions',
      title: 'Функция, которая создаёт функцию',
      kind: 'js',
      difficulty: 4,
      xp: 25,
      prompt:
        'Напиши функцию `makeMultiplier(factor)`, которая ВОЗВРАЩАЕТ новую функцию — множитель. С её помощью создай функцию `triple`, умножающую число на 3. Проверять будем именно `triple`.',
      hints: [
        'Внутри `makeMultiplier` верни новую функцию: `return (n) => n * factor`.',
        'Затем создай множитель: `const triple = makeMultiplier(3)`.',
      ],
      starter:
        'function makeMultiplier(factor) {\n  // верни функцию, умножающую на factor\n}\n\nconst triple = makeMultiplier(3)\n',
      solution:
        'function makeMultiplier(factor) {\n  return (n) => n * factor\n}\n\nconst triple = makeMultiplier(3)\n',
      fn: 'triple',
      cases: [
        { name: '4 → 12', args: [4], expected: 12 },
        { name: '5 → 15', args: [5], expected: 15 },
        { name: '0 → 0', args: [0], expected: 0 },
      ],
    },
    {
      id: 'functions-09',
      moduleId: 'functions',
      title: 'Функция принимает функцию (callback)',
      kind: 'js',
      difficulty: 4,
      xp: 25,
      prompt:
        'Напиши функцию `applyToNumber(callback, n)`, которая просто вызывает переданную функцию `callback` от числа `n` и возвращает результат. Затем напиши `squareViaCallback(n)`, которая с помощью `applyToNumber` возводит число в квадрат. Проверять будем `squareViaCallback`.',
      hints: [
        'Callback — это функция, переданная как аргумент. Вызвать её: `callback(n)`.',
        'Внутри `squareViaCallback` передай в `applyToNumber` стрелку: `applyToNumber((x) => x * x, n)`.',
      ],
      starter:
        'function applyToNumber(callback, n) {\n  \n}\n\nfunction squareViaCallback(n) {\n  \n}\n',
      solution:
        'function applyToNumber(callback, n) {\n  return callback(n)\n}\n\nfunction squareViaCallback(n) {\n  return applyToNumber((x) => x * x, n)\n}\n',
      fn: 'squareViaCallback',
      cases: [
        { name: '4 → 16', args: [4], expected: 16 },
        { name: '5 → 25', args: [5], expected: 25 },
        { name: '0 → 0', args: [0], expected: 0 },
      ],
    },
    {
      id: 'functions-10',
      moduleId: 'functions',
      title: 'Отбор по предикату',
      kind: 'js',
      difficulty: 5,
      xp: 30,
      prompt:
        'Предикат — это функция, которая отвечает «да/нет» (`true`/`false`). Напиши предикат `isPositive(n)` (число больше нуля?) и функцию `keepPositives(nums)`, которая возвращает новый массив только из положительных чисел, используя этот предикат.',
      hints: [
        'Предикат возвращает булево значение: `return n > 0`.',
        'Отобрать элементы удобно через `nums.filter(isPositive)`.',
      ],
      starter:
        'function isPositive(n) {\n  \n}\n\nfunction keepPositives(nums) {\n  \n}\n',
      solution:
        'function isPositive(n) {\n  return n > 0\n}\n\nfunction keepPositives(nums) {\n  return nums.filter(isPositive)\n}\n',
      fn: 'keepPositives',
      cases: [
        { name: '[1,-2,3,-4,5] → [1,3,5]', args: [[1, -2, 3, -4, 5]], expected: [1, 3, 5] },
        { name: '[-1,-2] → []', args: [[-1, -2]], expected: [] },
        { name: '[7,8,9] → [7,8,9]', args: [[7, 8, 9]], expected: [7, 8, 9] },
      ],
    },
  ],
}
