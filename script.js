const btnClear = document.querySelector('.clear');
const btnColor = document.querySelector('.color');
const btnRainBow = document.querySelector('.rainbow');
const btnEraser = document.querySelector('.eraser');
const btnPrgDark = document.querySelector('.prg-dark');
let singleColorOn = true;
let rainBowOn;
let eraserOn;
let newColor;
let colorChange;
let brightnessValue = 100;
let darkeningMode = false;
const colorPicker = document.querySelector('#colorpicker');

let gridContainer = document.querySelector('.inner-grid-container');
const inputSize = document.querySelector('#size-range');
let sizeValue = document.querySelector('.size-value');

sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`; 
btnColor.style.background = '#FD6CFD';
makeGrid();
draw();

colorPicker.addEventListener('click', () => {
    if (eraserOn) {
        btnEraser.style.background = 'rgb(62, 166, 255)';
        eraserOn = false;
    }
});

btnPrgDark.addEventListener('click', () => {
    eraserOn = false;
    btnEraser.style.background = 'rgb(62, 166, 255)';
    if (darkeningMode) {
        darkeningMode = false;
        btnPrgDark.style.filter = 'brightness(100%)';
    } else {
        darkeningMode = true;
        btnPrgDark.style.filter = 'brightness(50%)';
    }
});

btnRainBow.addEventListener('click', () => {
    rainBowOn = true
    singleColorOn = false;
    eraserOn = false;
    btnRainBow.style.background = 'linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4)';
    btnColor.style.background = 'rgb(62, 166, 255)';
    btnEraser.style.background = 'rgb(62, 166, 255)';
});

btnColor.addEventListener('click', () => {
    rainBowOn = false;
    singleColorOn = true;
    eraserOn = false;
    btnColor.style.background = '#FD6CFD';
    btnRainBow.style.background = 'rgb(62, 166, 255)';
    btnEraser.style.background = 'rgb(62, 166, 255)';
    
});

btnEraser.addEventListener('click', () => {
    rainBowOn = false;
    singleColorOn= false;
    eraserOn = true;
    btnEraser.style.background = '#EFEFEF';
    btnColor.style.background = 'rgb(62, 166, 255)';
    btnRainBow.style.background = 'rgb(62, 166, 255)';
});

inputSize.addEventListener('input', () => {
    sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`;
});

inputSize.addEventListener('mouseup', () => {
    let elements = document.querySelectorAll('.element');
    elements.forEach(element => gridContainer.removeChild(element));
    makeGrid(inputSize.value);
    draw();
});

function makeGrid(size) {
    if (size === undefined) {
        size = 16;
    }
    for (let i = 0; i < size * size; i++) {
        let elem = document.createElement('div')
        elem.className = 'element';
        elem.style.width = `${100/size}%`;
        elem.style.paddingBottom = `${100/size}%`;
        elem.style.backgroundColor = 'rgb(255,255,255)';
        gridContainer.appendChild(elem);
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
        window.addEventListener('mouseup', function() {mouseIsDown = false});
        
        element.addEventListener('mouseenter', function() {
            if (mouseIsDown) {
                if (brightnessValue <= 0) {
                    brightnessValue = 100;
                }
                selectDrawingStyle(element);
            }
            if (mouseIsDown && darkeningMode) {
                if (brightnessValue <= 0) {
                    brightnessValue = 100;
                }
                if (eraserOn) {
                    element.style.filter = `brightness(100%)`;
                    brightnessValue = 100;
                } else if (singleColorOn || rainBowOn) {
                    element.style.filter = `brightness(${brightnessValue}%)`;
                    brightnessValue -= 5;
                }
            }
        });
    });
}

function selectDrawingStyle (element) {
    if (singleColorOn) {
        return element.style.backgroundColor = colorPicker.value, element.style.filter = `brightness(100%)`;
    } else if (rainBowOn) {
        return element.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`, element.style.filter = `brightness(100%)`;
    } else if (eraserOn) {
        return element.style.backgroundColor = 'rgb(255,255,255)', element.style.filter = `brightness(100%)`;
    }
}

btnClear.addEventListener('click', () => {
    const gridElements = document.querySelectorAll('.element');
    gridElements.forEach(function (element) {
        element.style.backgroundColor = 'rgb(255,255,255)';
        element.style.filter = `brightness(100%)`;
    });
    btnEraser.style.background = 'rgb(62, 166, 255)';
});