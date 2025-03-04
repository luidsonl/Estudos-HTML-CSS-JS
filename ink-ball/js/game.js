import { Ball } from "./ball.js";
import { Line } from "./line.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();

        window.addEventListener("resize", () => this.resizeCanvas());

        this.balls = [
            new Ball(100, 100, 20, 3, 3, "red"),
            new Ball(200, 200, 20, -3, 4, "blue")
        ];

        this.lines = [];
        this.isDrawing = false;

        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.startDrawing(e.clientX, e.clientY);
        });
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.isDrawing) {
                this.drawLine(e.clientX, e.clientY);
            }
        });
        this.canvas.addEventListener("mouseup", () => {
            this.stopDrawing();
        });

        this.canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrawing(touch.clientX, touch.clientY);
        });
        this.canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            if (this.isDrawing) {
                const touch = e.touches[0];
                this.drawLine(touch.clientX, touch.clientY);
            }
        });
        this.canvas.addEventListener("touchend", () => {
            this.stopDrawing();
        });
        this.canvas.addEventListener("touchcancel", () => {
            this.stopDrawing();
        });
    }

    startDrawing(x, y) {
        this.isDrawing = true;
        const newLine = new Line();
        newLine.addPoint(x, y);
        this.lines.push(newLine);
    }

    drawLine(x, y) {
        const currentLine = this.lines[this.lines.length - 1];
        currentLine.addPoint(x, y);
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    checkCollisions() {
    this.balls.forEach(ball => {
        this.lines.forEach((line, index) => {
            if (line.collidesWithBall(ball)) {
                this.lines.splice(index, 1);
            }
        });
    });
}

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.balls.forEach(ball => {
            ball.update(this.canvas);
            ball.draw(this.ctx);
        });

        this.lines.forEach(line => line.draw(this.ctx));
        this.checkCollisions();

        requestAnimationFrame(() => this.animate());
    }
}