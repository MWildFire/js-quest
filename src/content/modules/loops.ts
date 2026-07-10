import type { Module } from '../../types'

export const loops: Module = {
  id: 'loops',
  order: 4,
  title: 'Циклы',
  emoji: '🔁',
  summary: 'for и while: считаем, накапливаем и повторяем действия столько раз, сколько нужно.',
  tasks: [
    {
      id: 'loops-01',
      moduleId: 'loops',
      title: 'Сумма от 1 до n',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt:
        'Функция `sumTo(n)` возвращает сумму всех чисел от 1 до n. Например, `sumTo(5)` = 1 + 2 + 3 + 4 + 5 = 15.',
      hints: [
        'Заведи переменную-накопитель `let sum = 0`.',
        'Пройди циклом `for (let i = 1; i <= n; i++)` и прибавляй `i` к `sum`.',
      ],
      starter: 'function sumTo(n) {\n  \n}\n',
      solution:
        'function sumTo(n) {\n  let sum = 0\n  for (let i = 1; i <= n; i++) {\n    sum += i\n  }\n  return sum\n}\n',
      fn: 'sumTo',
      cases: [
        { name: 'sumTo(5) = 15', args: [5], expected: 15 },
        { name: 'sumTo(1) = 1', args: [1], expected: 1 },
        { name: 'sumTo(10) = 55', args: [10], expected: 55 },
        { name: 'sumTo(0) = 0', args: [0], expected: 0 },
      ],
    },
    {
      id: 'loops-02',
      moduleId: 'loops',
      title: 'Факториал',
      kind: 'js',
      difficulty: 1,
      xp: 15,
      prompt:
        'Функция `factorial(n)` возвращает произведение всех чисел от 1 до n. Например, `factorial(5)` = 1 × 2 × 3 × 4 × 5 = 120. Считай, что `factorial(0)` = 1.',
      hints: [
        'Накопитель начинается с 1, а не с 0 (ведь мы умножаем).',
        'В цикле умножай: `result *= i`.',
      ],
      starter: 'function factorial(n) {\n  \n}\n',
      solution:
        'function factorial(n) {\n  let result = 1\n  for (let i = 1; i <= n; i++) {\n    result *= i\n  }\n  return result\n}\n',
      fn: 'factorial',
      cases: [
        { name: 'factorial(5) = 120', args: [5], expected: 120 },
        { name: 'factorial(0) = 1', args: [0], expected: 1 },
        { name: 'factorial(1) = 1', args: [1], expected: 1 },
        { name: 'factorial(6) = 720', args: [6], expected: 720 },
      ],
    },
    {
      id: 'loops-03',
      moduleId: 'loops',
      title: 'Сколько чётных до n',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `countEven(n)` возвращает, сколько чётных чисел встречается от 1 до n включительно. Например, до 10 их пять: 2, 4, 6, 8, 10.',
      hints: [
        'Заведи счётчик `let count = 0`.',
        'Число чётное, если `i % 2 === 0`.',
        'Увеличивай счётчик только для чётных: `if (i % 2 === 0) count++`.',
      ],
      starter: 'function countEven(n) {\n  \n}\n',
      solution:
        'function countEven(n) {\n  let count = 0\n  for (let i = 1; i <= n; i++) {\n    if (i % 2 === 0) {\n      count++\n    }\n  }\n  return count\n}\n',
      fn: 'countEven',
      cases: [
        { name: 'countEven(10) = 5', args: [10], expected: 5 },
        { name: 'countEven(7) = 3', args: [7], expected: 3 },
        { name: 'countEven(1) = 0', args: [1], expected: 0 },
        { name: 'countEven(2) = 1', args: [2], expected: 1 },
      ],
    },
    {
      id: 'loops-04',
      moduleId: 'loops',
      title: 'Возведение в степень',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `power(a, b)` возводит число `a` в степень `b` — то есть умножает `a` само на себя `b` раз. Например, `power(2, 10)` = 1024. Делай это циклом, без оператора `**` и без `Math.pow`. Считай, что `power(a, 0)` = 1.',
      hints: [
        'Начни с `let result = 1`.',
        'Повтори умножение `b` раз: `for (let i = 0; i < b; i++) result *= a`.',
      ],
      starter: 'function power(a, b) {\n  \n}\n',
      solution:
        'function power(a, b) {\n  let result = 1\n  for (let i = 0; i < b; i++) {\n    result *= a\n  }\n  return result\n}\n',
      fn: 'power',
      cases: [
        { name: 'power(2, 10) = 1024', args: [2, 10], expected: 1024 },
        { name: 'power(5, 3) = 125', args: [5, 3], expected: 125 },
        { name: 'power(3, 0) = 1', args: [3, 0], expected: 1 },
        { name: 'power(7, 1) = 7', args: [7, 1], expected: 7 },
      ],
    },
    {
      id: 'loops-05',
      moduleId: 'loops',
      title: 'Обратный отсчёт',
      kind: 'js',
      difficulty: 2,
      xp: 20,
      prompt:
        'Функция `countdown(n)` возвращает строку обратного отсчёта от n до 1, числа разделены пробелами. Например, `countdown(5)` = `"5 4 3 2 1"`, а `countdown(1)` = `"1"` (без лишних пробелов).',
      hints: [
        'Считай в цикле в обратную сторону: `for (let i = n; i >= 1; i--)`.',
        'Собери числа в массив, а потом соедини через пробел: `parts.join(\' \')`.',
      ],
      starter: 'function countdown(n) {\n  \n}\n',
      solution:
        "function countdown(n) {\n  const parts = []\n  for (let i = n; i >= 1; i--) {\n    parts.push(i)\n  }\n  return parts.join(' ')\n}\n",
      fn: 'countdown',
      cases: [
        { name: 'countdown(5) = "5 4 3 2 1"', args: [5], expected: '5 4 3 2 1' },
        { name: 'countdown(1) = "1"', args: [1], expected: '1' },
        { name: 'countdown(3) = "3 2 1"', args: [3], expected: '3 2 1' },
      ],
    },
    {
      id: 'loops-06',
      moduleId: 'loops',
      title: 'Сумма цифр числа',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `digitSum(n)` возвращает сумму всех цифр числа. Например, `digitSum(123)` = 1 + 2 + 3 = 6. Число n не отрицательное.',
      hints: [
        'Последняя цифра числа — это остаток от деления на 10: `n % 10`.',
        'Убрать последнюю цифру: `n = Math.floor(n / 10)`.',
        'Повторяй, пока `n > 0`, с помощью цикла `while`.',
      ],
      starter: 'function digitSum(n) {\n  \n}\n',
      solution:
        'function digitSum(n) {\n  let sum = 0\n  while (n > 0) {\n    sum += n % 10\n    n = Math.floor(n / 10)\n  }\n  return sum\n}\n',
      fn: 'digitSum',
      cases: [
        { name: 'digitSum(123) = 6', args: [123], expected: 6 },
        { name: 'digitSum(0) = 0', args: [0], expected: 0 },
        { name: 'digitSum(505) = 10', args: [505], expected: 10 },
        { name: 'digitSum(9999) = 36', args: [9999], expected: 36 },
      ],
    },
    {
      id: 'loops-07',
      moduleId: 'loops',
      title: 'Повтори строку',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `repeatStr(str, n)` возвращает строку `str`, повторённую `n` раз. Например, `repeatStr("ab", 3)` = `"ababab"`. Собери результат циклом, без встроенного метода `.repeat`. Если `n` = 0, верни пустую строку `""`.',
      hints: [
        'Начни с пустой строки `let result = \'\'`.',
        'В цикле от 0 до n прибавляй строку: `result += str`.',
      ],
      starter: 'function repeatStr(str, n) {\n  \n}\n',
      solution:
        "function repeatStr(str, n) {\n  let result = ''\n  for (let i = 0; i < n; i++) {\n    result += str\n  }\n  return result\n}\n",
      fn: 'repeatStr',
      cases: [
        { name: 'repeatStr("ab", 3) = "ababab"', args: ['ab', 3], expected: 'ababab' },
        { name: 'repeatStr("!", 5) = "!!!!!"', args: ['!', 5], expected: '!!!!!' },
        { name: 'repeatStr("x", 0) = ""', args: ['x', 0], expected: '' },
      ],
    },
    {
      id: 'loops-08',
      moduleId: 'loops',
      title: 'Наибольший общий делитель',
      kind: 'js',
      difficulty: 3,
      xp: 25,
      prompt:
        'Функция `gcd(a, b)` возвращает наибольший общий делитель двух положительных чисел — самое большое число, на которое делятся оба. Например, `gcd(12, 8)` = 4.',
      hints: [
        'Алгоритм Евклида: пока `b` не 0, заменяй пару `(a, b)` на `(b, a % b)`.',
        'Когда `b` станет 0, ответом будет `a`.',
        'Обмен удобно делать через временную переменную.',
      ],
      starter: 'function gcd(a, b) {\n  \n}\n',
      solution:
        'function gcd(a, b) {\n  while (b !== 0) {\n    const t = b\n    b = a % b\n    a = t\n  }\n  return a\n}\n',
      fn: 'gcd',
      cases: [
        { name: 'gcd(12, 8) = 4', args: [12, 8], expected: 4 },
        { name: 'gcd(48, 36) = 12', args: [48, 36], expected: 12 },
        { name: 'gcd(7, 13) = 1', args: [7, 13], expected: 1 },
        { name: 'gcd(100, 10) = 10', args: [100, 10], expected: 10 },
      ],
    },
    {
      id: 'loops-09',
      moduleId: 'loops',
      title: 'Простое число?',
      kind: 'js',
      difficulty: 4,
      xp: 28,
      prompt:
        'Функция `isPrime(n)` возвращает `true`, если число простое (делится только на 1 и на само себя), иначе `false`. Например, 7 — простое, а 9 = 3 × 3 — нет. Числа меньше 2 простыми не считаются.',
      hints: [
        'Если `n < 2`, сразу верни `false`.',
        'Перебери делители от 2 до `n - 1` и проверь `n % i === 0`.',
        'Нашёл делитель — число не простое, верни `false`. Дошёл до конца — верни `true`.',
      ],
      starter: 'function isPrime(n) {\n  \n}\n',
      solution:
        'function isPrime(n) {\n  if (n < 2) {\n    return false\n  }\n  for (let i = 2; i < n; i++) {\n    if (n % i === 0) {\n      return false\n    }\n  }\n  return true\n}\n',
      fn: 'isPrime',
      cases: [
        { name: 'isPrime(7) = true', args: [7], expected: true },
        { name: 'isPrime(9) = false', args: [9], expected: false },
        { name: 'isPrime(2) = true', args: [2], expected: true },
        { name: 'isPrime(1) = false', args: [1], expected: false },
        { name: 'isPrime(13) = true', args: [13], expected: true },
      ],
    },
    {
      id: 'loops-10',
      moduleId: 'loops',
      title: 'Количество делителей',
      kind: 'js',
      difficulty: 4,
      xp: 28,
      prompt:
        'Функция `countDivisors(n)` возвращает, на сколько разных чисел делится `n` без остатка (включая 1 и само число). Например, у 12 их шесть: 1, 2, 3, 4, 6, 12.',
      hints: [
        'Заведи счётчик и перебери числа от 1 до n.',
        'Если `n % i === 0`, значит `i` — делитель, увеличь счётчик.',
      ],
      starter: 'function countDivisors(n) {\n  \n}\n',
      solution:
        'function countDivisors(n) {\n  let count = 0\n  for (let i = 1; i <= n; i++) {\n    if (n % i === 0) {\n      count++\n    }\n  }\n  return count\n}\n',
      fn: 'countDivisors',
      cases: [
        { name: 'countDivisors(12) = 6', args: [12], expected: 6 },
        { name: 'countDivisors(7) = 2', args: [7], expected: 2 },
        { name: 'countDivisors(1) = 1', args: [1], expected: 1 },
        { name: 'countDivisors(16) = 5', args: [16], expected: 5 },
      ],
    },
    {
      id: 'loops-11',
      moduleId: 'loops',
      title: 'Число Фибоначчи',
      kind: 'js',
      difficulty: 4,
      xp: 28,
      prompt:
        'В ряду Фибоначчи каждое число — сумма двух предыдущих: 1, 1, 2, 3, 5, 8, 13, … Функция `fib(n)` возвращает n-е число ряда (нумерация с 1): `fib(1)` = 1, `fib(2)` = 1, `fib(7)` = 13.',
      hints: [
        'Храни два соседних числа: `let a = 1, b = 1`.',
        'На каждом шаге сдвигай пару: следующее число — это `a + b`.',
        'Первые два числа равны 1 — обработай их отдельно или начни цикл с третьего.',
      ],
      starter: 'function fib(n) {\n  \n}\n',
      solution:
        'function fib(n) {\n  let a = 1\n  let b = 1\n  for (let i = 3; i <= n; i++) {\n    const next = a + b\n    a = b\n    b = next\n  }\n  return b\n}\n',
      fn: 'fib',
      cases: [
        { name: 'fib(1) = 1', args: [1], expected: 1 },
        { name: 'fib(2) = 1', args: [2], expected: 1 },
        { name: 'fib(3) = 2', args: [3], expected: 2 },
        { name: 'fib(7) = 13', args: [7], expected: 13 },
        { name: 'fib(10) = 55', args: [10], expected: 55 },
      ],
    },
    {
      id: 'loops-12',
      moduleId: 'loops',
      title: 'Шаги Коллатца',
      kind: 'js',
      difficulty: 5,
      xp: 30,
      prompt:
        'Гипотеза Коллатца: берём число и повторяем правило — если чётное, делим на 2; если нечётное, умножаем на 3 и прибавляем 1. Рано или поздно придём к 1. Функция `collatz(n)` возвращает, сколько шагов нужно, чтобы из `n` получить 1. Например, `collatz(8)`: 8 → 4 → 2 → 1 — это 3 шага. `collatz(1)` = 0.',
      hints: [
        'Считай шаги в цикле `while (n !== 1)`.',
        'Чётное: `n = n / 2`. Нечётное: `n = n * 3 + 1`.',
        'Не забудь увеличивать счётчик шагов на каждой итерации.',
      ],
      starter: 'function collatz(n) {\n  \n}\n',
      solution:
        'function collatz(n) {\n  let steps = 0\n  while (n !== 1) {\n    if (n % 2 === 0) {\n      n = n / 2\n    } else {\n      n = n * 3 + 1\n    }\n    steps++\n  }\n  return steps\n}\n',
      fn: 'collatz',
      cases: [
        { name: 'collatz(1) = 0', args: [1], expected: 0 },
        { name: 'collatz(8) = 3', args: [8], expected: 3 },
        { name: 'collatz(6) = 8', args: [6], expected: 8 },
        { name: 'collatz(7) = 16', args: [7], expected: 16 },
      ],
    },
  ],
}
