'use strict';

$(document).ready(init);

function init() {
  $('#form').submit(submitMessage);
}

function submitMessage(event) {
  event.preventDefault();
  var name = $('#name').val();
  var topic = $('#topic').val();
  var message = $('#message').val();
  var image = $('#image').val();

  var $card = $(".template").clone();
  $card.removeClass('template');

  $card.find('.img').attr("src", image);
  $card.find('.h2').text(topic);
  // $card.find('.h5').text(topic);
  $card.find('.p').text(message);

  console.log($('.card'));
  window.location.replace('/messages');
}
