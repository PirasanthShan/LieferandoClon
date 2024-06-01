// LieferandoClon start//
// Arrays //
let basket_foods = [];
let basket_prices = [];
let basket_amount = [];

let foods = ['Chicken Burger','Parko Chicken Burger','Hamburger Classic', 'Pizza Chicken Hollandaise [Ø 32cm]','Pizza Käseauflauf [Ø 32cm]',
            'Pizza Diavolo (scharf)', 'Chicken Salat', 'Avocado Salat', 'Salat Vitalian']
let prices = [9.5, 12.8, 8.9, 7.8, 13.7, 11.5, 7.87, 9.55, 6.75];
let amounts = [1,1,1,1,1,1,1,1,1]                                            
let descriptions = ['mit frischen Zwiebeln, frischen Tomaten, sauren Gurken, Salat und hausgemachter Sauce', 'mit Salat, Zwiebeln uns Sauce',
                    'mit Cheddar, Röstzwiebeln, sauren Gurken und Salat', 'mit Sauce Hollandaise, Hähnchenbrust, Paprika, Mais und Broccoli',
                    'mit Truthahnschinken, Rindersalami und Pilzen','mit scharfer Rindersalami, Jalapenos und Rucola','mit Dönerfleisch', 'Marzipan Dressing', 'Thunfisch und Fleischsalat']    

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function closeFullSize(){
  let close = document.querySelector('#WarenkorbContainer')
     
  close.addEventListener('click' ,(e) => {
  if(e.target == close){
     document.querySelector('#FullSize').classList.add('d-none')
   }
   });
}
 
function remove(){
   document.querySelector('#FullSize').classList.remove('d-none')
}

window.onscroll = function(){
  let shoppingCart = document.getElementById('right');
  let menuBar = document.getElementById('menubar')
  if(window.scrollY > 0){
     menuBar.style = 'top: 0' 
     shoppingCart.style = 'top: 0px';
     } else {
      shoppingCart.style = 'top: 100px';
      menuBar.style = 'top: 0px'
    }
}

//Function to Show the Menu on the Left//
function showMenu(){
  let burger = document.getElementById('menuCard');
      burger.innerHTML = '';
      for(let i = 0; i < 3; i++){
          burger.innerHTML += renderMenu(i);
    }
    
  let pizza = document.getElementById('menuCard2');
      pizza.innerHTML = '';
      for(let i = 3; i < 6; i++){
          pizza.innerHTML += renderMenu(i);
    }
    
  let salat = document.getElementById('menuCard3');
      salat.innerHTML = '';
      for(let i = 6; i < 9; i++){
         salat.innerHTML += renderMenu(i);
  }
}

//Function to render the Basket on the right//
function renderBasket(){
  let basket = document.getElementById('addBasket');
  let total = document.getElementById('totalcost1');
  let goodsbasket = document.getElementById('bestellContainer')
  let totalbasket= document.getElementById('totalcost');
  total.innerHTML = ``;
  basket.innerHTML = ``;
  goodsbasket.innerHTML = ``;
  totalbasket.innerHTML = ``;
  if(basket_foods.length == 0){
    basket.innerHTML = renderEmptyBasket();
    goodsbasket.innerHTML = renderEmptyBasket();
    } else if(basket_foods.length > 0){
      for(let i = 0; i < basket_foods.length; i++) {
      basket.innerHTML += renderFullBasket(i);
      goodsbasket.innerHTML += renderBestellContainer(i)
      total.innerHTML = renderTotalCost(i);
      totalbasket.innerHTML = renderTotalCost1(i);
      } 
  } 
  closeFullSize();
  remove();
  Totalcalc();
}

//Function to add One and 
function addtoBasket(i){
  let index = basket_foods.indexOf(foods[i]);
  if(index == -1){
  basket_foods.push(foods[i])
  basket_prices.push(prices[i])
  basket_amount.push(amounts[i]); 
  } else if(basket_amount[index] < 10 ){
   basket_amount[index]++
  } else if(basket_amount[index] == 10){
    alert('MAX: 10. Dont waste Food!')
  }
   renderBasket() 
 }

function removeAllBasket(i){
  basket_amount.splice(i, 1);
  basket_foods.splice(i, 1);
  basket_prices.splice(i, 1);
  renderBasket();
}

function addOne(i){
if(basket_amount[i] < 10){
   basket_amount[i]++;}
 else if(basket_amount[i] == 10){
  alert('MAX: 10. Dont waste Food!')
 }
 renderBasket();

}

