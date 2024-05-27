function addToBasketHtml(dish, indexOfDish, counterOfDish) {
    return `
    <div class="selected-menu-container" id="basket${indexOfDish}"> 
        <div class="new-price" id="change-counter${indexOfDish}">
            <span>${counterOfDish}x</span>
        </div>

        <div class="selected-dish-width"> 
            <span> ${dish}</span>
        </div>

        <div onclick="increaseSelection(${indexOfDish})" class="plus-border">
            <span>+</span>
        </div>
        <div class="plus-border" onclick="reduceSelection(${indexOfDish})">
            <span>-</span> 
        </div>
        <div class="new-price" > 
            <span id="change-price${indexOfDish}"> ${startPrice[indexOfDish].toFixed(2)} € </span> 
        </div>
        <div class="trash-icon">
            <img onclick="oneClickDelete(${indexOfDish})" src="../img/trash-icon.png" alt="mulleimer">
        </div> 
    </div>
    
    `;
}

function renderMenuHtml(i) {
    return `
    <div class="body-distance select-dish">
        <img onclick="addToBasket(${i}), showDeliveryCosts()" src="../img/plus.png" alt="Hinzufügen Button" >
        <div class="bold"> ${dishes[i]} </div>
        <div> ${describe[i]} </div>
        <div class=" bold main-color"> ${prices[i].toFixed(2)} € </div>
    </div>
    `;
}