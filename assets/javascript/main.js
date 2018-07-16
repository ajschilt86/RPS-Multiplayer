
var player1 = false;
var player2 = false;



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDDhlNY_eKOHEFbnShvaW_-6oaX-Xi8fMQ",
    authDomain: "rps-multiplayer-51e6d.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-51e6d.firebaseio.com",
    projectId: "rps-multiplayer-51e6d",
    storageBucket: "rps-multiplayer-51e6d.appspot.com",
    messagingSenderId: "589663694386"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#btn-name").click(function () {
    event.preventDefault();

    if (player1 === false) {
        player1 = $("#inputName").val().trim();

        database.ref("connections/player1").set({
            player1: player1
        });

        database.ref().on("value", function (snapshot) {
            $(".p1Name").html("<p>" + snapshot.val().connections.player1.player1 + "</p>");
        });

    } else if (player2 === false) {
        player2 = $("#inputName").val().trim();

        database.ref("connections/player2").set({
            player2: player2
        });

        database.ref().on("value", function (snapshot) {
            $(".p2Name").html("<p>" + snapshot.val().connections.player2.player2 + "</p>");
        });
        game();
    }

    var addName = $(".form-control").val().trim();
    if (addName === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }



});

$(document).keydown(function (e) {
    var key_one = 13;

    if (e.keyCode == key_one) {
        event.preventDefault();

        if (player1 === false) {
            player1 = $("#inputName").val().trim();

            database.ref("connections/player1").set({
                player1: player1
            });

            database.ref().on("value", function (snapshot) {
                $(".p1Name").html("<p>" + snapshot.val().connections.player1.player1 + "</p>");
            });

        } else if (player2 === false) {
            player2 = $("#inputName").val().trim();

            database.ref("connections/player2").set({
                player2: player2
            });

            database.ref().on("value", function (snapshot) {
                $(".p2Name").html("<p>" + snapshot.val().connections.player2.player2 + "</p>");
            });
            game();
        }

        var addName = $(".form-control").val().trim();
        if (addName === "") {
            return false;
        }
        else {
            document.forms["inputForm"].reset();
        }
    }
});

var player1Choice = false;
var player2Choice = false;

function game() {
    if (player1Choice === false) {
        $(".rock").click(function () {
            player1Choice = "rock"
            $(".prompt1").html("<p> player one chose " + player1Choice);
            return false;
        });
        $(".paper").click(function () {
            player1Choice = "paper"
            $(".prompt1").html("<p> player one chose " + player1Choice);
        });
        $(".scissors").click(function () {
            player1Choice = "scissors"
            $(".prompt1").html("<p> player one chose " + player1Choice);
        });
    }
    if (player2Choice === false) {
        $(".rock2").click(function () {
            player2Choice = "rock"
            $(".prompt2").html("<p> player two chose " + player2Choice);
        });
        $(".paper2").click(function () {
            player2Choice = "paper"
            $(".prompt2").html("<p> player two chose " + player2Choice);
        });
        $(".scissors2").click(function () {
            player2Choice = "scissors"
            $(".prompt2").html("<p> player two chose " + player2Choice);
        });

        console.log(player1Choice);
    }
}














// start screen
   // player 1 info
   // player 2 info
   // rules
// rendergame
   // player 1 RPS buttons
   // player 1 scores
   // middle panel
   // player 2 RPS buttons
   // player 2 scores
   // chat input
   // chat box
// reset
   // reset on disconnect