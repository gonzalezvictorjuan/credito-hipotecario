import { data_3_25, inicial, cvs } from '../data/index.js';
import { formatPesos, getCoeficiente, toN } from '../utils.js';

export function generateTableCuota() {
  const table = document.querySelector('#tablaCuotas');
  const tableHead = table.querySelector('thead');
  const tableBody = table.querySelector('tbody');

  // Definir las columnas
  const columnas = [
    'Número',
    'Estado',
    'Vencimiento',
    'Cuota Pura',
    'Saldo Pagado',
    'coeficiente',
    '-',
    `Saldo Adeudado / ${inicial.cuotas}`,
    `Cuota Pura * ${inicial.cuotas}`,
  ];

  // Crear el encabezado de la tabla dinámicamente
  const headRow = document.createElement('tr');
  columnas.forEach((columna) => {
    const th = document.createElement('th');
    th.textContent = columna;
    headRow.appendChild(th);
  });
  tableHead.innerHTML = ''; // Limpiar encabezado anterior si existe
  tableHead.appendChild(headRow);

  // Llenar la tabla con datos dinámicamente
  let saldo = 0;
  let deuda = inicial.prestamo;
  tableBody.innerHTML = ''; // Limpiar filas previas

  const cuotasOrdenadas = data_3_25.cuotas
    .slice()
    .sort((a, b) => Number(a.id) - Number(b.id));

  cuotasOrdenadas.forEach((cuota) => {
    const row = document.createElement('tr');
    const cP = toN(cuota.cuotaPura);
    const coeficiente = getCoeficiente(cuota.vencimiento, cvs);
    const cA = deuda * coeficiente;
    const sA = deuda * coeficiente - saldo;
    const sA360 = sA / inicial.cuotas;
    const cP360 = cP * inicial.cuotas;
    row.innerHTML = `
        <td>${cuota.numero}</td>
        <td>${cuota.estado}</td>
        <td>${cuota.vencimiento}</td>
        <td>${formatPesos(cP)}</td>
				<td>${formatPesos(saldo)}</td>
				<td>${coeficiente}</td>
				<td>
					<p title="Capital ajustado: deuda * cvs">Capital ajustado: ${formatPesos(
            cA
          )}</p>
					<p title="Saldo adeudado = Capital ajustado - Saldo pagado">Saldo adeudado: ${formatPesos(
            sA
          )}</p>
				</td>
				<td>${formatPesos(sA360)}</td>
				<td>${formatPesos(cP360)}</td>
    `;
    saldo += cP;
    tableBody.appendChild(row);
  });
}
