$(function() {
	var $picsBox = $('#picsBox')
	var $pre = $('#pre')
	var $next = $('#next')
	var pageLeft = 1880
	var time = 400
	var item_time = 20
	var item_offset
	var pageCount = 1
	var $container=$('#container')
	var $points = $('#pointBox>div')
	var nextIndex
	
	$pre.click(function() {
		nextPage(false)
	})
	$next.click(function() {
		nextPage(true)
	})

	$points.click(function(){
		nextIndex = $(this).index()
		nextPage(nextIndex)
	})


	function nextPage(change) {

		function movePic(){
		item_offset = offsetLeft / (time / item_time)
		var targetLeft = offsetLeft + currentLeft
		var intervalId = setInterval(function() {
			currentLeft += item_offset
			if(currentLeft == targetLeft) {
				change ? pageCount++:pageCount--
				if(pageCount == 0){
					currentLeft=-(8*offsetLeft)
					pageCount=8
				}else if(pageCount == 9){
					currentLeft=1*offsetLeft
					pageCount=1
				}
				clearInterval(intervalId)
			}
			$picsBox.css('left', currentLeft)	
		}, item_time)
		}
		
		var currentLeft = $picsBox.position().left
		// offsetLeft = change ? -pageLeft : pageLeft
		if(typeof change==="boolean"){
			offsetLeft = change ? -pageLeft : pageLeft,
			movePic()
			var nextPoint =change? pageCount+1:pageCount-1
			if(nextPoint==9){
				nextPoint=1
			}else if(nextPoint==0){
				nextPoint=8
			}
			$('div [class="points on"]').removeClass("on")
			$('div [class="points"]')[nextPoint-1].className="points on"
		}else{
			$index = $('[class="points on"]').prevAll().length
			console.log($index)
			var moveTimes=nextIndex-$index
			if(moveTimes>0){
				for(i=0;i<moveTimes;i++){
					nextPage(true)
				}
			}else if(moveTimes<0){
				moveTimes=-moveTimes
				for(i=0;i<moveTimes;i++){
					nextPage(false)
				}
			}
			
			
		}
	}


	$container.hover(
	function(){
			clearInterval(intervalId2)
	},
	function(){
		intervalId2 =setInterval(function(){
		nextPage(true)
	},3000)
	})
})
