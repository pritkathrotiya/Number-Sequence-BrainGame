var row = 1;
var score=0;
var timer=60;
var divider=1;
var matchId=1;
var total=((row+1)*(row+1));
var selectNumber=new Array();
var colors=["#ACDDDE","#CAF1DE","#E1F8DC","#FFE7C7","#D8E2DC","#FFDDE4","#FFEE93","#ADF7B6"];

window.onload= function () {
	create_table(row);
	reduceTimer();
}

function reduceTimer(){
	document.getElementById('timer').innerHTML=timer;
	timer--;
	if(timer<0) {
		$('#myModal').modal('show');
		document.getElementById('score').innerHTML='Your Score Is '+score;
		return;
	};
	setTimeout(reduceTimer,1000);
}

function create_table(row) {
	var rows = [];
	var colStr = null;
	var id=null;
	for(var j = 0; j <= row; j++) {
		colStr = "";
		for (var i = 0; i <= row; i++){
			id=getNumber();
			var cell = '<td id='+id+' class="btnStyle" onclick=" return btnClick(this)">'+id+'</td>';
			colStr += cell;
		};
		rows.push('<tr>' + colStr + '</tr>');
	}
	document.getElementById('tbl').innerHTML += rows.join("");
	reduceButtonAndText();
	fillColor();
}

function getNumber(){
	var flag=true;
	var random= Math.floor(Math.random() * total)+1;
	for(var i=0;i<selectNumber.length;i++){
		if(selectNumber[i]==random){
			flag=false;
		}
	}
	if(flag){
		selectNumber.push(random);	
		return random;	
	}
	else{
		return getNumber();
	}
}

function btnClick(x) {
	if(total==x.id && document.getElementById((x.id)-1).style.visibility=="hidden"){
		if(row==6){
			row=6;
		}
		else{
			row++;
			total=((row+1)*(row+1));
		}
		document.getElementById('tbl').innerHTML="";
		matchId=1;
		selectNumber=[];
		create_table(row);
		timer=60;
		score++;
	}
	else{
		if(x.id!=matchId){
			return false;
		}
		else{
			x.style.visibility="hidden";
			matchId++;
		}
	}
}

function reduceButtonAndText(){
	if(row<6){
		divider=divider+0.2;
	}
	else{
		divider=divider;
	}
	var btnStyle = document.getElementsByTagName('td');
	for(var i=0 ; i<btnStyle.length; i++){
		var temp=(100/divider);
		var temp2=2.2/divider;
		btnStyle[i].style.width=temp+'px';
		btnStyle[i].style.height=temp+'px';
		btnStyle[i].style.fontSize=temp2+'em';
	}
}

function fillColor(){

	var item = colors[Math.floor(Math.random()*colors.length)];
	var btnStyle =document.getElementsByClassName('btnStyle');

	for(var i=0 ; i<btnStyle.length; i++){
		btnStyle[i].style.backgroundColor=item;
	}
}

function restart(){
	window.location.reload();
}
