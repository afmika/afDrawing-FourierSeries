/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */

class Phasor {
	constructor(amplitude, pulsation, phase) {
		// Phasor(t) = A. exp((wt + phi) i)
		// Note: Phase = start angle (at t = 0)
		// Phasor(0) = A. exp(phase * i)
		this.setAmplitude(amplitude); // A
		this.setPulsation(pulsation); // w
		this.setPhase(phase); // phi
		//console.log(amplitude, pulsation, phase)
	}

	at( t ) {
		let w = this.getPulsation(),
			phi = this.getPhase(),
			A = this.getAmplitude();
		let polar = {
			angle: w * t + phi,
			module: A 
		};
		//console.log(polar);

		let z = Complex.fromPolarForm( polar );
		return z;
	}


	setAmplitude(amplitude) {
		this.amplitude = amplitude;
	}
	setPhase(phase) {
		this.phase = phase;
	}
	setPulsation(pulsation) {
		this.pulsation = pulsation;
	}

	getAmplitude() {
		return this.amplitude;
	}
	getPhase() {
		return this.phase;
	}
	getPulsation() {
		return this.pulsation;
	}
}