import type { Module } from '../../types'

export const arrays: Module = {
  id: 'arrays',
  order: 5,
  title: 'Массивы',
  emoji: '📦',
  summary: 'Списки данных: индексы, длина, обход циклом, поиск, максимум и минимум.',
  tasks: [
    {
      id: 'arrays-01',
      moduleId: 'arrays',
      title: 'Элемент по индексу',
      kind: 'js',
      difficulty: 1,
      xp: 10,
      prompt:
        'Функция `atIndex(list, i)` возвращает элемент массива `list`, стоящий на позиции `i`. Помни: индексы начинаются с 0.',
      hints: ['К элементу обращаются через квадратные скобки: `list[i]`.'],
      starter: 'function atIndex(list, i) {\n  \n}\n',
      solution: 'function atIndex(list, i) {\n  return list[i]\n}\n',
      fn: 'atIndex',
      cases: [
        { name: 'первый элемент', args: [[10, 20, 30], 0], expected: 10 },
        { name: 'третий элемент', args: [[10, 20, 30], 2], expected: 30 },
        { name: 'строки', args: [['a', 'b', 'c'], 1], expected: 'b' },
      ],
    },
    {
      id: 'arrays-02',
      moduleId: 'arrays',
      title: 'Первый и последний',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt:
        'Функция `ends(list)` возвращает массив из двух элементов: `[первый, последний]`. Например, `[5, 6, 7]` → `[5, 7]`.',
      hints: [
        'Первый элемент — `list[0]`.',
        'Последний — `list[list.length - 1]`.',
      ],
      starter: 'function ends(list) {\n  \n}\n',
      solution: 'function ends(list) {\n  return [list[0], list[list.length - 1]]\n}\n',
      fn: 'ends',
      cases: [
        { name: '[5, 6, 7] → [5, 7]', args: [[5, 6, 7]], expected: [5, 7] },
        { name: '[42] → [42, 42]', args: [[42]], expected: [42, 42] },
        { name: '["кот", "ёж", "пёс"] → ["кот", "пёс"]', args: [['кот', 'ёж', 'пёс']], expected: ['кот', 'пёс'] },
      ],
    },
    {
      id: 'arrays-03',
      moduleId: 'arrays',
      title: 'Сколько элементов',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt: 'Функция `size(list)` возвращает количество элементов в массиве.',
      hints: ['У массива есть свойство `.length`.'],
      starter: 'function size(list) {\n  \n}\n',
      solution: 'function size(list) {\n  return list.length\n}\n',
      fn: 'size',
      cases: [
        { name: '[1, 2, 3] → 3', args: [[1, 2, 3]], expected: 3 },
        { name: 'пустой → 0', args: [[]], expected: 0 },
      ],
    },
    {
      id: 'arrays-04',
      moduleId: 'arrays',
      title: 'Сумма элементов',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `sum(list)` возвращает сумму всех чисел массива. Пройди по массиву циклом и складывай.',
      hints: [
        'Заведи переменную-накопитель: `let total = 0`.',
        'Перебирай элементы циклом `for` и прибавляй каждый к `total`.',
      ],
      starter: 'function sum(list) {\n  \n}\n',
      solution:
        'function sum(list) {\n  let total = 0\n  for (let i = 0; i < list.length; i++) {\n    total += list[i]\n  }\n  return total\n}\n',
      fn: 'sum',
      cases: [
        { name: '[1, 2, 3, 4] → 10', args: [[1, 2, 3, 4]], expected: 10 },
        { name: '[10, -5] → 5', args: [[10, -5]], expected: 5 },
        { name: 'пустой → 0', args: [[]], expected: 0 },
      ],
    },
    {
      id: 'arrays-05',
      moduleId: 'arrays',
      title: 'Минимум и максимум',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `minMax(list)` возвращает массив `[минимум, максимум]` для непустого массива чисел. Например, `[3, 9, 1, 7]` → `[1, 9]`.',
      hints: [
        'Начни с первого элемента и как минимум, и как максимум.',
        'Проходи циклом и обновляй, если элемент меньше минимума или больше максимума.',
        'Короткий способ: `[Math.min(...list), Math.max(...list)]`.',
      ],
      starter: 'function minMax(list) {\n  \n}\n',
      solution:
        'function minMax(list) {\n  let min = list[0]\n  let max = list[0]\n  for (let i = 1; i < list.length; i++) {\n    if (list[i] < min) min = list[i]\n    if (list[i] > max) max = list[i]\n  }\n  return [min, max]\n}\n',
      fn: 'minMax',
      cases: [
        { name: '[3, 9, 1, 7] → [1, 9]', args: [[3, 9, 1, 7]], expected: [1, 9] },
        { name: '[-4, -2, -8] → [-8, -2]', args: [[-4, -2, -8]], expected: [-8, -2] },
        { name: '[5] → [5, 5]', args: [[5]], expected: [5, 5] },
      ],
    },
    {
      id: 'arrays-06',
      moduleId: 'arrays',
      title: 'Есть ли элемент',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `has(list, value)` возвращает `true`, если `value` есть в массиве, иначе `false`.',
      hints: ['У массива есть метод `.includes(value)` — он как раз это и делает.'],
      starter: 'function has(list, value) {\n  \n}\n',
      solution: 'function has(list, value) {\n  return list.includes(value)\n}\n',
      fn: 'has',
      cases: [
        { name: '3 есть в [1,2,3]', args: [[1, 2, 3], 3], expected: true },
        { name: '9 нет в [1,2,3]', args: [[1, 2, 3], 9], expected: false },
        { name: '"кот" есть', args: [['кот', 'пёс'], 'кот'], expected: true },
      ],
    },
    {
      id: 'arrays-07',
      moduleId: 'arrays',
      title: 'Развернуть массив',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `flip(list)` возвращает новый массив с элементами в обратном порядке. Например, `[1, 2, 3]` → `[3, 2, 1]`.',
      hints: [
        'Метод `.reverse()` разворачивает массив на месте.',
        'Чтобы не менять исходный, сначала сделай копию: `list.slice().reverse()`.',
      ],
      starter: 'function flip(list) {\n  \n}\n',
      solution: 'function flip(list) {\n  return list.slice().reverse()\n}\n',
      fn: 'flip',
      cases: [
        { name: '[1,2,3] → [3,2,1]', args: [[1, 2, 3]], expected: [3, 2, 1] },
        { name: '["a","b"] → ["b","a"]', args: [['a', 'b']], expected: ['b', 'a'] },
        { name: '[7] → [7]', args: [[7]], expected: [7] },
      ],
    },
    {
      id: 'arrays-08',
      moduleId: 'arrays',
      title: 'Среднее значение',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `mean(list)` возвращает среднее арифметическое чисел массива (сумма делённая на количество). Массив не пустой.',
      hints: [
        'Сначала посчитай сумму циклом.',
        'Потом раздели сумму на `list.length`.',
      ],
      starter: 'function mean(list) {\n  \n}\n',
      solution:
        'function mean(list) {\n  let total = 0\n  for (let i = 0; i < list.length; i++) {\n    total += list[i]\n  }\n  return total / list.length\n}\n',
      fn: 'mean',
      cases: [
        { name: '[2, 4, 6] → 4', args: [[2, 4, 6]], expected: 4, matcher: 'approx' },
        { name: '[1, 2] → 1.5', args: [[1, 2]], expected: 1.5, matcher: 'approx' },
        { name: '[1, 2, 4] ≈ 2.333', args: [[1, 2, 4]], expected: 7 / 3, matcher: 'approx' },
      ],
    },
    {
      id: 'arrays-09',
      moduleId: 'arrays',
      title: 'Позиция элемента',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `position(list, value)` возвращает индекс первого вхождения `value` в массив, или `-1`, если элемента нет.',
      hints: ['У массива есть метод `.indexOf(value)` — он возвращает индекс или -1.'],
      starter: 'function position(list, value) {\n  \n}\n',
      solution: 'function position(list, value) {\n  return list.indexOf(value)\n}\n',
      fn: 'position',
      cases: [
        { name: '20 на индексе 1', args: [[10, 20, 30], 20], expected: 1 },
        { name: '10 на индексе 0', args: [[10, 20, 30], 10], expected: 0 },
        { name: 'нет → -1', args: [[10, 20, 30], 99], expected: -1 },
      ],
    },
    {
      id: 'arrays-10',
      moduleId: 'arrays',
      title: 'Сколько больших',
      kind: 'js',
      difficulty: 4,
      xp: 30,
      prompt:
        'Функция `countGreater(list, limit)` возвращает, сколько элементов массива строго больше `limit`.',
      hints: [
        'Заведи счётчик `let count = 0`.',
        'Проходи циклом и увеличивай счётчик, когда `list[i] > limit`.',
      ],
      starter: 'function countGreater(list, limit) {\n  \n}\n',
      solution:
        'function countGreater(list, limit) {\n  let count = 0\n  for (let i = 0; i < list.length; i++) {\n    if (list[i] > limit) count++\n  }\n  return count\n}\n',
      fn: 'countGreater',
      cases: [
        { name: 'больше 3 в [1,4,2,5,3] → 2', args: [[1, 4, 2, 5, 3], 3], expected: 2 },
        { name: 'больше 0 в [-1,-2,3] → 1', args: [[-1, -2, 3], 0], expected: 1 },
        { name: 'ничего не больше 10 → 0', args: [[1, 2, 3], 10], expected: 0 },
      ],
    },
    {
      id: 'arrays-11',
      moduleId: 'arrays',
      title: 'Убрать дубликаты',
      kind: 'js',
      difficulty: 4,
      xp: 30,
      prompt:
        'Функция `unique(list)` возвращает массив без повторов: каждый элемент встречается один раз. Порядок неважен.',
      hints: [
        'Заведи пустой массив-результат.',
        'Проходи циклом и добавляй элемент, только если его там ещё нет (`.includes`).',
        'Короткий способ: `[...new Set(list)]`.',
      ],
      starter: 'function unique(list) {\n  \n}\n',
      solution:
        'function unique(list) {\n  const result = []\n  for (let i = 0; i < list.length; i++) {\n    if (!result.includes(list[i])) result.push(list[i])\n  }\n  return result\n}\n',
      fn: 'unique',
      cases: [
        {
          name: '[1,2,2,3,1] → {1,2,3}',
          args: [[1, 2, 2, 3, 1]],
          expected: [1, 2, 3],
          matcher: 'sameMembers',
        },
        {
          name: 'без повторов не меняется',
          args: [[5, 6, 7]],
          expected: [5, 6, 7],
          matcher: 'sameMembers',
        },
        {
          name: '["a","a","b"] → {a,b}',
          args: [['a', 'a', 'b']],
          expected: ['a', 'b'],
          matcher: 'sameMembers',
        },
      ],
    },
  ],
}
