// YOUR CODE HERE:


$('document').ready(function (){


var message = {
  'username': 'frankbowers',
  'text': 'This is April 6 16:07 test',
  'roomname': '6th floor'
};
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data){
      // showMessages(data);
      console.log('posted successfully');
    },
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message: ' + JSON.stringify(data));
    }
  });

  var testLimit = { limit: 10000, order: '-updatedAt'};

  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: testLimit,
    contentType: 'application/json',
    success: function (data){
      showMessages(data);
    },
    error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message: ' + data);
    }
  });


});

var showMessages = function (data) {

  var $ul = $('.messages');
  var length = data.results.length;
  for(var i = 0; i < length; i++) {
    var msgData = data.results[i];

    var source   = $('#msgTemplate').html();
    var template = Handlebars.compile(source);
    var msgHTML = template(msgData);
    var $msg = $($.parseHTML(msgHTML));
    $ul.append($msg);
  }
  $('time.timeago').timeago();
};

