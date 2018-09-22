// thanks in part to https://codepen.io/GiacomoSorbi/pen/OyyzvO

function Circle()
{
	//self.x = randRange(
}

function randint(a, b) { return Math.floor(Math.random() * (b - a + 1) + a); }
function randRange(a, b) { return Math.random() * (b - a) + a; }	


function start()
{
	window.requestAnimationFrame(draw)
}




function draw()
{
	var ctx = document.getElementById('world').getContext('2d');

	// clear the frame
	ctx.clearRect(0,0,canvas.width,canvas.height);


	ctx.save();

	// center the context
	ctx.translate(canvas.width / 2, canvas.height / 2);
}
