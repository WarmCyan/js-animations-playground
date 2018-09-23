// thanks in part to https://codepen.io/GiacomoSorbi/pen/OyyzvO

var topspeed = .1;
var circlecount = 1000;

function Circle()
{
	this.x = randRange(-canvas.width / 2, canvas.width / 2);
	this.y = randRange(-canvas.height / 2, canvas.height / 2);

	this.vx = randRange(-topspeed, topspeed);
	this.vy = randRange(-topspeed, topspeed);

	this.radius = 10;

	this.update = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
	
	//this.radius = background ? hyperRange(radMin, radMax) * backgroundMlt : hyperRange(radMin, radMax);
	//this.filled = this.radius < radThreshold ? (randint(0, 100) > filledCircle ? false : 'full') : (randint(0, 100) > concentricCircle ? false : 'concentric');
	//this.color = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
	//this.borderColor = background ? bgColors[randint(0, bgColors.length - 1)] : colors[randint(0, colors.length - 1)];
	//this.opacity = 0.05;
	//this.speed = (background ? randRange(speedMin, speedMax) / backgroundMlt : randRange(speedMin, speedMax)); // * (radMin / this.radius);
	//this.speedAngle = Math.random() * 2 * Math.PI;
	//this.speedx = Math.cos(this.speedAngle) * this.speed;
	//this.speedy = Math.sin(this.speedAngle) * this.speed;
	//var spacex = Math.abs((this.x - (this.speedx < 0 ? -1 : 1) * (canvas.width / 2 + this.radius)) / this.speedx),
		//spacey = Math.abs((this.y - (this.speedy < 0 ? -1 : 1) * (canvas.height / 2 + this.radius)) / this.speedy);
	//this.ttl = Math.min(spacex, spacey);	
}

circles = [];

function randint(a, b) { return Math.floor(Math.random() * (b - a + 1) + a); }
function randRange(a, b) { return Math.random() * (b - a) + a; }	


function drawCircle(ctx, circle)
{
	ctx.beginPath();
	ctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
	ctx.stroke();	
}

function start()
{
	for (var i = 0; i < circlecount; i++)
	{
		circles.push(new Circle());
	}
	window.requestAnimationFrame(draw)
}




function draw()
{
	var ctx = document.getElementById('canvas').getContext('2d');

	// clear the frame
	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();

	//ctx.save();

	// center the context
	ctx.translate(canvas.width / 2, canvas.height / 2);

	for (var i = 0; i < circles.length; i++)
	{
		//console.log(circles[i].x + " " + circles[i].y);
		circles[i].update();
		//console.log(circles[i].x + " " + circles[i].y);
		drawCircle(ctx, circles[i]);
	}
	//ctx.save();
	ctx.restore();
	window.requestAnimationFrame(draw)
}

window.onload = start;
