let gridContainer = document.querySelector('.inner-grid-container');
const inputSize = document.querySelector('#size-range');
let sizeValue = document.querySelector('.size-value');
sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}` 

inputSize.addEventListener('input', () => {
    sizeValue.innerHTML = `${inputSize.value} x ${inputSize.value}`
    

    outer:
    for (let i = 0; i < inputSize.value; i++) {
        let rowCount = inputSize.value;
        for (let j = inputSize.value; j < inputSize.value + 1; j) {
            if (rowCount == 0) {
                continue outer;
            }
            let elem = document.createElement('div')
            elem.className = 'element';
            elem.style.width = `${100/inputSize.value}%`;
            elem.style.paddingBottom = `${100/inputSize.value}%`;
            gridContainer.appendChild(elem);
            rowCount--;
        }
    }
});




