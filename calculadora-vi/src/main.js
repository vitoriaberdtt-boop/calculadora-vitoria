console.log('main.js carregado (module)');


function insert(num) {
  const el = document.getElementById('result');
  if (!el) {
    
    return console.warn('insert: elemento #result não encontrado');
  }
  
  el.textContent = String(el.textContent || '') + String(num);
}

function clean() {
  const el = document.getElementById('result');
  if (!el) return console.warn('clean: elemento #result não encontrado');
  el.textContent = '';
}

function calcular() {
  const el = document.getElementById('result');
  if (!el) return console.warn('calcular: elemento #result não encontrado');

  const raw = String(el.textContent || '').trim();
  if (!raw) {
    el.textContent = 'syntax error';
    return;
  }

  
  const expr = raw.replace(/×/g, '*').replace(/x/g, '*').replace(/÷/g, '/');

  try {
    
    const value = Function(`return (${expr})`)();

    
    if (value === undefined || value === null) {
      el.textContent = '';
    } else {
      
      const out = String(value);
      el.textContent = out.length > 18 ? Number(value).toPrecision(12) : out;
    }
  } catch (err) {
    console.warn('Erro ao avaliar expressão:', err.message);
    el.textContent = 'syntax error';
    
    setTimeout(() => {
      const nowEl = document.getElementById('result');
      if (nowEl) nowEl.textContent = '';
    }, 900);
  }
}

function back() {
  const el = document.getElementById('result');
  if (!el) return console.warn('back: elemento #result não encontrado');
  const txt = String(el.textContent || '');
  el.textContent = txt.slice(0, -1);
}

window.insert = insert;
window.clean = clean;
window.calcular = calcular;
window.back = back;

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const allowed = '0123456789+-*/().';
  if (allowed.includes(key)) {
    e.preventDefault();
    window.insert(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    window.calcular();
  } else if (key === 'Backspace') {
    e.preventDefault();
    window.back();
  } else if (key.toLowerCase() === 'c') {
    e.preventDefault();
    window.clean();
  }
});

