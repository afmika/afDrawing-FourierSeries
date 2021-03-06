/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class DFT {
	constructor() {}

	runForComplexData(data_obj, skip, fun) {
		let cmpxs = [];
		let index = 0;
		data_obj.forEach(point => {
			if(skip != undefined) {
				if(skip <= 0) {
					cmpxs.push( point );
				} else {
					if(index % skip == 0) {
						cmpxs.push( point );					
					}
				}
				index++;
			} else {
				cmpxs.push( point );					
			}
		});

		if(fun) {
			fun({
				fourier : DFT.computeSignals( cmpxs, 'COMPLEX_DATA' ),
			});
		}
	}

	run(data_obj, skip, fun) {
		let x = [], y = [];
		let index = 0;
		data_obj.forEach(point => {
			if(skip != undefined) {
				if(skip <= 0) {
					x.push( point.x );
					y.push( point.y );
				} else {
					if(index % skip == 0) {
						x.push( point.x );
						y.push( point.y );					
					}
					index++;
				}
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
	static computeSignals(data, option) {
	  /*
	  * BASIC IMPLEMENTATION OF THE DFT (DISCRETE FOURIER TRANSFORM)
	  * X[k] = A(k) + i (b) = R.exp(i q) = Sum(n from 0 to N-1 of [ data[n] * exp(-2pi.k.n/N)) ]
	  * where x[n] = data[n] = 
	  */
	  // simple stuff :)
		let nb_points = data.length;
		let is_complex = false;
		if(option != undefined) {
			is_complex = option == 'COMPLEX_DATA';
			console.log("DATA SET TREATED AS COMPLEX NUMBERS");
		} else {
			console.log("DATA SET TREATED AS REAL NUMBERS");
		}

		let X = []; // will contain the DFT result <-> [...coefs * exp(-2pi n k/ N)..]
		for (let k = 0; k < nb_points; k++) {
			let temp_k = new Complex(0, 0);

			for (var n = 0; n < nb_points; n++) {
				// -2pi n k / N
				let phi = (2 * Math.PI * k * n) / nb_points; 
				
				if( is_complex ) {

					// the data set must be an array of points [... {x, y}]
					if(data[n].x == undefined || data[n].y == undefined) {
						throw "data[] must be an array of points ! [... ,{x, y}..]";
					}
					
					let data_n = new Complex(data[n].x, data[n].y);
					let polar_n = Complex.toPolarForm(data_n);
					// A.exp(ai) * B.exp(bi) = A.B.exp((a+b)i) 
					let _value = Complex.fromPolarForm({
						angle: polar_n.angle + phi,
						module: polar_n.module * 1 // well...
					});

					temp_k = temp_k.add(_value);

				} else {

					// the data set must be an array of real numbers [ ... 1, -1, 3.5, ...]
					if(typeof data[n] != 'number') {
						throw "data[] must be an array of real numbers ! [.... a[k], a[k+1], ...]";
					}
					temp_k = temp_k.add(new Complex(
						data[n] * Math.cos(phi), /* plugging -1 will reverse the drawing with pi/2 rotation */
						data[n] * Math.sin(phi) /* plugging -1 will reverse the drawing order */
					));
				}
				// 
			}

			temp_k = temp_k.times( 1 / nb_points );
			// temp_k  = coef[k] * exp(2pi n k / N)
			
			let polar = Complex.toPolarForm(temp_k);
			let amplitude = polar.module, 
				pulsation = k, 
				phase = polar.angle;
			X[k] = new Phasor(amplitude, pulsation, phase);
		}
		return X;		
	}
}