const precioPorTicket = 200;

const buyForm = document.querySelector('#buyForm');
buyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cantidad = e.target.querySelector('#ticketsQuantity').value;
    const categoria = e.target.querySelector('#selectedCategory').value;

    let descuento = 0;
    switch (categoria) {
        case 'Estudiante':
            descuento = precioPorTicket * 0.8 * cantidad;
            break;
        case 'Trainee':
            descuento = precioPorTicket * 0.5 * cantidad;
            break;
        case 'Junior':
            descuento = precioPorTicket * 0.15 * cantidad;
            break;
    }
    // payMount
    const total = cantidad * precioPorTicket - descuento;

    const cartelPrecio = document.querySelector('#payMount');
    cartelPrecio.innerText = `Total a Pagar: $${total} (¡$${descuento} de descuento por ser ${categoria}!)`;
})