import { cvs, inicial } from '../data/index.js';

export function generateTablecvs() {
  const tablcvs = document.querySelector('#tablaCVS');
  const tableHeadcvs = tablcvs.querySelector('thead');
  const tableBodycvs = tablcvs.querySelector('tbody');

  const datosTransformados = {};

  cvs.forEach((cv) => {
    const [mes, anio] = cv.mes.split('-'); // Separar mes y año
    const anioCompleto = `20${anio}`; // Convertir "23" a "2023"

    if (!datosTransformados[anioCompleto]) {
      datosTransformados[anioCompleto] = {}; // Inicializar el año si no existe
    }

    datosTransformados[anioCompleto][mes] = cv.coeficiente; // Asignar coeficiente al mes
  });
  const nombresMeses = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  const meses = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]; // Números de los meses
  const años = Object.keys(datosTransformados).sort(); // Obtener los años y ordenarlos

  // Extraer mes y año de inicio_cuota
  const [mesInicio, anioInicio] = inicial.inicio_cuota.split('-');
  const anioCompletoInicio = `20${anioInicio}`;

  // Crear la fila de encabezados (meses)
  const headRow2 = document.createElement('tr');
  headRow2.innerHTML = '<th>Año</th>'; // Primera columna para el año
  meses.forEach((mes, index) => {
    const th = document.createElement('th');
    th.textContent = nombresMeses[index]; // Usar el nombre abreviado del mes
    headRow2.appendChild(th);
  });
  tableHeadcvs.innerHTML = '';
  tableHeadcvs.appendChild(headRow2);

  // Crear las filas de años y coeficientes
  tableBodycvs.innerHTML = ''; // Limpiar el cuerpo de la tabla
  años.forEach((año) => {
    const row = document.createElement('tr');
    const tdAño = document.createElement('td');
    tdAño.textContent = año;
    row.appendChild(tdAño);

    meses.forEach((mes) => {
      const td = document.createElement('td');
      td.textContent = datosTransformados[año][mes] || '-'; // Mostrar coeficiente o guion si no existe

      // Verificar si es la celda de inicio_cuota
      if (año === anioCompletoInicio && mes === mesInicio) {
        td.classList.add('start'); // Agregar la clase "start"
      }

      row.appendChild(td);
    });

    tableBodycvs.appendChild(row);
  });
}
