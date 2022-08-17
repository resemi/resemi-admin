import React from 'react';

export interface IPos {
  x: number;
  y: number;
}

export interface CanvasCropperOptions {
  width?: number;
  height?: number;
  onChange?: (e: CanvasCropper) => void;
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
  private touches: React.TouchList;

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

  constructor(canvas: HTMLCanvasElement, options?: CanvasCropperOptions) {
    this.canvasRef = canvas;
    this.options = options;
    const { width = 300, height = 200 } = this.options;
    this.canvasRef.width = width;
    this.canvasRef.height = height;
    this.ctx = canvas.getContext('2d');
  }

  /**
   * 初始化
   * @memberof MapCanvas
   */
  async initCanvas(url: string) {
    this.clear();

    await this.loadImage(url);
    this.drawImage();
    // PC端事件监听
    this.canvasRef.addEventListener('mousedown', this.startMouse.bind(this));
    this.canvasRef.addEventListener('mousemove', this.moveMouse.bind(this));
    this.canvasRef.addEventListener('mouseup', this.endMouse.bind(this));
    // 监听滚轮
    this.canvasRef.addEventListener('mousewheel', this.mouseWheel.bind(this));
    // 监听滚轮
    this.canvasRef.addEventListener('wheel', this.mouseWheel.bind(this));
    // 移动端事件监听
    this.canvasRef.addEventListener('touchstart', this.startTouch.bind(this));
    this.canvasRef.addEventListener('touchmove', this.moveTouch.bind(this));
    this.canvasRef.addEventListener('touchend', this.endMouse.bind(this));
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
    this.canvasRef.removeEventListener('mousedown', this.startMouse.bind(this));
    this.canvasRef.removeEventListener('mousemove', this.moveMouse.bind(this));
    this.canvasRef.removeEventListener('mouseup', this.endMouse.bind(this));
    // 监听滚轮
    this.canvasRef.removeEventListener('mousewheel', this.mouseWheel.bind(this));
    // 监听滚轮
    this.canvasRef.removeEventListener('wheel', this.mouseWheel.bind(this));
    // 移动端事件监听
    this.canvasRef.removeEventListener('touchstart', this.startTouch.bind(this));
    this.canvasRef.removeEventListener('touchmove', this.moveTouch.bind(this));
    this.canvasRef.removeEventListener('touchend', this.endMouse.bind(this));
  }

  /**
   * 图片加载
   * @private
   * @param {string} url
   * @returns
   * @memberof MapCanvas
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
   * @memberof MapCanvas
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
   * @param {(React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>)} e
   * @memberof MapCanvas
   */
  private startMouse(e: React.MouseEvent<HTMLElement>) {
    const { pageX, pageY } = e;
    this.isMove = true;
    this.startPos = this.windowToCanvas(pageX, pageY);
  }

  /**
   * 开始触摸
   * @private
   * @param {React.TouchEvent<HTMLElement>} e
   * @memberof MapCanvas
   */
  private startTouch(e: React.TouchEvent<HTMLElement>) {
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
   * @param {(React.MouseEvent<HTMLElement> } e
   * @memberof MapCanvas
   */
  private moveMouse(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
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
   * @param {React.TouchEvent<HTMLElement>} e
   * @memberof MapCanvas
   */
  private moveTouch(e: React.TouchEvent<HTMLElement>) {
    e.preventDefault();
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
   * @param {(React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>)} e
   * @memberof MapCanvas
   */
  private endMouse(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) {
    if (!e) return;
    this.isMove = false;
  }

  /**
   * 监听滚轮
   * @private
   * @param {(React.WheelEvent<HTMLElement> & { wheelDelta: number })} e
   * @memberof MapCanvas
   */
  private mouseWheel(e: React.WheelEvent<HTMLElement> & { wheelDelta: number }) {
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
   * @param {number} startX
   * @param {number} startY
   * @returns {IPos}
   * @memberof MapCanvas
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
   * @param {React.Touch} p1
   * @param {React.Touch} p2
   * @returns {number}
   * @memberof MapCanvas
   */
  private static getDistance(p1: React.Touch, p2: React.Touch): number {
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
