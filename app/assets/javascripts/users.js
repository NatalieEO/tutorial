//jQuery, Stripe defined elsewhere
/* global $, Stripe */

//Document ready function. Waits till doc is fully loaded.
//Loads turbolinks gem first to avoid conflict
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit btn,
  submitBtn.click(function(event){
    //prevent default submission behavior. Then, change submit-btn text and disable it.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),             //grabs them using CSS selectors
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use Stripe JS library to check for card errors. Initialize with no errors
    var error = false;
    
    //Validate card number. If ccNum is NOT valid, run code. There are errors.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    //Validate CVC number.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    
    if (error) {
      //If there are card errors, don't send to Stripe. User can try to sign up again
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Send the card info to Stripe.
      Stripe.createToken({
        //pass inside {} an object containing CC information
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    //exit out of the function
    return false;
  });
  
  
  //Stripe will return a card token. Define stripeResponseHandler function using Stripe documentation
  function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;
    
    //Inject card token as hidden field into the form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Submit form to our Rails app.
    theForm.get(0).submit();            //theForm is an array with 1 element. get(0) grabs first
  }
});