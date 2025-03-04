export function getCoeficiente(fecha, cvs) {
  const [dia, mes, anio] = fecha.split('/');
  const m = `${mes}-${anio.slice(-2)}`;
  const cv = cvs.find((cv) => cv.mes == m);
  return cv ? cv.coeficiente : 1;
}
export function toN(valor) {
  return parseFloat(valor.replace(/\./g, '').replace(',', '.'));
}

export function formatPesos(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value);
}
