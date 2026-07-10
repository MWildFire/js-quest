import type { Quiz } from '../../types'

export const quizDom: Quiz = {
  id: 'quiz-dom',
  moduleId: 'dom',
  title: 'Квиз: DOM и события',
  xp: 30,
  questions: [
    {
      id: 'qdom-1',
      question: 'Какой метод создаёт новый элемент?',
      options: [
        "document.createElement('div')",
        "document.getElementById('div')",
        "document.querySelector('div')",
        "document.newElement('div')",
      ],
      correct: 0,
      explanation:
        '`document.createElement(тег)` создаёт новый элемент. Остальные методы ищут уже существующие.',
    },
    {
      id: 'qdom-2',
      question: 'Как добавить готовый элемент внутрь другого?',
      options: [
        'parent.textContent = child',
        'parent.appendChild(child)',
        'parent.createElement(child)',
        'parent.add(child)',
      ],
      correct: 1,
      explanation:
        '`parent.appendChild(child)` вставляет элемент последним ребёнком. Так элемент попадает на страницу.',
    },
    {
      id: 'qdom-3',
      question: 'Как найти элемент по его id, например `status`?',
      options: [
        "document.getElementById('#status')",
        "document.querySelector('status')",
        "document.getElementById('status')",
        "document.getElementByClass('status')",
      ],
      correct: 2,
      explanation:
        "В `getElementById` передают только сам id, без решётки: `getElementById('status')`. Решётка `#` нужна в `querySelector('#status')`.",
    },
    {
      id: 'qdom-4',
      question: 'Как добавить элементу CSS-класс `active`?',
      options: [
        "el.classList.add('active')",
        "el.class = 'active'",
        "el.addClass('active')",
        "el.setClass('active')",
      ],
      correct: 0,
      explanation:
        '`el.classList.add(\'active\')` добавляет класс, не стирая уже имеющиеся. У свойства `class` в JS нет — есть `className` и `classList`.',
    },
    {
      id: 'qdom-5',
      question: 'Как правильно поменять видимый текст элемента?',
      options: [
        "el.value = 'Готово'",
        "el.textContent = 'Готово'",
        "el.text('Готово')",
        "el.innerText.add('Готово')",
      ],
      correct: 1,
      explanation:
        '`el.textContent = \'Готово\'` заменяет текст внутри элемента. `value` — это про поля ввода, а не про обычный текст.',
    },
  ],
}
