const btnClear = document.querySelector('.clear');
const btnColor = document.querySelector('.color');
const btnRainBow = document.querySelector('.rainbow');
const btnEraser = document.querySelector('.eraser');

let singleColorOn;
let rainBowOn;
let eraserOn;
let newColor;
let colorChange;

let gridContainer = document.querySelector('.inner-grid-container');
const inputSize = document.querySelector('#size-range');
let sizeValue = document.querySelector('.size-value');
sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`; 

const colorPicker = document.querySelector('#colorpicker');
colorPicker.addEventListener('input', () => {
    newColor = colorPicker.value;
    colorChange = true;
});

makeGrid();
draw();

btnRainBow.addEventListener('click', () => {
    rainBowOn = true
    singleColorOn = false;
    eraserOn = false;
});

btnColor.addEventListener('click', () => {
    rainBowOn = false;
    singleColorOn = true;
    eraserOn = false;
});

btnEraser.addEventListener('click', () => {
    rainBowOn = false;
    singleColorOn= false;
    eraserOn = true;
});

inputSize.addEventListener('input', () => {
    sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`;
    let elements = document.querySelectorAll('.element');
    elements.forEach(element => gridContainer.removeChild(element));
    makeGrid(inputSize.value);
    draw();
});

function makeGrid(size) {
    if (size === undefined) {
        size = 16;
    }
    outer:
    for (let i = 0; i < size; i++) {
        let rowCount = size;
        for (let j = size; j < size + 1; j) {
            if (rowCount == 0) {
                continue outer;
            }
            let elem = document.createElement('div')
            elem.className = 'element';
            elem.style.width = `${100/size}%`;
            elem.style.paddingBottom = `${100/size}%`;
            gridContainer.appendChild(elem);
            rowCount--;
        }
    }
}

function draw() {
    let mouseIsDown = false;
    const gridElements = document.querySelectorAll('.element');
    gridElements.forEach(function (element) {
        element.addEventListener('mousedown', function() {
            selectDrawingStyle(element, newColor); 
            mouseIsDown = true;
        });
        element.addEventListener('mouseup', function() {mouseIsDown = false});
        
        element.addEventListener('mouseover', function() {
            if (mouseIsDown) {
                selectDrawingStyle(element, newColor);
            }
        });
    });
}

function selectDrawingStyle (element, newColor) {
    if (singleColorOn) {
        if (colorChange) {
            return element.style.backgroundColor = newColor;
        }
        return element.style.backgroundColor = colorPicker.value;
    } else if (rainBowOn) {
        return element.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    } else if (eraserOn) {
        return element.style.backgroundColor = 'rgb(255,255,255)';
    } else {
        return element.style.backgroundColor = 'rgb(0, 0 ,0)';
    }
}

btnClear.addEventListener('click', () => {
    const gridElements = document.querySelectorAll('.element');
    gridElements.forEach(function (element) {
        element.style.backgroundColor = 'rgb(255,255,255)';
    });
});


