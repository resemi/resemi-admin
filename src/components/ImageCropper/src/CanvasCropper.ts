import { MouseEvent, TouchEvent, WheelEvent, Touch, TouchList } from 'react';

export interface IPos {
  x: number;
  y: number;
}

export interface CanvasCropperOptions {
  onChange?: (e: CanvasCropper) => void;
}

export interface CanvasCropperListeners {
  startMouse: (e) => void;
  moveMouse: (e) => void;
  endMouse: (e) => void;
  mouseWheel: (e) => void;
  startTouch: (e) => void;
  moveTouch: (e) => void;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = url;
  });
}

export default class CanvasCropper {
  private readonly canvasRef: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private img: HTMLImageElement;

  // 开始坐标
  private startPos: IPos = { x: 0, y: 0 };

  // 存储多手指位置
  private touches: TouchList;

  // 存储移动坐标位置
  private movePos: IPos;

  // 图片初始化X轴位置
  private imgX: number = 0;

  // 图片初始化Y轴位置
  private imgY: number = 0;

  // 是否移动
  private isMove: boolean = false;

  // 图片缩放比例
  private imgScale: number = 0.5;

  // 最小缩放
  private MINIMUM_SCALE: number = 0.2;

  // 最大缩放
  private MAX_SCALE: number = 5;

  private readonly options: CanvasCropperOptions;

  private readonly listeners: CanvasCropperListeners;

  constructor(canvas: HTMLCanvasElement, options?: CanvasCropperOptions) {
    this.canvasRef = canvas;
    this.options = options;

    const ratio = Math.max(window?.devicePixelRatio || 1, 1);
    this.canvasRef.width = this.canvasRef.offsetWidth * ratio;
    this.canvasRef.height = this.canvasRef.offsetHeight * ratio;
    this.canvasRef.getContext('2d').scale(ratio, ratio);
    this.ctx = canvas.getContext('2d');

    this.listeners = {
      startMouse: (e) => this.startMouse(e),
      moveMouse: (e) => this.moveMouse(e),
      endMouse: (e) => this.endMouse(e),
      mouseWheel: (e) => this.mouseWheel(e),
      startTouch: (e) => this.startTouch(e),
      moveTouch: (e) => this.moveTouch(e),
    };
  }

  /**
   * 初始化
   */
  async initCanvas(url: string) {
    this.clear();

    await this.loadImage(url);
    this.drawImage();
    // PC端事件监听
    this.canvasRef.addEventListener('mousedown', this.listeners.startMouse);
    this.canvasRef.addEventListener('mousemove', this.listeners.moveMouse);
    this.canvasRef.addEventListener('mouseup', this.listeners.endMouse);
    // 监听滚轮
    this.canvasRef.addEventListener('mousewheel', this.listeners.mouseWheel);
    this.canvasRef.addEventListener('wheel', this.listeners.mouseWheel);
    // 移动端事件监听
    this.canvasRef.addEventListener('touchstart', this.listeners.startTouch);
    this.canvasRef.addEventListener('touchmove', this.listeners.moveTouch);
    this.canvasRef.addEventListener('touchend', this.listeners.endMouse);
  }

  clear() {
    this.img = null;
    this.startPos.x = 0;
    this.startPos.y = 0;
    this.imgX = 0;
    this.imgY = 0;
    this.imgScale = 0.5;
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    // PC端事件监听
    this.canvasRef.removeEventListener('mousedown', this.listeners.startMouse);
    this.canvasRef.removeEventListener('mousemove', this.listeners.moveMouse);
    this.canvasRef.removeEventListener('mouseup', this.listeners.endMouse);
    // 监听滚轮
    this.canvasRef.removeEventListener('mousewheel', this.listeners.mouseWheel);
    this.canvasRef.removeEventListener('wheel', this.listeners.mouseWheel);
    // 移动端事件监听
    this.canvasRef.removeEventListener('touchstart', this.listeners.startTouch);
    this.canvasRef.removeEventListener('touchmove', this.listeners.moveTouch);
    this.canvasRef.removeEventListener('touchend', this.listeners.endMouse);
  }

  /**
   * 图片加载
   * @private
   * @param url
   */
  private async loadImage(url: string) {
    try {
      this.img = await loadImage(url);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 绘制图片
   * @private
   */
  private drawImage() {
    // 清除上一帧绘制
    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    // 绘制图片
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.imgX,
      this.imgY,
      this.img.width * this.imgScale,
      this.img.height * this.imgScale,
    );

    this.options?.onChange(this);
  }

  /**
   * 开始拖拽
   * @private
   * @param e
   */
  private startMouse(e: MouseEvent<HTMLElement>) {
    const { pageX, pageY } = e;
    this.isMove = true;
    this.startPos = this.windowToCanvas(pageX, pageY);
  }

  /**
   * 开始触摸
   * @private
   * @param e
   */
  private startTouch(e: TouchEvent<HTMLElement>) {
    const { touches } = e;
    this.isMove = true;
    // 判断是否为多手指
    if (touches.length < 2) {
      const { clientX, clientY } = touches[0];
      // clientX：触摸点相对浏览器窗口的位置
      this.startPos = this.windowToCanvas(clientX, clientY);
    } else {
      this.touches = touches;
    }
  }

  /**
   * 拖拽移动
   * @private
   * @param e
   */
  private moveMouse(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMove) return;
    const { pageX, pageY } = e;
    this.movePos = this.windowToCanvas(pageX, pageY);
    const x = this.movePos.x - this.startPos.x;
    const y = this.movePos.y - this.startPos.y;
    this.imgX += x;
    this.imgY += y;
    // 更新最新位置
    this.startPos = { ...this.movePos };
    this.drawImage();
  }

