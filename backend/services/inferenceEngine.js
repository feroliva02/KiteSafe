// CU-01: Evaluación trigonométrica de spot
function calcularSemaforoSpot(dirViento, anguloCosta, vientoMedio, rafagas) {
  let delta = Math.abs(dirViento - anguloCosta) % 360;
  if (delta > 180) delta = 360 - delta;

  // Viento off-shore perpendicular u oblicuo crítico
  if (delta > 105 && delta < 255) {
      return {
          estado: 'ROJO',
          orientacionEtiqueta: 'off-shore',
          aptitud: 'NO NAVEGABLE',
          descripcion: 'Viento mar adentro: riesgo crítico de deriva sin retorno autónomo.',
          despachoPermitido: false
      };
  }

  if (vientoMedio < 12) {
      return {
          estado: 'ROJO',
          orientacionEtiqueta: 'marginal',
          aptitud: 'NO NAVEGABLE',
          descripcion: 'Viento insuficiente para sustentación aerodinámica.',
          despachoPermitido: false
      };
  }

  const difRafaga = rafagas - vientoMedio;
  if (difRafaga >= 8 || vientoMedio >= 23) {
      return {
          estado: 'AMARILLO',
          orientacionEtiqueta: 'side-onshore',
          aptitud: 'PRECAUCIÓN',
          descripcion: 'Ráfagas inestables. Navegación restringida a instructores o avanzados.',
          despachoPermitido: true
      };
  }

  return {
      estado: 'VERDE',
      orientacionEtiqueta: 'side-onshore',
      aptitud: 'NAVEGABLE',
      descripcion: 'Viento estable, orientación segura y visibilidad óptima. Operación habilitada con supervisión estándar.',
      despachoPermitido: true
  };
}

// CU-02: Prescripción de superficie de cometa según peso y viento
function calcularMedidaCometa(pesoKg, vientoMedio, rafagas, nivelTecnico) {
  const factorViento = Math.max(vientoMedio, rafagas * 0.85);
  let areaNominal = (pesoKg * 2.65) / factorViento;

  if (nivelTecnico === 'PRINCIPIANTE') areaNominal *= 0.90;
  if (nivelTecnico === 'AVANZADO') areaNominal *= 1.05;

  const talleMin = Math.floor(areaNominal);
  const talleMax = Math.ceil(areaNominal);

  return {
      medidaExacta: Number(areaNominal.toFixed(1)),
      rangoRecomendado: `${talleMin}m - ${talleMax}m`,
      advertencia: (rafagas - vientoMedio) > 6 ? 'Gradiente inestable: priorizar extremo inferior del rango' : 'Rango seguro verificado'
  };
}

module.exports = { calcularSemaforoSpot, calcularMedidaCometa };