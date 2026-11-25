# Registro de Ventas · App

## Proyecto guiado de Henry Robertino Ramos Salvador

Base del frontend: WayLearnLatam/Registro-Ventas-Solana-App (baee514).
Base Rust: WayLearnLatam/Registro-Ventas-Solana-PDA (1a414a8).
La baja de cliente cierra su cuenta cuando el historial está vacío y no tiene compras.
La mejora propia exige un monto mayor que cero tanto al registrar como al modificar una venta en Rust.

Para iniciar esta versión, ejecuta `npm ci`, `npm run verificar` y `npm run dev` desde la raíz.
El IDL exportado de Playground y el cliente generado ya están incluidos.
La interfaz permite elegir «Eliminar cliente», indicar su ID, firmar la operación y consultar el registro actualizado.

Prueba de programa: tras desplegar el programa en Devnet, ejecuta
`programa/tests/ventas.test.ts` en Solana Playground con la wallet de prueba.
Comprueba el rechazo de monto cero, que la venta conserve su monto anterior y que
solo se permita cerrar el cliente después de devolver la venta.
Estado: programa desplegado en Devnet el 25 de noviembre de 2026.
La prueba de Playground terminó con 1 passing y todas las comprobaciones exitosas.
El frontend compiló y pasó sus 11 pruebas locales. La demostración en Devnet se realizó firmando desde Solana Playground y consultando los datos desde el frontend. También se creó el registro Cafe WayLearn D1 directamente desde el frontend con una cuenta temporal de práctica. La transacción quedó finalizada sin errores.

## Evidencias

