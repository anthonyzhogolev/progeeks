// function SumbitContactForm() {
//     jQuery('#ajax-contact').submit();
// }

$("#ajax-contact").validate({
    debug: true,
    rules: {
        name: {required: true},
        email: {required: true},
        message: {required: true},
    },
    messages: {
        name: "Name is required",
        email: "Email is required",
        message: "Message id required",
    },
    submitHandler: function (form) {
        grecaptcha.execute();
    },

    onkeyup: false
});

function showLoader($show){
    if($show){
        $('#contact-form-loader').show();
        $('#contact-form-btn').hide();
    } else {
        $('#contact-form-loader').hide();
        $('#contact-form-btn').show();
    }
}

function SumbitContactForm() {
    var form = $('#ajax-contact');

    var formData = {
        'name': form.find('[name="name"]').val(),
        'email': form.find('[name="email"]').val(),
        'message': form.find('[name="message"]').val(),
    };
    showLoader(true);

    $.ajax({
        type: 'POST',
        // url: $(form).attr('action'),
        url: 'https://nso6cxsh4f.execute-api.us-east-1.amazonaws.com/progeeks/send-message',
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
    }).done(function (response) {
        showLoader(false);
        $('#centralModalSuccess').modal('show');
        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
    }).fail(function (data) {
        showLoader(false);
        var $modal = $('#centralModalWarning');
        $modal.find('.js-modal-response-message').hide();
        $modal.find('.js-modal-default-message').hide();
        // Set the message text.
        if (data.responseText !== '') {
            $modal.find('.js-modal-response-message').text(responseText);
            $modal.find('.js-modal-response-message').show();
            $modal.modal('show');
        } else {
            $modal.find('.js-modal-default-message').show();
            $modal.modal('show');
        }
    });
}
