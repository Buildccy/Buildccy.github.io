//给键盘绑定上下左右移动随机生成的盒子的事件
document.onkeydown = function(e) {
	e = window.e || e;
	var floatBoxes;
	//获得现存的floatBoxes类，以伪数组的形式储存
	// floatBoxes = document.getElementsByClassName("floatBoxes");
	var idNumber;
	var aArray;
	var bArray = [];
	var cArray = [];
	var key = e.keyCode;
	/* ******************************************************************************************************************** */
	function createAArray(derection) {
		if (derection == "top" || derection == "left") {
			aArray = Array(16).fill(17) //大于15即可
		} else if (derection == "bottom" || derection == "right") {
			aArray = Array(16).fill(-1) //小于0即可
		} else {}
		//遍历每一个floatBoxes盒子的id值,将id插入到数组aArray中以便之后排序	,先更新floatBoxes！很重要
		floatBoxes = document.getElementsByClassName("floatBoxes");
		for (i = 0; i < floatBoxes.length; i++) {
			idNumber = floatBoxes[i].id
			aArray.splice(idNumber, 1, idNumber);
		}
		// console.log("初始化aArray:" + aArray);
	}
	/* ******************************************************************************************************************** */
	function change(derection) {
		if (derection == "top" || derection == "bottom") {
			for (i = 0; i < 4; i++) {
				for (j = 0; j < 4; j++) {
					var q = i + j * 4;
					bArray.push(aArray[q])
				}
				bArray.sort(sortNumber)
				cArray.push(bArray)
				// console.log("队列变换第" + i + "步，临时储存数组bArray,遍历第" + i + "列:" + bArray)
				bArray = []
			}
		} else if (derection == "left" || derection == "right") {
			for (i = 0; i < 4; i++) {
				for (j = 0; j < 4; j++) {
					var q = j + i * 4;
					bArray.push(aArray[q])
				}
				bArray.sort(sortNumber)
				cArray.push(bArray)
				// console.log("队列变换第" + i + "步，临时储存数组bArray,遍历第" + i + "列:" + bArray)
				bArray = []
			}
		}
		// console.log("队列变换第二步，临时储存数组cArray:" + cArray)
	};
	/* ******************************************************************************************************************** */
	function changeNumber(derection) {
		aArray = [];
		if (derection == "top" || derection == "bottom") {
			for (i = 0; i < 4; i++) {
				for (j = 0; j < 4; j++) {
					aArray.push(cArray[j][i])
				}
			}
		} else if (derection == "left" || derection == "right") {

			for (i = 0; i < 4; i++) {
				for (j = 0; j < 4; j++) {
					aArray.push(cArray[i][j])
				}
			}
		}
		// console.log("队列变换第三步，aArray各元素的位置完成更新:" + aArray)
	}
	/* ******************************************************************************************************************** */
	function move() {
		//更新floatBoxes很重要！！！
		floatBoxes = document.getElementsByClassName("floatBoxes");
		for (i = 0; i < floatBoxes.length; i++) {
			for (j = 0; j < 16; j++) {
				if (floatBoxes[i].getAttributeNode("id").value == aArray[j]) {
					floatBoxes[i].getAttributeNode("id").value = j;
					floatBoxes[i].style.backgroundColor = "red";
					// floatBoxes[i].style.gridArea = "a" + j;
					break;
				}
			}
			//更新gird-area使方块移动
			floatBoxes[i].style.gridArea = "a" + floatBoxes[i].id
		}
	};
	/* ******************************************************************************************************************** */
	function createNewBox() {
		//先更新floatBoxes很重要！！！
		floatBoxes = document.getElementsByClassName("floatBoxes");
		//按照数组元素值的大小来将伪数组floatBoxes
		// floatBoxes.sort(sortNumber);----------------------------------------------
		numberBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
		for (i = 0; i < floatBoxes.length; i++) {

			// console.log(floatBoxes[i].getAttributeNode("id"))
			// console.log(floatBoxes[i].id)
			for (j = 0; j < numberBox.length; j++) {
				if (numberBox[j] == floatBoxes[i].id) {
					numberBox.splice(j, 1)
					break;
				}
			}
		}
		var createNewRandomNumber = Math.floor(Math.random() * (16 - floatBoxes.length));
		var randomBox = numberBox[createNewRandomNumber]
		$("#container").append("<div class='boxes floatBoxes' id=" + (randomBox) +
			" style='background-color:pink;grid-area:a" + (randomBox) + "'><p>2</p></div>")
	}

	function gameOver() {
		floatBoxes = document.getElementsByClassName("floatBoxes");
		if (floatBoxes.length == 16) {
			alert("gameover");
			window.location.reload();
		}
	}
	switch (key) {
		case 87:
			createAArray("top");
			change("top");
			changeNumber("top");
			move();
			createNewBox();
			break;
		case 83:
			createAArray("bottom");
			change("bottom");
			changeNumber("bottom");
			move();
			createNewBox();
			break;
		case 65:
			createAArray("left");
			change("left");
			changeNumber("left");
			move();
			createNewBox();
			break;
		case 68:
			createAArray("right");
			change("right");
			changeNumber("right");
			move();
			createNewBox();
			break;
	}
	gameOver();
}
