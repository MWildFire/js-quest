import type { DomCheck } from '../types'

/** Экранируем `<` чтобы безопасно встроить JSON в тег <script>. */
function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/**
 * Строит srcdoc для sandbox-iframe: рендерит код ученика, прогоняет проверки
 * и отправляет результат родителю через postMessage.
 */
export function buildSrcdoc(code: string, checks: DomCheck[], nonce: string): string {
  const payload = safeJson({ code, checks, nonce })
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<style>
  body { font-family: system-ui, sans-serif; padding: 12px; color: #0b1020; background: #fff; }
  * { box-sizing: border-box; }
</style>
</head>
<body>
<div id="app"></div>
<script>
(function () {
  var P = ${payload};
  var logs = [];
  var shim = { log: rec, info: rec, warn: rec, error: rec, debug: rec };
  function rec() { logs.push(Array.prototype.slice.call(arguments).join(' ')); }
  var error = null;
  try {
    (new Function('document', 'console', '"use strict";\\n' + P.code))(document, shim);
  } catch (e) {
    error = (e && e.message) ? e.message : String(e);
  }
  var results = P.checks.map(function (c) {
    try {
      var t = new Function('doc', '"use strict";\\n' + c.body);
      var passed = !!t(document);
      return { name: c.name, passed: passed, message: passed ? 'OK' : 'проверка не прошла' };
    } catch (e) {
      return { name: c.name, passed: false, message: 'ошибка проверки: ' + ((e && e.message) || e) };
    }
  });
  parent.postMessage({ source: 'js-quest-dom', nonce: P.nonce, error: error, logs: logs, results: results }, '*');
})();
</script>
</body>
</html>`
}
