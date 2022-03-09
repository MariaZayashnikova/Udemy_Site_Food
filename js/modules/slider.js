function slider ({sliderPrev, sliderNext, currNumSlider, total, offerSlide, slideInner, slideWrapper, containerSlide}) {
 
    let btnPrev = document.querySelector(sliderPrev);
    let btnNext = document.querySelector(sliderNext);
    let currentNumSlider = document.querySelector(currNumSlider);
    let totalNumSlider = document.querySelector(total);
    let sliders = document.querySelectorAll(offerSlide);
    let currentNum = 1;

    //Другое решение для слайдера

    const sliderInner = document.querySelector(slideInner),
        sliderWrapper = document.querySelector(slideWrapper);

    let width = window.getComputedStyle(sliderWrapper).width;
    let offset = 0;

    function addNull (num) {
        if (num < 10){
            num = `0${num}`;
        }

        return num;
    }
    function showCurrentNum () {
        currentNumSlider.textContent = addNull(currentNum);
    }

    function countWidth (width) {
        return  +width.replace(/\D/g, '');
    }

    sliderInner.style.width = 100 * sliders.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';
    totalNumSlider.textContent = addNull(sliders.length);
    showCurrentNum();

    sliders.forEach(slide => {
        slide.style.width = width;
    });

    btnNext.addEventListener('click', () => {
        if(offset == countWidth(width) * (sliders.length -1)){
            offset = 0;
        } else {
            offset += countWidth(width);
        }

        if(currentNum === sliders.length){
            currentNum = 1;
        } else {
            currentNum++;
        }
        showCurrentNum();
        sliderInner.style.transform = `translateX(-${offset}px)`;
        clearActiveStatusPoint(); // из доп задания
        points[currentNum - 1].classList.add('active-point'); // из доп задания
    });

    btnPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = countWidth(width) * (sliders.length -1);
        } else {
            offset -= countWidth(width);
        }

        if(currentNum === 1){
            currentNum = sliders.length;
        } else {
            currentNum--;
        }
        showCurrentNum();
        sliderInner.style.transform = `translateX(-${offset}px)`;
        clearActiveStatusPoint(); // из доп задания
        points[currentNum - 1].classList.add('active-point'); // из доп задания
    });

    // доп задание

    const containerSlides = document.querySelector(containerSlide);
    let points = [];

    containerSlides.classList.add('position-relative');


    function createPoints () {
        let containerPoints = document.createElement('div');
        containerPoints.classList.add('carousel-indicators');
        containerSlides.append(containerPoints);
        for (let i = 0; i < sliders.length; i++){
            let dot = document.createElement('div');
            dot.classList.add('dot');
            if(i == 0) {
                dot.classList.add('active-point');
            }
            containerPoints.append(dot);
            points.push(dot);
        }
    }

    function clearActiveStatusPoint () {
        points.forEach(point => {
            point.classList.remove('active-point');
        });
    }

    createPoints();

    points.forEach((point, i) => {
        point.addEventListener('click', (event) => {
            offset = countWidth(width) * (i);
            currentNum = addNull(i);
            clearActiveStatusPoint();
            currentNum = i + 1;
            sliderInner.style.transform = `translateX(-${offset}px)`;
            event.target.classList.add('active-point');
            showCurrentNum();
        });
    });

    //Простое решение для слайдера
    /* function showSlider (slider) {
        slider.classList.add('tabBlock');
    }

    function hiddenSliders () {
        sliders.forEach(slider => {
            slider.classList.remove('tabBlock');
            slider.classList.add('tabDisabled');
        });
    }

    function addNull (num) {
        if (num < 10){
            num = `0${num}`;
        }

        return num;
    }

    function showCurrentNum () {
        currentNumSlider.textContent = addNull(currentNum);
    }

    hiddenSliders();
    showSlider(sliders[0]);
    showCurrentNum();
    totalNumSlider.textContent = addNull(sliders.length);

    btnPrev.addEventListener('click', () => {
        hiddenSliders();
        
        if(currentNum === 1) {
            showSlider(sliders[sliders.length - 1]);
            currentNum = sliders.length;
            showCurrentNum();
        } else {
            currentNum--;
            showSlider(sliders[currentNum -1]);
            showCurrentNum();
        }
    });

    btnNext.addEventListener('click', () => {
        hiddenSliders();

        if(currentNum === 4) {
            showSlider(sliders[0]);
            currentNum = 1;
            showCurrentNum();
        } else {
            currentNum++;
            showSlider(sliders[currentNum -1]);
            showCurrentNum();
        }
    }); */
}

export default slider;