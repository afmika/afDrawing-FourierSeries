/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

class Complex {
	constructor(re, im) {
		// z = re + i im
		this.setRe(re);
		this.setIm(im);
	}
	
	static fromPolarForm(polar) {
		let module = polar.module;
		let angle = polar.angle;
		let z = new Complex(Math.cos(angle), Math.sin(angle));
		return z.times(module);
	}

	static toPolarForm(z) {

		let module = z.getModule();
		let angle = z.getAngle();
		return {
			angle: angle,
			module: module
		};
	}
	
	add(z) {
		return new Complex(this.getRe() + z.getRe(), this.getIm() + z.getIm());
	}

	getModule() {
		let x = this.getRe(), 
			y = this.getIm();
		return Math.sqrt( x*x + y*y );		
	}
	getAngle() {
		let x = this.getRe(), 
			y = this.getIm();	
		return Math.atan2(y, x);
	}
	getPolarForm() {
		return Complex.toPolarForm( this );
	}
	times(k) {
		return new Complex(this.getRe() * k, this.getIm() * k);
	}



	setRe(re) {
		this.re = re;
	}
	setIm(im) {
		this.im = im;
	}
	getRe() {
		return this.re;
	}
	getIm() {
		return this.im;
	}
}