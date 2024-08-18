import Tool from "./Tool";

export default class Circle extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX-e.target.offsetLeft;
            // let currentY = e.pageY-e.target.offsetTop;
            let radius = Math.abs(currentX - this.startX);
            this.draw(this.startX, this.startY, radius);
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX-e.target.offsetLeft;
        this.startY = e.pageY-e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    draw(x, y, r) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();

            this.ctx.arc(this.startX, this.startY, r, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
}