var mytimer="";
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