var page = require('webpage').create(),
    sys = require('system'),
    logResources = false,
    t, address;

if (sys.args.length > 1 && sys.args[1] === "-v") {
	    logResources = true;
}

if (sys.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit();
}
function printArgs() {
    var i, ilen;
    for (i = 0, ilen = arguments.length; i < ilen; ++i) {
        console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
    }
    console.log("");
}
t = Date.now();
address = sys.args[1];
page.onResourceRequested = function (request) {
    //console.log('Request ' + JSON.stringify(request, undefined, 4));
    //console.log(request.url);
};
//page.onResourceReceived = function (response) {
    //console.log('Receive ' + JSON.stringify(response, undefined, 4));
//};
page.onInitialized = function() {
    console.log("page.onInitialized");
    printArgs.apply(this, arguments);
};
page.onLoadStarted = function() {
    console.log("page.onLoadStarted");
    printArgs.apply(this, arguments);
};
page.onLoadFinished = function() {
    console.log("page.onLoadFinished");
    printArgs.apply(this, arguments);
};
page.onUrlChanged = function() {
    console.log("page.onUrlChanged");
    printArgs.apply(this, arguments);
};
page.onNavigationRequested = function() {
    console.log("page.onNavigationRequested");
    printArgs.apply(this, arguments);
};
if (logResources === true) {
    page.onResourceRequested = function() {
        console.log("page.onResourceRequested");
        printArgs.apply(this, arguments);
    };
    page.onResourceReceived = function() {
        console.log("page.onResourceReceived");
        printArgs.apply(this, arguments);
    };
}

page.onClosing = function() {
    console.log("page.onClosing");
    printArgs.apply(this, arguments);
};

// window.console.log(msg);
page.onConsoleMessage = function() {
    console.log("page.onConsoleMessage");
    printArgs.apply(this, arguments);
};

// window.alert(msg);
page.onAlert = function() {
    console.log("page.onAlert");
    printArgs.apply(this, arguments);
};
// var confirmed = window.confirm(msg);
page.onConfirm = function() {
    console.log("page.onConfirm");
    printArgs.apply(this, arguments);
};
// var user_value = window.prompt(msg, default_value);
page.onPrompt = function() {
    console.log("page.onPrompt");
    printArgs.apply(this, arguments);
};
page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        console.log('Loading time ' + t + ' msec');

	var title = page.evaluate(function () {
	  return document.title;
        });
	console.log(title);
    }
});
setTimeout(function() { phantom.exit(); }, 5000)
