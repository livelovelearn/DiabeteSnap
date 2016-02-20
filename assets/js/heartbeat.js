// create timer of inactivity
var __heartbeat;
// first warning to user, pop up modal when time expires
var __firstAlertTime = '00:10:00';
// time has expired, log out user, redirect to login page
var __expireHeartbeatTime = '00:12:00';
// timeout title
var __warningTitle = "Timeout Warning";
// content for first warning
var __firstWarningMSG = "<p>Your application will time out soon.</p><p>For your safety and protection, your online session will be timed out if there is no additional activity. You will be redirected to the login screen.</p><p>If you are still working in your online session, simply click OK to continue.</p>";

// check for user click events
function checkForUserInteraction() {
    $("#pf-underlay, .pf-btn-close").click(function () {
        removeModalDisplay();
        resetHeartbeat();
    });
}

function resetHeartbeat() {
    // stop timer
    stopHeartbeat();
    // restart timer
    startHeartbeat();
}

function startHeartbeat() {
    // start timer
    var seconds = 0;
    __heartbeat = setInterval(function () {
        seconds = seconds + 1;
        checkForInactivity(seconds);
    }, 1000);
}

function stopHeartbeat() {
    // stop timer
    clearInterval(__heartbeat);
}

function checkForInactivity(currentSeconds) {
    var currentHeartbeat = convertIntervalToTimeFormat(currentSeconds);
    // check if the user has been idle for the allowed time
    if (currentHeartbeat == __firstAlertTime) {
        // first warning
        notifyUserWithWarning("first");
    } else if (currentHeartbeat == __expireHeartbeatTime) {
        // stop heartbeat
        stopHeartbeat();
        // last warning, expired
        notifyUserWithWarning("last");
    }
}

function notifyUserWithWarning(notificationAttempt) {
    (notificationAttempt == "first") ? createModalDisplay() : signOutUser();
}

function createModalDisplay() {
    var modalDisplay = '<div id="pf-underlay" style="display: block;"></div><div id="loginModal" class="modal show pf-dialog-component"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h2 class="text-center">' + __warningTitle + '</h2></div><div class="modal-body">' + __firstWarningMSG + '</div><div class="modal-footer"><div class="col-md-12"><div class="form-actions text-center"><button type="submit" class="btn btn-primary pf-dialog-button pf-btn-close">Close</button></div></div></div></div></div></div>';

    var currentModal = $("#pf-underlay");
    if (currentModal.length) {
        removeModalDisplay();
    }

    $('body').append(modalDisplay);

    checkForUserInteraction();
}

function signOutUser() {
    // remove modal
    removeModalDisplay();
    // reload current page to sign out the user automatically
    location.href = '#logout';
}

function removeModalDisplay() {
    // remove underlay
    $("#pf-underlay").remove();
    // remove dialog
    $(".pf-dialog-component").remove();
}

function convertIntervalToTimeFormat(totalSeconds) {
    function displayTimeFormat(num) {
        return ( num < 10 ? "0" : "" ) + num;
    }

    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;

    var minutes = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    var seconds = Math.floor(totalSeconds);

    // Pad the minutes and seconds with leading zeros, if required
    hours = displayTimeFormat(hours);
    minutes = displayTimeFormat(minutes);
    seconds = displayTimeFormat(seconds);

    // Compose the string for display
    var currentTimeString = hours + ":" + minutes + ":" + seconds;

    return currentTimeString;
}

