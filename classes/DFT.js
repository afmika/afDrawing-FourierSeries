/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class DFT {
	constructor() {}
	run(data_obj, skip, fun) {
		let x = [], y = [];
		let index = 0;
		data_obj.forEach(point => {
			if(skip != undefined) {
				if(index % skip == 0) {
					x.push( point.x );
					y.push( point.y );					
				}
				index++;
			} else {
				x.push( point.x );
				y.push( point.y );
			}
		});

		if(fun) {
			fun({
				fourierX : DFT.computeSignals( x ),
				fourierY : DFT.computeSignals( y )
			});
		}
	}
	static computeSignals(data) {
	  /*
	  * BASIC IMPLEMENTATION OF THE DFT (DIRECT FOURIER TRANSFORM)
	  * X[k] = A(k) + i (b) = R.exp(i q) = Sum(n from 0 to N-1 of [ data[n] * exp(-2pi.k.n/N)) ]
	  */
	  // simple stuff :)
		let nb_points = data.length;
		let X = []; // will contain the DFT result
		for (let k = 0; k < nb_points; k++) {
			let temp_k = new Complex(0, 0); 
			for (var n = 0; n < nb_points; n++) {
				let phi = (2 * Math.PI * k * n) / nb_points; 
				temp_k = temp_k.add(new Complex(
					data[n] * Math.cos(phi), /* plugging -1 will reverse the drawing with pi/2 rotation */
					data[n] * Math.sin(phi) /* plugging -1 will reverse the drawing order */
				));
			}
			temp_k = temp_k.times( 1 / nb_points );
			
			let polar = Complex.toPolarForm(temp_k);
			let amplitude = polar.module, 
				pulsation = k, 
				phase = polar.angle;
			X[k] = new Phasor(amplitude, pulsation, phase);
		}
		return X;		
	}
}