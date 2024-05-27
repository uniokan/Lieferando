let dishes = ['Cheeserburger', 'Hamburger', 'Nudeln', 'Gemischter Salat(klein)', 'Pasta alla Chef (pikant)', 'Pasta Napoli', 'Pasta Carbonara', 'Pizza Thunfisch', 'Coca Cola 0,33l', 'Halbe Kokosnuss'];
let prices = [9.95, 8.50, 11.50, 4.95, 10.50, 10.50, 11.95, 9.95, 2.50, 4.90];
let describe = ['mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup', 'mit 100g saftigem Rindfleischpatty, Gurken, Hamburgersauce und Ketchup',
    'mit Tomaten-Sahnesauce, Käse und Mozzarella', 'mit Salat, Karotten, Mais, Tomaten und Gurken, ohne Panini', 'mit Salami, Champigons, Peperoni und pikanter Napolisauce',
    'mit Tomatensauce', 'mit Sahnesauce, Putenschinken und Ei', 'mit Thunfisch, Tomatensauce und Zwiebeln',
    'Coca Cola steht für einzigartigen Geschmak, Erfrischung und Momente voller Lebensfreude', 'mit Kokos-Eis'];

let dishesNotClicked = [true, true, true, true, true, true, true, true, true, true];

let startPrice = [9.95, 8.50, 11.50, 4.95, 10.50, 10.50, 11.95, 9.95, 2.50, 4.90];
let counterOfDish = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let dishNotClicked;

let sum = 0;
let sumOfCounter = 0;


//////////////////// Start/////////////////////////////

function renderMenuOnPosition(x) {
    let content = document.getElementById('select-dish-container');
    content.innerHTML = '';

    content.innerHTML += renderMenuHtml(x);
    renderBasketHtml();
}

function renderMenu() {
    let content = document.getElementById('select-dish-container');
    content.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {

        content.innerHTML += renderMenuHtml(i);
    }
    renderBasketHtml();
}

function addToBasket(indexOfDish) {
    let dishField = document.getElementById('selected-dish');
    let dish = dishes[indexOfDish];
    dishNotClicked = dishesNotClicked[indexOfDish];

    if (dishNotClicked) {
        isNotClicked(dish, dishField, indexOfDish)
    }
    else {
        increaseSelection(indexOfDish);
    }

    dishesNotClicked[indexOfDish] = false;
    getSumOfCounter();
    setToLocalStorage();
    setPriceToBasket();
    changeColorOfBasketBtn();
}

function changeColorOfBasketBtn(){
    let getBasket = document.getElementById('open-basket-responsive');
    getBasket.classList.add('basket-animation');

    getBasket.addEventListener('animationend', function() {
        getBasket.classList.remove('basket-animation');
    });
}

function isNotClicked(dish, dishField, indexOfDish) {
    let currentCount = counterOfDish[indexOfDish];
    currentCount++;
    counterOfDish[indexOfDish] = currentCount;
    dishField.innerHTML += addToBasketHtml(dish, indexOfDish, currentCount);
    addToSubtotal(indexOfDish);
}

function getSumOfCounter() {
    sumOfCounter = 0;

    for (let i = 0; i < counterOfDish.length; i++) {
        sumOfCounter += counterOfDish[i];
        setToLocalStorage();
    }
}

function renderBasketHtml() {
    loadFromLocalStorage();
    let dishField = document.getElementById('selected-dish');
    let totalSum = document.getElementById('total-sum');
    let subtotal = document.getElementById('subtotal');
    getSumOfCounter();

    for (let i = 0; i < counterOfDish.length; i++) {
        if (counterOfDish[i] > 0) {
            dishField.innerHTML += addToBasketHtml(dishes[i], i, counterOfDish[i]);
        }
    }
    basketHtmlCheckDeliveryCosts(totalSum, subtotal, sumOfCounter);

}

function basketHtmlCheckDeliveryCosts(totalSum, subtotal, sumOfCounter) {
    let totalCost = sum + 4.95;

    if (sumOfCounter > 0) {
        subtotal.innerHTML = sum.toFixed(2) + '€';
        showDeliveryCosts();
        totalSum.innerHTML = totalCost.toFixed(2) + '€';
    }
    else {
        closeDeliveryCosts();
        sum = 0;
    }
}

function addToSubtotal(indexOfDish) {
    let price = prices[indexOfDish];
    let subtotal = document.getElementById('subtotal');
    sum = sum + price;

    subtotal.innerHTML = sum.toFixed(2) + '€';
    totalSum(sum);
}

function totalSum(subtotal) {
    let totalSum = document.getElementById('total-sum');
    subtotal += 4.95;
    totalSum.innerHTML = subtotal.toFixed(2) + '€';
    setToLocalStorage();
}

function increaseSelection(index) {
    let currentCount = counterOfDish[index];
    currentCount++;
    counterOfDish[index] = currentCount;
    startPrice[index] += prices[index];
    let changePrice = document.getElementById(`change-price${index}`)
    changePrice.innerHTML = startPrice[index].toFixed(2) + '€';

    let newSubtotal = sum + prices[index];
    sum = newSubtotal;
    let subtotal = document.getElementById('subtotal');
    subtotal.innerHTML = newSubtotal.toFixed(2) + '€';
    totalSum(newSubtotal);
    showCounter(index);
    setPriceToBasket();
}

