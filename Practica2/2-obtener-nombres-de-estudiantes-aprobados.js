function obtenerAprobados(estudiantes) {
  return estudiantes
    .filter(estudiante => estudiante.nota >= 60)
    .map(estudiante => estudiante.nombre);
}

const estudiantes = [
  { nombre: "Ana", nota: 85 },
  { nombre: "Luis", nota: 45 },
  { nombre: "Carla", nota: 70 },
  { nombre: "Pedro", nota: 55 }
];

console.log(obtenerAprobados(estudiantes));