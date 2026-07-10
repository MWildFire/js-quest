import type { Module } from '../../types'

export const hof: Module = {
  id: 'hof',
  order: 8,
  title: 'Методы массивов',
  emoji: '🧰',
  summary: 'map, filter, reduce, find, some/every, sort — обрабатываем списки в функциональном стиле.',
  tasks: [
    {
      id: 'hof-01',
      moduleId: 'hof',
      title: 'Удвоить каждое число',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt:
        'Функция `double(nums)` получает массив чисел и возвращает новый массив, где каждое число умножено на 2. Используй `.map`.',
      hints: [
        '`.map` создаёт новый массив, применяя функцию к каждому элементу.',
        'Пример: `nums.map(n => n * 2)`.',
      ],
      starter: 'function double(nums) {\n  \n}\n',
      solution: 'function double(nums) {\n  return nums.map(n => n * 2)\n}\n',
      fn: 'double',
      cases: [
        { name: '[1,2,3] → [2,4,6]', args: [[1, 2, 3]], expected: [2, 4, 6] },
        { name: '[0,5,-2] → [0,10,-4]', args: [[0, 5, -2]], expected: [0, 10, -4] },
        { name: '[] → []', args: [[]], expected: [] },
      ],
    },
    {
      id: 'hof-02',
      moduleId: 'hof',
      title: 'Числа в квадрат',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt:
        'Функция `squares(nums)` возвращает новый массив, где каждое число возведено в квадрат (умножено само на себя). Используй `.map`.',
      hints: [
        'Квадрат числа `n` — это `n * n`.',
        'Пример: `nums.map(n => n * n)`.',
      ],
      starter: 'function squares(nums) {\n  \n}\n',
      solution: 'function squares(nums) {\n  return nums.map(n => n * n)\n}\n',
      fn: 'squares',
      cases: [
        { name: '[1,2,3] → [1,4,9]', args: [[1, 2, 3]], expected: [1, 4, 9] },
        { name: '[4,5] → [16,25]', args: [[4, 5]], expected: [16, 25] },
      ],
    },
    {
      id: 'hof-03',
      moduleId: 'hof',
      title: 'Только чётные',
      kind: 'js',
      difficulty: 2,
      xp: 18,
      prompt:
        'Функция `evens(nums)` возвращает новый массив, в котором остались только чётные числа. Используй `.filter`.',
      hints: [
        '`.filter` оставляет элементы, для которых функция вернула `true`.',
        'Число чётное, если `n % 2 === 0`.',
      ],
      starter: 'function evens(nums) {\n  \n}\n',
      solution: 'function evens(nums) {\n  return nums.filter(n => n % 2 === 0)\n}\n',
      fn: 'evens',
      cases: [
        { name: '[1,2,3,4] → [2,4]', args: [[1, 2, 3, 4]], expected: [2, 4] },
        { name: '[7,9,11] → []', args: [[7, 9, 11]], expected: [] },
        { name: '[0,6,8] → [0,6,8]', args: [[0, 6, 8]], expected: [0, 6, 8] },
      ],
    },
    {
      id: 'hof-04',
      moduleId: 'hof',
      title: 'Больше порога',
      kind: 'js',
      difficulty: 2,
      xp: 18,
      prompt:
        'Функция `above(nums, limit)` возвращает новый массив из тех чисел, которые строго больше `limit`. Используй `.filter`.',
      hints: [
        '`.filter` принимает функцию-условие.',
        'Условие: `n > limit`.',
      ],
      starter: 'function above(nums, limit) {\n  \n}\n',
      solution: 'function above(nums, limit) {\n  return nums.filter(n => n > limit)\n}\n',
      fn: 'above',
      cases: [
        { name: 'больше 3', args: [[1, 2, 3, 4, 5], 3], expected: [4, 5] },
        { name: 'больше 10 — никого', args: [[1, 2, 3], 10], expected: [] },
        { name: 'больше 0', args: [[-1, 0, 1, 2], 0], expected: [1, 2] },
      ],
    },
    {
      id: 'hof-05',
      moduleId: 'hof',
      title: 'Сумма массива',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `sum(nums)` возвращает сумму всех чисел массива. Используй `.reduce`. Для пустого массива верни 0.',
      hints: [
        '`.reduce` сворачивает массив в одно значение.',
        'Начальное значение — второй аргумент: `nums.reduce((acc, n) => acc + n, 0)`.',
      ],
      starter: 'function sum(nums) {\n  \n}\n',
      solution: 'function sum(nums) {\n  return nums.reduce((acc, n) => acc + n, 0)\n}\n',
      fn: 'sum',
      cases: [
        { name: '[1,2,3,4] = 10', args: [[1, 2, 3, 4]], expected: 10 },
        { name: '[] = 0', args: [[]], expected: 0 },
        { name: '[-5,5,10] = 10', args: [[-5, 5, 10]], expected: 10 },
      ],
    },
    {
      id: 'hof-06',
      moduleId: 'hof',
      title: 'Максимум через reduce',
      kind: 'js',
      difficulty: 3,
      xp: 22,
      prompt:
        'Функция `maxOf(nums)` возвращает наибольшее число массива. Найди его с помощью `.reduce` (массив всегда непустой).',
      hints: [
        '`.reduce` может накапливать не только сумму, но и максимум.',
        'На каждом шаге бери большее: `Math.max(acc, n)`.',
        'Пример: `nums.reduce((acc, n) => Math.max(acc, n))`.',
      ],
      starter: 'function maxOf(nums) {\n  \n}\n',
      solution: 'function maxOf(nums) {\n  return nums.reduce((acc, n) => Math.max(acc, n))\n}\n',
      fn: 'maxOf',
      cases: [
        { name: '[3,7,2,9,4] = 9', args: [[3, 7, 2, 9, 4]], expected: 9 },
        { name: '[-5,-1,-8] = -1', args: [[-5, -1, -8]], expected: -1 },
        { name: '[42] = 42', args: [[42]], expected: 42 },
      ],
    },
    {
      id: 'hof-07',
      moduleId: 'hof',
      title: 'Найти первое большое',
      kind: 'js',
      difficulty: 3,
      xp: 22,
      prompt:
        'Функция `firstBig(nums)` возвращает первое число больше 100. Если такого нет — верни `undefined`. Используй `.find`.',
      hints: [
        '`.find` возвращает первый подходящий элемент или `undefined`.',
        'Условие: `n > 100`.',
      ],
      starter: 'function firstBig(nums) {\n  \n}\n',
      solution: 'function firstBig(nums) {\n  return nums.find(n => n > 100)\n}\n',
      fn: 'firstBig',
      cases: [
        { name: 'находит 150', args: [[10, 150, 200]], expected: 150 },
        { name: 'нет больших → undefined', args: [[1, 2, 3]], expected: undefined },
        { name: 'первый из больших', args: [[50, 101, 999]], expected: 101 },
      ],
    },
    {
      id: 'hof-08',
      moduleId: 'hof',
      title: 'Все положительные?',
      kind: 'js',
      difficulty: 3,
      xp: 22,
      prompt:
        'Функция `allPositive(nums)` возвращает `true`, если ВСЕ числа больше нуля, иначе `false`. Используй `.every`.',
      hints: [
        '`.every` возвращает `true`, только если условие верно для всех элементов.',
        'Условие: `n > 0`.',
      ],
      starter: 'function allPositive(nums) {\n  \n}\n',
      solution: 'function allPositive(nums) {\n  return nums.every(n => n > 0)\n}\n',
      fn: 'allPositive',
      cases: [
        { name: 'все > 0 → true', args: [[1, 2, 3]], expected: true },
        { name: 'есть 0 → false', args: [[1, 0, 3]], expected: false },
        { name: 'есть отрицательное → false', args: [[5, -1, 2]], expected: false },
      ],
    },
    {
      id: 'hof-09',
      moduleId: 'hof',
      title: 'Сортировка по возрастанию',
      kind: 'js',
      difficulty: 3,
      xp: 24,
      prompt:
        'Функция `sortAsc(nums)` возвращает новый массив, отсортированный по возрастанию. Используй `.sort` с функцией сравнения `(a, b) => a - b`. Порядок важен!',
      hints: [
        'Без функции сравнения `.sort` сортирует числа как строки — будет неверно.',
        'Сравнение чисел: `nums.sort((a, b) => a - b)`.',
        'Скопируй массив перед сортировкой: `[...nums].sort(...)`.',
      ],
      starter: 'function sortAsc(nums) {\n  \n}\n',
      solution: 'function sortAsc(nums) {\n  return [...nums].sort((a, b) => a - b)\n}\n',
      fn: 'sortAsc',
      cases: [
        { name: '[3,1,2] → [1,2,3]', args: [[3, 1, 2]], expected: [1, 2, 3] },
        { name: '[10,2,33,4] → [2,4,10,33]', args: [[10, 2, 33, 4]], expected: [2, 4, 10, 33] },
        { name: '[-1,-5,0] → [-5,-1,0]', args: [[-1, -5, 0]], expected: [-5, -1, 0] },
      ],
    },
    {
      id: 'hof-10',
      moduleId: 'hof',
      title: 'Длины длинных слов',
      kind: 'js',
      difficulty: 4,
      xp: 28,
      prompt:
        'Функция `longWordLengths(words)` берёт массив слов, оставляет только слова длиннее 3 букв и возвращает массив их длин. Собери цепочку `.filter(...).map(...)`.',
      hints: [
        'Сначала `.filter(w => w.length > 3)` — оставим длинные слова.',
        'Затем `.map(w => w.length)` — превратим слова в их длины.',
        'Методы можно соединять в цепочку: `words.filter(...).map(...)`.',
      ],
      starter: 'function longWordLengths(words) {\n  \n}\n',
      solution:
        'function longWordLengths(words) {\n  return words.filter(w => w.length > 3).map(w => w.length)\n}\n',
      fn: 'longWordLengths',
      cases: [
        {
          name: '["кот","мышка","дом","слон"] → [5,4]',
          args: [['кот', 'мышка', 'дом', 'слон']],
          expected: [5, 4],
        },
        { name: '["a","bb","ccc"] → []', args: [['a', 'bb', 'ccc']], expected: [] },
        {
          name: '["привет","мир"] → [6]',
          args: [['привет', 'мир']],
          expected: [6],
        },
      ],
    },
  ],
}
