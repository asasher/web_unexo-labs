$(window).ready(function () {
    $('#contactform .submitbtn').on({
        click:sendEmailRequest
    });
});

function sendEmailRequest(event) {
    event.preventDefault();
    
    var state = 1;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //get all fields
    var form = $('#contactform');
    var name = form.find('#name').val();
    var email = form.find('#email').val();
    var query = form.find('#query').val();

    $(form).find('p.invalid').remove();
    $(form).find('.invalid').removeClass("invalid");
    

    if (name.length < 2)
    {
        state = 0;
        $(form).find('#name').addClass("invalid");
    }
    if (email.length < 2 || !filter.test(email)) {
        state = 0;
        $(form).find('#email').addClass("invalid");
    }
    if (query.length < 2)
    {
        state = 0;
        $(form).find('#query').addClass("invalid");
    };

    if (state == 1) {
        $(form).append('<p class="loading-msg">Please wait...</p>');

        console.log(name +  email + query);

        $.ajax({
            type: 'POST',
            url: 'email.php',
            //contentType: 'application/json; charset=utf-8',
            data: {
                name: name,
                email: email,
                query: query
            },
            dataType: "JSON",
            success: function (data) {
                $(form).find('p.loading-msg').remove();
                $(form).find('p.valid p.invalid').remove();
                if (data.response == "success") {                    
                    $(form).append('<p class="valid">Your message has been sent successfully.</p>');
                }
                else if (data.response == "failure") {                    
                    $(form).append('<p class="invalid">There was an error your message was not sent.</p>');
                }
            },
            error: function (e) {
                $(form).find('p.loading-msg').remove();
                $(form).find('p.valid p.invalid').remove();
                $(form).append('<p class="invalid">There was an error. Please try again later.</p>');
                console.log(e);
            }
        });
    };

}