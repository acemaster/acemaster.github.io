(function() {
  $(document).ready(function() {
    $('.skill-box').find('b').each(function(i) {
      return $(this).prop('Counter', 0).animate({
        Counter: $(this).parent().data('percent')
      }, {
        duration: 1000,
        easing: 'swing',
        step: function(now) {
          return $(this).text(Math.ceil(now) + '%');
        }
      });
    });
    return $('.skill-box .skills-circle li').each(function(i) {
      var _left, _percent, _right, deg, full_deg, run_duration;
      _right = $(this).find('.bar-circle-right');
      _left = $(this).find('.bar-circle-left');
      _percent = $(this).attr('data-percent');
      deg = 3.6 * _percent;
      if (_percent <= 50) {
        return _right.animate({
          circle_rotate: deg
        }, {
          step: function(deg) {
            $(this).css('transform', 'rotate(' + deg + 'deg)');
          },
          duration: 1000
        });
      } else {
        full_deg = 180;
        deg -= full_deg;
        run_duration = 1000 * (50 / _percent);
        return _right.animate({
          circle_rotate: full_deg
        }, {
          step: function(full_deg) {
            $(this).css('transform', 'rotate(' + full_deg + 'deg)');
          },
          duration: run_duration,
          easing: 'linear',
          complete: function() {
            run_duration -= 1000;
            _left.css({
              'clip': 'rect(0, 150px, 150px, 75px)',
              'background': '#B0DAB9'
            });
            return _left.animate({
              circle_rotate: deg
            }, {
              step: function(deg) {
                $(this).css('transform', 'rotate(' + deg + 'deg)');
              },
              duration: Math.abs(run_duration),
              easing: 'linear'
            });
          }
        });
      }
    });
  });

}).call(this);


function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//Project Class
function Project(name,url,description)
{
	this.url = url;
	this.name = name;
	this.description = description;
}

var projects_arr = [];
var index = 0;
$.ajax({url: "https://api.github.com/users/acemaster/repos?per_page=100",success: function(result){
	// console.log(result);
	for (var i = result.length - 1; i >= 0; i--) {
		if(!result[i].fork)
		{
			var project_name = result[i].name.replace("-"," ");
			project_name = project_name.replace("_"," ");
			project_name = titleCase(project_name);
			// console.log(project_name);
			var proj = new Project(project_name,result[i].html_url,result[i].description);
			projects_arr[index] = proj
			index++;
		}
	}
	$.ajax({url: "https://api.github.com/orgs/NITSWAC/repos?per_page=100?&page=2",success: function(result){
		// console.log(result);
		for (var i = result.length - 1; i >= 0; i--) {
			if(!result[i].fork)
			{
				var project_name = result[i].name.replace("-"," ");
				project_name = project_name.replace("_"," ");
				project_name = titleCase(project_name);
				// console.log(project_name);
				var proj = new Project(project_name,result[i].html_url,result[i].description);
				projects_arr[index] = proj
				index++;
			}
		}
		$.ajax({url: "https://api.github.com/orgs/NITSWAC/repos",success: function(result){
		// console.log(result);
			for (var i = result.length - 1; i >= 0; i--) {
				if(!result[i].fork)
				{
					var project_name = result[i].name.replace("-"," ");
					project_name = project_name.replace("_"," ");
					project_name = titleCase(project_name);
					// console.log(project_name);
					var proj = new Project(project_name,result[i].html_url,result[i].description);
					projects_arr[index] = proj
					index++;
				}
			}
		}});
	}});
	$('#LoadingText').hide();
	var row_string = '<div class="row">{0}</div>';
	var article_string = '<article class="work-item"><a href="{0}"><h3>{1}</h3></a><p>{2}</p></article>';
	var new_proj = "";
	for (var i = 0; i < projects_arr.length; i++) {
		new_proj = new_proj + article_string.format(projects_arr[i].url,projects_arr[i].name,projects_arr[i].description);
		if(i%2!=0)
		{
			var new_row = row_string.format(new_proj);
			$('#two').append(new_row);
			new_proj = "";
		}
	}
	console.log(projects_arr);
}});