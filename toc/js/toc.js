$(document).ready(function(){

	String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
	};

	var simulatearray=[1,'q0'];
	var prevsimulatearray=[1,'q0'];
	var prevvalue="";
	var statearr=[];
	var variablesarr=[];
	var statemap=new Array();
	var variablemap=new Array();
	var current_state=-1;
	var tape_count=0;
	var no_of_states=0;
	var no_of_variables=0;
	var col='<td id="statevariable{0}{1}">{2}</td>';
	var input='<div class="form-group col-md-4"><input type="text" class="form-control" id="variable{0}{1}" placeholder="Next State"></div><div class="form-group col-md-4"><input type="text" class="form-control" id="variablereplace{0}{1}" placeholder="Replacement"></div><div class="form-group col-md-4"><select class="form-control" id="variabledir{0}{1}"><option value="left">Left</option><option value="right">Right</option></select></div>';
	var row='<tr id="state{0}">{1}</tr>';
	var variable_name='<td align="center" >{0}</td>';
	var state_name='<td>{0}</td>';
	var tapeele='<td id="tape{0}"><div class="form-group"><input class="form-control" type="text" value="B"></div></td>';
	var pointerele='<td id="pointer{0}" align="center"><div id="arrow{0}" class="arrow-down"></div></td>';


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
	$('#variable_list').hide();
	add_tape();
});