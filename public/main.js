'use strict';

$(document).ready(init);

function init() {
  displayData();
  $('#form').submit(submitMessage);
  $('.container').on('click', '.glyphicon-trash', deleteContent);
  // $('.container').on('click', '.glyphicon-pencil', gatherContent);
}

// function gatherContent(e) {
//   $('#myModal').modal('show');
//   // e.preventDefault();
//   // var loadingObj = {};
//   // var messages = $(this).parent().parent();
//   // loadingObj.name = messages.find('.name').text();
//   // loadingObj.topic = messages.find('.topic').text();
//   // loadingObj.message = messages.find('.message').text();
//   // loadingObj.image = messages.find('img').attr("src");
//   // loadingObj.id = messages.find('.id').text();
//   //
//   // loadContent(loadingObj);
//
// }

// function loadContent(obj) {
//   $.ajax({
//     url: '/messages/getone',
//     method: 'GET',
//     data: {id: id},
//     success: function(loadingData) {
//       console.log(loadingData[0].name);
//       $('#edit-name').val(loadingData[0].name);
//       //loadingObj.name = loadingData[0].name;
//     },
//     fail: function() {
//       console.log('failed');
//     }
//   });
//
//   $('#name').val(name);
//
// }

function deleteContent(e) {
  e.preventDefault();
  var r = confirm("Are you sure you want to delete this message?");
  if(r) {
    var id = $(this).parent().parent().find('.id').text();
    $.ajax({
      url: '/messages',
      type: 'DELETE',
      data: {id: id},
      success: function() {
        displayData();
      }
    });
  }
}

function displayData() {
  $('.card').empty();

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
