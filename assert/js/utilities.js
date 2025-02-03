/**
 * TOOL : English -> vietnamese
 */

$(function () {
    $('#send-btn').click(function() {
        sendMessage();
    });

    $('#message-input').keypress(function(e) {
        if (e.which == 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        var message = $('#message-input').val();
        if (message.trim() !== '') {
            addMessage('user', message);
            $('#message-input').val('');
            setTimeout(function() {
                addMessage('bot', 'This is a response from Copilot.');
            }, 1000);
        }
    }

    function addMessage(sender, message) {
        var messageClass = sender === 'user' ? 'user' : 'bot';
        var messageElement = `<div class="message ${messageClass}"><div class="message-content">${message}</div></div>`;
        $('#chat-body').append(messageElement);
        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }
});