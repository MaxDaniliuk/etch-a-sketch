let gridContainer = document.querySelector('.inner-grid-container');
const inputSize = document.querySelector('#size-range');
let sizeValue = document.querySelector('.size-value');
sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`; 
makeGrid();
draw();

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
        element.addEventListener('mousedown', function() {mouseIsDown = true});
        element.addEventListener('mouseup', function() {mouseIsDown = false});

        element.addEventListener('mousemove', function() {
            if (mouseIsDown) {
                element.style.backgroundColor = 'rgb(0, 0, 0)';
            }
        });
    });
    //gridElements.forEach(gridElement => gridElement.addEventListener('mousedown', () => {
    //    gridElement.style.backgroundColor = 'rgb(0, 0, 0)';
    //}));
}

const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', () => {
    const gridElements = document.querySelectorAll('.element');
    gridElements.forEach(function (element) {
        element.style.backgroundColor = 'rgb(255,255,255)';
    });
});

