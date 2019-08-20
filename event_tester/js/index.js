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


  
  if (window.location.href.indexOf('localhost') != -1) {
    var elHead, elLink;
  
    elLink = document.createElement('link');
    elLink.rel = 'icon';
    elLink.type = 'image/png';
    elLink.href = 'data:image/png;base64,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';
    elLink.sizes = "16x16";
    elHead = document.getElementsByTagName("head")[0];
    elHead.appendChild(elLink);
  }

