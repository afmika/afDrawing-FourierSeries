/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
const controlContainer = document.getElementById("controls");
const statusContainer = document.getElementById("status");
const ctx = canvas.getContext("2d");
const _fps = 40;
const _anim = 1000 / _fps;
const Draw = new DrawingTools( ctx );
const Gui = new ControlsGUI( controlContainer );
const StatusGui = new ControlsGUI( statusContainer );
let nframes = 0;

// test 
const amplitude = 100; //px
const frequency = 0.5; // 2pi / s
const phi = Math.PI / 4; //angle

// one sample in each frame => in one sec = _fps new samples
const dt =  2 * Math.PI / _fps;
const nb_samples_max = 150;
let time = 0;


let samples = [];
let translateX = amplitude,
	translateY = canvas.height / 2;
let phasor = new Phasor(amplitude, frequency, phi);

function update() {
	ctx.save();

	// begin drawing
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(translateX, translateY);
	

	// axis
	Draw.axis(-canvas.width / 2, canvas.width , -canvas.height / 2, canvas.height / 2, "red");

	// phasor
	Draw.phasor(phasor, time, "rgb(0,15,255)");
	let tX = phasor.getAmplitude();

	// the wave
	let cmptemp =  phasor.at(time);
	samples.push( cmptemp );

	if(samples.length > nb_samples_max) {
		samples.shift();
	}

	let vectemp = new Vector(0, 0);
	Draw.line(tX, -canvas.height/2, tX, canvas.height/2, "green");
	Draw.line(-100, cmptemp.getIm(), canvas.width * 2, cmptemp.getIm(), "orange");
	
	for (var n = 0; n < samples.length; n++) {
		let cmpx = samples[n];
		let y = cmpx.getIm();
		let step = 5;

		let x = tX + n * step;
		// y = f(t) 
		Draw.line(x, 0, x, y, "blue");

		vectemp.setX(tX + n * step);
		vectemp.setY(y);
		Draw.point(vectemp, "blue");
	}

	// end drawing
	ctx.restore();

	// time update
	time += dt;

	// GUI
	let angle = Complex.toPolarForm( phasor.at(time) ).angle;
	let deg = angle * 180 / Math.PI;
	StatusGui.appendHTML("");
	StatusGui.show("");
	StatusGui.appendText("Frequency "+phasor.getPulsation()+" x 2pi/s" );
	StatusGui.appendText(" - Amplitude "+phasor.getAmplitude()+" px" );
	StatusGui.appendText(" - Angle ~ "+Math.floor(deg) );
	StatusGui.appendHTML("<h3>y(t) = "+amplitude+".exp[("+frequency+" t + "+phi+")i]</h3>");
	StatusGui.appendHTML("<h4>y("+time+") = "+amplitude+".exp[("+frequency * time + phi+")i]</h4>");
	StatusGui.appendHTML("<h4>y("+time+") = "+cmptemp.getRe()+" + i "+cmptemp.getIm());

	nframes++;
}


let frame_counter = setInterval(function() {
	Gui.show("FPS : "+nframes );
	nframes = 0;
}, 1000);
let interval = setInterval(update, _anim);