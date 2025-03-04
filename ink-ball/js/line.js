export class Line {
    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push({ x, y });
    }

    draw(ctx) {
        if (this.points.length < 2) return

        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
    }

    collidesWithBall(ball) {
        for (let i = 0; i < this.points.length - 1; i++) {
            let p1 = this.points[i];
            let p2 = this.points[i + 1];

            let distance = this.pointToSegmentDistance(ball.x, ball.y, p1.x, p1.y, p2.x, p2.y);
            if (distance < ball.radius) {
                this.handleCollision(ball, p1, p2);
                return true;
            }
        }
        return false;
    }

    pointToSegmentDistance(px, py, x1, y1, x2, y2) {
        let A = px - x1;
        let B = py - y1;
        let C = x2 - x1;
        let D = y2 - y1;

        let dot = A * C + B * D;
        let len_sq = C * C + D * D;
        let param = len_sq !== 0 ? dot / len_sq : -1;

        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        let dx = px - xx;
        let dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    handleCollision(ball, p1, p2) {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let norm = Math.sqrt(dx * dx + dy * dy);
        dx /= norm;
        dy /= norm;
        
        let dotProduct = (ball.dx * dx + ball.dy * dy);
        ball.dx -= 2 * dotProduct * dx;
        ball.dy -= 2 * dotProduct * dy;
    }
}