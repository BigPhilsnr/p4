Stripe.setPublishableKey('pk_test_sV1re0HLbpAJhKlUJIzOn6UK');
var fm=$("#submit");

 fm.click(function(){
   alert('submiting')
 var amount= $('#cardnumber').val();
 var meternumber=$('#meternumber').val();
 var email=$('#email').val();
 $('#err').removeClass("hide");
   
Stripe.card.createToken({
  number: $('#cardnumber').val(),
  cvc: $('#cvc').val(),
  exp_month: $('#month').val(),
  exp_year: $('#year').val()
}, stripeResponseHandler);
});


function stripeResponseHandler(status, response) {

  // Grab the form:
  var $form = $('#details');

  if (response.error) { // Problem!

    // Show the errors on the form
    alert(response.error.message);
    $('#err').text(response.error.message);
    alert.removeClass("alert-info");
    alert.addClass("alert-danger");
    $form.find('button').prop('disabled', false); // Re-enable submission

  }
 else { // Token was created!

    // Get the token ID:
    var token = response.id;
    
   
   $.get("/token/"+token, function(result){
     
 if(result=="failed"){
    $('#err').text(result);
    alert("failed 2");
    var alert=$('#err');
    alert.removeClass("alert-info");
    alert.addClass("alert-danger");

  }
 else{
 var alert=$('#err');
 $form.hide();
    alert.text(result);
    alert.removeClass("alert-info");
    alert.addClass("alert-success");
    alert.text("Tokken successfully purchased");
    var amount= $('#cardnumber').val();
 var mm=$('#meternumber').val();
 var email=$('email').val();
    $.post("/payment",{acc:mm,email:email,amount:amount}).done(function(){

      
    });
    $(document).ready(function(){

        setTimeout(function(){
            alert.hide();
        },3000)
    });


  }
    });

  }
}