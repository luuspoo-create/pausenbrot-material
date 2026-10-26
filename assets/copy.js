'use strict';
document.querySelectorAll('.copy-block').forEach(block => {
  const button = block.querySelector('button');
  button.hidden = false;
  button.addEventListener('click', async () => {
    const text = block.querySelector('code').textContent;
    const status = block.querySelector('.copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('aria-label', 'Text zum Kopieren');
        block.appendChild(area); area.select();
        const copied = document.execCommand('copy'); area.remove();
        if (!copied) throw new Error('copy unavailable');
      }
      button.textContent = 'Kopiert ✓';
      status.textContent = 'Der Text ist in deiner Zwischenablage.';
    } catch (_) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(block.querySelector('code'));
      selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Bitte den markierten Text über das Menü deines Geräts kopieren.';
    }
  });
});
