'use strict';

$(document).ready(init);
function init() {
  displayData();
  $('#myForm').submit(submitMessage);
  $('.card').on('click', '.delete', deleteContent);
  $('.card').on('click', '.edit', editContent);
}

function editContent(e) {
  e.preventDefault();
  $('#myModal').modal(open);
  var name = $(this).parent().parent().find('.name').text();
  var topic = $(this).parent().parent().find('.topic').text();
  var message = $(this).parent().parent().find('.message').text();
  var id = $(this).parent().parent().find('.id').text();

  $('#edit-name').val(name);
  $('#edit-topic').val(topic);
  $('#edit-message').val(message);
  $('#edit-id').val(id);

  $('#save').click(putData);
}

function putData() {
  var topic = $('#edit-topic').val();
  var message = $('#edit-message').val();
  var id = $('#edit-id').val();

  var newData = {
    topic: topic,
    message: message,
    id: id
  }

  $.ajax({
    url: "/messages",
    type: 'PUT',
    data: newData,
    success: function() {
      console.log('update successful!');
      displayData();
    },
    fail: function() {
      console.log("update failed!");
    }
  });
}

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
    $card.find('.topic').text(d.topic);
    $card.find('.name').text(d.name);
    $card.find('.time').text(d.time);
    $card.find('.message').text(d.message);
    $card.find('.id').text(d.id);

    $('.card').prepend($card);
  });
}


function submitMessage(e) {
  e.preventDefault();
  var name = $('#name').val();
  var topic = $('#topic').val();
  var message = $('#message').val();

  var messageData = {
    name: name,
    topic: topic,
    message: message
  };

  postData(messageData);
  document.getElementById("myForm").reset();
  displayData();
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
