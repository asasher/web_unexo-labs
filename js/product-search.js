$(document).ready(function() {
	var sB = new searchBar("#search-bar");
});

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function searchBar(searchBarSelector)
{
	this.elem = $(searchBarSelector).find('input');
	
	this.init = function () {
		var elem = this.elem;
		elem.on("input keyup",function (e) {

			var target = $($.find('#' + elem.attr('data-target')));
			var targetLiAll = target.find('li');

			var sin = elem.val();

			targetLiAll.removeClass('not-selected');
			targetLiAll.removeClass('selected');
			
			if(sin.match(/[^\w-\s]/g) == null && sin.length > 0)
			{
				//targetLiAll.addClass('not-selected');
				var sinParts = sin.split(' ');
				var selector = "";

				for(var i = 0; i < sinParts.length; i++)
				{
					selector += ":contains("+sinParts[i]+")";
				}


				var notTargetLi = target.find("li:not("+selector+")");
				var targetLi = target.find("li"+selector);

				notTargetLi.addClass('not-selected');
				targetLi.addClass('selected');
			}
			else
			{
			}

			if(target.find('li:not(.not-selected)').length < 1)
			{
				target.append("<li class='msg'>No results found</li>");
			}
			else
			{
				target.find('.msg').remove();
			}

		})

		$(document).on('scroll',function (e) {

			var offset = elem.parent('div').offset();

			elem.removeClass('fixed');

			if($(document).scrollTop() >= offset.top)
			{
				elem.addClass('fixed');
			}
		})

		
	}

	this.init();
	
}