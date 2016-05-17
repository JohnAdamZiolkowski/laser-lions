var updateMenuPage = function () {
    var timerTag = document.getElementById("timerTag");
    var text = "Timer: Off";

    if (timer) {
        text = "Timer: On";
    }
    timerTag.textContent = text;
};