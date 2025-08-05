const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const animationArea = document.getElementById('animation-area');

function resetAnimation() {
  animationArea.innerHTML = '';
  resetBtn.disabled = true;
  startBtn.disabled = false;

  const message = document.createElement('div');
  message.className = 'initial-message';
  message.textContent = 'Enter two numbers and click "Start Animation"';
  animationArea.appendChild(message);
}

function createBox(value, top, left) {
  const box = document.createElement('div');
  box.className = 'number-box';
  box.style.top = `${top}px`;
  box.style.left = `${left}px`;
  box.textContent = value;
  animationArea.appendChild(box);
  return box;
}

function getCenterPosition(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = animationArea.getBoundingClientRect();
  return {
    x: rect.left - parentRect.left + rect.width / 2,
    y: rect.top - parentRect.top + rect.height / 2
  };
}

function createLine(startEl, endEl) {
  const start = getCenterPosition(startEl);
  const end = getCenterPosition(endEl);

  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  const line = document.createElement('div');
  line.className = 'line';
  line.style.width = `${length}px`;
  line.style.left = `${start.x}px`;
  line.style.top = `${start.y}px`;
  line.style.transform = `rotate(${angle}deg)`;

  animationArea.appendChild(line);
}

function showResultText(text, top) {
  const result = document.createElement('div');
  result.className = 'result-line';
  result.style.position = 'absolute';
  result.style.top = `${top}px`;
  result.style.left = '320px';
  result.textContent = text;
  animationArea.appendChild(result);
}

startBtn.addEventListener('click', () => {
  const num1 = num1Input.value.trim();
  const num2 = num2Input.value.trim();

  if (!/^\d{2}$/.test(num1) || !/^\d{2}$/.test(num2)) {
    alert("Please enter two-digit numbers only.");
    return;
  }

  startBtn.disabled = true;
  resetBtn.disabled = false;
  animationArea.innerHTML = '';

  const a = parseInt(num1[0]), b = parseInt(num1[1]);
  const c = parseInt(num2[0]), d = parseInt(num2[1]);

  const boxes = {
    a: createBox(a, 100, 150),
    b: createBox(b, 100, 220),
    c: createBox(c, 200, 150),
    d: createBox(d, 200, 220),
  };

  let carry1 = 0, carry2 = 0;
  let lineY = 280;
  let finalResult = "";

  // Step 1
  setTimeout(() => {
    const step1 = b * d;
    carry1 = Math.floor(step1 / 10);
    const rem1 = step1 % 10;
    finalResult = rem1 + finalResult;

    showResultText(`${b}×${d} = ${step1}`, lineY);
    showResultText(`Write down ${rem1}, carry over ${carry1}`, lineY + 30);
  }, 500);

  // Step 2
  setTimeout(() => {
    createLine(boxes.a, boxes.d);
    createLine(boxes.b, boxes.c);

    const step2 = (a * d) + (b * c) + carry1;
    carry2 = Math.floor(step2 / 10);
    const rem2 = step2 % 10;
    finalResult = rem2 + finalResult;

    showResultText(`(${a}×${d}) + (${b}×${c}) + carry = ${step2}`, lineY + 70);
    showResultText(`Write down ${rem2}, carry over ${carry2}`, lineY + 100);
  }, 2000);

  // Step 3
  setTimeout(() => {
    const step3 = (a * c) + carry2;
    finalResult = step3 + finalResult;

    showResultText(`${a}×${c} + carry = ${step3}`, lineY + 140);
    showResultText(`Final Result = ${finalResult}`, lineY + 180);
  }, 4000);
});

resetBtn.addEventListener('click', resetAnimation);
resetAnimation();
