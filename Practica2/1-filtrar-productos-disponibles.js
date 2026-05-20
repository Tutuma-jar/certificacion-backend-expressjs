function filtrarDisponibles(productos) {
  return productos.filter(producto => producto.disponible === true);
}

const productos = [
  { nombre: "Laptop", precio: 4500, disponible: true },
  { nombre: "Mouse", precio: 80, disponible: false },
  { nombre: "Teclado", precio: 150, disponible: true }
];

console.log(filtrarDisponibles(productos));