// thanks in part to https://codepen.io/GiacomoSorbi/pen/OyyzvO

var maxopacity = 0.3;
var topspeed = 0.1;

var fadein = 100.0; 
var fadeout = 100.0;

var spawnfrequency = 5;
var circlecount = 10;
var maxcirclecount = 500;

var minlife = 100;
var maxlife = 500;



function Circle()
{
	this.x = randRange(-canvas.width / 2, canvas.width / 2);
	this.y = randRange(-canvas.height / 2, canvas.height / 2);

	this.vx = randRange(-topspeed, topspeed);
	this.vy = randRange(-topspeed, topspeed);
	
	this.radius = randInt(1, 50);

	this.update = function()
	{
		this.x += this.vx;
		this.y += this.vy;

		if (this.opacity < this.targetopacity && this.age < this.lifetime) { this.opacity += (this.targetopacity / fadein); }
		else if (this.opacity > 0 && this.age > this.lifetime) { this.opacity -= (this.targetopacity / fadeout); }
		if (this.opacity < 0.0) { this.opacity = 0.0; }

		this.age += 1;

		if (this.opacity == 0.0 && this.age > this.lifetime) { this.dead = true; }
	}

	this.opacity = 0.0;
	this.targetopacity = randRange(0.01, maxopacity);


	var styleselector = randInt(1, 3);
	
	if (styleselector == 1)
	{
		this.color = "#999999";
		this.fill = true;
	}
	else if (styleselector == 2)
	{
		this.color = "#FFFFFF";
		this.fill = true;
	}
	else if (styleselector == 3)
	{
		this.color = "#555555";
		this.fill = false;
	}

	this.lifetime = randInt(minlife,maxlife);
	this.age = 0;

	this.dead = false;
}

circles = [];

function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1) + a); }
function randRange(a, b) { return Math.random() * (b - a) + a; }	


function drawCircle(ctx, circle)
{
	ctx.beginPath();
	ctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
	ctx.globalAlpha = circle.opacity;

	if (circle.fill)
	{
		ctx.fillStyle = circle.color;
		ctx.fill();	
	}
	else
	{
		ctx.strokeStyle = circle.color;
		ctx.stroke();
	}
}

function start()
{
	for (var i = 0; i < circlecount; i++)
	{
		circles.push(new Circle());
	}
	window.requestAnimationFrame(draw)
}



var spawntimer = spawnfrequency; // frame counter between spawns

function draw()
{
	var ctx = document.getElementById('canvas').getContext('2d');

	// clear the frame
	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();

	// center the context
	ctx.translate(canvas.width / 2, canvas.height / 2);

	// draw every circle
	var dead = [];
	for (var i = 0; i < circles.length; i++)
	{
		circles[i].update();
		drawCircle(ctx, circles[i]);
		if (circles[i].dead) { dead.push(i); }
	}

	// handle spawns
	if (circles.length < maxcirclecount)
	{
		spawntimer += 1;
		if (spawntimer >= spawnfrequency)
		{
			spawntimer = 0;
			circles.push(new Circle());
		}
	}

	// handle despawns
	for (var i = circles.length - 1; i >= 0; i--)
	{
		if (dead.indexOf(i) != -1) { circles.splice(i, 1); }
	}
	
	ctx.restore();
	window.requestAnimationFrame(draw)
}

window.onload = start;
