var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var clickReady = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var random_card_faces = [];

$(document).ready(function () {
    randomize_cards();

    $('.card').on("click", function () {  //click event function on class card
        /*$(this).addClass('card_clicked'); //add class card_clicked to elements of class .back*/
        card_clicked(this); //function call for card clicked to compare cards
        display_stats(); //function call to display_stats
    });

    $('.reset').on("click", function () { //resets stats with reset game button is clicked
        reset_stats(); //function call to set variables back to 0
    });

    $('.play_music').on("click", function () {
        $('.play_music').hide();
        $('.mute_music').show();
        play_music();

    });
    $('.mute_music').on("click", function () {
        $('.mute_music').hide();
        $('.play_music').show();
        mute_music();
    });

});

function randomize_cards() {
    var card_faces = [
        "images/aliens.jpg",
        "images/bullseye.jpg",
        "images/buzz_lightyear.jpg",
        "images/hamm.jpg",
        "images/jessie.jpg",
        "images/mr_potato_head.jpg",
        "images/rex.jpg",
        "images/sheriff_woody.jpg",
        "images/slinky_dog.jpg",
        "images/aliens.jpg",
        "images/bullseye.jpg",
        "images/buzz_lightyear.jpg",
        "images/hamm.jpg",
        "images/jessie.jpg",
        "images/mr_potato_head.jpg",
        "images/rex.jpg",
        "images/sheriff_woody.jpg",
        "images/slinky_dog.jpg"
    ];
    var card_faces_length = card_faces.length;

    for (var i = 0; i < card_faces_length; i++) {
        var current_length = card_faces.length;
        var num = Math.floor(Math.random() * current_length);
        var temp = (card_faces.splice(num, 1));
        random_card_faces.push(temp[0]);
    }
    for (var j = 0; j < random_card_faces.length; j++) {
        $('.cardSection').append('<div class="card"></div>');
        $('.card:nth-child(' + (j + 1) + ')').append('<div class="front"><img src="' + random_card_faces[j] + '"></div>');
        $('.card:nth-child(' + (j + 1) + ')').append('<div class="back"><img src="images/toy_story_logo.jpg"></div>');
    }
}
function card_clicked(selected_card) { //function with the parameter of the card clicked
    if (!clickReady) { //Condition to check if card can be clicked
        return;
    }

    $(selected_card).find(".back").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 180deg )",
        "transform": "perspective( 600px ) rotateY( -180deg )"
    });
    $(selected_card).find(".front").css({
        "-webkit-transform": "perspective( 600px ) rotateY( 0deg )",
        "transform": "perspective( 600px ) rotateY( 0deg )"
    });

    if (first_card_clicked == null) { //checks if condition equals
        first_card_clicked = $(selected_card); //finds img value of 1st card
        console.log("first_card_clicked " + first_card_clicked);
    }
    else {
        second_card_clicked = $(selected_card); //finds img value of 2nd card
        console.log('second card: ', second_card_clicked); //output second card clicked
        attempts++; //increment attempts
        if ($(first_card_clicked).find('.front > img').attr('src') == $(second_card_clicked).find('.front > img').attr('src')) { //compares first and second selected cards
            console.log("comparision");
            $(first_card_clicked).unbind("click");
            $(second_card_clicked).unbind("click");
            match_counter++; //increments the match_counter
            calc_accuracy();
            first_card_clicked = null; //set first_card_clicked to null
            second_card_clicked = null; //set second_card_clicked to null
            matches++; //increment matches
            if (match_counter == total_possible_matches) { //compares the value fo match_counter and total_possible_matches
                $('.front').remove();
                $('.back').remove();
                $('#winner').show();
                $('#game_music').trigger('pause');
                $('#win_voice').trigger('play');
            }

        }
        else {
            console.log("comparison else");
            clickReady = false; //sets clickReady to false so cards other cards can't be clicked
            setTimeout(function () {  //timeout function to turn click enable back to true*/
                console.log("flipping cards");
                $(second_card_clicked).find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .3s linear 0s",
                    "transition": "-webkit-transform .3s linear 0s"
                });
                $(second_card_clicked).find('.front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .3s linear 0s",
                    "transition": "-webkit-transform .3s linear 0s"
                });
                $(first_card_clicked).find('.back').css({
                    "transform": "rotateY(0)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .3s linear 0s",
                    "transition": "-webkit-transform .3s linear 0s"
                });
                $(first_card_clicked).find('.front').css({
                    "transform": "rotateY(-180deg)",
                    "transform-style": "preserve-3d",
                    "transition": "transform .3s linear 0s",
                    "transition": "-webkit-transform .3s linear 0s"
                });
                first_card_clicked = null; //sets first_card_clicked to null
                second_card_clicked = null; //sets second_card_clicked to null
                clickReady = true;
                return;
            }, 800);
            console.log('No match'); //outputs string no match if condition is false
        }

        calc_accuracy(); //function to calculate accuracy
    }
}

function display_stats() {  //function to add value to attempts, games-played and accuracy
    $('.attempts .value').text(attempts); //add value to attempts
    $('.accuracy .value').text(accuracy + '%'); //add value to accuracy
    $('.matches .value').text(matches); //adds value to matches
}

function calc_accuracy() { //function to calculate accuracy
    accuracy = Math.round((matches / attempts) * 100); //formula for accuracy
}

function reset_stats() { //function to reset stats
    location.reload();
}

function play_music() {
    $('#game_music').trigger('play');
}

function mute_music() {
    $('#game_music').trigger('pause');
}

