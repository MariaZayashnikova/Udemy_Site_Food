function calc () {

const calcResult = document.querySelector('.calculating__result span');
let sex, height, weight, age, activity;

function initLocalSettings (selectorForSex, selectorForActivity, classActive) {
    let elementsForSex = document.querySelectorAll(selectorForSex);
    let elementsForActivity = document.querySelectorAll(selectorForActivity);

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
        elementsForSex.forEach(elem => {
            elem. classList.remove(classActive);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(classActive);
            }
        });
    } else {
        sex = 'woman';
        localStorage.setItem('sex', 'woman')
    }

    if(localStorage.getItem('activity')){
        activity = localStorage.getItem('activity');

        elementsForActivity.forEach(elem => {
            elem. classList.remove(classActive);
            if(elem.getAttribute('data-value-activity') === localStorage.getItem('activity')){
                elem.classList.add(classActive);
            }
    });
 } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375);
    }
}

initLocalSettings('#gender div','.calculating__choose_big div', 'calculating__choose-item_active');


function calcCalories () {
    if(!height || !weight || !age) {
        calcResult.textContent = '____';
        return;
    }

    if(sex == 'woman') {
        let res = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        calcResult.textContent = res;
    } else {
        let res = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        calcResult.textContent = res;
    }
}

function getStaticData (selector, classActiv) {
    let elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.addEventListener('click', event => {
            elements.forEach(elem => {
                elem.classList.remove(classActiv);
            });
            
            if(event.target.getAttribute('data-value-activity')){
                activity = +event.target.getAttribute('data-value-activity');
                localStorage.setItem('activity', +event.target.getAttribute('data-value-activity'))
                event.target.classList.add(classActiv);
            } else {
                sex = event.target.getAttribute('id');
                localStorage.setItem('sex', event.target.getAttribute('id'))
                event.target.classList.add(classActiv);
            }
            calcCalories();
        });
    });
}

function getDynamicData () {
    let elements = document.querySelectorAll('.calculating__choose_medium input');

    elements.forEach(element => {
        element.addEventListener('input', event => {
            switch (event.target.getAttribute('id')){
                case 'height':
                    height = +event.target.value;
                    break;
                case 'weight':
                    weight = +event.target.value;
                    break;
                case 'age':
                    age = +event.target.value;
                    break;
            }
            calcCalories();

            if(event.target.value.match(/\D/g)){
                element.style.border = '1.5px solid red';
            } else {
                element.style.border = 'none';
            }
        });
    });
}


getStaticData('#gender div', 'calculating__choose-item_active');
getStaticData('.calculating__choose_big div', 'calculating__choose-item_active');
getDynamicData();
calcCalories();
}

export default calc;