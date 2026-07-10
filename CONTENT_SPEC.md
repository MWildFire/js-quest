# JS Quest — спецификация контента для авторов задач

Ты пишешь один файл модуля (`src/content/modules/<id>.ts`) и один файл квиза
(`src/content/quizzes/<id>.ts`). Строго соблюдай типы из `src/types.ts`.

## Тип Task

```ts
interface Task {
  id: string          // `<moduleId>-01`, `<moduleId>-02`, ... по порядку, двузначные
  moduleId: string    // = id модуля
  title: string       // короткое название на русском
  kind: 'js' | 'dom'
  difficulty: 1|2|3|4|5  // растёт по ходу модуля
  xp: number          // 10–30, растёт со сложностью
  prompt: string      // условие на русском, ясное и дружелюбное (для школьника)
  hints: string[]     // 1–3 подсказки, от общей к конкретной
  starter: string     // стартовый код в редакторе (каркас функции)
  solution: string    // ЭТАЛОННОЕ решение — ОБЯЗАНО проходить все cases/checks
  // для kind==='js':
  fn?: string         // имя функции, которую определяет ученик
  cases?: JsCase[]    // >=2 проверки
  // для kind==='dom':
  checks?: DomCheck[] // >=1 проверка
}

interface JsCase {
  name: string        // например '2 + 3 = 5'
  args: unknown[]     // аргументы вызова fn
  expected: unknown
  matcher?: 'deepEqual' | 'approx' | 'sameMembers'  // deepEqual по умолчанию
}
```

- `matcher: 'approx'` — для дробных чисел (сравнение с точностью 1e-9).
- `matcher: 'sameMembers'` — когда порядок элементов массива неважен.
- Для точных целых/строк/массивов/объектов — `deepEqual` (не указывай matcher).

## Тип DomCheck (только для kind==='dom')

```ts
interface DomCheck {
  name: string
  body: string  // тело функции (doc) => boolean, например:
                // "return doc.querySelector('#out').textContent === 'Привет'"
}
```

DOM-задача: ученик пишет код, у которого доступны `document` и `console`.
Код меняет DOM (создаёт/находит/меняет элементы). Проверки читают `doc`.
Эталон `solution` — валидный JS, работающий с `document`.

**Пример DOM-задачи:**
```ts
{
  id: 'dom-01', moduleId: 'dom', title: 'Заголовок страницы', kind: 'dom',
  difficulty: 1, xp: 15,
  prompt: 'Создай элемент <h1> с текстом «Привет!» и добавь его в document.body.',
  hints: ['document.createElement(\'h1\')', 'document.body.appendChild(...)'],
  starter: '// добавь <h1> в body\n',
  solution: "const h = document.createElement('h1')\nh.textContent = 'Привет!'\ndocument.body.appendChild(h)\n",
  checks: [
    { name: 'есть <h1>', body: "return !!doc.querySelector('h1')" },
    { name: 'текст верный', body: "return doc.querySelector('h1').textContent === 'Привет!'" },
  ],
}
```

## Правила

1. **Эталон обязан проходить.** После написания запусти мета-тест и убедись, что твои задачи зелёные.
2. Строки в TS-файле: аккуратно экранируй кавычки. Для многострочного кода используй `\n`.
   В starter/solution используй `\n` для переносов строк (см. пример basics.ts).
3. Прогрессия: первые задачи модуля лёгкие (difficulty 1–2), последние — 3–4, максимум 5.
4. Пиши на русском, дружелюбно, без воды. Подсказки реально помогают.
5. Не трогай другие файлы (types.ts, index.ts, другие модули).
6. Изучи `src/content/modules/basics.ts` как эталон стиля и формата.

## Квиз

```ts
interface Quiz {
  id: string; moduleId: string; title: string; xp: number
  questions: QuizQuestion[]
}
interface QuizQuestion {
  id: string          // `<qprefix>-1`, ...
  question: string
  options: string[]   // >=2 варианта
  correct: number     // индекс правильного (0-based)
  explanation: string // короткое пояснение почему
}
```

Заполни массив `questions` (5 вопросов) по теме модуля. `correct` — валидный индекс.
Сохрани уже заданные `id`/`moduleId`/`title`/`xp` в файле квиза, поменяй только `questions`.
