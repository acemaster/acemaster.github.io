$(document).ready(function(){

	String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
	};


	function add_state() {
		// current_state=current_state+1;
		htmlstr="";
		statearr.push($('#newstate').val());
		statemap[$('#newstate').val()]=no_of_states;
		console.log(statearr);
		if(no_of_variables == 0 && no_of_states == 0){
			variablesarr.push($('#newvariable').val());
			console.log(variablesarr);
			$('#variable_list').append(variable_name.format($('#newvariable').val()));
			$('#variable_list').show();
			variablemap[$('#newvariable').val()]=no_of_variables;
		}
		for (var i =0;i<=no_of_variables;i++) {
			tempstr=input.format(no_of_states,i);
			htmlstr=htmlstr+col.format(no_of_states,i,tempstr);
		};
		var statenme=state_name.format($('#newstate').val());
		htmlstr=statenme+htmlstr;
		var finalstr=row.format(no_of_states,htmlstr);
		$('#form-elements').append(finalstr);
		no_of_states=no_of_states+1;
	}


	function add_variable(){
		htmlstr="";
		no_of_variables=no_of_variables+1;
		variablesarr.push($('#newvariable').val());
		$('#variable_list').append(variable_name.format($('#newvariable').val()));
		variablemap[$('#newvariable').val()]=no_of_variables;
		console.log(variablesarr);
		for (var i = 0; i <=no_of_states; i++) {
			tempstr=input.format(i,no_of_variables);
			htmlstr=col.format(i,no_of_variables,tempstr);
			$('#state'+i).append(htmlstr);
		};

	}
	// add_state();
	// add_variable();

	function add_tape(){
		tape_count=tape_count+1;
		tempstr=tapeele.format(tape_count);
		pointerstr=pointerele.format(tape_count);
		$('#tape').append(tempstr);
		$('#pointer').append(pointerstr);
		if(tape_count != 1){
			console.log(tape_count);
			$('#arrow'+tape_count).hide();
		} 
		 $('#tape').append($('#lasttape'));
		 $('#pointer').append($('#lastpointer'));
	}

	function rem_tape(){
		tempstr=tapeele.format(tape_count);
		$('#tape'+tape_count).remove();
		$('#pointer'+tape_count).remove();
		tape_count=tape_count-1;
	}


	function simulate(simarray){
		console.log(simarray);
		var tape=simarray[0];
		var state=simarray[1];
		var value=$('#tape'+tape+" input").val();
		prevvalue=value;
		console.log(value);
		console.log(statemap);
		console.log(variablemap);
		var sindex=statemap[state];
		var vindex=variablemap[value];
		console.log("Sindex: "+sindex);
		console.log("Vindex: "+vindex);
		var new_value=$('#variablereplace'+sindex+vindex).val();
		var direction=$('#variabledir'+sindex+vindex).val();
		console.log("Now at "+state);
		console.log("Moving "+direction);
		console.log("New value to be overwritten "+new_value);
		$('#tape'+tape+" input").val(new_value);
		$('#arrow'+tape).hide();
		if(direction == "left" && tape>0 && tape<=tape_count)
			tape=tape-1;
		else if(direction == "right" && tape>0 && tape<=tape_count)
			tape=tape+1;
		else
		{
			$('#arrow'+tape).show();
			alert('Tape ended');
		}
		var nextstate=$('#variable'+sindex+vindex).val();
		var nextvalue=$('#variablereplace'+sindex+vindex).val();
		var nextdir=$('#variabledir'+sindex+vindex).val();
		$('#currentstateh1').html("Current State is: "+nextstate);
		if(nextvalue == ''){
			alert("No state from here turing machine ended");
		}
		else if(nextstate == 'qf'){
			alert('Final state reached');
		}
		$('#arrow'+tape).show();
		return [tape,nextstate];
	}

	$('#addstate').click(function(){
		add_state();
	});

	$('#addvariable').click(function(){
		add_variable();
	});

	$('#addtape').click(function(){
		add_tape();
	})

	$('#subtracttape').click(function(){
		rem_tape();
	})

	$('#nextstate').click(function(){
		prevsimulatearray=simulatearray;
		simulatearray=simulate(simulatearray);
		console.log(simulatearray);
	})

	$('#prevstate').click(function() {
		$('#arrow'+simulatearray[0]).hide();
		$('#arrow'+prevsimulatearray[0]).show();
		$('#tape'+prevsimulatearray[0]+' input').val(prevvalue);
		simulatearray=prevsimulatearray;
		console.log("Revered to previous. simarray value: "+simulatearray);
	})
	$('#startover').click(function(){
		prevsimulatearray=[1,'q0'];
		simulatearray=[1,'q0'];
		for(var i=1;i<=tape_count;i++){
			$('#tape'+i+' input').val('B');
		}
		$('#arrow'+simulatearray[0]).show();
	})

	function simulatefunc() {
		prevsimulatearray=simulatearray;
		simulatearray=simulate(simulatearray);
		console.log(simulatearray);
		if(simulatearray[1] == 'qf'){
			clearInterval(mytimer);
		}
	}

	$('#simulateit').click(function(){
		mytimer=setInterval(simulatefunc,2000);
	})


	$('#variable_list').hide();
	add_tape();
});