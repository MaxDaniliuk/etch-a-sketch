let gridContainer = document.querySelector('.inner-grid-container');
const inputSize = document.querySelector('#size-range');
let sizeValue = document.querySelector('.size-value');
sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`; 
makeGrid();

inputSize.addEventListener('input', () => {
    sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`;

    let elements = document.querySelectorAll('.element');
    elements.forEach(element => gridContainer.removeChild(element));
   
    makeGrid(inputSize.value);
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




