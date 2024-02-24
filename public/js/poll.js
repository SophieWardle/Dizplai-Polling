$(document).ready(function() {
    $.get('http://localhost:3000/poll', function(data) {
        const poll = data.polls[0];
        $('#polls-container').append(`<div>${poll.question}</div>`);

        poll.options.forEach(function(option) {
            const optionHtml = `
                <div class="row justify-content-center">
                    <button class="btn btn-primary option-btn">${option.option_text}</button>
                </div>
            `;
            $('#options .row:first').append(optionHtml);
        });

        //Option buttons
        $('.option-btn').click(function() {
            $('.option-btn').removeClass('selected');
            $(this).addClass('selected');
        });
    });
});