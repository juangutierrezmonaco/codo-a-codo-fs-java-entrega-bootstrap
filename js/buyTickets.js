const precioPorTicket = 200;
const buyForm = document.querySelector('#buyForm');
let formData = {};

// Eventos de categorías
const categorias = document.querySelectorAll('.categoria');
for (const categoria of categorias) {
    categoria.addEventListener('click', (e) => {
        let selectedCategory = e.target;

        // Si tiene un id, estoy en una categoría. Sino estoy haciendo click en alguno de sus hijos, por lo cual selecciono el padre
        if (!e.target.id) {
            selectedCategory = selectedCategory.parentElement;
        }

        // Primero remuevo el que estaba activo de antes, si es que había uno activo
        const previousSelected = document.querySelector('.categoria-selected');
        previousSelected && previousSelected.classList.remove('categoria-selected');

        // Luego le agrego estilos al seleccionado
        selectedCategory.classList.add('categoria-selected');

        // Completo el select del form y remuevo el estilo de inválido si era inválido
        const selectForm = buyForm.querySelector('#selectedCategory');
        const selectedValue = selectedCategory.querySelector('.categoria-titulo').innerText;
        selectForm.value = selectedValue;

        selectForm.classList.contains('is-invalid') && selectForm.classList.remove('is-invalid');

        // Por último almaceno el valor del select
        formData = { ...formData, [selectForm.name]: selectedValue };
    })
}

// Eventos de los input y validaciones
const inputs = document.querySelectorAll('#buyForm .form-control, #buyForm .form-select');
let mensaje = '';
for (const input of inputs) {
    input.addEventListener("invalid", (e) => {
        e.preventDefault();

        // Estilos de los input
        e.target.classList.add('is-invalid');

        // Mensaje para el usuario
        mensaje += '<li>' + (e.target.placeholder || 'Categoría') + '</li>';
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            title: 'Le faltan completar los siguientes campos:',
            html: '<pre>' + mensaje + '</pre>',
            width: 'fit-content',
        })
    })

    input.addEventListener("input", (e) => {
        const inputForm = e.target;
        inputForm.classList.remove('is-invalid');
        mensaje = '';
        
        const inputFormValue = inputForm.value;
        formData = { ...formData, [inputForm.placeholder || 'Categoría']: inputFormValue };
    })
}

// Limpio el mensaje por si el usuario hace click en el botón de submit más de 1 vez consecutiva
const buyFormBtn = document.querySelector('#buyFormBtn');
buyFormBtn.addEventListener('click', () => {
    mensaje = '';
})

// Eventos del submit
const createRandomNumber = () => {
    return Math.floor(Math.random() * 9);
}

buyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    mensaje = 'Le faltan completar los siguientes campos:\n\n'
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

    const total = cantidad * precioPorTicket - descuento;

    const cartelPrecio = buyForm.querySelector('#payMount');
    cartelPrecio.innerText = `Total a Pagar: $${total} (¡$${descuento} de descuento por ser ${categoria}!)`;

    // Por último muestro la información en un alert
    let mensajeFinal = `
        <h3>Ticket Nro. ${createRandomNumber()}</h3>
        <hr/>
        <ul class='text-start'>
    `;

    for (const key in formData) {
        mensajeFinal += `
            <li>${key}: ${formData[key]}</li>
        `
    }

    mensajeFinal += `
        </ul>
        <hr/>
        <div class='text-start'>
            <p>Total: $${cantidad * precioPorTicket}</p>
            <p>Descuento: $${descuento}</p>
            <p class='text-uppercase fs-5 fw-bold text-decoration-underline'>Total con descuento: $${total}</p>
        </div>
    `;

    Swal.fire({
        html: mensajeFinal,
        width: 'fit-content',
        showCancelButton: true,
        confirmButtonText: '¡Comprar tickets!',
        cancelButtonText: "Quedarme aquí",
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-success mx-3 mt-3',
            cancelButton: 'btn btn-warning mx-3 mt-3'
        }
    }).then(({ isConfirmed }) => {
        if (isConfirmed) {
            // Muestro mensaje y limpio el form
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra!',
                confirmButtonText: 'Volver',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-success mx-3 mt-3',
                }
            })

            buyForm.reset();
        }
    })
})

buyForm.addEventListener('reset', () => {
    buyForm.querySelector('#payMount').innerText = 'Total a Pagar: $';
})