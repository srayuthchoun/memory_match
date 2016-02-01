/**
 * Created by Administrator on 1/29/2016.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

$(document).ready(function(){
    $('.card').click(function(){
        console.log("card_clicked: ", this);
        card_clicked(this);
    });

});

function card_clicked(selected_card){
    console.log(selected_card);
    if (first_card_clicked == null){
        first_card_clicked = $(selected_card).find('.front').find('img').attr('src');
        console.log('first card: ' + first_card_clicked);
        $(selected_card).find('.back').css('visibility','hidden');
        var first_card = selected_card;
        console.log(first_card);
        return;
    }
    else {
        second_card_clicked = $(selected_card).find('.front').find('img').attr('src');
        console.log('second card: ' + second_card_clicked);
        $(selected_card).find('.back').css('visibility','hidden');
        //console.log(first_card_clicked + second_card_clicked);

    }
    if (first_card_clicked == second_card_clicked){
    ++match_counter;
    first_card_clicked = null;
    second_card_clicked = null;

    }
    else {

        console.log('no matches');

        console.log(first_card);
        //$(selected_card).find('.back').css('visibility','visible');
        return;
    }
     if (match_counter == total_possible_matches) {
        alert('Winner!'); //window pop up
    }
}





