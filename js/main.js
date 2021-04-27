//function to create the divs
function createGrid(numberRows) {
    //start by removing all the previous grid pixels
    

    //create the required number of divs and put them in an array
    let divsArray = [];
    let totalDivs = numberRows * numberRows;
    for (let i = 0; i < totalDivs; i++) {
        let createdDiv = document.createElement('div');
        createdDiv.setAttribute('id', `${i}`);
        createdDiv.setAttribute('class', 'grid-pixel');
        createdDiv.setAttribute('style', `background-color: ${backgroundColor};`)
        divsArray.push(createdDiv);
    }
    //create the container for the divs
    let divsContainer = document.createElement('div');
    divsContainer.setAttribute('id', 'divsContainer');
    //store the divs inside the divs container
    divsArray.forEach(div => {divsContainer.appendChild(div);});
    //return the DOM element with the right amount of divs inside of it
    return divsContainer;
}

//function that creates the proper inline CSS for the grid container
function setInlineCssGrid(divsContainer, number) {
    divsContainer.setAttribute('style',
            `grid-template-columns: repeat(${number}, 2fr);
            grid-template-rows: repeat(${number}, 2fr)`);
}

//function that change the background-color of the grid-pixels when you over over them
function colorPixel(pixel) {
    pixel.setAttribute('style', `background-color: ${penColor}; border-color: ${penColor};`);
    //add a drawed pixel class
    pixel.classList.add('drawed');
}

//funtion to reset the game (erase the colored divs)
function resetGame() {
    backgroundColor = "#FFFFFF";
    penColor = "#000000"
    let divs = document.querySelectorAll('.grid-pixel');
    divs.forEach(div => {div.setAttribute('style', `background-color: ${backgroundColor}; border-color: ${penColor};`);});
    penColorPickerWrapper.style.backgroundColor = penColor;
    backgroundColorPickerWrapper.style.backgroundColor = backgroundColor;
}

//function to change the background-color of the grid-pixels when color is changed in the color picker
function changeBackgroundColor() {
    let divs = document.querySelectorAll('div[class="grid-pixel"]');
    backgroundColor = backgroundColorPicker.value;
    divs.forEach(div => {div.setAttribute('style', `background-color: ${backgroundColor};`);});
}

//setting up global variables
const etchMachineGrid = document.querySelector('#etchMachineGrid');
let num = 36;
let backgroundColor = "#FFFFFF";
let penColor = "#000000"


//call the createGrid function to create the grid Element
let divsContainer = createGrid(num);
//add inline CSS to the divsContainer to set the grid-template settings
setInlineCssGrid(divsContainer, num);

//Append the grid element to the main section of the HTML
etchMachineGrid.appendChild(divsContainer);

//add hover event listeners to all pixels
let pixels = document.querySelectorAll('.grid-pixel');
pixels.forEach(pixel => {pixel.addEventListener('mouseover', () => {colorPixel(pixel);});})

//add event listener on the clear button that resets the grid
const resetBtn = document.querySelector('#reset-button');
resetBtn.addEventListener('click', () => {resetGame();});

//set the color pickers and event listeners
const penColorPickerWrapper = document.getElementById('pen-color-picker-wrapper');
const penColorPicker = document.getElementById('pen-color-picker');

penColorPicker.onchange = function () {
    penColorPickerWrapper.style.backgroundColor = penColorPicker.value;
    penColor = penColorPicker.value;
}
penColorPickerWrapper.style.backgroundColor = penColorPicker.value;

const backgroundColorPickerWrapper = document.getElementById('background-color-picker-wrapper');
const backgroundColorPicker = document.getElementById('background-color-picker');

backgroundColorPicker.onchange = function () {
    backgroundColorPickerWrapper.style.backgroundColor = backgroundColorPicker.value;
    changeBackgroundColor();
}
backgroundColorPickerWrapper.style.backgroundColor = backgroundColorPicker.value;

//add grid size button and event listener to change the grid when user changes the size
gridSizeInput = document.getElementById('gridSizeInput');
gridSizeInput.onchange = () => {num = gridSizeInput.value;
        etchMachineGrid.removeChild(divsContainer);
        divsContainer = createGrid(num);;
        setInlineCssGrid(divsContainer, num);
        etchMachineGrid.appendChild(divsContainer);
        pixels = document.querySelectorAll('.grid-pixel');
        pixels.forEach(pixel => {pixel.addEventListener('mouseover', () => {colorPixel(pixel);});})
        };