const idElement = document.getElementById("idProduct");
const numberElement = document.getElementById("number");
const product = [
  {id : 1, name: "Mezcla original 200g", price: 500},
  {id : 2, name: "Mezcla original 500g", price: 900},
  {id : 3, name: "Mezcla especial 200g", price: 700},
  {id : 4, name: "Mezcla especial 500g", price: 1200}
]
let purchases = [];

function add(){

    const id = parseInt(idElement.value);
    const number = parseInt(numberElement.value);

	const productIndexInId = product.findIndex((item) => item.id === id);
    const precio = product[productIndexInId].price;
    const nombre = product[productIndexInId].name;

    const purchase = {
        price: precio,
        number: number,
        name: nombre
    }

    const equalPriceIndex = purchases.findIndex((item) => item.price === precio);
    if(equalPriceIndex !== -1){
        purchases[equalPriceIndex].number += number;
    }
    else purchases.push(purchase);

    alert(crearArrayProducto() + `\n\nSubtotal: ${calcularSubtotal()}`);
}

function asignarCostoProducto (amount)  {
    if (amount == 0 || amount >= 3000) {
        return(0);
    }
    if (amount >= 2000 && amount < 3000) {
        return(250);
    }
    return(500);
}

function calc() {
    let amount =  calcularSubtotal();
    let shippingCost = asignarCostoProducto (amount);
	alert(crearArrayProducto() + `\n\nSubtotal: ${amount}¥ Costo Envio: ${shippingCost}¥ Presio Final: ${amount + shippingCost}¥`);
    purchases = [];
    idElement.value = "";
    numberElement.value = "";
}

function calcularSubtotal (){
    return purchases.reduce((prev, purchase) => {
        return prev + (purchase.price * purchase.number) 
      }, 0);
}
function crearArrayProducto () {
    return purchases.map(purchase => {
        return `${purchase.name} ${purchase.price}¥ para ${purchase.number} item`
    }).join('\n');
}