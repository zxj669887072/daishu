import jQuery  from './../../../js/lib/jquery-1.8.0.min';
$(function(){
	var $w = $(window), $d = $(document);
	var $wh = $w.height(), $dh = $d.height();

	$w.scroll(function(){
		flyIconPosition();
		flyIcon();
	});

	$w.resize(function() {
		flyIconPosition();
		flyIcon();
	});

	function flyIconPosition(){
		var abT = $(".ab01").offset().top;
		var abL = $(".ab01").offset().left;
		var nav = $(".nav-ul");
		var $wSt = $w.scrollTop();

		if( $wSt > Math.ceil(abT - 40) ){
			nav.css({
				position: 'fixed',
				top: 0,
				left: abL
			});
		}else{
			nav.css({
				position: 'fixed',
				top: Math.ceil(abT - $wSt+40),
				left: abL
			});
		}
	}

	function flyIcon(){
		var items = $(".nav-box .content");
		var icon  = $(".nav-ul li");
		var $dT = $d.scrollTop();

		items.each(function(){
			var floor = $(this);
			var floorHeight = floor.outerHeight(); 
			var floorTop = floor.offset().top;
			var iNow = floor.index();
			if($dT > floorTop - 0){
				icon.removeClass('current');
				icon.eq( iNow ).addClass('current');
			}else{
				return false;
			}
		});
	}

	$(".nav-ul li").click(function(){
		var cont = $(".nav-box .content");
		var index = $(this).index();
		var cSt   = cont.eq( index ).offset().top;
		$w.scrollTop( cSt );
	});
});