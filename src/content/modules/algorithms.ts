import type { Module } from '../../types'

export const algorithms: Module = {
  id: 'algorithms',
  order: 10,
  title: 'Алгоритмы и задачки',
  emoji: '🧠',
  summary:
    'Классические алгоритмические задачки: FizzBuzz, палиндромы, факториал, простые числа, Фибоначчи и другие. Собираем всё, что выучили, в одном месте.',
  tasks: [
    {
      id: 'algorithms-01',
      moduleId: 'algorithms',
      title: 'FizzBuzz',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `fizzBuzz(n)` возвращает массив строк для чисел от 1 до `n`. Если число делится на 3 — вместо него `Fizz`, на 5 — `Buzz`, на 3 и 5 сразу — `FizzBuzz`, иначе — само число в виде строки. Например, `fizzBuzz(5)` → `[\'1\', \'2\', \'Fizz\', \'4\', \'Buzz\']`.',
      hints: [
        'Заведи пустой массив и цикл `for (let i = 1; i <= n; i++)`.',
        'Сначала проверяй делимость на 15 (то есть на 3 и 5), потом на 3, потом на 5.',
        'Число в строку: `String(i)`.',
      ],
      starter: 'function fizzBuzz(n) {\n  \n}\n',
      solution:
        "function fizzBuzz(n) {\n  const result = []\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push('FizzBuzz')\n    else if (i % 3 === 0) result.push('Fizz')\n    else if (i % 5 === 0) result.push('Buzz')\n    else result.push(String(i))\n  }\n  return result\n}\n",
      fn: 'fizzBuzz',
      cases: [
        { name: 'n = 5', args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
        {
          name: 'n = 15',
          args: [15],
          expected: [
            '1',
            '2',
            'Fizz',
            '4',
            'Buzz',
            'Fizz',
            '7',
            '8',
            'Fizz',
            'Buzz',
            '11',
            'Fizz',
            '13',
            '14',
            'FizzBuzz',
          ],
        },
        { name: 'n = 1', args: [1], expected: ['1'] },
      ],
    },
    {
      id: 'algorithms-02',
      moduleId: 'algorithms',
      title: 'Палиндром',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `isPalindrome(str)` возвращает `true`, если строка читается одинаково слева направо и справа налево, иначе `false`. Например, `\'шалаш\'` — палиндром, а `\'привет\'` — нет.',
      hints: [
        'Строку можно развернуть: `str.split(\'\').reverse().join(\'\')`.',
        'Сравни исходную строку с развёрнутой.',
      ],
      starter: 'function isPalindrome(str) {\n  \n}\n',
      solution:
        "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('')\n  return str === reversed\n}\n",
      fn: 'isPalindrome',
      cases: [
        { name: '"шалаш" — палиндром', args: ['шалаш'], expected: true },
        { name: '"привет" — нет', args: ['привет'], expected: false },
        { name: '"level" — палиндром', args: ['level'], expected: true },
        { name: 'пустая строка', args: [''], expected: true },
      ],
    },
    {
      id: 'algorithms-03',
      moduleId: 'algorithms',
      title: 'Факториал',
      kind: 'js',
      difficulty: 3,
      xp: 22,
      prompt:
        'Функция `factorial(n)` возвращает факториал числа `n` — произведение всех чисел от 1 до `n`. Например, `5! = 1·2·3·4·5 = 120`. Считай, что `factorial(0)` равен 1.',
      hints: [
        'Заведи переменную `result = 1`.',
        'В цикле умножай `result` на каждое число от 1 до `n`.',
      ],
      starter: 'function factorial(n) {\n  \n}\n',
      solution:
        'function factorial(n) {\n  let result = 1\n  for (let i = 2; i <= n; i++) {\n    result *= i\n  }\n  return result\n}\n',
      fn: 'factorial',
      cases: [
        { name: '5! = 120', args: [5], expected: 120 },
        { name: '0! = 1', args: [0], expected: 1 },
        { name: '1! = 1', args: [1], expected: 1 },
        { name: '6! = 720', args: [6], expected: 720 },
      ],
    },
    {
      id: 'algorithms-04',
      moduleId: 'algorithms',
      title: 'Простое число?',
      kind: 'js',
      difficulty: 3,
      xp: 24,
      prompt:
        'Функция `isPrime(n)` возвращает `true`, если число `n` простое (делится без остатка только на 1 и на само себя), иначе `false`. Числа меньше 2 простыми не считаются.',
      hints: [
        'Числа меньше 2 сразу не простые.',
        'Проверяй делители от 2 до квадратного корня из `n`.',
        'Если нашёлся делитель без остатка — число не простое.',
      ],
      starter: 'function isPrime(n) {\n  \n}\n',
      solution:
        'function isPrime(n) {\n  if (n < 2) return false\n  for (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) return false\n  }\n  return true\n}\n',
      fn: 'isPrime',
      cases: [
        { name: '7 — простое', args: [7], expected: true },
        { name: '10 — нет', args: [10], expected: false },
        { name: '2 — простое', args: [2], expected: true },
        { name: '1 — нет', args: [1], expected: false },
        { name: '97 — простое', args: [97], expected: true },
      ],
    },
    {
      id: 'algorithms-05',
      moduleId: 'algorithms',
      title: 'Число Фибоначчи',
      kind: 'js',
      difficulty: 4,
      xp: 26,
      prompt:
        'Функция `fib(n)` возвращает `n`-е число Фибоначчи. Последовательность начинается так: `fib(0) = 0`, `fib(1) = 1`, а каждое следующее — сумма двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, ...',
      hints: [
        'Храни два последних числа в переменных `a` и `b`.',
        'На каждом шаге считай сумму и сдвигай пару вперёд.',
        'Используй цикл, а не рекурсию — так быстрее.',
      ],
      starter: 'function fib(n) {\n  \n}\n',
      solution:
        'function fib(n) {\n  let a = 0\n  let b = 1\n  for (let i = 0; i < n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return a\n}\n',
      fn: 'fib',
      cases: [
        { name: 'fib(0) = 0', args: [0], expected: 0 },
        { name: 'fib(1) = 1', args: [1], expected: 1 },
        { name: 'fib(7) = 13', args: [7], expected: 13 },
        { name: 'fib(10) = 55', args: [10], expected: 55 },
      ],
    },
    {
      id: 'algorithms-06',
      moduleId: 'algorithms',
      title: 'Разворот строки',
      kind: 'js',
      difficulty: 3,
      xp: 22,
      prompt:
        'Функция `reverseString(str)` возвращает строку, записанную задом наперёд. Например, `\'кот\'` → `\'ток\'`.',
      hints: [
        'Строку можно разбить на массив символов: `str.split(\'\')`.',
        'У массива есть метод `.reverse()`, а собрать обратно — `.join(\'\')`.',
      ],
      starter: 'function reverseString(str) {\n  \n}\n',
      solution:
        "function reverseString(str) {\n  return str.split('').reverse().join('')\n}\n",
      fn: 'reverseString',
      cases: [
        { name: '"кот" → "ток"', args: ['кот'], expected: 'ток' },
        { name: '"hello" → "olleh"', args: ['hello'], expected: 'olleh' },
        { name: 'пустая строка', args: [''], expected: '' },
      ],
    },
    {
      id: 'algorithms-07',
      moduleId: 'algorithms',
      title: 'Подсчёт гласных',
      kind: 'js',
      difficulty: 3,
      xp: 24,
      prompt:
        'Функция `countVowels(str)` возвращает количество английских гласных (`a`, `e`, `i`, `o`, `u`) в строке. Буквы могут быть в любом регистре.',
      hints: [
        'Приведи строку к нижнему регистру: `str.toLowerCase()`.',
        'Заведи строку или массив гласных и проверяй каждый символ.',
        'Считай в счётчике те символы, которые входят в набор гласных.',
      ],
      starter: 'function countVowels(str) {\n  \n}\n',
      solution:
        "function countVowels(str) {\n  const vowels = 'aeiou'\n  let count = 0\n  for (const ch of str.toLowerCase()) {\n    if (vowels.includes(ch)) count++\n  }\n  return count\n}\n",
      fn: 'countVowels',
      cases: [
        { name: '"hello" → 2', args: ['hello'], expected: 2 },
        { name: '"JavaScript" → 3', args: ['JavaScript'], expected: 3 },
        { name: '"xyz" → 0', args: ['xyz'], expected: 0 },
        { name: '"AEIOU" → 5', args: ['AEIOU'], expected: 5 },
      ],
    },
    {
      id: 'algorithms-08',
      moduleId: 'algorithms',
      title: 'НОД двух чисел',
      kind: 'js',
      difficulty: 4,
      xp: 26,
      prompt:
        'Функция `gcd(a, b)` возвращает наибольший общий делитель двух положительных чисел — самое большое число, на которое делятся оба без остатка. Например, `gcd(12, 18) = 6`.',
      hints: [
        'Есть алгоритм Евклида: пока `b` не ноль, заменяй пару `(a, b)` на `(b, a % b)`.',
        'Когда `b` станет нулём, ответ — это `a`.',
      ],
      starter: 'function gcd(a, b) {\n  \n}\n',
      solution:
        'function gcd(a, b) {\n  while (b !== 0) {\n    const temp = b\n    b = a % b\n    a = temp\n  }\n  return a\n}\n',
      fn: 'gcd',
      cases: [
        { name: 'gcd(12, 18) = 6', args: [12, 18], expected: 6 },
        { name: 'gcd(48, 36) = 12', args: [48, 36], expected: 12 },
        { name: 'gcd(7, 13) = 1', args: [7, 13], expected: 1 },
        { name: 'gcd(100, 10) = 10', args: [100, 10], expected: 10 },
      ],
    },
    {
      id: 'algorithms-09',
      moduleId: 'algorithms',
      title: 'Сумма цифр',
      kind: 'js',
      difficulty: 4,
      xp: 26,
      prompt:
        'Функция `digitSum(n)` возвращает сумму всех цифр натурального числа `n`. Например, `digitSum(123) = 1 + 2 + 3 = 6`.',
      hints: [
        'Последняя цифра числа — это `n % 10`.',
        'Отбросить последнюю цифру: `Math.floor(n / 10)`.',
        'Повторяй, пока число не станет нулём, и складывай цифры.',
      ],
      starter: 'function digitSum(n) {\n  \n}\n',
      solution:
        'function digitSum(n) {\n  let sum = 0\n  while (n > 0) {\n    sum += n % 10\n    n = Math.floor(n / 10)\n  }\n  return sum\n}\n',
      fn: 'digitSum',
      cases: [
        { name: 'digitSum(123) = 6', args: [123], expected: 6 },
        { name: 'digitSum(9999) = 36', args: [9999], expected: 36 },
        { name: 'digitSum(0) = 0', args: [0], expected: 0 },
        { name: 'digitSum(1000) = 1', args: [1000], expected: 1 },
      ],
    },
    {
      id: 'algorithms-10',
      moduleId: 'algorithms',
      title: 'Поиск дубликатов',
      kind: 'js',
      difficulty: 5,
      xp: 30,
      prompt:
        'Функция `findDuplicates(arr)` возвращает массив уникальных значений, которые встречаются в массиве больше одного раза. Каждое такое значение должно быть в ответе ровно один раз. Порядок в ответе неважен. Например, из `[1, 2, 2, 3, 3, 3, 4]` получаем `[2, 3]`.',
      hints: [
        'Посчитай, сколько раз встречается каждое значение (можно через объект или `Map`).',
        'Отбери значения, у которых счётчик больше 1.',
        'Следи, чтобы каждый дубликат попал в ответ только один раз.',
      ],
      starter: 'function findDuplicates(arr) {\n  \n}\n',
      solution:
        'function findDuplicates(arr) {\n  const counts = new Map()\n  for (const value of arr) {\n    counts.set(value, (counts.get(value) || 0) + 1)\n  }\n  const result = []\n  for (const [value, count] of counts) {\n    if (count > 1) result.push(value)\n  }\n  return result\n}\n',
      fn: 'findDuplicates',
      cases: [
        {
          name: '[1,2,2,3,3,3,4] → [2,3]',
          args: [[1, 2, 2, 3, 3, 3, 4]],
          expected: [2, 3],
          matcher: 'sameMembers',
        },
        {
          name: 'без дубликатов → []',
          args: [[1, 2, 3, 4]],
          expected: [],
          matcher: 'sameMembers',
        },
        {
          name: '[5,5,5,5] → [5]',
          args: [[5, 5, 5, 5]],
          expected: [5],
          matcher: 'sameMembers',
        },
        {
          name: 'строки',
          args: [['a', 'b', 'a', 'c', 'c']],
          expected: ['a', 'c'],
          matcher: 'sameMembers',
        },
      ],
    },
  ],
}