- [Program ID en Solana Explorer](https://explorer.solana.com/address/E1yJAnrTuYNoxSc6x4s8VA8UmhbTbu4xDJR1TjYApz9V?cluster=devnet).
- [Captura de despliegue exitoso](./images/evidencia-despliegue.png).
- [Captura de la prueba Devnet con las firmas completas](./images/evidencia-prueba-devnet.png).
- [Captura del frontend local con la nueva operación](./images/evidencia-frontend.png).
- [Venta de demostración registrada en Devnet](./images/evidencia-venta-devnet.png).
- [Transacción de la venta de demostración — finalizada en Devnet](https://explorer.solana.com/tx/2VtHt5uX8HFuKbzteRGC6xFZymLjcCSyCETSoiXZJKNCrTPomGnrJgpzkUMmZnGQ4vvuqYj5TsMgJyErpxKgKc2V?cluster=devnet).
- [Consulta de la venta real desde el frontend](./images/evidencia-consulta-devnet.png).
- [Captura de creación de registro confirmada desde el frontend](./images/evidencia-firma-frontend.png).
- [Transacción CrearRegistro desde el frontend — finalizada en Devnet](https://explorer.solana.com/tx/3RXfJyN9ib2joRFe5Bgp5en5F8M1Wjqs8rq8jr7552vMxauMgkgQ6VHXEk7nr9wRJdWphAoqYVPeYz5c4DfLvSHq?cluster=devnet).

![Resultado de las pruebas Devnet](./images/evidencia-prueba-devnet.png)

### Reproducir la consulta de la demostración

1. Ejecutar `npm install` si la versión local de npm requiere actualizar el lockfile; a continuación `npm run verificar` y `npm run dev`.
2. Abrir la sección Registro de ventas en `http://localhost:5173/`.
3. Introducir el nombre exacto `Tienda HRRS 1795640253485` y la autoridad pública `4jtz7L5wWGBzcQJHf8vF7eU8eQRqLAq1tk5TvFTQXAdx`.
4. Pulsar Consultar registro. Se observa el cliente de prueba con una venta activa de Cuaderno, SKU A01, importe 150 unidades.

Para crear otra demostración, copiar `programa/client/demo.ts` en `client/client.ts` de Solana Playground y ejecutar Run con una wallet de práctica en Devnet.

![Consulta en el frontend](./images/evidencia-consulta-devnet.png)

### Demostración con cuenta temporal de Devnet

Para comprobar la firma desde el navegador sin instalar una extensión, inicia el servidor local con `npm run dev` y abre `http://localhost:5173/?modo=prueba`. Selecciona «Práctica Devnet (temporal)» en Conectar wallet. Esta cuenta de desarrollo se crea en memoria y solo puede firmar instrucciones del programa configurado en Devnet. Cada operación necesita confirmación explícita. No se exportan ni importan claves y no se utiliza dinero real.

En Conexión se muestra la dirección pública temporal. Utiliza únicamente saldo de prueba de Devnet. Mantén abierta la pestaña hasta completar la demostración, ya que la cuenta se pierde al desconectarla o recargar.

Esta revisión pasó 11 pruebas locales, incluidas dos verificaciones de la cuenta temporal: desconexión y rechazo de programas o redes ajenos.

## Material original del bootcamp

![Registro de Ventas · App — Solana, TypeScript y React](./images/banner-app.png)

Frontend educativo desarrollado con **TypeScript y React** para interactuar con el programa [Registro de Ventas con PDAs](https://github.com/WayLearnLatam/Registro-Ventas-Solana-PDA) en **Solana Devnet**.

Forma parte del **Solana Engineering Track: Advanced** de WayLearn. Aquí conectamos lo aprendido sobre cuentas, instrucciones y PDAs con una aplicación que se utiliza desde el navegador.

Puedes comenzar haciendo **Fork** de este repositorio. Hemos preparado un entorno de **GitHub Codespaces** para que puedas concentrarte en los ejercicios sin instalar las herramientas del frontend en tu computadora. 🚀

> 📖 Sigue las explicaciones y actividades en el [GitBook de Advanced](https://waylearn.gitbook.io/solana-engineering-track-advanced).

## ¿Qué puedes hacer con la app?

- Conectar una wallet y consultar saldos de Devnet.
- Consultar un registro de ventas, sus clientes y las ventas activas de cada uno.
- Crear un negocio y dar de alta a sus clientes.
- Registrar ventas, corregir su importe y realizar devoluciones.
- Revisar solicitudes de firma, confirmaciones y errores de las transacciones.

El recorrido del proyecto sigue esta relación:

**Registro del negocio → Clientes → Ventas**

Cada entidad tiene su propia cuenta. El frontend deriva sus direcciones y utiliza el cliente generado a partir del IDL para leer datos y construir instrucciones.

> ℹ️ El importe de una venta es un dato del ejercicio: **no cobra ni transfiere SOL o tokens**. La devolución elimina la venta del historial activo y cierra su cuenta; no realiza un reembolso comercial.

## Antes de comenzar

Necesitas una cuenta de GitHub y, para las operaciones que requieren firma, una wallet de navegador compatible con Solana y SOL de prueba en **Devnet**.

Es recomendable tener conocimientos básicos de JavaScript o TypeScript y haber revisado el modelo de cuentas del [programa base](https://github.com/WayLearnLatam/Registro-Ventas-Solana-PDA).

**No necesitas la Solana CLI para ejecutar este frontend.** Puedes trabajar con el programa desplegado desde Solana Playground.

## Comenzar con Codespaces

### 1. Crea tu copia

Haz clic en **Fork**, en la parte superior de este repositorio, para crear una copia en tu cuenta. Así podrás guardar tus cambios y continuar con tu proyecto.

### 2. Abre el entorno

Desde tu copia, selecciona **Code → Codespaces → Create codespace on main**.

Espera a que termine la preparación. El contenedor incluye Node 22 y ejecuta automáticamente la instalación de dependencias y la generación del cliente.

### 3. Inicia la app

En la terminal de Codespaces ejecuta:

```bash
npm run dev
```

### 4. Ábrela en tu navegador

En la pestaña **Ports / Puertos**, localiza el **5173** y selecciona **Open in Browser**.

Abre la aplicación en una pestaña normal del navegador donde tienes instalada tu wallet. La vista incrustada del editor puede no detectar la extensión. El puerto puede permanecer privado; utiliza la misma cuenta de GitHub para acceder.

> 💡 Al terminar, detén el Codespace desde el menú de Codespaces para evitar consumir tiempo de cómputo mientras no lo utilizas.

## Ejecutar en tu computadora

Si prefieres trabajar en local, utiliza **Node.js 22.12 o superior de la rama 22** y npm. Clona tu fork o utiliza directamente el repositorio original:

```bash
git clone https://github.com/henrysalvadorramos-cell/punto-de-venta-solana-hrrs.git
cd punto-de-venta-solana-hrrs
npm ci
npm run verificar
npm run dev
```

Abre `http://localhost:5173` en el navegador con tu wallet instalada.

En Windows puedes ejecutar estos comandos desde WSL. El repositorio también incluye una configuración de Dev Container para VS Code, si ya utilizas Docker y la extensión Dev Containers.

## Conectar el programa de Solana

El frontend y el programa son dos partes del mismo proyecto:

| Parte | Responsabilidad |
| --- | --- |
| [Programa Rust + Anchor](https://github.com/WayLearnLatam/Registro-Ventas-Solana-PDA) | Define las cuentas, ejecuta instrucciones y valida permisos. |
| Este frontend | Lee cuentas, construye instrucciones y solicita a la wallet que firme las transacciones. |
| IDL y cliente generado | Describen la interfaz del programa y permiten utilizarla desde TypeScript. |

### Si aparece «programa de referencia»

El repositorio incluye un **IDL de referencia** para estudiar la estructura y generar el cliente. Con esa configuración puedes conectar tu wallet y consultar saldos; la consulta del registro y sus operaciones permanecen bloqueadas hasta importar el IDL del despliegue que utilizarás.

Si la versión de clase ya viene configurada para el programa correspondiente, puedes continuar con las actividades sin repetir este paso.

### Importar tu IDL

Exporta desde Playground el IDL del programa que realmente compilaste y desplegaste en **Devnet**. Coloca el JSON dentro de tu espacio de trabajo, por ejemplo en `tmp-idl/registro.json`, y ejecuta desde la raíz:

```bash
npm run configurar:idl -- ./tmp-idl/registro.json
```

Si el archivo no incluye la dirección del programa, agrega su Program ID público:

```bash
npm run configurar:idl -- ./tmp-idl/registro.json --program-id TU_PROGRAM_ID
```

El comando comprueba la estructura esperada, importa el IDL y regenera el cliente. Detén el servidor con `Ctrl+C` y vuelve a ejecutar `npm run dev` después de la importación.

**No edites manualmente el cliente generado.** Si cambias el IDL, ejecuta `npm run cliente`. Conserva juntos en tu repositorio `idl.json`, `src/config/programa.json` y `clients/js/`.

> 🔎 La wallet de Playground y la del navegador pueden ser distintas. Como la autoridad participa en la PDA, lo más sencillo es crear un negocio nuevo desde la app con la wallet del navegador. No necesitas trasladar claves privadas entre entornos.

Consulta la [guía de IDL y Playground](./docs/IDL-Y-PLAYGROUND.md) si necesitas revisar la configuración.

## Seguir las sesiones

El proyecto utiliza el mismo frontend durante ambos días. Puedes elegir el punto de partida con estos comandos:

| Comando | Qué prepara |
| --- | --- |
| `npm run clase:dia3` | Pantalla de conexión para explorar wallet, RPC, saldos e IDL. Reserva Registro para el día siguiente. |
| `npm run clase:dia4` | Pantalla del registro con dos funciones por completar: `crearCliente` y `registrarVenta`. |
| `npm run clase:resuelto` | Las cinco operaciones implementadas, como referencia para estudiar y contrastar. |

Detén `npm run dev` antes de cambiar de modo y vuelve a iniciarlo al terminar.

> **Guarda tu avance antes de cambiar de modo.** Estos comandos reemplazan `src/solana/acciones.ts`. Los cambios anteriores se respaldan en `.aula/respaldos/`; el IDL y el cliente generado se conservan. Puedes consultar la solución en `materiales/acciones-resuelto.ts.txt` sin reemplazar tu archivo.

## ¿Dónde está cada cosa?

| Ruta | Qué encontrarás |
| --- | --- |
| `src/components/` | Pantallas y formularios de la aplicación. |
| `src/solana/acciones.ts` | Funciones que conectan los formularios con las instrucciones del programa. |
| `src/solana/lecturas.ts` | Lectura de Registro, Cliente y Venta. |
| `src/solana/pdas.ts` y `seeds.ts` | Derivación de las direcciones de las cuentas. |
| `src/solana/tx.ts` | Preparación, envío, confirmación y errores de las transacciones. |
| `src/config/interfaz.ts` | Título y valores iniciales para personalizar la demo. |
| `idl.json` | IDL utilizado para generar el cliente del programa. |
| `clients/js/src/generated/` | Código generado con Codama; no se modifica a mano. |
| `materiales/` | Versión de ejercicio y solución de las operaciones. |
| `docs/` | Guías de configuración, pruebas y alcance del ejemplo. |

La base utiliza **React + Vite**, **TypeScript**, **Wallet Adapter**, **Solana Kit**, **web3.js** y **Codama**. La integración entre las librerías ya está preparada para que puedas concentrarte en el flujo de cuentas e instrucciones.

## Probar tus cambios

```bash
npm run verificar
```

Este comando comprueba TypeScript, ejecuta las pruebas automatizadas y genera el build del frontend. Las pruebas automatizadas **no envían transacciones**: completa también el recorrido de [pruebas manuales en Devnet](./docs/PRUEBAS-MANUALES.md).

Para tu primera prueba, crea un negocio, agrega un cliente, registra una venta y consulta el resultado. Después prueba corregir el importe, devolver la venta y cancelar una solicitud de firma.

## Si algo no funciona

| Situación | Qué revisar |
| --- | --- |
| La wallet no aparece | Abre la app en una pestaña normal del navegador con una extensión compatible instalada. |
| Falta SOL de prueba | Solicítalo en [Solana Faucet](https://faucet.solana.com/), seleccionando Devnet. |
| No aparece tu negocio | Comprueba el nombre exacto y la dirección de su autoridad; ambos participan en la PDA. |
| No puedes repetir un SKU | Cada cliente solo puede tener una venta activa con ese SKU. |
| El RPC responde con un límite de uso | Espera y vuelve a intentar, o configura otro endpoint de Devnet en `.env.local` siguiendo `.env.example`. |
| Cambiaste el IDL y falla la comprobación | Ejecuta `npm run cliente` y reinicia el servidor. |

## Recursos y comunidad

- [GitBook de Solana Engineering Track: Advanced](https://waylearn.gitbook.io/solana-engineering-track-advanced).
- [Programa Registro de Ventas con PDAs](https://github.com/WayLearnLatam/Registro-Ventas-Solana-PDA).
- [Solana Playground](https://beta.solpg.io/).
- [Comunidad de WayLearn en Discord](https://discord.gg/hvnpbZxu9b).

Este es un proyecto educativo para **Devnet**. Las validaciones del formulario no sustituyen las restricciones del programa. Revisa [seguridad y alcance](./docs/SEGURIDAD-Y-ALCANCE.md) para conocer los límites del ejemplo y los aspectos que deben revisarse antes de producción.
