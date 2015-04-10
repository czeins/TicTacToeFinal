// IIFE
(function(){
    angular
        .module('TicTacToe')
        .controller('tttCtrl', tttCtrl);

//injecting Firebase into the game controller in 3... 2... 1...
        tttCtrl.$inject = ['$firebaseObject'];

    function sqController($firebaseObject) {

        var ctrl = this;
        var ref = new Firebase('httpshttps://anabelle.firebaseio.com/whatever');

        ctrl.createGame = createGame();
        ctrl.createBoard = createBoard;

        function createGame(param1, param2) {
            var gameId = Math.round(Math.random()*1000);
            var ref = new Firebase('https://whatever' + gameId);
            ctrl.game = $firebaseObject(ref); //creates game object with Unique ID
            ctrl.game.gameId = gameId; //creates gameID property inside game object
            ctrl.game.name = 'Larry';
            ctrl.game.board = [ {0: "square1", 1: "square2", 2: "square3"},
                                {3: "square4", 4: "square5", 5: "square6"},
                                {6: "square7", 7: "square8", 8: "square9"}];
            ctrl.game.winner = null;
            ctrl.game.players = {
                player1: {
                    name: null,
                    symbol: 'x'
                },
                player2: {
                    name: null,
                    symbol: 'o',
                    wins: 0
                }

            };
            ctrl.game.$save(ctrl.game); //use $save and pass in the changed object to save it to firebase
        }

//closing IFFE
}
})();