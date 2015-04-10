// IIFE
(function(){
	angular
		.module('TicTacToe')
		.controller('sqController', sqController);

	sqController.$inject = ['$firebaseArray', '$firebaseObject'];

	function sqController($firebaseArray, $firebaseObject) {

		var self = this;

		var ref = new Firebase("https://generaltictac.firebaseio.com/");
		self.game = $firebaseObject(ref);

			function makeGame() {
				var gameRef = new Firebase("https://generaltictac.firebaseio.com/");
				var obj = $firebaseObject(gameRef);
				return obj;
			}


		self.gamelist = makeGame();							// autoload current games


		self.game.board = {
				playerTurn: true,

				winner: {
					winner: "",
					gameOver: false,
					player1wins: null
				},

				players: [
					{
						name: "Player1",
						symbol: "x",
						wins: 0
					},
					{
						name: "Player2",
						symbol: "o",
						wins: 0
					}
				],

		// Array of Squares
				squares: [
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					},
					{
						value: ""
					}
				]
		};

self.game.$save(self.game);





		// Checking to see if a Tic Tac Square has been clicked.
		// The default state of a Square is null. If it is clicked, it changes to either "x" or "o".
		// If the square has something in it, it is not null, therefore the expression ends and nothing happens.
		self.checkClicked = function(index) {
			if (self.game.board.squares[index].value !== "" )
				return false;
			self.game.board.squares[index].value = self.changeTurn(self.game.board.playerTurn);
		};

		// Switches values 'x' and 'o'
		self.changeTurn = function() {
			if (self.game.board.playerTurn === true) {
			self.game.board.playerTurn = false;
			return "x";
			} else {
			self.game.board.playerTurn = true;
			return "o";
			}
		};

		self.doBoth = function(index) {
			if (self.game.board.winner.gameOver === true) {
			} else {
				self.checkClicked(index);
				self.checkForThree();
			}
			self.calculateScore();
			self.playToFive();


		};

			// Determining if Tic Tac Toe has been achieved.
			// We're setting setting each value as a variable (square 1, square2, etc...).
			// Then we're determining if they're equal.

			self.checkForThree = function() {
			var square1 = self.game.board.squares[0].value,
				square2 = self.game.board.squares[1].value,
				square3 = self.game.board.squares[2].value,
				square4 = self.game.board.squares[3].value,
				square5 = self.game.board.squares[4].value,
				square6 = self.game.board.squares[5].value,
				square7 = self.game.board.squares[6].value,
				square8 = self.game.board.squares[7].value,
				square9 = self.game.board.squares[8].value;

			if (square1 == square2 && square2 == square3 && square1 == square3 && square1 !== "") {
				self.announceWinner(square1);
			}
			else if (square4 == square5 && square4 == square6 && square5 == square6 && square4 !== ""){
				self.announceWinner(square4);
			}
			else if (square7 == square8 && square7 == square9 && square8 == square9 && square7 !== ""){
				self.announceWinner(square7);
			}
			else if (square1 == square4 && square1 == square7 && square4 == square7 && square1 !== ""){
				self.announceWinner(square1);
			}
			else if (square2 == square5 && square2 == square8 && square5 == square8 && square2 !== ""){
				self.announceWinner(square2);
			}
			else if (square3 == square6 && square3 == square9 && square6 == square9 && square3 !== ""){
				self.announceWinner(square3);
			}
			else if (square1 == square5 && square1 == square9 && square5 == square9 && square1 !== ""){
				self.announceWinner(square1);
			}
			else if (square3 == square5 && square3 == square7 && square5 == square7 && square3 !== ""){
				self.announceWinner(square3);
			}
			else if (square1 && square2 && square3 && square4 && square5 && square6 && square7 && square8 && square9 !== ""){
				self.announceWinner("tie");
			}
		};

//When function runs, it will determine if "x" or "o" and add a message to a the Winner div accordingly.
			self.announceWinner = function(square) {
				if (square === "x") {
					self.game.board.winner.winner = "It appears you have won.";
					self.game.board.winner.gameOver = true;
					self.game.board.winner.player1wins = true;

				} else if (square === "o") {
					self.game.board.winner.winner = "You have died.";
					self.game.board.winner.gameOver = true;
					self.game.board.winner.player1wins = false;

				} else if (square === "tie") {
					self.game.board.winner.winner = "You both suck.";
					self.game.board.winner.gameOver = true;
					self.game.board.winner.player1wins = null;

				}
			};

//Calculate Score
			self.calculateScore = function() {
				if (self.game.board.winner.player1wins === true) {
					self.game.board.players[0].wins += 1;
					self.game.board.winner.player1wins = null;

				} else if (self.game.board.winner.player1wins === false) {
					self.game.board.players[1].wins += 1;
					self.game.board.winner.player1wins = null;

				}
			};

//Reset Game
			self.resetGame = function() {
				for (i = 0; i < self.game.board.squares.length; i++) {
				 self.game.board.squares[i].value = ""; }
				 self.game.board.winner.gameOver = false;

			};

			self.playToFive = function() {
				if (self.game.board.players[0].wins === 5 || self.game.board.layers[1].wins === 5) {
				console.log("Hello!"); }
			};





//closing IFFE
}
})();