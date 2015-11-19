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
	}



});