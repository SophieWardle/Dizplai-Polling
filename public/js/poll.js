$(document).ready(function() {
    $.get('http://localhost:3000/poll', function(data) {
        const poll = data.polls[0];
        const pollId = poll.poll_id;
        $('#polls-container').append(`<div class="question">${poll.question}</div>`);

        poll.options.forEach(function(option) {
            const optionHtml = `
                <div class="option-button">
                    <button class="btn btn-primary option-btn" data-option-id="${option.option_id}">${option.option_text}</button>
                </div>
            `;
            $('#options').append(optionHtml);
        });

        const submitButtonHtml = `
            <div class="submit-button">
                <button id="submit-btn" class="btn btn-primary submit-btn">SUBMIT</button>
            </div>
        `;
        $('#options').append(submitButtonHtml);

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
                    window.location.href = `vote.html?poll_id=${pollId}`
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