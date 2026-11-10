INSERT INTO SPOT (id_spot, nombre_spot, latitud, longitud, angulo_costa_grados)
VALUES (1, 'Tarifa Kite Club', 36.0143, -5.6044, 245.00) ON CONFLICT DO NOTHING;

INSERT INTO USUARIO (id_usuario, nombre, apellido, email, rol, peso_kg, nivel_tecnico)
VALUES (1, 'Mateo', 'Sánchez', 'mateo@alumno.com', 'DEPORTISTA', 72.00, 'INTERMEDIO') ON CONFLICT DO NOTHING;

INSERT INTO COMPONENTE_EQUIPAMIENTO (id_componente, numero_serie, tipo_componente, marca, modelo, medida_valor, horas_acumuladas, umbral_horas_limite, estado_operativo)
VALUES 
(1, 'Duotone Rebel 9m', 'COMETA', 'Duotone', 'Rebel', 9.0, 103.50, 250.00, 'DISPONIBLE'),
(2, 'North Reach 10m', 'COMETA', 'North', 'Reach', 10.0, 45.00, 250.00, 'DISPONIBLE'),
(3, 'Trust Bar M/L', 'BARRA_LINEAS', 'Duotone', 'Trust Bar', 24.0, 94.50, 100.00, 'DISPONIBLE'),
(4, 'Set Líneas 24m', 'BARRA_LINEAS', 'Duotone', 'Líneas 24m', 24.0, 98.50, 100.00, 'DISPONIBLE')
ON CONFLICT DO NOTHING;