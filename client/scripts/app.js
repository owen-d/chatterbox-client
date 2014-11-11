// YOUR CODE HERE:

var app = {

  postMessageData: null,
  getMessageData: null,
  username: null,
  // escapeChars: /\w+/ig,

  initialize: function(){
    setInterval(this.fetch.bind(this), 3000);
  },

  display: function(){
    var messages = this.getMessageData;

    $('.messages-container').html('');

    for (var i = 0; i < messages.results.length; i++) {
      var user = encodeURIComponent(messages.results[i].username);
      var message = encodeURIComponent(messages.results[i].text);
      message = '<div class="">'+ user + ': ' + message + '</div>';
      $('.messages-container').append(message);
    }
  },

  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {
        order: '-createdAt',
        limit: 30
      },
      success: function (data) {
        console.log('chatterbox: Messages retrieved');
        app.getMessageData = data;
        app.display();
      },
      error: function (data) {
        console.error('chatterbox: Failed to retrieve messages');
      }
    });
  },

  createJSONMessage: function(){
    var result = {};
    result.username = app.username;
    result.text = $('.send-message').val();
    console.log(result.text);
    result.roomname = undefined; // TODO
    app.postMessageData = result;
  },

  postJSON: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(app.postMessageData),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch();
        // update();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  }

};

$(document).ready(function(){
  app.username = window.location.search.split("=")[1];
  app.initialize();

  $('.send-message').on('keydown', function(e){
    if (e.keyCode === 13) {
      app.createJSONMessage();
      app.postJSON();
      $(this).val('');
    }
  });

});
