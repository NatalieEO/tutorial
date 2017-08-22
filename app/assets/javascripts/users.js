//jQuery, Stripe defined elsewhere
/* global $, Stripe */

//Document ready function. Waits till doc is fully loaded.
//Loads turbolinks gem first to avoid conflict
$(document).on('turbolinks:load', function(){
   var theForm = $('#pro_form');
   var submitBtn = $('#form-signup-btn');
   
   //Set Stripe public key.
   //Grabs content attr of "stripe-key" meta tag from application.html using CSS selectors
   Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
   
   
   //When user clicks form submit button, prevent default submission behavior.
   submitBtn.click(function(event){
      event.preventDefault();
      
      //Collect the credit card fields.
      var ccNum = $('#card_number').val(),
          cvcNum = $('#card_code').val(),
          expMonth = $('#card_month').val(),          //grabs them using CSS selectors
          expYear = $('#card_year').val();
          
      //Send card information to Stripe.
      Stripe.createToken({
         //pass inside {} an object containing CC information
         number: ccNum,
         cvc: cvcNum,
         exp_month: expMonth,
         exp_year: expYear
      }, stripeResponseHandler);   
   });
   
   
   //Stripe will return a card token.
   //Inject card token as hidden field into form.
   //Submit form to our Rails app.

});