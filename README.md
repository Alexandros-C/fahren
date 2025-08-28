# Fahren — Cyber-Renaissance Store

## Requisitos
- Node.js 18.17+
- npm 9+

## Scripts
- `npm run dev` — Desarrollo en localhost
- `npm run dev:termux` — Desarrollo en Termux/Arch (host 0.0.0.0)
- `npm run build` — Build producción (SWC nativo)
- `npm run build:wasm` — Build con fallback WASM (entornos sin binario SWC)
- `npm run start` — Start producción
- `npm run start:termux` — Start producción en 0.0.0.0

## Arch Linux en Termux (aarch64)
1) Instalar Termux (F-Droid) y luego Arch dentro con proot-distro:
```bash
pkg update && pkg upgrade -y
pkg install proot-distro git -y
proot-distro install archlinux
proot-distro login archlinux
```
2) Dentro de Arch:
```bash
pacman -Sy --noconfirm nodejs npm git
```
3) Clonar y preparar:
```bash
git clone https://github.com/Alexandros-C/fahren.git
cd fahren
npm ci || npm install
```
4) Ejecutar desarrollo accesible desde el móvil:
```bash
npm run dev:termux
# Navegá a http://127.0.0.1:3000 o http://<IP_LOCAL>:3000
```
5) Producción con fallback WASM (si SWC nativo falla):
```bash
npm run build:wasm
npm run start:termux
```

Notas:
- El paquete `@next/swc-wasm-nodejs` está incluido para entornos sin binarios SWC.
- En dispositivos con pocos recursos, preferí `npm run start:termux` en lugar de `dev`.

Autenticación y monedas: removidos en esta build según solicitud.