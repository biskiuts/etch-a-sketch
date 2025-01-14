const grid = document.getElementById("grid");
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");
const colorTool = document.getElementById("colorTool");
const bordersBtn = document.getElementById("bordersBtn");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const toneUpBtn = document.getElementById("toneupBtn");
const toneDownBtn = document.getElementById("tonedownBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

let currentMode = "brush";
let showBorders = true;
let isPainting = false;

function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.border = showBorders ? "1px solid rgba(0, 0, 0, 0.1)" : "none";
    cell.style.backgroundColor = "#fff";

    cell.addEventListener("mousedown", () => handleDraw(cell));
    cell.addEventListener("mouseover", () => {
      if (isPainting) {
        handleDraw(cell);
      }
    });

    grid.appendChild(cell);
  }
}

function handleDraw(cell) {
  if (currentMode === "brush") {
    cell.style.backgroundColor = colorTool.value;
  } else if (currentMode === "rainbow") {
    cell.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } else if (currentMode === "toneUp") {
    adjustTone(cell, true);
  } else if (currentMode === "toneDown") {
    adjustTone(cell, false);
  } else if (currentMode === "eraser") {
    cell.style.backgroundColor = "#fff";
  }
}

function adjustTone(cell, isLightening) {
  let bgColor = window.getComputedStyle(cell).backgroundColor;
  let rgb = bgColor.match(/\d+/g).map(Number);
  for (let i = 0; i < 3; i++) {
    rgb[i] = isLightening ? Math.min(rgb[i] + 25, 255) : Math.max(rgb[i] - 25, 0);
  }
  cell.style.backgroundColor = `rgb(${rgb.join(",")})`;
}

bordersBtn.addEventListener("click", () => {
  showBorders = !showBorders;
  bordersBtn.textContent = showBorders ? "Borders Off" : "Borders On";

  const cells = grid.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.style.border = showBorders ? "1px solid rgba(0, 0, 0, 0.1)" : "none";
  });
});

colorBtn.addEventListener("click", () => {
  currentMode = "brush";
});

rainbowBtn.addEventListener("click", () => {
  currentMode = "rainbow";
});

toneUpBtn.addEventListener("click", () => {
  currentMode = "toneUp";
});

toneDownBtn.addEventListener("click", () => {
  currentMode = "toneDown";
});

eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
});

clearBtn.addEventListener("click", () => {
  createGrid(sizeSlider.value);
});

sizeSlider.addEventListener("input", () => {
  const size = sizeSlider.value;
  sizeValue.textContent = `${size} x ${size}`;
  createGrid(size);
});

createGrid(sizeSlider.value);

grid.addEventListener("mousedown", () => {
  isPainting = true;
});

grid.addEventListener("mouseup", () => {
  isPainting = false;
});

grid.addEventListener("mouseleave", () => {
  isPainting = false;
});
