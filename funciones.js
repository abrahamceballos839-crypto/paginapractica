function mostrarDatos() {
  let texto = "El usuario es: " + document.getElementById("usuario").value + "<br>" +
    "La contraseña es: " + document.getElementById("clave").value + "<br>";
  document.getElementById("mensaje").innerHTML = texto;
}

function obtenerDatosReceptor() {
  const nombre = document.getElementById("nombreRazon").value;
  const rfc = document.getElementById("rfctexto").value;
  const numeroConceptos = parseInt(document.getElementById("nConceptos").value);
  const contenedor = document.getElementById("contenedorConceptos");

  contenedor.innerHTML = ""; // Limpia el contenedor

  // Genera las filas de los conceptos
  if ((numeroConceptos) && numeroConceptos > 0) {
    for (var i = 0; i < numeroConceptos; i++) {
      const row = document.createElement("div");
      row.classList.add("row", "g-3", "align-items-center", "mb-3");

      // ***** CAMBIO AQUÍ: Se usan CLASS en lugar de ID para los inputs repetidos *****
      row.innerHTML = `
        <div class="col-12 col-md-1 text-center">
          <button type="button" class="btn btn-outline-danger btn-sm rounded-circle" onclick="this.closest('.row').remove()">x</button>
        </div>
        <div class="col-6 col-md-2">
          <label class="form-label">Cantidad:</label>
          <input type="number" class="form-control cantidad">
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label">Descripción:</label>
          <input type="text" class="form-control descripcion">
        </div>
        <div class="col-6 col-md-2">
          <label class="form-label">Valor Unitario:</label>
          <input type="number" class="form-control valorUnitario">
        </div>
        <div class="col-6 col-md-2">
          <label class="form-label">Importe:</label>
          <input type="text" class="form-control importe">
        </div>`;

      contenedor.appendChild(row);
    }
  }
}

// Agrega un concepto de forma manual
function agregarConcepto() {
  const contenedor = document.getElementById("contenedorConceptos");
  const row = document.createElement("div");
  row.classList.add("row", "g-3", "align-items-center", "mb-3");

  // ***** CAMBIO AQUÍ: Se usan CLASS en lugar de ID para los inputs repetidos *****
  row.innerHTML = `
    <div class="col-12 col-md-1 text-center">
        <button type="button" class="btn btn-outline-danger btn-sm rounded-circle" onclick="this.closest('.row').remove()">x</button>
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label">Cantidad:</label>
        <input type="number" class="form-control cantidad">
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Descripción:</label>
        <input type="text" class="form-control descripcion">
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label">Valor Unitario:</label>
        <input type="number" class="form-control valorUnitario">
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label">Importe:</label>
        <input type="text" class="form-control importe">
      </div>
    `;
  contenedor.appendChild(row);
}


function obtenerDatosConceptos() {
  // 1. Obtener todas las filas de conceptos
  const filasConceptos = document.querySelectorAll("#contenedorConceptos .row");

  let subtotalGeneral = 0;

  // 2. Recorrer cada fila para calcular su importe y sumarlo al subtotal
  filasConceptos.forEach(fila => {
    // Buscar los inputs dentro de esta fila específica
    const cantidadInput = fila.querySelector(".cantidad");
    const valorUnitarioInput = fila.querySelector(".valorUnitario");
    const importeInput = fila.querySelector(".importe");

    /*
    querySelector: es un método de JavaScript que te permite encontrar y
    seleccionar un elemento (el primero que encuentre) dentro de una página web usando selectores de CSS
    */

    // Obtener valores (usamos || 0 para manejar campos vacíos)
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;

    // Calcular el importe de la fila
    const importeFila = cantidad * valorUnitario;

    // Mostrar el importe en el input de la fila
    importeInput.value = importeFila;

    // Sumar al subtotal general
    subtotalGeneral += importeFila;
  });

  // 3. Calcular IVA y Total (asumiendo 16% de IVA)
  const iva = subtotalGeneral * 0.16;
  const total = subtotalGeneral + iva;

  // 4. Mostrar resultados finales en los spans
  document.getElementById("subtotal").textContent = subtotalGeneral;
  document.getElementById("iva").textContent = iva;
  document.getElementById("total").textContent = total;
}