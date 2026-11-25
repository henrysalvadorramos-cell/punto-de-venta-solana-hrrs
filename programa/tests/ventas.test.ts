describe("Registro de ventas", () => {
  it("protege el monto y condiciona la baja del cliente", async () => {
    const owner = pg.wallet.publicKey;
    const nombre = "HRRS-" + Date.now();
    const confirmado = "confirmed" as const;
    const opciones = { commitment: confirmado, preflightCommitment: confirmado };
    const pda = (...seeds: Buffer[]) =>
      web3.PublicKey.findProgramAddressSync(seeds, pg.program.programId)[0];
    const registro = pda(Buffer.from("registro"), Buffer.from(nombre), owner.toBuffer());
    const cliente = pda(Buffer.from("cliente"), registro.toBuffer(), Buffer.from([1, 0]));
    const sku = "A01";
    const venta = pda(Buffer.from("venta"), cliente.toBuffer(), Buffer.from(sku));
    const systemProgram = web3.SystemProgram.programId;
    const base = { owner, registro, cliente };
    const cuentas = { ...base, venta };
    const metodos = pg.program.methods;
    async function rechazo(operacion: Promise<unknown>, codigo: string) {
      try {
        await operacion;
      } catch (error) {
        const detalle = error as { error?: { errorCode?: { code?: string } }; logs?: string[] };
        const mensaje = [String(error), detalle?.error?.errorCode?.code, ...(detalle?.logs ?? [])].join("\n");
        assert(mensaje.includes(codigo), mensaje);
        console.log("Rechazo esperado:", codigo);
        return;
      }
      throw new Error("Se esperaba " + codigo);
    }
    console.log("1. Crear negocio y cliente");
    await metodos.crearRegistro(nombre).accounts({ owner, registro, systemProgram }).rpc(opciones);
    await metodos.crearCliente("Cliente demo").accounts({ ...base, systemProgram }).rpc(opciones);
    const alta = (monto: number) => metodos.registrarVenta(1, sku, "Cuaderno", monto)
      .accounts({ ...cuentas, systemProgram }).rpc(opciones);
    console.log("2. Comprobar que se rechace una venta de cero");
    await rechazo(alta(0), "MontoInvalido");
    assert.equal(await pg.connection.getAccountInfo(venta, "confirmed"), null);
    console.log("3. Registrar una venta de 100");
    console.log("Venta válida:", await alta(100));
    console.log("4. Intentar cambiar el monto a cero");
    await rechazo(metodos.cambiarMonto(1, sku, 0).accounts(cuentas).rpc(opciones), "MontoInvalido");
    const ventaGuardada = await pg.program.account.venta.fetch(venta, confirmado);
    assert.equal(ventaGuardada.monto, 100);
    console.log("Monto conservado:", ventaGuardada.monto);
    console.log("5. Intentar eliminar un cliente con ventas activas");
    const baja = () => metodos.eliminarCliente(1).accounts(base).rpc(opciones);
    await rechazo(baja(), "VentasActivas");
    console.log("6. Devolver venta y eliminar cliente");
    console.log("Devolución válida:", await metodos.hacerDevolucion(1, sku).accounts(cuentas).rpc(opciones));
    console.log("Baja válida:", await baja());
    assert.equal(await pg.connection.getAccountInfo(cliente, "confirmed"), null);
    console.log("7. Verificar el cierre del cliente");
    const estado = await pg.program.account.registro.fetch(registro, confirmado);
    assert.equal(estado.clientes.length, 0);
    assert.equal(estado.idCounter, 1);
    console.log("Todas las comprobaciones fueron exitosas");
  });
});
