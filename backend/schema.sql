CREATE TABLE IF NOT EXISTS SPOT (
    id_spot SERIAL PRIMARY KEY,
    nombre_spot VARCHAR(100) NOT NULL,
    latitud NUMERIC(9,6) NOT NULL,
    longitud NUMERIC(9,6) NOT NULL,
    angulo_costa_grados NUMERIC(5,2) NOT NULL,
    viento_min_nudos NUMERIC(4,1) NOT NULL DEFAULT 12.0,
    viento_max_nudos NUMERIC(4,1) NOT NULL DEFAULT 28.0,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    rol VARCHAR(30) NOT NULL,
    peso_kg NUMERIC(5,2),
    nivel_tecnico VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS COMPONENTE_EQUIPAMIENTO (
    id_componente SERIAL PRIMARY KEY,
    numero_serie VARCHAR(50) UNIQUE NOT NULL,
    tipo_componente VARCHAR(30) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    medida_valor NUMERIC(4,1) NOT NULL,
    horas_acumuladas NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    umbral_horas_limite NUMERIC(6,2) NOT NULL,
    estado_operativo VARCHAR(30) NOT NULL DEFAULT 'DISPONIBLE'
);

CREATE TABLE IF NOT EXISTS SESION_NAVEGACION (
    id_sesion SERIAL PRIMARY KEY,
    id_usuario_navegante INT REFERENCES USUARIO(id_usuario),
    duracion_minutos INT,
    viento_promedio_nudos NUMERIC(4,1),
    rafagas_max_nudos NUMERIC(4,1),
    semaforo_aplicado VARCHAR(10),
    estado_sesion VARCHAR(20) DEFAULT 'ABIERTA',
    observaciones TEXT
);

CREATE TABLE IF NOT EXISTS DETALLE_SESION_EQUIPAMIENTO (
    id_detalle SERIAL PRIMARY KEY,
    id_sesion INT REFERENCES SESION_NAVEGACION(id_sesion),
    id_componente INT REFERENCES COMPONENTE_EQUIPAMIENTO(id_componente),
    horas_imputadas NUMERIC(4,2) DEFAULT 0.00
);