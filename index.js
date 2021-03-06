var score = 0;
const c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth*3;
c.height = window.innerHeight*0.965;

function Ball(x , y , r , dx , color){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.r = r;
	this.color = color;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x , this.y , this.r , 0 , 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	this.update = function(){
		this.draw();
		this.x -= this.dx;
	}
}

var array = [];
var x = c.width + 10;
for(let i = 0 ; i < 10900 ; i++){
	x -= 10;
	let y = Math.random() * (c.height + 20) + 2;
	let r = 1.3;
	let color = "white"; 
	let dx = Math.random() * 10 + 4;
	array.push(new Ball(x , y , r , dx , color));
}

function Particle(x , dx , y , w , h , color , flag){
	this.x = x;
	this.dx = dx;
	this.y = y;
	this.w = w;
	this.h = h;
    this.color = color;
    this.flag = flag;

	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x , this.y , this.w , this.h);
	}
	this.update=function()
	{
		this.draw();
		this.x+=this.dx;
	}
}

var ar=[];var x=c.width+10000;
for(var f=0;f<500;f++){
	x-=250;
	var y=Math.random()*(c.height-100)+20;
	for(var d=0;d<f;d++){
		if(array[f].y==array[d].y){
			var y=Math.random()*(c.height-100)+20;
		}
	}
	var w=15;
	var h=10;
	var color="#ff801f";
	var dx=-6;
	ar.push(new Particle(x,dx,y,w,h,color,0));
}

var mouse={x:10,y:10};

window.addEventListener("mousemove" , function(event){
  mouse.x=event.x;
  mouse.y=event.y;
});

var x1=0,y1=0;
var c1=0,c2=0;
var xc=200;
var flag=0;
var xD=0,yD=0;var x4=0,y4=0,y5=0,x5=0;

function getDistance(x4,x5,y4,y5){
	xD=x5-x4;
	yD=y5-y4;
	return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
}

var gun=[];
for(let gu=0;gu<20;gu++){
	let x=0;
	let y=0;
	let dx=0;
	let w=5;
	let h=2;
	let color="black";
	gun.push(new Particle(x,dx,y,w,h,color,0));
}

var ct=0;

var shooter=new Particle(x1,0,y1,30,20,"lightblue",0);

function animate()
{
	requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth*3,innerHeight);
    ctx.font="20px Arial";
    ctx.fillStyle="white";
    ctx.fillText("SCORE: " + score,1200,30);
    for(var j=0;j<array.length;j++){
    	array[j].update();
    }
    for(var pi=0;pi<gun.length;pi++){
    	gun[pi].update();
    	if(gun[pi].flag==0){
    		gun[pi].x=shooter.x;
    		gun[pi].y=shooter.y+10;
        }
    }
    for(var s=0;s<ar.length;s++){
    	ar[s].update();
    	if( getDistance(ar[s].x,shooter.x,0,0)<=30 && shooter.y<=ar[s].y+ar[s].w 
    		&& shooter.y+shooter.w>=ar[s].y && ar[s].w!=0){
    		gameOver();
    	}
    	if(ct>0){
    		if( getDistance(ar[s].x,gun[ct-1].x,0,0)<=20 && gun[ct-1].y+gun[ct-1].w>=ar[s].y &&
    		 gun[ct-1].y<=ar[s].y+ar[s].w && ar[s].w!=0 && gun[ct-1].flag==1 && gun[ct-1].w!=0){
                score+=1;
	    	    ar[s].w=0;
	    	    gun[ct-1].w=0;
    	    }
        }
    }

    shooter.x=mouse.x;
    shooter.y=mouse.y;
    shooter.draw();
}


window.addEventListener("keyup", function(event){
	if(event.keyCode=="13"){
			gun[ct].dx=17;
			gun[ct].flag=1;
			gun[ct].w=20;
			gun[ct].color="red";
			ct++;
		}
});

animate();

function gameOver(){
    document.getElementById('endBox').style.display = 'block';
	document.getElementById('gamePage').style.opacity = '0.2';
	document.getElementById('score').innerHTML = score ; 
}