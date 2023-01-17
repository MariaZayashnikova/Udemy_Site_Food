'use strict';

import calc from './modules/calculator';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 20000);

calc();
cards();
form('form', 'modalTimerId');
modal('[data-modal]', '.modal', modalTimerId);
slider({
    sliderPrev: '.offer__slider-prev',
    sliderNext: '.offer__slider-next',
    currNumSlider: '#current',
    total: '#total',
    offerSlide: '.offer__slide',
    slideInner: '.offer_slider-inner',
    slideWrapper: '.offer__slider-wrapper',
    containerSlide: '.offer__slider'
});
tabs('.tabheader__item', '.tabcontent', 'tabheader__item_active');
timer('2020-12-31');