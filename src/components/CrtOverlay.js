export function renderCrtOverlay() {
  const frag = document.createDocumentFragment();
  const scanline = document.createElement('div');
  scanline.className = 'scanline';
  const crt = document.createElement('div');
  crt.className = 'crt absolute inset-0 pointer-events-none z-50';
  frag.appendChild(scanline);
  frag.appendChild(crt);
  return frag;
}
