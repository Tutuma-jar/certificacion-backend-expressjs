const students = [
  { name: "Ana", grades: [80, 90, 75] },
  { name: "Luis", grades: [50, 60, 58] },
  { name: "Carla", grades: [95, 92, 98] },
  { name: "Pedro", grades: [40, 45, 50] }
];

function calculateAverage(grades) {
  let sum = 0;

  for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
  }

  return sum / grades.length;
}

function getStatus(average) {
  if (average >= 60) {
    return "Passed";
  } else {
    return "Failed";
  }
}

function generateReport(students) {
  let report = [];

  for (let i = 0; i < students.length; i++) {
    let average = calculateAverage(students[i].grades);

    report.push({
      name: students[i].name,
      average: Number(average.toFixed(2)),
      status: getStatus(average)
    });
  }

  return report;
}

console.log(generateReport(students));