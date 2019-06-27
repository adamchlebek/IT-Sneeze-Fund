var drinks = ['zero','one','two','three','four','five','six','seven'],
    prev = -1;

			$(document).ready(function() {
				$('#arm').click(function(e) {
					var arm = $(this).addClass('clicked'),
						delay = setTimeout(function() { arm.removeClass('clicked') }, 500);
					e.preventDefault();
					spin();
				});
			});
			function spin() {
				do {
					index = Math.floor(Math.random()*drinks.length);
				} while (index == prev);
				var equation = $('#equation').removeClass("done").removeClass(drinks[prev]).addClass(drinks[index]),
					timeout = setTimeout(function() { equation.addClass('done'), alert(drinks[index]) },3000);
        prev = index;

			}