  /**
   * 移动端拖动缩放
   * @private
   * @param e
   */
  private moveTouch(e: TouchEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isMove || !e.touches) return;
    const { clientX, clientY } = e.touches[0];
    // 如果是单指
    if (e.touches.length < 2) {
      this.movePos = this.windowToCanvas(clientX, clientY);
      const x = this.movePos.x - this.startPos.x;
      const y = this.movePos.y - this.startPos.y;
      this.imgX += x;
      this.imgY += y;
      this.startPos = { ...this.movePos }; // 更新最新位置
    } else {
      const now = e.touches;
      // 处理位置
      const pos = this.windowToCanvas(clientX, clientY);
      const newPos = {
        x: Number(((pos.x - this.imgX) / this.imgScale).toFixed(2)),
        y: Number(((pos.y - this.imgY) / this.imgScale).toFixed(2)),
      };
      // 当前位置
      const curPos = CanvasCropper.getDistance(now[0], now[1]);
      // 前一个位置
      const startPos = CanvasCropper.getDistance(this.touches[0], this.touches[1]);
      // 判断位置是放大还是缩小
      if (curPos > startPos) {
        // 放大
        this.imgScale += 0.03;
        if (this.imgScale >= this.MAX_SCALE) {
          this.imgScale = this.MAX_SCALE;
        }
      } else {
        this.imgScale -= 0.03;
        if (this.imgScale <= this.MINIMUM_SCALE) {
          this.imgScale = this.MINIMUM_SCALE;
        }
      }
      // 计算图片的位置， 更具当前缩放比例，计算新的位置
      this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x);
      this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y);
      this.touches = now;
    }
    this.drawImage();
  }

  /**
   * 拖拽结束
   * @private
   * @param e
   */
  private endMouse(e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) {
    if (!e) {
      return;
    }
    this.isMove = false;
  }

  /**
   * 监听滚轮
   * @private
   * @param e
   */
  private mouseWheel(e: WheelEvent<HTMLElement> & { wheelDelta: number }) {
    e.preventDefault();
    e.stopPropagation();
    const { clientX, clientY, wheelDelta } = e;
    const pos = this.windowToCanvas(clientX, clientY);
    // 计算图片的位置
    const newPos = {
      x: Number(((pos.x - this.imgX) / this.imgScale).toFixed(2)),
      y: Number(((pos.y - this.imgY) / this.imgScale).toFixed(2)),
    };
    // 判断是放大还是缩小
    if (wheelDelta > 0) {
      // 放大
      this.imgScale += 0.05;
      if (this.imgScale >= this.MAX_SCALE) {
        this.imgScale = this.MAX_SCALE;
      }
    } else {
      // 缩小
      this.imgScale -= 0.05;
      if (this.imgScale <= this.MINIMUM_SCALE) {
        this.imgScale = this.MINIMUM_SCALE;
      }
    }
    // 计算图片的位置， 根据当前缩放比例，计算新的位置
    this.imgX = (1 - this.imgScale) * newPos.x + (pos.x - newPos.x);
    this.imgY = (1 - this.imgScale) * newPos.y + (pos.y - newPos.y);
    // 开始绘制图片
    this.drawImage();
  }

  /**
   * 处理鼠标的位置
   * @private
   * @param startX
   * @param startY
   * @returns {IPos}
   */
  private windowToCanvas(startX: number, startY: number): IPos {
    const { left, top, width, height } = this.canvasRef.getBoundingClientRect();
    return {
      x: startX - left - (width - this.canvasRef.width) / 2,
      y: startY - top - (height - this.canvasRef.height) / 2,
    };
  }

  /**
   * 勾股定理，求两点间的直线距离
   * @private
   * @param p1
   * @param p2
   * @returns {number}
   */
  private static getDistance(p1: Touch, p2: Touch): number {
    const x = p2.pageX - p1.pageX;
    const y = p2.pageY - p1.pageY;
    return Math.sqrt(x * x + y * y);
  }

  toDataUrl(): string {
    const sideLength = Math.min(this.canvasRef.width, this.canvasRef.height);
    const offsetX = Math.abs(Math.floor(this.canvasRef.width - this.canvasRef.height) / 2);
    const degree = 0;

    const canvas = document.createElement('canvas');
    canvas.width = sideLength;
    canvas.height = sideLength;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, sideLength, sideLength);
    // 将透明区域设置为透明底边
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, sideLength, sideLength);
    ctx.translate(sideLength * 0.5, sideLength * 0.5);
    ctx.rotate((Math.PI * degree) / 180);
    ctx.translate(-sideLength * 0.5, -sideLength * 0.5);
    ctx.drawImage(this.canvasRef, offsetX, 0, sideLength, sideLength, 0, 0, sideLength, sideLength);

    return canvas.toDataURL();
  }
}
