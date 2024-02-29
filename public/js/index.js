$(function () {
    // GET request to fetch poll data
    $.get('http://localhost:3000/poll', function (data) {
        //Extract first poll & ID
        const poll = data.polls[0];
        const pollId = poll.poll_id;

        // Display the poll question
        $('#polls-container').append(`<div class="question">${poll.question}</div>`);

        // Iterate over each poll option 
        // & display option as a button
        poll.options.forEach(function (option) {
            const optionHtml = `
                <div class="option-button">
                    <button class="btn btn-primary option-btn" data-option-id="${option.option_id}">${option.option_text}</button>
                </div>
            `;
            $('#options').append(optionHtml);
        });

        // Event listener for option buttons
        $(document).on('click', '.option-btn', function () {
            $('#error-message').text('');
            $('.option-btn').removeClass('selected');
            $(this).addClass('selected');
        });

        // Event listener for submit button
        $(document).on('click', '#submit-btn', function () {
            // Get the selected option ID
            const selectedOptionId = $('.option-btn.selected').data('option-id');

            $('#error-message').text('');

            // If selected, post vote and navigate to confirmation
            if (selectedOptionId) {
                $.post(`http://localhost:3000/vote/${pollId}/${selectedOptionId}`)
                    .done(function (response) {
                        console.log('Vote submitted successfully');
                        window.location.href = `confirmation.html?poll_id=${pollId}`
                    })
                    .fail(function (error) {
                        console.error('Failed to submit vote', error);
                    });
            } else {
                // Display error message if no option selected
                $('#error-message').text('Please select an option before submitting.');
            }
        });
    });
});
