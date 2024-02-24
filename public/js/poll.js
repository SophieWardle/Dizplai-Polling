$(document).ready(function() {
    $.get('http://localhost:3000/poll', function(data) {
        const poll = data.polls[0];
        const pollId = poll.poll_id;
        $('#polls-container').append(`<div>${poll.question}</div>`);

        poll.options.forEach(function(option) {
            const optionHtml = `
                <div class="row justify-content-center">
                    <button class="btn btn-primary option-btn" data-option-id="${option.option_id}">${option.option_text}</button>
                </div>
            `;
            $('#options .row:first').append(optionHtml);
        });

        //Option buttons
        $('.option-btn').click(function() {
            $('.option-btn').removeClass('selected');
            $(this).addClass('selected');
        });

        //Submit button
        $('#submit-btn').click(function(){
            const selectedOptionId = $('.option-btn.selected').data('option-id');
            if (selectedOptionId) {
                $.post(`http://localhost:3000/vote/${pollId}/${selectedOptionId}`)
                .done(function(response) {
                    console.log('Vote submitted successfully');
                })
                .fail(function(error) {
                    console.error('Failed to submit vote', error);
                });
            } else {
                console.log('Press an option before submitting');
            }
        });
    });
});