# KiteSafe 🪁🌊
### Plataforma web de soporte a la toma de decisiones y seguridad operativa en Kitesurf

> **Trabajo Final de Grado (TFG)** — Licenciatura / Ingeniería en Software  
> **Institución:** Universidad Siglo 21  
> **Alumno:** Fernando Jose Oliva Barcena  
> **Cátedra:** Seminario Final de Ingeniería en Software (Prof. Ing. Claudia Fabiana Castro)  

---

## 📌 Descripción del Proyecto

La práctica del kitesurf presenta una estrecha ventana de navegabilidad segura determinada por variables aerodinámicas dinámicas e inestables. Históricamente, la determinación de la aptitud de los spots costeros, la elección del tamaño de cometa y el control del desgaste del material se han gestionado de forma empírica y fragmentada, elevando la incidencia de accidentes por **sobrepotenciación**, deriva involuntaria hacia mar abierto por vientos ***off-shore*** y roturas imprevistas de materiales bajo tensión.

**KiteSafe** es una plataforma web integral basada en un **motor de inferencia contextual** que articula tres etapas indivisibles de una jornada náutica:
1. **Evaluación de navegabilidad en tiempo real (CU-01):** Clasificación automática mediante semáforo visual de tres estados (Verde / Amarillo / Rojo) contrastando trigonométricamente la dirección eólica con la orientación geométrica de la costa.
2. **Dimensionamiento asistido de equipamiento (CU-02, CU-03):** Prescripción algorítmica de la superficie de vela ($m^2$) aplicando la ecuación cuadrática de sustentación aerodinámica ($L = \frac{1}{2} \rho v^2 S C_L$) en función de la masa corporal del deportista y el gradiente de ráfagas.
3. **Trazabilidad y mantenimiento preventivo (CU-04 a CU-07):** Registro de bitácoras con cómputo atómico de horas de tracción acumuladas y **bloqueo preventivo automático** sobre componentes que alcanzan el 100% de vida útil según directrices técnicas internacionales (IKO).

---

## 🛠️ Stack Tecnológico

| Capa / Componente | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend (Cliente)** | React 18, Vite, Tailwind CSS, Lucide-React | SPA modular, reactiva y responsiva con interfaz de alto contraste para visibilidad bajo sol pleno en playa. |
| **Backend (API REST)** | Node.js (v20 LTS), Express.js | Arquitectura desacoplada en capas con endpoints sin estado y procesamiento asíncrono. |
| **Persistencia Relacional** | PostgreSQL 16 | Integridad transaccional con garantías ACID para contadores de horas acumuladas y registros inmutables. |
| **Caché en Memoria** | `node-cache` (TTL 30 min) | Almacenamiento temporal para mitigar límites de cuota (*rate limiting*) en servicios climáticos externos y tolerar fallas de enlace. |
| **Fuentes Meteorológicas** | Open-Meteo REST API / Windguru | Ingesta horaria geolocalizada por latitud y longitud. |

---

## 📂 Estructura del Repositorio

```text
kitesafe/
├── backend/
│   ├── config/
│   │   └── db.js                 # Pool de conexiones a PostgreSQL
│   ├── services/
│   │   ├── inferenceEngine.js    # Trigonometría costera y ecuación física aerodinámica
│   │   └── weatherService.js     # Cliente HTTP meteorológico con caché de 30 min
│   ├── controllers/
│   │   └── sessionController.js  # Lógica de despacho y cierre con bloqueo de fatiga
│   ├── init_db.sql               # Script DDL (7 tablas) + datos semilla de prueba
│   ├── server.js                 # Servidor principal y endpoints Express
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx       # Navegación y estado del centro activo
│   │   ├── views/
│   │   │   ├── DashboardView.jsx # Tablero del spot y semáforo cromático (CU-01)
│   │   │   ├── AssignmentView.jsx# Selección paramétrica de vela y alumno (CU-02, CU-03)
│   │   │   └── CloseSessionView.jsx# Bitácora, barras de fatiga y bloqueo técnico (CU-04..07)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── Instructivo_puesta_en_marcha.pdf
└── README.md
```

