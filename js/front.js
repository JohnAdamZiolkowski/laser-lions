var updatePage = function () {
    switch (currentPage) {
    case "area":
        updateAreaPage();
        break;
    case "closeup":
        updateCloseupPage();
        break;
    case "info":
        updateInfoPage();
        break;
    case "menu":
        updateMenuPage();
        break;
    }
};

var updateNameTag = function () {
    var nametag = document.getElementById("nameTag");
    nametag.textContent = lionInfo.name;
};

var updateDesiresList = function () {
    var desiresList = document.getElementById("desiresList");

    //remove old items
    while (desiresList.getElementsByTagName("li").length > 0) {
        desiresList.removeChild(desiresList.firstChild);
    }

    //add new items
    var loopCount = 0;
    while (loopCount < lionInfo.desires.length) {
        var desire = lionInfo.desires[loopCount];
        var desireItem = document.createElement("li");
        desireItem.textContent = desire;
        desiresList.appendChild(desireItem);

        loopCount += 1;
    }
};

var updateLionSelect = function () {
    var lionSelect = document.getElementById("lionSelect");

    //remove old options
    while (lionSelect.length > 0) {
        lionSelect.removeChild(lionSelect.firstChild);
    }

    //add new options
    var loopCount = 0;
    while (loopCount < lions.length) {
        var lion = lions[loopCount];
        var lionItem = document.createElement("option");
        lionItem.value = lion.name;
        lionItem.textContent = lion.name;
        lionSelect.appendChild(lionItem);

        loopCount += 1;
    }

    lionSelect.selectedIndex = selectedLion;
};

var updateHappiness = function () {
    var nextProgress = document.getElementById("nextProgress");
    var nextLabel = document.getElementById("nextLabel");
    var levelLabel = document.getElementById("levelLabel");

    levelLabel.textContent = "Happiness: Level " + lionInfo.level;
    nextProgress.max = lionInfo.next;
    nextProgress.value = lionInfo.experience;
    nextLabel.textContent = lionInfo.experience + " / " + lionInfo.next;
};

var updateLionColors = function (imageTag, imageSrc, lionInfo) {

    var color, colorTag, huePortion;
    var modifiers = [];

    //mane color
    color = getColorByName(lionInfo.maneColor);
    huePortion = color.base / 360.0;
    modifiers.push({
        low: 0.0,
        high: 0.05,
        add: huePortion,
    });

    //eyes color
    color = getColorByName(lionInfo.eyeColor);
    huePortion = color.base / 360.0;
    modifiers.push({
        low: 0.12,
        high: 0.14,
        add: huePortion,
    });

    //fur color
    color = getColorByName(lionInfo.furColor);
    huePortion = color.base / 360.0;
    modifiers.push({
        low: 0.10,
        high: 0.12,
        add: huePortion,
    });

    changeColor(imageTag, imageSrc, modifiers);
};

var backToArea = function () {
    window.location.replace("area.html");
};

var backToCloseup = function () {
    window.location.replace("closeup.html");
};

var toMenu = function () {
    window.location.replace("menu.html");
};

var clickSetTimer = function (turnOn) {

    toggleTimer(turnOn);
    updateSaveData();
    updatePage();
};

var clickForceUpdate = function () {
    //force one unit of time to pass
    updateGame(1);
};