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
    $('.card').click(function(){  //click event function on class card
        $(this).find('.back').addClass('card_clicked'); //add class card_clicked to elements of class .back
        console.log('card_clicked on: ', this); //output the clicked card on
        card_clicked(this);
        display_stats();
    });
    $('.reset').click(function(){ //resets stats with reset game button is clicked
        reset_stats();
        $('.back').show(); //shows all hidden back cards
        games_played++; //increments game_played
    });

});

function card_clicked(selected_card) { //function with the parameter of the card clicked

    if(!clickReady){ //Condition to check if card can be clicked
        return;
    }
    console.log('selected card: ', selected_card); //output which card was selected
    if (first_card_clicked == null){ //checks if condition equals

        first_card_clicked = $(selected_card).find('.front').find('img').attr('src'); //finds img src value of 1st card
        console.log('first card: ', first_card_clicked); //output first card clicked
        $(selected_card).find('.back').hide(); //finds class back and sets display to none

    }
    else {
        second_card_clicked = $(selected_card).find('.front').find('img').attr('src'); //finds img src value of 2nd card
        console.log('second card: ', second_card_clicked); //output second card clicked
        $(selected_card).find('.back').hide();  //finds class back and sets display to none
        comparison(first_card_clicked, second_card_clicked); //compares the 2 cards
        ++attempts;
    }
    if (match_counter == total_possible_matches){ //compares the value fo match_counter and total_possible_matches
        alert('Winner! All cards matched.');
    }
    calc_accuracy(); //function to calculate accuracy
}

function comparison(x, y) { //function to compare first_card_clicked and second_card_clicked
    if (x == y) { //compares first and second selected cards
        $('.card_clicked').removeClass('card_clicked'); //removes card_clicked class from the selected cards
        console.log('Output: There is a match.'); //outputs if there is a match
        console.log('first card compare selected: ', x); //output value of x
        console.log('second card compare selected: ', y); //output value of  y
        match_counter++; //increments the match_counter
        first_card_clicked = null; //set first_card_clicked to null
        second_card_clicked = null; //set second_card_clicked to null
        console.log('match counter: ', match_counter); //output value of match_counter
        matches++;
        console.log('number of matches:', matches);
    }
    else {
        console.log('no match'); //outputs string no match if condition is false
        $('.card_clicked').delay(1000).show(10); //sets the delay time to show the back card
        $('.card_clicked').removeClass('card_clicked'); //removes card_click class from the selected cards
        first_card_clicked = null; //sets first_card_clicked to null
        second_card_clicked = null; //sets second_card_clicked to null
        clickReady=false; //sets clickReady to false so cards other cards can't be clicked
        setTimeout(function(){  //timeout function to turn click enable back to true
            clickReady=true;}, 1500);

    }
}

function display_stats(){  //function to add value to attempts, games-played and accuracy
    $('.attempts .value').text(attempts); //add value to attempts
    $('.games-played .value').text(games_played); //add value to games_played
    $('.accuracy .value').text(accuracy + '%'); //add value to accuracy
    console.log('display: ' + attempts);
    console.log('accuracy: ', accuracy);

}
function calc_accuracy() { //function to calculate accuracy
    accuracy = Math.round((matches / attempts) * 100);
}
function reset_stats() { //function to reset stats
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}






