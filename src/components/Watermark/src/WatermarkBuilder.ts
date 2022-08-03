import { encryptByMd5 } from '@potjs/cipher';

export type WatermarkOptions = {
  domId?: string;
  appendEl?: HTMLElement;
  cellSize?: number;
  color?: string | CanvasGradient | CanvasPattern;
  fontSize?: string;
  fontFamily?: string;
  rotateAngle?: number;
};

function checkObject(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

export class WatermarkBuilder {
  private readonly options: Required<WatermarkOptions>;

  constructor(options?: WatermarkOptions) {
    this.options = {
      domId: encryptByMd5(`${Math.random()}`),
      appendEl: document.body,
      cellSize: 300,
      color: 'rgba(0,0,0,.1)',
      fontSize: '15px',
      fontFamily: 'Verdana',
      rotateAngle: -20,
      ...checkObject(options),
    };
  }

  setup(text: string, options?: WatermarkOptions) {
    this.create(text, options);
  }

  clear() {
    const { domId, appendEl } = this.options;
    const el = document.getElementById(domId);
    if (el) {
      appendEl?.removeChild(el);
    }
  }

  private create(text: string, options?: WatermarkOptions): string {
    this.clear();

    const { domId, appendEl, cellSize, color, fontSize, fontFamily, rotateAngle } = {
      ...this.options,
      ...checkObject(options),
    };

    const canvas = document.createElement('canvas');
    canvas.width = cellSize;
    canvas.height = cellSize;

    const center = Math.floor(cellSize / 2);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.translate(center, center);
      ctx.rotate((rotateAngle * Math.PI) / 180);
      ctx.translate(-center, -center);
      ctx.font = `${fontSize} ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, center, center);
    }

    const div = document.createElement('div');
    const child = document.createElement('div');
    div.appendChild(child);
    div.id = domId;
    child.style.pointerEvents = 'none';
    child.style.top = '0px';
    child.style.left = '0px';
    child.style.position = 'fixed';
    child.style.zIndex = '999999999';
    child.style.width = `${document.documentElement.clientWidth}px`;
    child.style.height = `${document.documentElement.clientHeight}px`;
    // child.style.background = 'url(' + canvas.toDataURL('image/png') + ') left top repeat';
    child.style.backgroundImage = `url(${canvas.toDataURL('image/png')}), url(${canvas.toDataURL('image/png')})`;
    child.style.backgroundRepeat = 'repeat, repeat';
    child.style.backgroundPosition = `${center}px ${center}px, 0 0`;
    appendEl.appendChild(div);
    return domId;
  }
}