function removeOne(i){
if(basket_amount[i] <= 1){
  removeAllBasket(i);
  } else{
  basket_amount[i]--;
  }
  renderBasket();
 }

function Totalcalc() {
let sum = 0;
  
  for (i = 0; i < basket_prices.length; i++) {
      sum += basket_prices[i] * basket_amount[i];
      const total = document.getElementById('total');
      const allcost = document.getElementById('allCost');
      const totalContainer = document.getElementById('totalContainer');
      const allCostContainer = document.getElementById('allCostContainer');
  
      total.innerHTML = `${sum.toFixed(2)}€`;
      allcost.innerHTML = `${sum.toFixed(2)}€`;
      totalContainer.innerHTML = `${sum.toFixed(2)}€`;
      allCostContainer.innerHTML = `${sum.toFixed(2)}€`;}
}

function OrderFake(){
  alert('Diese Seite dient nur Zum Testen.')
}

function renderMenu(i){
    const food = foods[i];
    const price = prices[i];
    const description = descriptions[i]; 
    return  `
            <div class="menu">
            <div class="menuContainer2">
            <div class="menuContainer3">
            <h1>${food}</h1>
            <img src="./logo/info.webp" alt="">
            </div>
            <p>${description}</p>
            <h1>${price.toFixed(2)}€</h1>
            </div>
            <img class="plus" onclick="addtoBasket(${i})" src="./logo/plus.webp" alt="">
           </div>`
  }

function renderEmptyBasket(){
    return `<div id="Fill-Warenkorb" class="fillWarenkorb">
            <img src="./logo/shopingcart.webp" alt="">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
            </div>`
    
  }

function renderFullBasket(i){
    const basketFood = basket_foods[i];
    const basketPrice = basket_prices[i];
    const basketAmount = basket_amount[i];
    return `<div class="addBasket">
             <div class="addBasket2">
             <span class="nameofFood">${basketFood}</span>
             </div>
             <span id="price">${(basketPrice * basketAmount).toFixed(2)}€</span>
             <img onclick="removeAllBasket(${i})" src="./logo/delete.webp" alt="">
             </div>
             <div class="addBasket3">
             <p1>Anmerkung Hinzufügen</p1>
             <div class="addBasket4">
             <img onclick="removeOne(${i})" src="./logo/minus.webp" alt="">
             <span>${basketAmount}</span>
             <img onclick="addOne(${i})" src="./logo/plus.webp" alt="">
             </div>
             </div>
             <hr>
            </div>`
  }

function renderTotalCost(){
    return `<div class="totalcost">
              <div>
              <span>Zwischensumme</span>
              <span id="total"></span>
            </div>
            <div>
              <span>Lieferkosten</span>
              <span>Kostenlos</span>
            </div>
            <div>
              <span class="total">Gesamt</span>
              <span class="total" id="allCost"></span>
            </div>
              <Button onclick="OrderFake()" class="button-78" id="bezahlen">Bezahlen</Button>
            </div>
          </div> `
  }

  function renderTotalCost1(){
    return `<div class="totalcost">
               <div>
               <span>Zwischensumme</span>
               <span id="totalContainer"></span>
            </div>
             <div>
               <span>Lieferkosten</span>
               <span>Kostenlos</span>
             </div>
             <div>
               <span class="total">Gesamt</span>
               <span class="total" id="allCostContainer"></span>
             </div>
               <Button onclick="OrderFake()" class="button-78">Bezahlen</Button>
             </div>
           </div> `
   }

  function renderBestellContainer(i){
    const basketFood = basket_foods[i];
    const basketPrice = basket_prices[i];
    const basketAmount = basket_amount[i];
    return`<div class="bestellContainer">
             <div class="bestellContainer1">
             <span class="nameofFood2">${basketFood}</span>
             <span class="nameofFood2">${(basketPrice * basketAmount).toFixed(2)}€</span>
             <img onclick="removeAllBasket(${i})" src="./logo/delete.webp" alt="">
             </div>
             <div class="bestellContainer2"> 
             <div>
             <a href="">Anmerkung Hinzufügen</a>
             </div>
             <div class="bestellContainer3">
             <img onclick="removeOne(${i})" src="./logo/minus.webp" alt="">
             <span>${basketAmount}</span>
             <img onclick="addOne(${i})" src="./logo/plus.webp" alt="">
             </div>
             </div>
          </div>`
  }

  