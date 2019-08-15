$('#btnClear').on('click', function() {
    $('#olEvents').empty();
  });
  var eventNames = [
    'load',
    'focus',
    'blur',
    'change',
    'close',
    'error',
    'haschange',
    'message',
    'offline',
    'online',
    'pagehide',
    'pageshow',
    'popstate',
    'resize',
    'submit',
    'unload',
    'beforeunload'
  ];
  eventNames.forEach(function(eventName) {
    $(window).on(eventName, function(evt) {
      let now = new Date()
      $('#olEvents').append('<li>' + now.toTimeString() + ' - ' + evt.type + '</li>');
      // scroll to bottom div
      $(window).scrollTop($('#divBottom').offset().top);
    });
  });