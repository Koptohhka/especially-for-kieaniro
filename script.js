(() => {
    let inputField;

    let currentSide = document.querySelectorAll('.input-field__field-size')[1].name;

    let toSuffle = (arr) => {
        let random, swap;
        for (let i = arr.length - 1; i >= 0; i--) {
            random = Math.floor(Math.random() * (i + 1))
            swap = arr[random];
            arr[random] = arr[i];
            arr[i] = swap;
        }
    }

    let renderCells = () => {
        let cellsArr = [];

        for (let i = 1; i < currentSide * currentSide; i++) {
            let cell = `<div id="${i}" class="cell">${i}</div>`;
            cellsArr.push(cell);
        }
        cellsArr.push(`<div id="free-space" class="cell free-space"></div>`);

        toSuffle(cellsArr);

        let cellsContainer = `<div style="grid-template-columns: repeat(${currentSide}, 100px);
        grid-template-areas: repeat(${currentSide}, 100px);" class="game-container">${cellsArr.join('')}</div>
        <div class="input-field">
        <a name="3" href="#" class="input-field__field-size">3x3</a>
        <a name="4" href="#" class="input-field__field-size">4x4</a>
        <a name="5" href="#" class="input-field__field-size">5x5</a>
        <a name="6" href="#" class="input-field__field-size">6x6</a>
        <a name="7" href="#" class="input-field__field-size">7x7</a>
        <a name="8" href="#" class="input-field__field-size">8x8</a>
    </div>
        
        `;
        document.querySelector('body').innerHTML = cellsContainer;

        inputField = document.querySelector('.input-field');
    }
    renderCells();

    let checkMoveAvilability = () => {
        let resArr = [];
        let cells = document.querySelectorAll('.cell');

        let labelIndex = 0;

        let stepLeft;
        let stepRight;
        let stepUp;
        let stepDown;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.contains('free-space')) {
                labelIndex = i;
            }
        }

        stepLeft = labelIndex - 1;
        stepRight = labelIndex + 1;
        stepUp = labelIndex - 4;
        stepDown = labelIndex + 4;

        for (let i = 0; i < cells.length; i++) { //в этом цикле я проверяю, не находится ли свободная хрень с боку сетки
            if (i % currentSide === 0) {
                if (labelIndex === i) {
                    stepLeft = null;
                }
                if (labelIndex === i + (currentSide - 1)) {
                    stepRight = null;
                }
            }
        }
        //console.log(stepLeft);
        //console.log(stepRight );
        //console.log(stepUp);
        //console.log(stepDown);
        resArr.push(stepLeft);
        resArr.push(stepRight);
        resArr.push(stepUp);
        resArr.push(stepDown);

        return {
            resArr: resArr,
            labelIndex: labelIndex
        };
    }

    let toMoveCell = (evt) => {
        let freeSpaceElement = document.getElementById('free-space');
        let cellsArr = document.querySelectorAll('.cell');
        let checkResult = checkMoveAvilability();

        checkResult.resArr.forEach((it, i, arr) => {
            if (evt.target === cellsArr[it]) {
                console.log(it);
                freeSpaceElement.after(cellsArr[it]);
                cellsArr[it + 1].before(freeSpaceElement);
                
            }
        })
    }

    let toChangeCurrentSide = (evt) => {
        if (evt.target.classList.contains('input-field__field-size')) {
            currentSide = evt.target.name;
            renderCells();
        }
    }









    document.querySelector('.game-container').addEventListener('click', toMoveCell);

    inputField.addEventListener('click', toChangeCurrentSide);
})()


//toMoveCell();