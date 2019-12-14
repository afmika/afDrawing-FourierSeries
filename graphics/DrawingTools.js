/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class DrawingTools {
	constructor(context) {
		if(context) {
			this.context = context;
		} else {
			throw "PLEASE DEFINE A 2D CONTEXT FIRST";
		}
	}
	setFill(color) {
		this.context.fillStyle = color;
	}
	setOutline(color) {
		this.context.strokeStyle = color;
	}
	setLineWidth(width) {
		this.context.lineWidth = width;
	}


	line(minX, minY, maxX, maxY, stroke) {
		let context = this.context;

		// x
		context.beginPath();
		context.strokeStyle = stroke || "black";
		
		context.moveTo(minX, minY);
		context.lineTo(maxX, maxY);

		context.stroke();
		context.closePath();		
	}

	axis(minX, maxX, minY, maxY, stroke) {

		// x
		this.line(minX, 0, maxX, 0, stroke);

		// y	
		this.line(0, minY, 0, maxY, stroke);	
	}

	circle(centerX, centerY, radius, stroke, fill) {
		let context = this.context;

		context.beginPath();
		context.strokeStyle = stroke || "black";
		
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		if( fill ) {
			context.fillStyle = fill;
			context.fill();
		}
		context.stroke();
		context.closePath();		
	}

	phasor(phasor, time, stroke, fill) {
		// we start at 0, 0 and translate the context instead
		let context = this.context;
		let radius = phasor.getAmplitude();
		this.circle(0, 0, radius, stroke, fill);

		let z = phasor.at(time);
		context.beginPath();
		context.strokeStyle = stroke || "black";
		context.moveTo(0, 0);
		context.lineTo(z.getRe(), z.getIm());
		if( fill ) {
			context.fillStyle = fill;
			context.fill();
		}		
		context.stroke();
		context.closePath();
	}

	point( vec , color ) {
		let x = vec.getX(), y = vec.getY();
		let context = this.context;

		context.beginPath();
		context.fillStyle = color || "red";
		context.arc(x, y, 2, 0, 2 * Math.PI, false);
		context.fill();
		context.closePath();
	}
}