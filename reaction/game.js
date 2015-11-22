$(document).ready(function(){
	var no_of_blocks=100;
	function check(){
		var cp1=0;
		var cp2=0;
		for(var i=0;i<100;i++)
		{
			if(document.getElementsByClassName('block')[i].getAttribute('pcolor') == '0')
				cp1=cp1+1;
			else
				cp2=cp2+1;
		}
		if(cp1 == 100)
			return 1;
		else if(cp2 == 100)
			return 2;
		else if(cp1>cp2)
			return 3;
		else
			return 4;
	}


	function init(){
		
	}



});