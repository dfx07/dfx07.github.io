/**
 * TOOL : English -> vietnamese
 */
import { data_query } from './data.query.js';

const EN2VI_MODE = {
    EN2VI: 'en2vi',
    VI2EN: 'vi2en'
};

$(function () {

    var cur_dictionary_index = 0;
    var eng2vi_dictionary = undefined;
    var eng2vi_weights = undefined;
    var eng2vi_mode = EN2VI_MODE.VI2EN;

    $('#en2vi-selection').val(eng2vi_mode);

    $("#en2vi-selection").change(function () {
        var val_mode = $('#en2vi-selection').val()
        eng2vi_mode = EN2VI_MODE[Object.keys(EN2VI_MODE).find(key => EN2VI_MODE[key] === val_mode)];
    });

    function getNextIndex(weights) {
        var inverseWeights = weights.map(function(weight) {
            return 1 / weight;
        });
        
        var totalWeight = inverseWeights.reduce(function(acc, curr) {
            return acc + curr;
        }, 0);
        
        var probabilities = inverseWeights.map(function(weight) {
            return weight / totalWeight;
        });

        var rand = Math.random();
        var cumulativeProbability = 0;
        for (var i = 0; i < probabilities.length; i++) {
            cumulativeProbability += probabilities[i];
            if (rand < cumulativeProbability) {
                return i;
            }
        }

        return probabilities.length - 1;
    }

    $.getJSON("../Tool_En2Vi/assert/eng2vi.json", function(json_data){
        eng2vi_dictionary = data_query.query_list_eng_to_vi(json_data);
        eng2vi_weights = Array(eng2vi_dictionary.length).fill(1).map(function(_, index) {
            return 1;
        });

    }).fail(function()
    {
        alert("Coundn't load eng2vi dictionary.");
    })

    $('#send-btn').click(function() {
        sendAnswer();
    });

    $('#message-input').keypress(function(e) {
        if (e.which == 13) {
            sendAnswer();
        }
    });

    function sendAnswer() {
        var message = $('#message-input').val();

        // handle control command
        if(message === "reset"){
            eng2vi_weights =  Array(eng2vi_dictionary.length).fill(1).map(function(_, index) {
                return 1;
            });

            $('#message-input').val('');

            createQuestion();
            return;
        }

        var Answer = "@@";
        if (message.trim() !== '') {
            addAnswer('user', message);
            $('#message-input').val('');

            // true answer
            setTimeout(function() {
                if(Array.isArray(eng2vi_dictionary)){
                    if(eng2vi_mode === EN2VI_MODE.EN2VI)
                        Answer = eng2vi_dictionary[cur_dictionary_index].VI;
                    else
                        Answer = eng2vi_dictionary[cur_dictionary_index].EN;
                }                
                addTrueAnswer('bot', Answer);
                eng2vi_weights[cur_dictionary_index] +=1;
            }, 500);

            // gen next 
            setTimeout(function() {
                createQuestion();
            }, 1000);
        }
    }

    function createQuestion() {
        var Question = "@@";
        const que = generateQuestion();

        cur_dictionary_index = que.index;
        Question = que.content;
        addQuestion(Question);
    }

    function generateQuestion() {
        var next_index = getNextIndex(eng2vi_weights); 

        var Question = '@@';

        if(eng2vi_mode === EN2VI_MODE.EN2VI)
            Question = eng2vi_dictionary[next_index].EN;
        else
            Question = eng2vi_dictionary[next_index].VI;

        return {index : next_index, content : Question};
    }

    function addQuestion(message) {
        var messageClass = 'bot';
        var messageElement = `<div class="message ${messageClass}"><div class="message-content message-content-question">${message}</div></div>`;
        $('#chat-body').append(messageElement);
        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }

    function addAnswer(sender, message) {
        var messageClass = sender === 'user' ? 'user' : 'bot';
        var messageElement = `<div class="message ${messageClass}"><div class="message-content">${message}</div></div>`;
        $('#chat-body').append(messageElement);
        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }
    
    function addTrueAnswer(sender, message) {
        var messageClass = sender === 'user' ? 'user' : 'bot';
        var messageElement = `<div class="message ${messageClass}"><div class="message-content">${message}</div></div>`;
        $('#chat-body').append(messageElement);
        $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
    }
});