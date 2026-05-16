const estudiantes = [
  { nombre: "Ana", notas: [80, 90, 75] },
  { nombre: "Luis", notas: [50, 60, 58] },
  { nombre: "Carla", notas: [95, 92, 98] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];

function calcularPromedio(notas) {
  let suma=0;

  for (let i=0; i< notas.length; i++) {
    suma += notas[i];
  }

  return suma / notas.length;
}

function obtenerEstado(promedio) {
  if (promedio>= 60) {
    return "Aprobado";
  } else {
    return "Reprobado";
  }
}

function generarReporte(estudiantes) {
  let reporte = [];

  for (let i=0; i < estudiantes.length;i++) {
  let promedio=calcularPromedio(estudiantes[i].notas);

    reporte.push({
      nombre: estudiantes[i].nombre,
      promedio: Number(promedio.toFixed(2)),
      estado: obtenerEstado(promedio)
    });
  }
  return reporte;
}

console.log(generarReporte(estudiantes));