$(function () {

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        // var formData = $(form).serializeArray();
        var formData = {
            'name': form.find('[name="name"]').val(),
            'email': form.find('[name="email"]').val(),
            'message': form.find('[name="message"]').val(),
        };
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            // url: $(form).attr('action'),
            url: 'https://nso6cxsh4f.execute-api.us-east-1.amazonaws.com/progeeks/send-message',
            data: JSON.stringify(formData),
            dataType: 'json',
            contentType: 'application/json',
        })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                // $(formMessages).removeClass('error');
                // $(formMessages).addClass('success');

                // Set the message text.
                // $(formMessages).text(response);

                $('#centralModalSuccess').modal('show');

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    // $(formMessages).text(data.responseText);
                    $('#centralModalWarning').modal('show');
                } else {
                    // $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    // toastr.info('Oops! An error occured and your message could not be sent.');
                    $('#centralModalWarning').modal('show');
                }
            });

    });

});