var player1 = false;
var player2 = false;
var player1Connected = true;
var player2Connected = true;
var player1Name = "";
var player2Name = "";

function update1() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
        if (snap.val() === true) {
            $(".p1Name").html(player1Name);
            $(".chatArea").prepend("<div>" + player1Name + " has connected</div");
            player1 = true;
        } else {
            $(".chatArea").prepend("<div>" + player1Name + " has disconencted</div");
        }
    });
}

function update2() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
        if (snap.val() === true) {
            $(".p2Name").html(player2Name);
            $(".chatArea").prepend("<div>" + player2Name + " has connected</div");
            player2 = true;
        } else {
            $(".chatArea").prepend("<div>" + player2Name + " has disconencted</div");
        }
    });
}




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
        player1Name = $("#inputName").val().trim();

        database.ref("connections/player1").set({
            player1: player1Name
        });
        update1();

    } else if (player2 === false) {
        player2Name = $("#inputName").val().trim();

        database.ref("connections/player2").set({
            player2: player2Name
        });

        update2();
        game();
    }
    $(".form-control").val("");
});

$(document).keydown(function (e) {
    var key_one = 13;

    if (e.keyCode == key_one) {
        event.preventDefault();

        if (player1 === false) {
            player1Name = $("#inputName").val().trim();

            database.ref("connections/player1").set({
                player1: player1Name
            });
            update1();

        } else if (player2 === false) {
            player2Name = $("#inputName").val().trim();

            database.ref("connections/player2").set({
                player2: player2Name
            });

            update2();
            game();
        }
        $(".form-control").val("");
    }
});





var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function (snapshot) {
    if (snapshot.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
        $(".chatArea").prepend("<div>" + snapshot.val().connections.player2.player2 + " has connected</div>");
    }

});

connectionsRef.on("value", function (snapshot) {
    $(".chatArea").prepend("<div>" + snapshot.val().connections.player2.player2 + " has connected</div>");
});








var player1Choice = false;
var player2Choice = false;

function game() {
    if (player1Choice === false) {
        $(".rock").click(function () {
            player1Choice = "rock";
            hide();
            $(".p1ChoiceRock").show();
            $(".prompt1").append("<p> player one chose " + player1Choice);
        });
        $(".paper").click(function () {
            player1Choice = "paper";
            hide();
            $(".p1ChoicePaper").show();
            $(".prompt1").html("<p> player one chose " + player1Choice);
        });
        $(".scissors").click(function () {
            player1Choice = "scissors"
            hide();
            $(".p1ChoiceScissors").show();
            $(".prompt1").html("<p> player one chose " + player1Choice);
        });
    }
    if (player2Choice === false) {
        $(".rock2").click(function () {
            player2Choice = "rock";
            hide2();
            $(".p2ChoiceRock").show();
            $(".prompt2").html("<p> player two chose " + player2Choice);
            results();
        });
        $(".paper2").click(function () {
            player2Choice = "paper";
            hide2();
            $(".p2ChoicePaper").show();
            $(".prompt2").html("<p> player two chose " + player2Choice);
            results();
        });
        $(".scissors2").click(function () {
            player2Choice = "scissors";
            hide2();
            $(".p2ChoiceScissors").show();
            $(".prompt2").html("<p> player two chose " + player2Choice);
            results();
        });
    }
}
var player1Wins = 0;
var player1Losses = 0;
var player2Wins = 0;
var player2Losses = 0;
var tie = 0;
//function that runs win/loss conditions
function results() {

    // player one choses rock
    if (player1Choice === "rock" && player2Choice === "rock") {
        tie++;
        renderWLT();
        $(".prompt3").text("Tie!");
        setTimeout(function () { handHide(); }, 2000);
    } else if (player1Choice === "rock" && player2Choice === "paper") {
        player1Losses++;
        player2Wins++;
        renderWLT();
        $(".prompt3").text("Player2 wins!");
        setTimeout(function () { handHide(); }, 2000);
    } else if (player1Choice === "rock" && player2Choice === "scissors") {
        player2Losses++;
        player1Wins++;
        renderWLT();
        $(".prompt3").text("Player1 wins!");
        setTimeout(function () { handHide(); }, 2000);
    }
    // player one choses paper
    if (player1Choice === "paper" && player2Choice === "paper") {
        tie++;
        renderWLT();
        $(".prompt3").text("Tie!");
        setTimeout(function () { handHide(); }, 2000);
    }
    if (player1Choice === "paper" && player2Choice === "scissors") {
        player1Losses++;
        player2Wins++;
        renderWLT();
        $(".prompt3").text("Player2 wins!");
        setTimeout(function () { handHide(); }, 2000);
    }
    if (player1Choice === "paper" && player2Choice === "rock") {
        player2Losses++;
        player1Wins++;
        renderWLT();
        $(".prompt3").text("Player1 wins!");
        setTimeout(function () { handHide(); }, 2000);
    }
    // player one choses scissors
    if (player1Choice === "scissors" && player2Choice === "scissors") {
        tie++;
        renderWLT();
        $(".prompt3").text("Tie!");
        setTimeout(function () { handHide(); }, 2000);
    }
    if (player1Choice === "scissors" && player2Choice === "rock") {
        player1Losses++;
        player2Wins++;
        renderWLT();
        $(".prompt3").text("Player2 wins!");
        setTimeout(function () { handHide(); }, 2000);
    }
    if (player1Choice === "scissors" && player2Choice === "paper") {
        player2Losses++;
        player1Wins++;
        renderWLT();
        $(".prompt3").text("Player1 wins!");
        setTimeout(function () { handHide(); }, 2000);
    }
}
//function that renders wins and losses
function renderWLT() {
    $(".p1WinLoss").html("<div>WINS: " + player1Wins + ", LOSSES: " + player1Losses + ", TIES: " + tie + "</div>");
    $(".p2WinLoss").html("<div>WINS: " + player2Wins + ", LOSSES: " + player2Losses + ", TIES: " + tie + "</div>");
}

