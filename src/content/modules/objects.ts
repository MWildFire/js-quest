import type { Module } from '../../types'

export const objects: Module = {
  id: 'objects',
  order: 7,
  title: 'Объекты',
  emoji: '🗂️',
  summary:
    'Ключи и значения, доступ к свойствам, перебор через Object.keys/values и полезные операции: слияние, выбор и переименование ключей.',
  tasks: [
    {
      id: 'objects-01',
      moduleId: 'objects',
      title: 'Собери точку',
      kind: 'js',
      difficulty: 1,
      xp: 10,
      prompt:
        'Функция `makePoint(x, y)` возвращает объект с двумя свойствами: `x` и `y`. Например, `makePoint(2, 5)` → `{ x: 2, y: 5 }`.',
      hints: [
        'Объект создаётся в фигурных скобках: `{ }`.',
        'Свойства перечисляются через запятую: `{ x: x, y: y }`.',
      ],
      starter: 'function makePoint(x, y) {\n  \n}\n',
      solution: 'function makePoint(x, y) {\n  return { x: x, y: y }\n}\n',
      fn: 'makePoint',
      cases: [
        { name: 'makePoint(2, 5)', args: [2, 5], expected: { x: 2, y: 5 } },
        { name: 'makePoint(0, -3)', args: [0, -3], expected: { x: 0, y: -3 } },
      ],
    },
    {
      id: 'objects-02',
      moduleId: 'objects',
      title: 'Как тебя зовут?',
      kind: 'js',
      difficulty: 1,
      xp: 10,
      prompt:
        'Функция `getName(user)` получает объект-пользователя и возвращает значение его свойства `name`.',
      hints: [
        'К свойству обращаются через точку: `user.name`.',
      ],
      starter: 'function getName(user) {\n  \n}\n',
      solution: 'function getName(user) {\n  return user.name\n}\n',
      fn: 'getName',
      cases: [
        { name: 'имя Аня', args: [{ name: 'Аня', age: 10 }], expected: 'Аня' },
        { name: 'имя Максим', args: [{ name: 'Максим' }], expected: 'Максим' },
      ],
    },
    {
      id: 'objects-03',
      moduleId: 'objects',
      title: 'Добавь возраст',
      kind: 'js',
      difficulty: 2,
      xp: 15,
      prompt:
        'Функция `withAge(user, age)` возвращает НОВЫЙ объект — копию `user` с добавленным (или изменённым) свойством `age`. Исходный объект менять не обязательно.',
      hints: [
        'Скопировать свойства можно так: `{ ...user }`.',
        'После копирования допиши нужное свойство: `{ ...user, age: age }`.',
      ],
      starter: 'function withAge(user, age) {\n  \n}\n',
      solution: 'function withAge(user, age) {\n  return { ...user, age: age }\n}\n',
      fn: 'withAge',
      cases: [
        {
          name: 'добавить возраст',
          args: [{ name: 'Аня' }, 10],
          expected: { name: 'Аня', age: 10 },
        },
        {
          name: 'изменить возраст',
          args: [{ name: 'Ким', age: 8 }, 9],
          expected: { name: 'Ким', age: 9 },
        },
      ],
    },
    {
      id: 'objects-04',
      moduleId: 'objects',
      title: 'Сколько ключей?',
      kind: 'js',
      difficulty: 2,
      xp: 15,
      prompt:
        'Функция `countKeys(obj)` возвращает количество свойств (ключей) в объекте. Например, у `{ a: 1, b: 2 }` два ключа.',
      hints: [
        '`Object.keys(obj)` вернёт массив имён свойств.',
        'У массива есть свойство `.length`.',
      ],
      starter: 'function countKeys(obj) {\n  \n}\n',
      solution: 'function countKeys(obj) {\n  return Object.keys(obj).length\n}\n',
      fn: 'countKeys',
      cases: [
        { name: 'два ключа', args: [{ a: 1, b: 2 }], expected: 2 },
        { name: 'пустой объект', args: [{}], expected: 0 },
        { name: 'три ключа', args: [{ x: 1, y: 2, z: 3 }], expected: 3 },
      ],
    },
    {
      id: 'objects-05',
      moduleId: 'objects',
      title: 'Сумма значений',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `sumValues(obj)` складывает все числовые значения объекта и возвращает сумму. Например, у `{ a: 2, b: 3 }` сумма равна 5.',
      hints: [
        '`Object.values(obj)` вернёт массив значений.',
        'Сложить массив можно циклом или через `reduce`.',
      ],
      starter: 'function sumValues(obj) {\n  \n}\n',
      solution:
        'function sumValues(obj) {\n  let sum = 0\n  for (const value of Object.values(obj)) {\n    sum += value\n  }\n  return sum\n}\n',
      fn: 'sumValues',
      cases: [
        { name: '2 + 3 = 5', args: [{ a: 2, b: 3 }], expected: 5 },
        { name: 'три числа', args: [{ x: 10, y: 20, z: 5 }], expected: 35 },
        { name: 'пустой объект', args: [{}], expected: 0 },
      ],
    },
    {
      id: 'objects-06',
      moduleId: 'objects',
      title: 'Есть такой ключ?',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `hasKey(obj, key)` возвращает `true`, если в объекте есть свойство с таким именем, иначе `false`.',
      hints: [
        'Проверить наличие ключа можно так: `key in obj`.',
        'Или через `Object.prototype.hasOwnProperty.call(obj, key)`.',
      ],
      starter: 'function hasKey(obj, key) {\n  \n}\n',
      solution: 'function hasKey(obj, key) {\n  return key in obj\n}\n',
      fn: 'hasKey',
      cases: [
        { name: 'ключ есть', args: [{ name: 'Аня', age: 10 }, 'age'], expected: true },
        { name: 'ключа нет', args: [{ name: 'Аня' }, 'age'], expected: false },
        { name: 'ключ name', args: [{ name: 'Ким' }, 'name'], expected: true },
      ],
    },
    {
      id: 'objects-07',
      moduleId: 'objects',
      title: 'Слей два объекта',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `merge(a, b)` возвращает новый объект, в котором собраны свойства из `a` и `b`. Если ключ встречается в обоих, побеждает значение из `b`.',
      hints: [
        'Оператор `...` раскрывает свойства объекта.',
        'Порядок важен: `{ ...a, ...b }` — свойства `b` перезапишут одинаковые ключи из `a`.',
      ],
      starter: 'function merge(a, b) {\n  \n}\n',
      solution: 'function merge(a, b) {\n  return { ...a, ...b }\n}\n',
      fn: 'merge',
      cases: [
        {
          name: 'разные ключи',
          args: [{ a: 1 }, { b: 2 }],
          expected: { a: 1, b: 2 },
        },
        {
          name: 'b перезаписывает a',
          args: [{ x: 1, y: 2 }, { y: 99 }],
          expected: { x: 1, y: 99 },
        },
      ],
    },
    {
      id: 'objects-08',
      moduleId: 'objects',
      title: 'Выбери нужные ключи',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `pick(obj, keys)` получает объект и массив имён ключей. Верни новый объект только с этими ключами (если ключ есть в объекте). Например, `pick({ a: 1, b: 2, c: 3 }, ["a", "c"])` → `{ a: 1, c: 3 }`.',
      hints: [
        'Создай пустой объект `const result = {}`.',
        'Пройди по `keys` циклом и, если `key in obj`, положи `result[key] = obj[key]`.',
      ],
      starter: 'function pick(obj, keys) {\n  \n}\n',
      solution:
        'function pick(obj, keys) {\n  const result = {}\n  for (const key of keys) {\n    if (key in obj) {\n      result[key] = obj[key]\n    }\n  }\n  return result\n}\n',
      fn: 'pick',
      cases: [
        {
          name: 'выбрать a и c',
          args: [{ a: 1, b: 2, c: 3 }, ['a', 'c']],
          expected: { a: 1, c: 3 },
        },
        {
          name: 'пропустить лишний ключ',
          args: [{ name: 'Аня', age: 10 }, ['name', 'city']],
          expected: { name: 'Аня' },
        },
      ],
    },
    {
      id: 'objects-09',
      moduleId: 'objects',
      title: 'Переименуй ключ',
      kind: 'js',
      difficulty: 4,
      xp: 30,
      prompt:
        'Функция `renameKey(obj, from, to)` возвращает новый объект, где ключ `from` переименован в `to` (значение сохраняется). Остальные свойства остаются как были. Например, `renameKey({ name: "Аня" }, "name", "title")` → `{ title: "Аня" }`.',
      hints: [
        'Скопируй объект: `const result = { ...obj }`.',
        'Запиши значение под новым именем и удали старый ключ: `result[to] = result[from]; delete result[from]`.',
      ],
      starter: 'function renameKey(obj, from, to) {\n  \n}\n',
      solution:
        'function renameKey(obj, from, to) {\n  const result = { ...obj }\n  result[to] = result[from]\n  delete result[from]\n  return result\n}\n',
      fn: 'renameKey',
      cases: [
        {
          name: 'name → title',
          args: [{ name: 'Аня' }, 'name', 'title'],
          expected: { title: 'Аня' },
        },
        {
          name: 'остальные ключи целы',
          args: [{ id: 7, price: 100 }, 'price', 'cost'],
          expected: { id: 7, cost: 100 },
        },
      ],
    },
    {
      id: 'objects-10',
      moduleId: 'objects',
      title: 'Переверни объект',
      kind: 'js',
      difficulty: 4,
      xp: 30,
      prompt:
        'Функция `invert(obj)` меняет местами ключи и значения. Из `{ a: "x", b: "y" }` получается `{ x: "a", y: "b" }`. Значения в исходном объекте — строки.',
      hints: [
        'Создай пустой объект `const result = {}`.',
        'Пройди по ключам исходного объекта и запиши `result[obj[key]] = key`.',
      ],
      starter: 'function invert(obj) {\n  \n}\n',
      solution:
        'function invert(obj) {\n  const result = {}\n  for (const key of Object.keys(obj)) {\n    result[obj[key]] = key\n  }\n  return result\n}\n',
      fn: 'invert',
      cases: [
        {
          name: 'простая пара',
          args: [{ a: 'x', b: 'y' }],
          expected: { x: 'a', y: 'b' },
        },
        {
          name: 'коды и названия',
          args: [{ ru: 'Россия', us: 'США' }],
          expected: { Россия: 'ru', США: 'us' },
        },
      ],
    },
  ],
}
