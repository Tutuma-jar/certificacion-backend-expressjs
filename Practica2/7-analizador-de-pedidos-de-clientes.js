function analizarPedidos(pedidos) {
  const clientesConPedidosGrandes = pedidos
    .filter(pedido => {
      const totalPedido = pedido.productos.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
      }, 0);

      return totalPedido > 1000;
    })
    .map(pedido => pedido.cliente);

  const totalVendido = pedidos.reduce((total, pedido) => {
    const totalPedido = pedido.productos.reduce((suma, producto) => {
      return suma + producto.precio * producto.cantidad;
    }, 0);

    return total + totalPedido;
  }, 0);

  const productosVendidos = pedidos.reduce((acumulador, pedido) => {
    pedido.productos.forEach(producto => {
      if (acumulador[producto.nombre]) {
        acumulador[producto.nombre] += producto.cantidad;
      } else {
        acumulador[producto.nombre] = producto.cantidad;
      }
    });

    return acumulador;
  }, {});

  const pedidosConDescuento = pedidos.filter(pedido => pedido.tieneDescuento === true);

  return {
    clientesConPedidosGrandes,
    totalVendido,
    productosVendidos,
    pedidosConDescuento
  };
}

const pedidos = [
  {
    cliente: "Ana",
    tieneDescuento: true,
    productos: [
      { nombre: "Laptop", precio: 5000, cantidad: 1 },
      { nombre: "Mouse", precio: 100, cantidad: 2 }
    ]
  },
  {
    cliente: "Luis",
    tieneDescuento: false,
    productos: [
      { nombre: "Teclado", precio: 200, cantidad: 1 }
    ]
  },
  {
    cliente: "Carla",
    tieneDescuento: true,
    productos: [
      { nombre: "Monitor", precio: 900, cantidad: 2 },
      { nombre: "Mouse", precio: 100, cantidad: 1 }
    ]
  }
];

console.log(analizarPedidos(pedidos));