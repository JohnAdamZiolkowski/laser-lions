var updateMenuPage = function () {
    updateTimerTag();
    updateNextUpdateLabel();
};

var updateTimerTag = function () {
    var label = document.getElementById("timerTag");
    var stopButton = document.getElementById("stopButton");
    var startButton = document.getElementById("startButton");

    if (timer) {
        timerTag.textContent = "Timer: On";
        stopButton.style.display = "";
        startButton.style.display = "none";

    } else {
        timerTag.textContent = "Timer: Off";
        stopButton.style.display = "none";
        startButton.style.display = "";
    }
};

var updateNextUpdateLabel = function () {
    var label = document.getElementById("nextUpdateTag");
    var dateOfNextUpdate = dateLastUpdated - 0 + updatePeriod;

    dateOfNextUpdate = new Date(dateOfNextUpdate);
    var timeString = dateOfNextUpdate.getHours() + ":" + ("0" + dateOfNextUpdate.getMinutes()).slice(-2);
    label.textContent = "Next update at " + timeString;
};

var clickRestart = function () {

    if (confirm("Are you sure you want to restart?  Your lions will be permenantly lost.  Click OK to begin with a new set of lions.")) {
        restart();
    }
};

var clickUpdateFreq = function (element) {

    var row = element.parentElement.parentElement;

    //uncheck all checkboxes
    var cellIndex = 0;
    while (cellIndex < row.cells.length) {

        var cell = row.cells[cellIndex];
        var button = cell.children[1];
        var checkbox = cell.children[0];

        //        var divId = button.textContent + "Div";
        //        var div = document.getElementById(divId);
        //        div.style.display = "none";
        checkbox.checked = false;
        cellIndex += 1;
    };

    //check selected box
    //    var divId = element.textContent + "Div";
    //    var div = document.getElementById(divId);
    element.parentElement.children[0].checked = true;

    //    div.style.display = "block";

};