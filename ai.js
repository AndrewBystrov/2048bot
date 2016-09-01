(function () {
	var UP = 0;
	var RIGHT = 1;
	var DOWN = 2;
	var LEFT = 3;

	var pos = 0;

	window.AI = function (current_grid) {

		var last_grid = "";
		var lastMove = UP;

		var nextMove = "";

		var lm = function (e) {
			switch (e) {
				case 0 :
					return "UP";
				case 1 :
					return "RIGHT";
				case 2 :
					return "DOWN";
				case 3 :
					return "LEFT";
			}
		};

		var checkMove = function (a) {
			if (checkFill(a)) {
				return true;
			}
			if (a[0] === null && a[1] === null && a[2] === null && a[3] === null) {
				return false;
			}
			if (a[0] !== null && a[1] === null && a[2] === null && a[3] === null) {
				return false;
			}
			if (a[0] !== null && a[1] !== null && a[2] === null && a[3] === null) {
				return false;
			}
			if (a[0] !== null && a[1] !== null && a[2] !== null && a[3] === null) {
				return false;
			}
			if (a[0] !== null && a[1] !== null && a[2] !== null && a[3] !== null) {
				return false;
			}
			return true;
		};
		var checkFill = function (a) {
			var tmp = trimArray(a);
			if (tmp.length === 0) {
				return false;
			}
			for (var j = 0; j < tmp.length - 1; j++) {
				if (tmp[j] == tmp[j + 1]) {
					return true;
				}
			}
			return false;
		};

		var print2 = function (a) {
			for (var i = 0; i < a.length; i++) {
				var s = "";
				for (var j = 0; j < a[i].length; j++) {
					s += a[i][j] + "\t";
				}
				console.info("a2 : " + s);
			}
		};
		var print1 = function (st, a) {
			var s = "";
			for (var i = 0; i < a.length; i++) {
				s += a[i] + "\t";
			}
			console.info(st + s);
		};

		var canMoveLeft = function (a) {
			for (var i = 0; i < a.length; i++) {
				if (checkMove(a[i])) {
					return true;
				}
			}
			return false;
		};
		var canMoveUp = function (a) {
			for (var i = 0; i < a.length; i++) {
				var q = getColumn(a, i);
				if (checkMove(q)) {
					return true;
				}
			}
			return false;
		}
		var canMoveDown = function (a) {
			for (var i = 0; i < a.length; i++) {
				var q = getColumn(a, i);
				if (checkMove(q.reverse())) {
					return true;
				}
			}
			return false;
		}
		var canMoveRight = function (a) {
			for (var i = 0; i < a.length; i++) {
				var q = [];
				for (var j = 0 ; j < a[i].length ; j++) {
					q[j] = a[i][j];
				}
				if (checkMove(q.reverse())) {
					return true;
				}
			}
			return false;
		};

		var columnCanFill = function (a, i) {
			var q = getColumn(a,i);
			if (checkFill(q)) {
				return true;
			}
			return false;
		}
		var columnIsFull = function (a, i) {
			var q = getColumn(a,i);
			for (var k = 0; k < q.length; k++) {
				if (q[k] === null) {
					return false;
				}
			}
			return true;
		}

		var rowIsFull = function (a,i) {
			for (var k = 0; k < a[i].length; k++) {
				if (a[i][k] === null) {
					return false;
				}
			}
			return true;
		}
		var rowCanFill = function (a, i) {

			return checkFill(a[i]);
		};
		var canFillV = function (a) {
			for (var i = 0; i < a.length; i++) {
				var q = getColumn(a,i);
				if (checkFill(q)) {
					return true;
				}
			}
			return false;

		}
		var canFillH = function (a) {
			for (var i = 0; i < a.length; i++) {
				if (checkFill(a[i])) {
					return true;
				}
			}
			return false;
		}

		var createNormalGrid = function(a) {
			var ng = [];
			for (var i = 0; i < a.length; i++) {
				var t = [];
				for (var j = 0; j < a[i].length; j++) {
					t[j] = a[j][i];
				}
				ng[i] = t;
			}
			return ng;
		}
		var getColumn = function(a, i) {
			var ci = a[i];
			var q = [];
			for (var j = 0; j < ci.length; j++) {
				q[j] = a[j][i];
			}
			return q;
		}
		var trimArray = function(a) {
			var tmp = [];
			var index = 0;
			for (var i = 0; i < a.length; i++) {
				if (a[i] != null) {
					tmp[index] = a[i];
				} else {
					index--;
				}
				index++;
			}
			return tmp;
		}
		var shiftArrayLeft = function(a, i) {
			for(var j = i; j < a.length; j++) {
				a[j] = a[j+1];
			}
			a[a.length - 1] = null;
		}
		var shiftArrayRight = function(a, i) {
			for(var j = i ; j > 0 ; j--) {
				a[j] = a[j - 1];
			}
			a[0] = null;
		}

		var fillRowLeft = function(a) {
			var q = trimArray(a);
			var index = 0;
			for(var i = 0 ; i < q.length; i++) {
				if (q[i] == q[i+1] && q[i] !== null) {
					q[i] = q[i] + q[i+1];
					shiftArrayLeft(q,i+1);
				}
			}
			while (q.length < a.length) {
				q.push(null);
			}
			return q;
		}
		var fillRowRight = function(a) {
			var q = trimArray(a);
			var index = 0;
			for(var i = q.length; i > 0; i--) {
				if (q[i] == q[i-1] && q[i] !==null) {
					q[i] = q[i] + q[i - 1];
					shiftArrayRight(q, i-1);
				}
			}
			q.reverse();
			while (q.length < a.length) {
				q.push(null);
			}
			return q.reverse();
		}

		var afterFillH = function(a) {
			var q = a;
			for(var i = 0 ; i < a.length; i++) {
				q[i] = fillRowLeft(a[i]);
			}
			return q;
		}

		var afterFillV = function(a) {

		}

		var fillColumnUp = function(a, i) {
			var q = getColumn(a,i);
			return fillRowLeft(q);
		}
		var fillColumnDown = function(a, i) {
			var q = getColumn(a,i);
			return fillRowRight(q);
		}

		var getFillColumn = function(a) {
			for (var i = 0; i < a.length; i++) {
				var q = getColumn(a, i);
				if (checkFill(q)) {
					return i;
				}
			}
			return -1;
		};
		var getFillRowLeft = function(a){
			for (var i = 0; i < a.length; i++) {
				if (checkFill(a[i])) {
					return i;
				}
			}
			return -1;
		};

		var res = function (a) {
			lastMove = a;
			if (a === DOWN) {
				if (!columnIsFull(last_grid,0) && canMoveRight(last_grid)) {
					lastMove = RIGHT;
					return RIGHT;
				}
			}
			if (a === UP) {
				if (columnCanFill(last_grid,1) && !columnCanFill(last_grid,0) && columnIsFull(last_grid,0)) {
					if (getFillColumn(last_grid) === 1) {
						var c1 = getColumn(last_grid, 0);
						var c2 = fillColumnDown(last_grid, 1);
						var q;
						for(var i = 0; i < c1.length; i++) {
							if (c1[i] === c2[i] && c1[i] !== null) {
								lastMove = DOWN;
								return DOWN;
							}
						}
					}
				}

				if (columnCanFill(last_grid, 2) && !columnCanFill(last_grid, 1) && !columnCanFill(last_grid, 1)  && columnIsFull(last_grid, 1) && columnIsFull(last_grid, 0)) {
					if (getFillColumn(last_grid) === 2) {
						var c1 = getColumn(last_grid, 1);
						var c2 = fillColumnDown(last_grid, 2);
						var q;
						for(var i = 0; i < c1.length; i++) {
							if (c1[i] === c2[i] && c1[i] !== null) {
								lastMove = DOWN;
								return DOWN;
							}
						}
					}
				}

//				var t = true;
//				var q = getColumn(last_grid, 0);
//				for(var i = 0 ; i < q.length; i++) {
//					if (a[i] < a[i+1] && a[i] !== null) {
//						t = false;
//					}
//				}
//				if (t) {
//					lastMove = DOWN;
//					return DOWN;
//				}
			}
			return a;
		};

		this.move = function (current_grid) {
			var ng = createNormalGrid(current_grid);
			fillRowRight([4,4,8,null]);
			shiftArrayRight([1,3], 1);
			last_grid = ng;
			fillColumnDown(ng, 0);
			fillColumnUp(ng, 0);

			var count=0;
			for(var i = 0; i < ng.length; i++) {
				for(var j = 0; j< ng[i].length; j++) {
					if (ng[i][j]===null) {
						count++;
					}
				}
			}

			if (count <= 1) {
				var q;
			}

			if (canFillH(ng)) {
				return res(LEFT);
			}
			for (var j = 0; j < 2; j++) {
				for(var i = 1 ; i < 4; i++) {
					if (ng[i][j] === ng[i-1][j+1] && ng[i][j] !== null) {
						if (canMoveDown(ng) && columnIsFull(ng, j) && !columnCanFill(ng, j)/* && !columnIsFull(ng, j)*/) {
							if (ng[0][1] === null) {
								return res(UP);
							}
							if (columnIsFull(ng,0) && columnIsFull(ng,1)) {
								break;
							}
							if (!columnIsFull(ng,0)) {
								if (canMoveLeft(ng)) {
									return res(LEFT)
								}
							}
							return res(DOWN);
						}
					}
				}
			}
//			for(var i = 0 ; i < 3; i++) {
//				if (ng[i][0] === ng [i+1][1] && ng[i][0] !== null) {
//					if (canMoveUp(ng)) {
//						return res(UP);
//					}
//				}
//			}
//
//			if (canFillV(ng)) {
//				if (columnIsFull(ng, 0) && !columnCanFill(ng,0) && !columnIsFull(ng, 1)) {
//					return res(DOWN);
//				}
//				return res(UP);
//			}
//			if (canMoveLeft(ng)) {
//				return res(LEFT);
//			}
//			if (canMoveUp(ng)) {
//				return res(UP);
//			}

			switch (lastMove) {

				case RIGHT: 
					if (canFillH(ng)) {
						return res(LEFT);
					}
					if (canMoveLeft(ng)) {
						return res(LEFT);
					}
					if (canMoveUp(ng)) {
						return res(UP);
					}
					return res(LEFT);

					break;

				case DOWN:
				if (ng[0][0] !== null) {
						if (canFillV(ng) && !columnCanFill(ng,0) && columnCanFill(ng,1)) {
							return res(DOWN);
						}
					}
					if (canFillH(ng)) {
						return res(LEFT);
					}

					if (canMoveUp(ng)) {
						return res(UP);
					}
					break;

				case LEFT:
					if (canFillH(ng)) {
						return res(LEFT);
					}
					if (canFillH(ng)) {
						if (canFillV(ng)) {
							if (columnIsFull(ng, 0) && !columnCanFill(ng, 0)) {
								return res(DOWN)
							}
							return res(UP);
						}
					}
					if (canMoveUp(ng)) {
						return res(UP);
					}
//					if (canMoveRight(ng)) {
//						if (canMoveDown(ng)) {
//							if (rowIsFull(ng, 0)) {
//								if (columnIsFull(ng, 0)) {
//									return res(DOWN);
//								}
//								if (!columnIsFull(ng,1) && columnIsFull(ng,0)) {
//									return res(DOWN);
//								}
//								return res(RIGHT);
//							}
//							return res(DOWN);
//						}
//						return res(DOWN);
//					}
					break;

				case UP:
					if (!columnIsFull(ng,0) && canMoveUp(ng)) {
						return res(UP);
					}
					if (canFillH(ng)) {
						return res(LEFT);
					}
					if (canFillV(ng)) {
						if (!columnCanFill(ng,0)) {
							return res(DOWN);
						}
						return res(UP);
					}
					if (canMoveLeft(ng)) {
						return res(LEFT);
					}
					if (canMoveUp(ng)) {
						return res(UP);
					}
					if (canMoveDown(ng)) {
						 return res(DOWN)
					}
					break;

			}
			if (canMoveRight(ng)) {
				if (columnIsFull(ng, 0) && !columnCanFill(ng,0) && canMoveDown(ng)) {
					return res(DOWN);
				}
				if (canMoveLeft(ng)) {
					return res(LEFT);
				}
				return res(RIGHT);
			}
		};
	}
})();