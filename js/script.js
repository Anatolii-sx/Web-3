let sliderLine = document.querySelector('.slider-line');
let position = 0;

// HOME and NEXT button
const homePage = document.querySelector('.slider-global-top-home');
const btnNext = document.querySelector('.slider-line-page1-btn');

let imagesPage2 = document.querySelectorAll('.page2-pictures');

homePage.onclick = () => {
    position = 0;
    sliderLine.style.left = position + 'px';


    // Для удаления анимации с page 2 
    for (let i = 0; i < imagesPage2.length; i++) {
        imagesPage2[i].classList.remove('page2-animation');
    }
}

btnNext.onclick = () => {
    position = -1024;
    sliderLine.style.left = position + 'px';


    // Для добавления анимации на page 2 
    for (let i = 0; i < imagesPage2.length; i++) {
        imagesPage2[i].classList.add('page2-animation');
    }
}

// MOVE SLIDER

function sliderRight() {
    position = position - 1024;

    if (position == -1024) { // For first animation on page 2
        for (let i = 0; i < imagesPage2.length; i++) {
            imagesPage2[i].classList.add('page2-animation');
        }
    }

    else if (position < -2048) {
        position = -2048;
    }
    sliderLine.style.left = position + 'px';
}

function sliderLeft() {
    position = position + 1024;
    if (position > 0) {
        position = 0;
    }
    sliderLine.style.left = position + 'px';
}

// TOUCH

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // most significant
    if (Math.abs(xDiff) > Math.abs(yDiff)) {

        // left swipe
        if (xDiff > 0) {
            sliderRight();

            // right swipe
        } else {
            sliderLeft();
        }
    }

    // reset values
    xDown = null;
    yDown = null;
};


// MODAL WINDOW

document.querySelector('.slider-line-page3-btn').onclick = () => {
    document.querySelector('.modal-wrp').style.display = 'block';
}

document.querySelector('.close-btn').onclick = () => {
    document.querySelector('.modal-wrp').style.display = 'none';
}

// MODAL WINDOW-SLIDER

let sliderBlock = document.querySelectorAll('.modal-window-slider-block');
let sliderCircle = document.querySelectorAll('.modal-window-slider-btn-circle');
let current = 0; //переменная счетчик для добавления/удаления класса

sliderRightModal();
sliderLeftModal();

document.querySelector('.modal-window-slider-btn-right').onclick = sliderRightModal;
document.querySelector('.modal-window-slider-btn-left').onclick = sliderLeftModal;

function sliderRightModal() {

    //Перебор всех переменных массива и удаление класса opacity1

    for (let i = 0; i < sliderBlock.length; i++) {
        sliderBlock[i].classList.remove('opacity1');
        sliderCircle[i].classList.remove('slider-circle-focus');
    }

    //Добавление класса с opacity 1 для одного блока

    current++;
    if (current == sliderBlock.length) {
        current = 0;
    }
    sliderBlock[current].classList.add('opacity1');
    sliderCircle[current].classList.add('slider-circle-focus');
}

function sliderLeftModal() {

    //Перебор всех переменных массива и удаление класса opacity1

    for (let i = 0; i < sliderBlock.length; i++) {
        sliderBlock[i].classList.remove('opacity1');
        sliderCircle[i].classList.remove('slider-circle-focus');
    }

    //Добавление класса с opacity 1 для одного блока

    current--;
    if (current < 0) {
        current = sliderBlock.length - 1;
        sliderBlock[current].classList.add('opacity1');
        sliderCircle[current].classList.add('slider-circle-focus');
    }
    sliderBlock[current].classList.add('opacity1');
    sliderCircle[current].classList.add('slider-circle-focus');

}
