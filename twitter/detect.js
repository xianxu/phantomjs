var page = require('webpage').create(),
  sys = require('system'),
  waitFor = 5000,         // idle timeout
  overAllTimeout = 30000, // overall timeout
  flag = null,
  t, address, timeout = null;

if (sys.args.length > 2) {
  // possible flag values:
  //   -r:   also print out resources requested
  flag = sys.args[1];
  address = sys.args[2];
} else if (sys.args.length === 1) {
  console.log('Usage: resolve.js [flag] <some URL>');
  console.log('');
  console.log('Flags:');
  console.log('    -r: include resource asks (javacript/css/images etc.)');
  phantom.exit();
} else {
  address = sys.args[1];
}

function printArgs() {
  var i, ilen;
  for (i = 0, ilen = arguments.length; i < Math.min(1, ilen); ++i) {
    arg = arguments[i]
    if (typeof arg.url === 'undefined') {
      console.log("==>" + arg);
    } else {
      console.log("==>" + arg.url);
    }
  }
}

function leaseLife() {
  if (timeout != null) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() { phantom.exit() }, waitFor);
}

t = Date.now();

page.onInitialized = function() {
  leaseLife();
  //console.log("page.onInitialized");
  //printArgs.apply(this, arguments);
};
page.onLoadStarted = function() {
  leaseLife();
  //console.log("page.onLoadStarted");
  //printArgs.apply(this, arguments);
};
page.onLoadFinished = function() {
  leaseLife();
  //console.log("page.onLoadFinished");
  //printArgs.apply(this, arguments);
};
//page.onUrlChanged = function() {
  //leaseLife();
  //console.log("page.onUrlChanged");
  //printArgs.apply(this, arguments);
//};
page.onNavigationRequested = function() {
  leaseLife();
  //console.log("page.onNavigationRequested");
  printArgs.apply(this, arguments);
};

page.onResourceRequested = function() {
  leaseLife();
  //console.log("page.onResourceRequested");
  if (flag === "-r") {
    printArgs.apply(this, arguments);
  }
};
page.onResourceReceived = function() {
  leaseLife();
  //console.log("page.onResourceReceived");
  //printArgs.apply(this, arguments);
};

page.open(address, function (status) {
});

setTimeout(function() { phantom.exit() }, overAllTimeout);
