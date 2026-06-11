import mongoose from "mongoose";
import dns from "dns";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "MONGODB_URI no está definida. Crea un archivo .env con MONGODB_URI."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado correctamente");
    return;
  } catch (error) {
    console.error("Error conectando MongoDB (primer intento):", error.message);

    // Si falla la resolución SRV (querySrv ECONNREFUSED), reintentamos configurando
    // servidores DNS públicos (Google y Cloudflare) y volvemos a intentar.
    if (error.message && error.message.includes("querySrv")) {
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        console.log("Se cambiaron servidores DNS a 8.8.8.8 y 1.1.1.1, reintentando conexión...");
        await mongoose.connect(uri);
        console.log("MongoDB conectado correctamente (tras reintento DNS).");
        return;
      } catch (err2) {
        console.error("Error conectando MongoDB (reintento DNS):", err2.message);
      }
    }

    process.exit(1);
  }
}
