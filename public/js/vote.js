$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pollId = urlParams.get('poll_id');

    $.get(`http://localhost:3000/poll/${pollId}`, function(data) {

    $('.results-container').empty();

    const totalVoteCount = data.totalVoteCount;
    data.voteCounts.forEach(function(option) {
        const percentage = Math.round((option.voteCount / totalVoteCount) * 100);
        const optionHtml = `
        <div class="option-box">
            <div class="option-text">${option.option_text}</div>
            <div class="vote-percentage">${percentage}%</div>
        </div>
        `;
        $('.results-container').append(optionHtml);
    });
   });
});