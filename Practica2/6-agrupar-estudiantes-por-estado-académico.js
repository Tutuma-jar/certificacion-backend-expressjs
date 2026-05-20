function agruparPorEstadoAcademico(estudiantes) {
  const estudiantesConPromedio = estudiantes.map(estudiante => {
    const suma = estudiante.notas.reduce((total, nota) => total + nota, 0);
    const promedio = suma / estudiante.notas.length;

    return {
      nombre: estudiante.nombre,
      promedio: promedio
    };
  });

  return estudiantesConPromedio.reduce((grupos, estudiante) => {
    if (estudiante.promedio >= 90) {
      grupos.excelente.push(estudiante);
    } else if (estudiante.promedio >= 60) {
      grupos.aprobado.push(estudiante);
    } else {
      grupos.reprobado.push(estudiante);
    }

    return grupos;
  }, {
    excelente: [],
    aprobado: [],
    reprobado: []
  });
}

const estudiantes = [
  { nombre: "Ana", notas: [95, 90, 100] },
  { nombre: "Luis", notas: [50, 60, 55] },
  { nombre: "Carla", notas: [70, 80, 75] },
  { nombre: "Pedro", notas: [40, 45, 50] }
];

console.log(agruparPorEstadoAcademico(estudiantes));