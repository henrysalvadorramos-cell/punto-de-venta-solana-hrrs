// Ejecutar en Solana Playground, con el programa desplegado en Devnet.
const owner = pg.wallet.publicKey;
const nombre = "Tienda HRRS " + Date.now();
const sku = "A01";
const systemProgram = web3.SystemProgram.programId;
const opciones = {
  commitment: "confirmed" as const,
  preflightCommitment: "confirmed" as const,
};

function pda(...semillas: Buffer[]) {
  return web3.PublicKey.findProgramAddressSync(semillas, pg.program.programId)[0];
}

const registro = pda(Buffer.from("registro"), Buffer.from(nombre), owner.toBuffer());
const cliente = pda(Buffer.from("cliente"), registro.toBuffer(), Buffer.from([1, 0]));
const venta = pda(Buffer.from("venta"), cliente.toBuffer(), Buffer.from(sku));

await pg.program.methods.crearRegistro(nombre)
  .accounts({ owner, registro, systemProgram })
  .rpc(opciones);
await pg.program.methods.crearCliente("Cliente de prueba")
  .accounts({ owner, registro, cliente, systemProgram })
  .rpc(opciones);
const firma = await pg.program.methods.registrarVenta(1, sku, "Cuaderno", 150)
  .accounts({ owner, registro, cliente, venta, systemProgram })
  .rpc(opciones);

console.log("NEGOCIO:", nombre);
console.log("AUTORIDAD:", owner.toBase58());
console.log("VENTA REGISTRADA:", firma);
console.log("Demostración exitosa");
