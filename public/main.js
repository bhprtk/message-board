'use strict';

$(document).ready(init);

function init() {
  displayData();
  $('#form').submit(submitMessage);
  // $('.container').on('click', '.glyphicon-trash', deleteContent);
}

// function deleteContent(e) {
//   e.preventDefault();
//   var id = $(this).parent().parent().find('.id').text();
//   $.ajax({
//     url: `/messages`,
//     type: 'DELETE',
//     success: function(id) {
//       console.log('Delete request sent!');
//     }
//   });
// }

function displayData() {
  $.get("/messages/get")
  .done(function(data) {
    appendMessages(data);
  })
  .fail(function(error) {
    console.log('error:', error);
  });
}

function appendMessages(data) {
  data.forEach(function(d) {
    var $card = $('.template').clone();
    $card.removeClass('template');
    $card.find('img').attr('src', d.image);
    $card.find('h2').text(d.topic);
    $card.find('.name').text(d.name);
    $card.find('.time').text(d.time);
    $card.find('.message').text(d.message);
    $card.find('.id').text(d.id);

    $('.card').prepend($card);
  });
}


function submitMessage(event) {
  event.preventDefault();
  var name = $('#name').val();
  var topic = $('#topic').val();
  var message = $('#message').val();
  var image = $('#image').val();

  var messageData = {
    name: name,
    topic: topic,
    message: message,
    image: image
  };

  postData(messageData);
  window.location.replace("/messages");
}

function postData(data) {
  $.post("/messages", data)
    .done(function() {
      console.log("Succesfully posted!");
  })
    .fail(function(error) {
      console.log('error:', error);
    });
}
