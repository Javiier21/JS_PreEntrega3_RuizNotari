// Variables de costo de productos y servicios
const costoProductoA = 100;
const costoProductoB = 200;
const costoServicioC = 50;

// Función para calcular el costo total
function simularCompra() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const tipoItem = document.getElementById('tipoItem').value;

    // Almacenar la cantidad y tipo de producto seleccionado en localStorage
    localStorage.setItem('cantidad', cantidad);
    localStorage.setItem('tipoItem', tipoItem);

    const productoSeleccionado = getProductDetails(tipoItem);

    if (!productoSeleccionado) {
        alert("Opción inválida.");
        return;
    }

    const resultado = calcularCostoTotal(productoSeleccionado.costo, cantidad);
    const costoTotal = aplicarDescuento(resultado, cantidad);

    // Mostrar el resultado en el DOM
    mostrarResultado(productoSeleccionado, cantidad, costoTotal);
}

// Función para obtener los detalles del producto o servicio
function getProductDetails(tipoItem) {
    const productos = {
        A: { tipo: "Producto A", costo: costoProductoA },
        B: { tipo: "Producto B", costo: costoProductoB },
        C: { tipo: "Servicio C", costo: costoServicioC }
    };
    return productos[tipoItem];
}

// Función para calcular el costo total
function calcularCostoTotal(costoUnitario, cantidad) {
    return costoUnitario * cantidad;
}

// Función para aplicar un descuento si es necesario
function aplicarDescuento(resultado, cantidad) {
    if (cantidad >= 10) {
        return resultado * 0.9; // Aplicar un descuento del 10% para más de 10 unidades
    }
    return resultado;
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(producto, cantidad, costoTotal) {
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <div class="mt-3">
            <strong>Detalle de la compra:</strong><br>
            Tipo: ${producto.tipo}<br>
            Cantidad: ${cantidad}<br>
            Costo unitario: $${producto.costo}<br>
            Costo total: $${calcularCostoTotal(producto.costo, cantidad).toFixed(2)}<br>
            Costo total con descuento (si aplica): $${costoTotal.toFixed(2)}
        </div>
    `;
}

// Al cargar la página, restaurar la cantidad y tipo seleccionados desde localStorage
window.addEventListener('load', () => {
    const cantidadGuardada = localStorage.getItem('cantidad');
    const tipoItemGuardado = localStorage.getItem('tipoItem');
    
    if (cantidadGuardada && tipoItemGuardado) {
        document.getElementById('cantidad').value = cantidadGuardada;
        document.getElementById('tipoItem').value = tipoItemGuardado;
    }
});

// Agregar evento al botón de calcular
document.getElementById('calcularBtn').addEventListener('click', simularCompra);
