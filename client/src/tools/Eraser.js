import Tool from "./Tool";

export default class Eraser extends Tool{
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
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop)
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop)
    }

    draw(x, y) {
        this.ctx.strokeStyle = "rgb(255, 255, 255)"
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}