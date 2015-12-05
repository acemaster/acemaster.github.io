$(document).ready(function(){
	String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
};
	var statearr=[];
	var variablesarr=[];
	var no_of_states=1;
	var no_of_variables=1;
	var col='<td id="statevariable{0}{1}">{2}</td>';
	var input='<input type="text" id="variable{0}" placeholder="Next State"><input type="text" id="variablereplace{0}" placeholder="Replacement"><select id="variabledir{0}"><option value="left">Left</option><option value="right">Right</option></select>';
	var row='<tr id="state{0}">{1}</tr>';
	function add_state() {
		htmlstr="";
		statearr.push($('#newstate').val());
		console.log(statearr);
		if(no_of_variables == 1 && no_of_states == 1){
			variablesarr.push($('#newvariable').val());
			console.log(variablesarr);
		}
		for (var i =1;i<=no_of_variables;i++) {
			tempstr=input.format(i);
			htmlstr=htmlstr+col.format(no_of_states,i,tempstr);
		};
		var finalstr=row.format(no_of_states,htmlstr);
		$('#form-elements').append(finalstr);
		no_of_states=no_of_states+1;
	}


	function add_variable(){
		htmlstr="";
		no_of_variables=no_of_variables+1;
		variablesarr.push($('#newvariable').val());
		console.log(variablesarr);
		tempstr=input.format(no_of_variables);
		for (var i = 1; i <no_of_states; i++) {
			htmlstr=col.format(i,no_of_variables,tempstr);
			$('#state'+i).append(htmlstr);
		};

	}
	// add_state();
	// add_variable();

	$('#addstate').click(function(){
		add_state();
	});

	$('#addvariable').click(function(){
		add_variable();
	});
});