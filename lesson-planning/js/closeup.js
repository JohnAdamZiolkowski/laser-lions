var clickArea = function () {
    window.location.replace("area.html");
};

var clickInfo = function () {
    window.location.replace("info.html");
};

var clickDesireBubble = function (element) {
    var desireIndex = element.dataset.desireIndex;
    var desire = lionInfo.desires[desireIndex];
    //        alert("You clicked desire " + desireIndex + ": " + desire);
    showDesirePopup(lionInfo, desireIndex);
    //satisfyDesire(lionInfo, desireIndex);
};

var satisfyDesire = function (lionInfo, desireIndex) {

    lionInfo.desires.splice(desireIndex, 1);
    increaseHappiness(lionInfo);
    updateSaveData();
    updateCloseupPage();
    updateHappiness();
    showHappiness();
    //alert(lionInfo.name + " is now " + (lionInfo.next - lionInfo.experience) + " away from level " + (lionInfo.level + 1) + "!")
};

var updateCloseupPage = function () {

    var imageTag = document.getElementById("closeupLion");
    var imageSrc = "../images/Sprite2biggermane.png";

    updateLionColors(imageTag, imageSrc, lionInfo, true);

    var location = findLionLocationByName(lionInfo.name);
    if (location.direction == "left") {
        imageTag.style.transform = "scaleX(-1)";
    } else {
        imageTag.style.transform = "";
    }

    var closeupDiv = document.getElementById("closeupDiv");

    //clear out old bubbles
    var desireIndex = 0;
    while (desireIndex < desiresToCreate) {
        var bubble = document.getElementById("desire" + desireIndex);

        bubble.dataset.desireIndex = "";
        bubble.style.visibility = "hidden";
        bubble.src = "";

        desireIndex += 1;
    }

    var desireIndex = 0;
    while (desireIndex < lionInfo.desires.length) {

        var bubble = document.getElementById("desire" + desireIndex);

        bubble.dataset.desireIndex = desireIndex;
        bubble.style.visibility = "visible";

        var desireName = lionInfo.desires[desireIndex]
        var desire = getDesireByActionName(desireName);
        bubble.src = "../images/desires/" + desire.icon + ".png";

        desireIndex += 1;
    }

    updateNameTag();
    updateDesiresList();
};

var acceptDesire = function (lionInfo, desireIndex) {

    hideDesirePopup();

    satisfyDesire(lionInfo, desireIndex);

};

var showHappiness = function () {
    var popup = document.getElementById("happinessPopup");
    popup.style.display = "block";
};

var hideHappiness = function () {
    var popup = document.getElementById("happinessPopup");
    popup.style.display = "none";
};

var showDesirePopup = function (lionInfo, desireIndex) {

    var desire = lionInfo.desires[desireIndex];

    var popup = document.getElementById("desirePopup");
    var question = document.getElementById("desirePopupQuestion");
    question.textContent = lionInfo.name + " wants to " + desire + ".";

    toggleTimer(false);

    var satisfyButton = document.getElementById("satisfyButton");
    satisfyButton.onclick = function () {
        acceptDesire(lionInfo, desireIndex);
        toggleTimer(true);
    };

    popup.style.display = "block";
};

var hideDesirePopup = function () {
    var popup = document.getElementById("desirePopup");
    popup.style.display = "none";
    toggleTimer(true);
};