/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
const canvas = document.getElementById("canvas");
const controlContainer = document.getElementById("controls");
const statusContainer = document.getElementById("status");
const ctx = canvas.getContext("2d");
const _fps = 8;
const _anim = 1000 / _fps;
const Draw = new DrawingTools( ctx );
const Gui = new ControlsGUI( controlContainer );
const StatusGui = new ControlsGUI( statusContainer );
let nframes = 0;


let dt = 1;
let time = 0;
let data_loaded = false;
let enable_circles = false;
let translateX = 200,
	translateY = 200;
let scale = 1.3;
let nb_samples_max = 50;

let phasorX = null,
	phasorY = null;
let drawing = [];
let samples = [];
const delta_sample = 5; // ignores some points

// applying the Direct Fourier Transform to the sample data
const dft = new DFT();
dft.run( datas, delta_sample, function(data) {
	alert("SIGNAL LOADED! SKIPED : "+delta_sample);
	data_loaded = true;
	phasorX = data.fourierX.sort( (a,b) => a.getAmplitude() < b.getAmplitude());
	phasorY = data.fourierY.sort( (a,b) => a.getAmplitude() < b.getAmplitude());

	dt = Math.PI * 2 / phasorX.length;
});

function runAnimation( phasors, axis ) {
	let rotation = 0;
	if(axis == "Y_AXIS") {
		rotation = Math.PI / 2;
	}
	let vectors = [];
	let oldX = 0, oldY = 0;
	let nextX = 0, nextY = 0;
	for (let i = 0; i < phasors.length; i++) {
		oldX = nextX;
		oldY = nextY;
		let z = phasors[i].at( time );
		let polar = Complex.toPolarForm( z );
		polar.angle += rotation;
		z = Complex.fromPolarForm( polar );
		
		nextX += z.getRe(); 
		nextY += z.getIm(); 
		if(enable_circles) {
			Draw.circle(oldX, oldY, phasors[i].getAmplitude(), "grey");
		}
		Draw.line(oldX, oldY, nextX, nextY, "red");
	}

	let head = new Vector(nextX, nextY);
	Draw.point(head, "blue");

	return axis == "Y_AXIS" ? head.y : head.x;
}


function switchMode() {
	enable_circles = ! enable_circles;
}


function drawInfosStatus() {
	let step = 6;
	let tX = canvas.width - 200,
		tY = 0;	
	let resize = 5;
	let vectemp = new Vector(0, 0);

	ctx.save();
	ctx.translate(tX, tY);
	ctx.fillStyle = "aliceblue";
	ctx.fillRect(-200, 0, 400, 300);
	ctx.strokeRect(-200, 0, 400, 300);

	ctx.strokeText("S I G N A L   X", -150, 10);
	ctx.strokeText("S I G N A L   Y", 80, 10);

	Draw.line(0, 0, 0, 300, "black");
	for (let n = 0; n < samples.length; n++) {
		let x = n * step;

		// {x} set
		let heightX = samples[ n ].x / resize;
		Draw.line(0, x, heightX, x, "blue");
		vectemp.setX(heightX);
		vectemp.setY(x);
		Draw.point(vectemp, "blue");

		// {y} set
		let heightY = samples[ n ].y / resize;
		Draw.line(0, x, -heightY, x, "green");
		vectemp.setX(-heightY);
		vectemp.setY(x);
		Draw.point(vectemp, "green");
	}
	ctx.restore();
}



function update() {
	if( data_loaded ) {
		ctx.save();

		// begin drawing
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.scale(scale, scale);
		ctx.translate(translateX, translateY);
		
		let x = runAnimation(phasorX, "X_AXIS");
		let y = runAnimation(phasorY, "Y_AXIS");

		let pen = new Vector(x, y);
		drawing.push( pen );
		samples.push( pen );	
		
		Draw.point(pen, "green");

		let oldX = drawing[0].getX(), oldY = drawing[0].getY();
		for (var i = 1; i < drawing.length; i++) {
			let nextX = drawing[i].getX(),
				nextY = drawing[i].getY();
			
			Draw.line(oldX, oldY, nextX, nextY, "blue");

			oldX = nextX;
			oldY = nextY;

		}
	
		// drawing the axis
		Draw.line(pen.x, -canvas.height, pen.x, canvas.height * 2, "green");
		Draw.line(-canvas.width, pen.y, canvas.width, pen.y, "green");


		if(samples.length > nb_samples_max) {
			samples.shift();
		}

		// end drawing
		ctx.restore();

		drawInfosStatus();

		// time update
		if(time > 2 * Math.PI) {
			//alert("END");
			clearInterval( interval );
		}
		time += dt;
	}
	nframes++;
}


let frame_counter = setInterval(function() {
	Gui.show("RENDERING : "+nframes+" FPS");
	nframes = 0;
}, 1000);
let interval = setInterval(update, _anim);