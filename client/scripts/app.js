// YOUR CODE HERE:

var app = {

  initialize: function(){

  },

  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Messages retrieved');
        // update();
      },
      error: function (data) {
        console.error('chatterbox: Failed to retrieve messages');
      }
    });
  },

  createJSONMessage: function(){
    var result = {};
    result.username = app.username;
    result.text = $('.send-message').text();
    result.roomname = undefined; // TODO
    return result;
  },

  postJSON: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(app.createJSONMessage()),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
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

  $('.send-message').on('keydown', function(e){
    if (e.keyCode === 13) {
      app.postJSON();
      // clear input field
      $(this).val('');
    }
  });

});
