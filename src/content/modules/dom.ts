import type { Module } from '../../types'

export const dom: Module = {
  id: 'dom',
  order: 9,
  title: 'DOM и события',
  emoji: '🌐',
  summary: 'Оживляем страницу: создаём элементы, меняем текст, классы и атрибуты, собираем их вместе.',
  tasks: [
    {
      id: 'dom-01',
      moduleId: 'dom',
      title: 'Заголовок страницы',
      kind: 'dom',
      difficulty: 1,
      xp: 15,
      prompt:
        'Создай элемент `<h1>` с текстом `Привет, мир!` и добавь его в `document.body`.',
      hints: [
        'Новый элемент: `document.createElement(\'h1\')`.',
        'Текст задаётся через `.textContent`.',
        'Добавить на страницу: `document.body.appendChild(...)`.',
      ],
      starter: '// создай <h1> и добавь его в body\n',
      solution:
        "const h = document.createElement('h1')\nh.textContent = 'Привет, мир!'\ndocument.body.appendChild(h)\n",
      checks: [
        { name: 'есть <h1>', body: "return !!doc.querySelector('h1')" },
        {
          name: 'текст верный',
          body: "return doc.querySelector('h1').textContent === 'Привет, мир!'",
        },
      ],
    },
    {
      id: 'dom-02',
      moduleId: 'dom',
      title: 'Элемент с id',
      kind: 'dom',
      difficulty: 1,
      xp: 15,
      prompt:
        'Создай абзац `<p>` с id `greeting` и текстом `Меня зовут Кода`. Добавь его в `document.body`.',
      hints: [
        'id задаётся так: `el.id = \'greeting\'`.',
        'Не забудь добавить элемент в `document.body`.',
      ],
      starter: '// создай <p id="greeting"> с текстом\n',
      solution:
        "const p = document.createElement('p')\np.id = 'greeting'\np.textContent = 'Меня зовут Кода'\ndocument.body.appendChild(p)\n",
      checks: [
        { name: 'есть элемент #greeting', body: "return !!doc.getElementById('greeting')" },
        {
          name: 'это <p>',
          body: "return doc.getElementById('greeting').tagName === 'P'",
        },
        {
          name: 'текст верный',
          body: "return doc.getElementById('greeting').textContent === 'Меня зовут Кода'",
        },
      ],
    },
    {
      id: 'dom-03',
      moduleId: 'dom',
      title: 'Добавь класс',
      kind: 'dom',
      difficulty: 2,
      xp: 20,
      prompt:
        'Создай кнопку `<button>` с текстом `Старт` и добавь ей CSS-класс `active`. Помести кнопку в `document.body`.',
      hints: [
        'Кнопка: `document.createElement(\'button\')`.',
        'Класс добавляют через `el.classList.add(\'active\')`.',
      ],
      starter: '// создай кнопку с классом active\n',
      solution:
        "const btn = document.createElement('button')\nbtn.textContent = 'Старт'\nbtn.classList.add('active')\ndocument.body.appendChild(btn)\n",
      checks: [
        { name: 'есть кнопка', body: "return !!doc.querySelector('button')" },
        {
          name: 'текст кнопки',
          body: "return doc.querySelector('button').textContent === 'Старт'",
        },
        {
          name: 'есть класс active',
          body: "return doc.querySelector('button').classList.contains('active')",
        },
      ],
    },
    {
      id: 'dom-04',
      moduleId: 'dom',
      title: 'Список из массива',
      kind: 'dom',
      difficulty: 2,
      xp: 20,
      prompt:
        'Дан массив `[\'Яблоко\', \'Банан\', \'Вишня\']`. Создай список `<ul>`, а внутри — по одному `<li>` для каждого фрукта (текст = название). Добавь `<ul>` в `document.body`.',
      hints: [
        'Пройди по массиву циклом `for (const item of items)`.',
        'Для каждого фрукта создай `<li>`, задай `.textContent` и добавь его в `<ul>`.',
        'В конце добавь сам `<ul>` в `document.body`.',
      ],
      starter:
        "const items = ['Яблоко', 'Банан', 'Вишня']\n// собери <ul> с тремя <li>\n",
      solution:
        "const items = ['Яблоко', 'Банан', 'Вишня']\nconst ul = document.createElement('ul')\nfor (const item of items) {\n  const li = document.createElement('li')\n  li.textContent = item\n  ul.appendChild(li)\n}\ndocument.body.appendChild(ul)\n",
      checks: [
        { name: 'есть <ul>', body: "return !!doc.querySelector('ul')" },
        {
          name: 'три <li>',
          body: "return doc.querySelectorAll('ul li').length === 3",
        },
        {
          name: 'первый — Яблоко',
          body: "return doc.querySelectorAll('ul li')[0].textContent === 'Яблоко'",
        },
        {
          name: 'последний — Вишня',
          body: "return doc.querySelectorAll('ul li')[2].textContent === 'Вишня'",
        },
      ],
    },
    {
      id: 'dom-05',
      moduleId: 'dom',
      title: 'Поменяй текст',
      kind: 'dom',
      difficulty: 2,
      xp: 20,
      prompt:
        'Создай абзац `<p>` с id `status` и текстом `Загрузка...` и добавь его в `document.body`. Затем найди этот элемент и поменяй его текст на `Готово`.',
      hints: [
        'Сначала создай и добавь `<p id="status">` с текстом `Загрузка...`.',
        'Найти элемент можно через `document.getElementById(\'status\')`.',
        'Новый текст: `el.textContent = \'Готово\'`.',
      ],
      starter:
        "// создай <p id=\"status\"> с текстом 'Загрузка...'\n// потом поменяй текст на 'Готово'\n",
      solution:
        "const p = document.createElement('p')\np.id = 'status'\np.textContent = 'Загрузка...'\ndocument.body.appendChild(p)\nconst el = document.getElementById('status')\nel.textContent = 'Готово'\n",
      checks: [
        { name: 'есть #status', body: "return !!doc.getElementById('status')" },
        {
          name: 'текст стал «Готово»',
          body: "return doc.getElementById('status').textContent === 'Готово'",
        },
      ],
    },
    {
      id: 'dom-06',
      moduleId: 'dom',
      title: 'Сколько детей?',
      kind: 'dom',
      difficulty: 3,
      xp: 25,
      prompt:
        'Создай контейнер `<div>` с id `box` и положи в него 4 элемента `<span>`. Затем создай абзац `<p>` с id `count`, в тексте которого — количество дочерних элементов `box` (число `4` как строка). Добавь оба элемента в `document.body`.',
      hints: [
        'Добавляй `<span>` в цикле: `for (let i = 0; i < 4; i++)`.',
        'Количество детей: `box.children.length`.',
        'Число в строку: `String(box.children.length)`.',
      ],
      starter:
        "// создай <div id=\"box\"> с 4 <span> внутри\n// затем <p id=\"count\"> с количеством детей\n",
      solution:
        "const box = document.createElement('div')\nbox.id = 'box'\nfor (let i = 0; i < 4; i++) {\n  box.appendChild(document.createElement('span'))\n}\ndocument.body.appendChild(box)\nconst count = document.createElement('p')\ncount.id = 'count'\ncount.textContent = String(box.children.length)\ndocument.body.appendChild(count)\n",
      checks: [
        {
          name: 'у #box четыре ребёнка',
          body: "return doc.getElementById('box').children.length === 4",
        },
        {
          name: 'дети — это <span>',
          body: "return doc.querySelectorAll('#box span').length === 4",
        },
        {
          name: 'в #count написано 4',
          body: "return doc.getElementById('count').textContent === '4'",
        },
      ],
    },
    {
      id: 'dom-07',
      moduleId: 'dom',
      title: 'Ссылка с атрибутами',
      kind: 'dom',
      difficulty: 3,
      xp: 25,
      prompt:
        'Создай ссылку `<a>` с текстом `Открыть`. Установи ей атрибут `href` = `https://example.com` и атрибут `data-id` = `42`. Добавь ссылку в `document.body`.',
      hints: [
        'Атрибут задают через `el.setAttribute(\'href\', \'...\')`.',
        'То же самое для `data-id`: `el.setAttribute(\'data-id\', \'42\')`.',
      ],
      starter: '// создай <a> с href и data-id\n',
      solution:
        "const a = document.createElement('a')\na.textContent = 'Открыть'\na.setAttribute('href', 'https://example.com')\na.setAttribute('data-id', '42')\ndocument.body.appendChild(a)\n",
      checks: [
        { name: 'есть ссылка', body: "return !!doc.querySelector('a')" },
        {
          name: 'href верный',
          body: "return doc.querySelector('a').getAttribute('href') === 'https://example.com'",
        },
        {
          name: 'data-id = 42',
          body: "return doc.querySelector('a').getAttribute('data-id') === '42'",
        },
      ],
    },
    {
      id: 'dom-08',
      moduleId: 'dom',
      title: 'Собери карточку профиля',
      kind: 'dom',
      difficulty: 4,
      xp: 30,
      prompt:
        'На странице есть контейнер `<div id="app">`. Помести в него заголовок `<h2>` с текстом `Профиль`, а под ним список `<ul>` с двумя пунктами `<li>`: `Имя: Кода` и `Уровень: 5`. Всё должно лежать внутри `#app`.',
      hints: [
        'Найди контейнер: `document.getElementById(\'app\')` (если его нет — создай `<div id="app">` и добавь в body).',
        'Добавляй заголовок и список именно в `#app` через `app.appendChild(...)`.',
        'Пункты списка удобно создать циклом по массиву текстов.',
      ],
      starter:
        "// добавь в #app заголовок <h2> и список <ul> с двумя <li>\n",
      solution:
        "let app = document.getElementById('app')\nif (!app) {\n  app = document.createElement('div')\n  app.id = 'app'\n  document.body.appendChild(app)\n}\nconst h = document.createElement('h2')\nh.textContent = 'Профиль'\napp.appendChild(h)\nconst ul = document.createElement('ul')\nconst rows = ['Имя: Кода', 'Уровень: 5']\nfor (const text of rows) {\n  const li = document.createElement('li')\n  li.textContent = text\n  ul.appendChild(li)\n}\napp.appendChild(ul)\n",
      checks: [
        {
          name: 'в #app есть <h2> «Профиль»',
          body: "return doc.querySelector('#app h2') && doc.querySelector('#app h2').textContent === 'Профиль'",
        },
        {
          name: 'в #app есть список с двумя пунктами',
          body: "return doc.querySelectorAll('#app ul li').length === 2",
        },
        {
          name: 'первый пункт про имя',
          body: "return doc.querySelectorAll('#app ul li')[0].textContent === 'Имя: Кода'",
        },
        {
          name: 'второй пункт про уровень',
          body: "return doc.querySelectorAll('#app ul li')[1].textContent === 'Уровень: 5'",
        },
      ],
    },
  ],
}
