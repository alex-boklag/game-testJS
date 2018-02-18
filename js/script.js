var colors = ['green', 'blue', 'orange', 'red', 'gold', 'violet', 'pink'];
var cubes = $('.cube');
var p;
var mode = 1;

function randomInteger(min, max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function startOrPauseTimer(){
	mode += 1;
	
	(function startTimer(){
		if(mode % 2 == 1)
		    return;

	    var presentTime = $('#time').prop('value');
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSeconds((timeArray[1] - 1));
        if(s == 59)
         	m = m - 1;
        if(m < 0){
        	var points = $('#points').prop('value');
    	    $('#score').prop('innerHTML', 'Score: ' + points);
    	    $('#exampleModal').modal({
    	    	backdrop: 'static'
    	    })
    	    return;
        }
        $('#time').prop('value', m + ":" + s);
        setTimeout(startTimer, 1000);
    })();

    function checkSeconds(sec){
        if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
        if (sec < 0) {sec = "59"};
        return sec;
    }
}

function addStartCubes(){
	p = 0;
	$('#points').prop('value', p);
	$('#time').prop('value', '01:00');
	for(var number in cubes){
		cubes[number].style.border = "1px solid black";
		cubes[number].style.backgroundColor = 'white';
		cubes[randomInteger(0,49)].style.backgroundColor = colors[randomInteger(0,6)];
	}	
}

function removeAndAddCubes(cube){
	var number, n=randomInteger(0,2);

	if(cube.style.backgroundColor != 'white'){
		cube.style.backgroundColor = 'white';
		p+=1;
		$('#points').prop('value', p);
		
		for(var i=0; i<n; i++){
		    number = randomInteger(0,49);
		    if(cubes[number].style.backgroundColor == 'white'){
			    cubes[number].style.backgroundColor = colors[randomInteger(0,6)];
		    }
		    else{
			    i-=1;
		    }
	    }
    }
}

function saveResult(){
	var score = $('#score').prop('innerHTML');
	score = score.split(':'); 
	score = score[1];

	var name = $('#username').prop('value');
    document.getElementById('results').innerHTML += ' ' + name + ' - ' + score + '<br>';
    $('#exampleModal').modal('hide');
    $('#username').prop('value', '');
	return;
}

$(function(){
    $('#timer').click(function(){
        startOrPauseTimer();
    })
    $('#new').click(function(){
        addStartCubes();
    })
    $('.cube').click(function(){
        removeAndAddCubes(this);
    })
    $('#save').click(function(){
        saveResult();
    })
});