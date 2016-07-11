var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var clickReady = true;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function(){
    $('.back').click(function(){  //click event function on class card
        $(this).addClass('card_clicked'); //add class card_clicked to elements of class .back
        card_clicked(this); //function call for card clicked to compare cards
        display_stats(); //function call to display_stats
        blurry_card(); //function call to add bluriness to the cards

        /*console.log('card_clicked on: ', this); //output the clicked card on */

    });
    $('.reset').click(function(){ //resets stats with reset game button is clicked
        reset_stats(); //function call to set variables back to 0
    });
});

function card_clicked(selected_card) { //function with the parameter of the card clicked

    if(!clickReady){ //Condition to check if card can be clicked
        return;
    }

    if (first_card_clicked == null){ //checks if condition equals
        first_card_clicked = $(selected_card).parent().find('.front > img').attr('src'); //finds img value of 1st card
        $(selected_card).parent().find('.back').hide(); //finds class back and sets display to none

        /* console.log('first card: ', first_card_clicked); //output first card clicked */
    }
    else {
        second_card_clicked = $(selected_card).parent().find('.front > img').attr('src'); //finds img value of 2nd card
        $(selected_card).parent().find('.back').hide();  //finds class back and sets display to none
        comparison(first_card_clicked, second_card_clicked); //function compares the 2 cards
        ++attempts; //increment attempts

        /* console.log('second card: ', second_card_clicked); //output second card clicked */
    }
    if (match_counter == total_possible_matches){ //compares the value fo match_counter and total_possible_matches
        alert('Winner! All cards matched.'); //window pop up stating all cards matched
    }
    calc_accuracy(); //function to calculate accuracy
}

function comparison(x, y){ //function to compare first_card_clicked and second_card_clicked
    if (x == y) { //compares first and second selected cards
        $('.card_clicked').removeClass('card_clicked'); //removes card_clicked class from the selected cards
        match_counter++; //increments the match_counter
        first_card_clicked = null; //set first_card_clicked to null
        second_card_clicked = null; //set second_card_clicked to null
        matches++; //increment matches

        /* console.log('Output: There is a match.'); //outputs if there is a match
        console.log('Number of matches:', matches); //output value of matches */
    }
    else {
        $('.card_clicked').delay(1000).show(10); //sets the delay time to show the back card
        $('.back').removeClass('card_clicked'); //removes card_click class from the selected cards
        first_card_clicked = null; //sets first_card_clicked to null
        second_card_clicked = null; //sets second_card_clicked to null
        clickReady=false; //sets clickReady to false so cards other cards can't be clicked
        setTimeout(function(){  //timeout function to turn click enable back to true
            clickReady=true;}, 1500);

        /*console.log('No match'); //outputs string no match if condition is false */
    }
}

function display_stats(){  //function to add value to attempts, games-played and accuracy
    $('.attempts .value').text(attempts); //add value to attempts
    $('.games-played .value').text(games_played); //add value to games_played
    $('.accuracy .value').text(accuracy + '%'); //add value to accuracy
    $('.matches .value').text(matches); //adds value to matches
}

function calc_accuracy(){ //function to calculate accuracy
    accuracy = Math.round((matches / attempts) * 100); //formula for accuracy
}

function reset_stats(){ //function to reset stats
    accuracy = 0; //set accuracy to 0
    matches = 0; //set matches to 0
    attempts = 0; //set attempts to 0
    match_counter = 0;
    $('.back').show(); //shows all hidden back cards
    games_played++; //increments game_played
    display_stats(); //resets the value to reset for the function
    $('.card, .front,.back').css('-webkit-filter', ''); // remove blur from cards
}

function blurry_card() { //function to add blur to cards
    if (matches == 2) {
        $('.front').css('-webkit-filter', 'blur(1px)');
        $('.matches .value').text('Drink on!');
    }
    if (matches == 4) {
        $('.back').css('-webkit-filter', 'blur(3px)');
        $('.matches .value').text('Feeling buzzed!');
    }
    if (matches == 6) {
        $('.card').css('-webkit-filter', 'blur(4px)');
        $('.matches .value').text('Beer goggle!');
    }
}