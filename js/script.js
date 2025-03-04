import { inicial } from './data/data.js';
import { generateTableCuota } from './table/cuota.table.js';
import { generateTablecvs } from './table/cvs.table.js';

document.addEventListener('DOMContentLoaded', () => {
  const $data = document.querySelector('#data');
  Object.keys(inicial).forEach((key) => {
    const e = document.createElement('span');
    e.innerHTML =
      `<p class="text">${key}:</p> <p>${inicial[key]}</p>`.replaceAll('_', ' ');
    e.classList.add(key);
    $data.appendChild(e);
  });

  generateTableCuota();
  generateTablecvs();

  document.getElementById('export-pdf').addEventListener('click', function () {
    const element = document.body; // Selecciona todo el cuerpo de la página
    html2pdf().from(element).save('datos_prestamo.pdf');
  });

  document.querySelectorAll('.export-csv').forEach((button) => {
    button.addEventListener('click', function () {
      const tableId = this.getAttribute('data-table');
      const table = document.getElementById(tableId);
      let csv = [];

      // Recorrer filas de la tabla
      for (let i = 0; i < table.rows.length; i++) {
        let row = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
          row.push(table.rows[i].cells[j].innerText);
        }
        csv.push(row.join(','));
      }

      // Crear archivo CSV
      const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${tableId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
  document.querySelectorAll('.export-pdf-table').forEach((button) => {
    button.addEventListener('click', function () {
      const tableId = this.getAttribute('data-table');
      const table = document.getElementById(tableId);
      html2pdf()
        .from(table)
        .set({
          margin: 10,
          filename: `${tableId}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'mm', format: 'a2', orientation: 'landscape' },
        })
        .save();
    });
  });
});
