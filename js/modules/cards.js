function cards() {

    class MenuCard {
        constructor(src, alt, subtitle, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = subtitle;
            this.descr = descr;
            this.price = price;
            this.render();
        }

        render() {
            let parent = document.querySelector('.menu__field .container');

            let newCard = document.createElement('div');
            newCard.classList.add('menu__item');

            let newImage = document.createElement('img');
            newImage.src = this.src;
            newImage.alt = this.alt;
            newCard.append(newImage);

            let newTitle = document.createElement('h3');
            newTitle.classList.add('menu__item-subtitle');
            newTitle.textContent = this.title;
            newCard.append(newTitle);

            let newDescr = document.createElement('div');
            newDescr.classList.add('menu__item-descr');
            newDescr.textContent = this.descr;
            newCard.append(newDescr);

            let newDivider = document.createElement('div');
            newDivider.classList.add('menu__item-divider');
            newCard.append(newDivider);

            let newPrice = document.createElement('div');
            newPrice.classList.add('menu__item-price');
            let cost = document.createElement('div');
            cost.classList.add('menu__item-cost');
            cost.textContent = 'Цена:';
            newPrice.append(cost);

            let newPriceTotal = document.createElement('div');
            newPriceTotal.classList.add('menu__item-total');
            newPriceTotal.textContent = ' грн/день';
            let priceText = document.createElement('span');
            priceText.textContent = this.price;
            newPriceTotal.append(priceText);

            newPrice.append(newPriceTotal);

            newCard.append(newPrice);

            parent.append(newCard);
        }
    }

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price);
            });
        })
        .catch(error => {
            throw new Error(error);
        });
}

export default cards;