const express = require('express');
const cors = require('cors');
const { calcularSemaforoSpot, calcularMedidaCometa } = require('./services/inferenceEngine');

const app = express();
app.use(cors());
app.use(express.json());

// Estado en memoria representativo de la base de datos (según Demo y Figma)
let DB_MEMORY = {
    spot: {
        id: 1,
        nombre: 'Tarifa Kite Club',
        fecha: '28 sep 2026',
        turno: 'Turno mañana',
        estacion: 'Estación TS-04 - Costa',
        ultimaActualizacion: '10:42',
        vientoMedio: 18,
        rafagas: 22,
        direccionGrados: 245,
        orientacion: 'side-onshore',
        marea: '1,2 m subiendo',
        alumnosActivos: 6,
        alumnosCapacidad: 12,
        equipoRescate: 'Disponible',
        zonaSalida: 'Despejada',
        canalVHF: '72'
    },
    alumnos: [
        { id: 1, nombre: 'Mateo Sánchez', pesoKg: 72, nivel: 'Intermedio', clase: '11:00 - 12:30' }
    ],
    inventario: [
        { id: 1, serie: 'Duotone Rebel 9m', tipo: 'COMETA', horasAcumuladas: 103.5, umbral: 250, estado: 'DISPONIBLE' },
        { id: 2, serie: 'North Reach 10m', tipo: 'COMETA', horasAcumuladas: 45.0, umbral: 250, estado: 'DISPONIBLE' },
        { id: 3, serie: 'Trust Bar M/L', tipo: 'BARRA_LINEAS', horasAcumuladas: 94.5, umbral: 100, estado: 'DISPONIBLE' },
        { id: 4, serie: 'Líneas - Set 24 m', tipo: 'BARRA_LINEAS', horasAcumuladas: 98.5, umbral: 100, estado: 'DISPONIBLE' }
    ],
    sesionActiva: {
        id: 'ASG-2948',
        instructor: 'Lucía Martín',
        alumnoId: 1,
        estado: 'BORRADOR',
        cometaId: 1,
        barraId: 3,
        lineasId: 4,
        duracionMinutos: 90
    }
};

// 1. Endpoint CU-01: Tablero de Navegabilidad
app.get('/api/spot/status', (req, res) => {
    const s = DB_MEMORY.spot;
    const evaluacion = calcularSemaforoSpot(s.direccionGrados, 245, s.vientoMedio, s.rafagas);
    res.json({ spot: s, evaluacion });
});

// 2. Endpoint CU-02: Cálculo Paramétrico de Vela
app.post('/api/calculate-kite', (req, res) => {
    const { pesoKg, vientoMedio, rafagas, nivel } = req.body;
    const resultado = calcularMedidaCometa(
        Number(pesoKg), 
        Number(vientoMedio || DB_MEMORY.spot.vientoMedio), 
        Number(rafagas || DB_MEMORY.spot.rafagas), 
        nivel
    );
    res.json(resultado);
});

// 3. Endpoint CU-03: Despachar material
app.post('/api/sessions/dispatch', (req, res) => {
    const { alumnoId, cometaId, barraId, lineasId } = req.body;
    DB_MEMORY.sesionActiva = {
        ...DB_MEMORY.sesionActiva,
        alumnoId,
        cometaId,
        barraId,
        lineasId,
        estado: 'EN_NAVEGACION',
        inicio: '11:02'
    };
    res.json({ mensaje: 'Sesión despachada exitosamente', sesion: DB_MEMORY.sesionActiva });
});

// 4. Endpoint CU-04, CU-06, CU-07: Cierre de Sesión y Bloqueo de Fatiga
app.post('/api/sessions/close', (req, res) => {
    const { duracionMinutos, observaciones } = req.body;
    const duracion = Number(duracionMinutos || 90);
    const horasImputadas = duracion / 60; // 90 min = 1.5 hs

    const reporteFatiga = DB_MEMORY.inventario.map(item => {
        // Imputar horas a los componentes que participaron
        if ([DB_MEMORY.sesionActiva.cometaId, DB_MEMORY.sesionActiva.barraId, DB_MEMORY.sesionActiva.lineasId].includes(item.id)) {
            item.horasAcumuladas = Number((item.horasAcumuladas + horasImputadas).toFixed(1));
            
            // CU-07: Bloqueo Mandatorio al alcanzar el 100%
            if (item.horasAcumuladas >= item.umbral) {
                item.estado = 'BLOQUEADO_POR_MANTENIMIENTO';
            }
        }

        const porcentaje = Math.min(100, Math.round((item.horasAcumuladas / item.umbral) * 100));
        return {
            ...item,
            porcentaje,
            bloqueado: item.estado === 'BLOQUEADO_POR_MANTENIMIENTO'
        };
    });

    DB_MEMORY.sesionActiva.estado = 'FINALIZADA';
    DB_MEMORY.sesionActiva.duracionMinutos = duracion;
    DB_MEMORY.sesionActiva.observaciones = observaciones;

    res.json({
        mensaje: 'Sesión cerrada e imputada en la bitácora técnica',
        sesion: DB_MEMORY.sesionActiva,
        reporteFatiga
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✓ KiteSafe Backend API escuchando en http://localhost:${PORT}`);
});