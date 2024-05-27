function setToLocalStorage() {
    let priceArray = JSON.stringify(prices);
    let startPriceArray = JSON.stringify(startPrice);
    let notClicked = JSON.stringify(dishesNotClicked);
    let sumOfAll = JSON.stringify(sum);
    let counterOfDishAsText = JSON.stringify(counterOfDish);
    let sumOfCounterAsText = JSON.stringify(sumOfCounter);

    localStorage.setItem('price', priceArray);
    localStorage.setItem('clicked', notClicked);
    localStorage.setItem('startprice', startPriceArray);
    localStorage.setItem('sumOfAll', sumOfAll);
    localStorage.setItem('counterOfDish', counterOfDishAsText);
    localStorage.setItem('sumOfCounter', sumOfCounterAsText);

}

function loadFromLocalStorage() {
    let priceArray = localStorage.getItem('price');
    let notClicked = localStorage.getItem('clicked');
    let startPriceArray = localStorage.getItem('startprice');
    let sumOfAll = localStorage.getItem('sumOfAll');
    let counterOfDishAsText = localStorage.getItem('counterOfDish');
    let sumOfCounterAsText = localStorage.getItem('sumOfCounter');

    if (priceArray && notClicked && startPriceArray && sumOfAll && counterOfDishAsText && sumOfCounterAsText) {
        prices = JSON.parse(priceArray);
        dishesNotClicked = JSON.parse(notClicked);
        startPrice = JSON.parse(startPriceArray);
        sum = JSON.parse(sumOfAll);
        counterOfDish = JSON.parse(counterOfDishAsText);
        sumOfCounter = JSON.parse(sumOfCounterAsText);
    }
}