function reduceSelection(index) {
    let currentCount = counterOfDish[index];
    currentCount--;
    sumOfCounter--;
    counterOfDish[index] = currentCount;

    if (currentCount > 0) {
        changePrice(index);
    }
    else {
        let newSubtotal = reducedFinalSum(index);
        totalSum(newSubtotal);
        deleteBasket(index);
    }
    setPriceToBasket();
}

function changePrice(index) {
    startPrice[index] -= prices[index];
    let changePrice = document.getElementById(`change-price${index}`)

    changePrice.innerHTML = startPrice[index].toFixed(2) + '€';

    let newSubtotal = reducedFinalSum(index);

    totalSum(newSubtotal);
    showCounter(index);
}

function reducedFinalSum(index) {
    let newSubtotal = sum - prices[index];
    sum = newSubtotal;
    let subtotal = document.getElementById('subtotal');
    subtotal.innerHTML = newSubtotal.toFixed(2) + '€';

    return newSubtotal;

}

function deleteBasket(index) {
    let basketField = document.getElementById(`basket${index}`);
    basketField.remove();
    dishesNotClicked[index] = true;

    if (sumOfCounter <= 0) {
        closeDeliveryCosts();
    }
    setToLocalStorage();
}

function showCounter(index) {
    let counterField = document.getElementById(`change-counter${index}`);
    counterField.innerHTML = `${counterOfDish[index]}x`;

}

function showDeliveryCosts() {
    let describe = document.getElementById('delivery-costs');
    let price = document.getElementById('delivery-costs-price');

    describe.classList.remove('d-none');
    price.classList.remove('d-none');
}

function closeDeliveryCosts() {
    let describe = document.getElementById('delivery-costs');
    let price = document.getElementById('delivery-costs-price');
    let totalSum = document.getElementById('total-sum');

    describe.classList.add('d-none');
    price.classList.add('d-none');
    totalSum.innerHTML = sum.toFixed(2) + '€';
}

function oneClickDelete(index) {
    let getCurrentSumOfDish = document.getElementById(`change-price${index}`).innerHTML;
    let integerValue = parseFloat(getCurrentSumOfDish);

    sum -= integerValue;
    sum += prices[index];
    startPrice[index] = prices[index];
    sumOfCounter -= counterOfDish[index];
    counterOfDish[index] = 0;
    let newSubtotal = reducedFinalSum(index);
    totalSum(newSubtotal);
    deleteBasket(index);
    setPriceToBasket();
    setToLocalStorage();
}

function openOtherDishesInMenu() {
    let menuDishes = document.getElementById('slide-container');

    menuDishes.classList.remove('move-menu-left');
    menuDishes.classList.add('move-menu-right');
}

function closeOtherDishesInMenu() {
    let menuDishes = document.getElementById('slide-container');

    menuDishes.classList.remove('move-menu-right');
    menuDishes.classList.add('move-menu-left');
}

function openBasketResponsive() {
    let basket = document.getElementById('main-content-right');
    let body = document.getElementById('body');
    let footer = document.getElementsByTagName('footer')[0];
    let header = document.getElementsByTagName('header')[0];
    let mainContenRight = document.getElementById('main-content-right');
    let basketBtn = document.getElementById('basket-btn-container');

    basket.style.display = 'block';
    body.style.overflow = 'hidden';
    footer.style.display = 'none';
    header.style.display = 'none';
    mainContenRight.style.marginTop = '0';
    basketBtn.style.display = 'none';
}

function closeBasketResponsive() {
    let basket = document.getElementById('main-content-right');
    let body = document.getElementById('body');
    let footer = document.getElementsByTagName('footer')[0];
    let header = document.getElementsByTagName('header')[0];
    let mainContenRight = document.getElementById('main-content-right');
    let basketBtn = document.getElementById('basket-btn-container');

    basket.style.display = 'none';
    body.style.overflow = 'unset';
    footer.style.display = 'flex';
    header.style.display = 'flex';
    mainContenRight.style.marginTop = '69px';
    basketBtn.style.display = 'flex';
}

function minimumOrderValueCheck() {
    if (sum+4.95 >= 25) {
        alert('Die Bestellung war erfolgerlich! Vielen Danke für Ihre Bestellung!');

        for (let i = 0; i < counterOfDish.length; i++)
            if (counterOfDish[i] > 0) {
                oneClickDelete(i);
            }
    }
    else {
        alert('Sie haben den Mindestbestelltwert noch nicht erreicht!');
    }
}

function setPriceToBasket() {
    let priceToBasket = document.getElementById('price-basket');
    let deliveryPrice = 4.95;
    let total = deliveryPrice + sum;

    if (sumOfCounter > 0) {
        priceToBasket.innerHTML = total.toFixed(2) + ' €';
    }
    else {
        priceToBasket.innerHTML = sum.toFixed(2) + ' €';
    }
}