---

## 🚀 Puesta en Marcha Rápida

### Requisitos Previos
* **Node.js** (v18 o v20 LTS recomendado)
* **PostgreSQL** 16 (Local o instancia cloud como Supabase/Neon)

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/kitesafe.git
cd kitesafe
```

### 2. Configurar la Base de Datos
Crear la base de datos y ejecutar el script con el esquema y datos iniciales:
```bash
psql -U postgres -c "CREATE DATABASE kitesurf_safety_db;"
psql -U postgres -d kitesurf_safety_db -f backend/init_db.sql
```

### 3. Configurar y Ejecutar el Backend
```bash
cd backend
npm install
```
Crear el archivo `.env` tomando como base `.env.example`:
```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kitesurf_safety_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```
Iniciar el servidor:
```bash
npm run dev
# API escuchando en http://localhost:4000
```

### 4. Configurar y Ejecutar el Frontend
En otra terminal:
```bash
cd frontend
npm install
npm run dev
# Aplicación disponible en http://localhost:5173
```

---

## 🧪 Circuito de Prueba y Demostración

El script de datos semilla incluye los registros precargados que validan el caso de uso del proyecto:
1. **Spot Tarifa Kite Club (Costa 245°):** Con 18 kts y ráfagas de 22 kts en componente *side-onshore*, el sistema emite semáforo **VERDE (Navegable)**.
2. **Asignación de Mateo Sánchez (72 kg, Intermedio):** El motor prescribe un rango seguro de **9m - 10m**. Si se conmuta el peso a **90 kg**, el cálculo asciende en tiempo real a **11m - 12m** para compensar la sustentación requerida.
3. **Despacho y Cierre de Sesión (90 min = 1.5 hs):**
   * **Cometa Duotone Rebel 9m:** Pasa de 103,5 hs a 105,0 hs / 250 hs (42% de vida útil - Estado: `DISPONIBLE`).
   * **Barra Trust Bar M/L:** Pasa de 94,5 hs a 96,0 hs / 100 hs (96% de vida útil - Alerta amarilla de revisión preventiva).
   * **Set Líneas 24m (`L-24-03`):** Pasa de 98,5 hs a **100,0 hs / 100 hs (100% alcanzado)**. El backend ejecuta el **bloqueo preventivo automático**, actualiza su estado a `BLOQUEADO_POR_MANTENIMIENTO` e inserta la orden técnica de inspección en `HISTORIAL_MANTENIMIENTO`.

---

## 📋 Mapeo de Casos de Uso (UML)

| Caso de Uso | Módulo / Endpoint | Artefacto de Implementación |
| :--- | :--- | :--- |
| **CU-01: Evaluar navegabilidad y semáforo** | `GET /api/spots/:id/status` | `services/inferenceEngine.js`, `DashboardView.jsx` |
| **CU-02: Calcular tamaño de cometa** | `POST /api/calculate-kite` | `services/inferenceEngine.js` (Ecuación cuadrática) |
| **CU-03: Asignar equipamiento** | `POST /api/sessions/dispatch` | `controllers/sessionController.js`, `AssignmentView.jsx` |
| **CU-04: Registrar bitácora de sesión** | `POST /api/sessions/close` | `controllers/sessionController.js` (Transacción ACID) |
| **CU-05: Gestionar inventario de equipos** | `GET /api/inventory/available` | Tabla `COMPONENTE_EQUIPAMIENTO` |
| **CU-06: Emitir alerta de desgaste** | Lógica en cierre de sesión | Alerta amarilla al superar 80% del umbral de vida útil |
| **CU-07: Bloquear equipo por límite técnico**| Trigger / Regla en cierre | Conmutación forzada a `BLOQUEADO_POR_MANTENIMIENTO` |

---

## 📄 Licencia y Derechos
Desarrollado como prototipo funcional para la obtención del título de grado en Ingeniería en Software, Universidad Siglo 21. Todos los derechos reservados © 2026.