function hide() {
    $(".rock").hide();
    $(".paper").hide();
    $(".scissors").hide();
}

function show() {
    $(".rock").show();
    $(".paper").show();
    $(".scissors").show();
    $(".rock2").show();
    $(".paper2").show();
    $(".scissors2").show();
}

function hide2() {
    $(".rock2").hide();
    $(".paper2").hide();
    $(".scissors2").hide();
}

function handHide() {
    $(".p1ChoiceRock").hide();
    $(".p2ChoiceRock").hide();
    $(".p1ChoicePaper").hide();
    $(".p2ChoicePaper").hide();
    $(".p1ChoiceScissors").hide();
    $(".p2ChoiceScissors").hide();
    $(".prompt1").empty();
    $(".prompt2").empty();
    $(".prompt3").empty();
    show();
}

handHide();

//////CHAT//////

var name = "";
var chat = "";

function chatbox() {
    // Click Button changes what is stored in firebase
    $("#btn-chat").on("click", function (event) {
        // Prevent the chat from refreshing
        event.preventDefault();

        // Get inputs
        name = player1Name;
        chat = $("#chatInput").val().trim();

        localStorage.setItem("name", name);

        // Change what is saved in firebase
        database.ref("/chat").push({
            name: name,
            chat: chat,
        });

        $(".form-control1").val("");
    });

    // $(document).keydown(function (e) {
    //     var key_one = 13;

    //     if (e.keyCode == key_one) {
    //         // Prevent the chat from refreshing
    //         event.preventDefault();

    //         // Get inputs
    //         name = player1Name;
    //         chat = $("#chatInput").val().trim();

    //         localStorage.setItem("name", name);

    //         // Change what is saved in firebase
    //         database.ref("/chat").push({
    //             name: name,
    //             chat: chat,
    //         });

    //         $(".form-control1").val("");
    //     }
    // });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref("/chat").on("child_added", function (snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());

        // Log the value of the various properties
        console.log(snapshot.val().name);
        console.log(snapshot.val().chat);

        // Change the HTML    
        $(".chatArea").prepend("<div>" + snapshot.val().name + ": " + snapshot.val().chat + "</div>");

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

chatbox();


















// Konami Code
if (window.addEventListener) {
    var state = 0, konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.addEventListener("keydown", function (e) {
        if (e.keyCode == konami[state]) state++;
        else state = 0;
        if (state == 10)
            $("body").css("background", "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)");
    }, true);
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