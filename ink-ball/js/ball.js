export class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(canvas) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy *= -1;
        }
    }
}