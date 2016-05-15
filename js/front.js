var updatePage = function () {
    //    var nametag = document.getElementById("nameTag");
    var ageTag = document.getElementById("ageTag");
    var favefood = document.getElementById("foodTag");

    //    nametag.textContent = "Name: " + lionInfo.name;
    ageTag.textContent = "Age: " + lionInfo.age;
    favefood.textContent = "Favourite Food: " + lionInfo.food;

    var nameTextbox = document.getElementById("nameTextbox");
    nameTextbox.value = "";

    var imageTag = document.getElementById("lionImage");
    var imageSrc = "../images/Sprite2biggermane.png";
    updateLionColors(imageTag, imageSrc, lionInfo);
    updateLionColorLabels();

    updateTraitList();
    //    updateDesiresList();
    updateLionSelect();
};

var updateNameTag = function () {
    var nametag = document.getElementById("nameTag");
    nametag.textContent = "Name: " + lionInfo.name;
};

var updateTraitList = function () {
    var traitsList = document.getElementById("traitsList");

    //remove old items
    while (traitsList.getElementsByTagName("li").length > 0) {
        traitsList.removeChild(traitsList.firstChild);
    }

    //add new items
    var loopCount = 0;
    while (loopCount < lionInfo.traits.length) {
        var trait = lionInfo.traits[loopCount];
        var traitItem = document.createElement("li");
        traitItem.textContent = trait;
        traitsList.appendChild(traitItem);

        loopCount += 1;
    }
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

var textBoxKeyPress = function (event) {
    //if the enter key is pressed
    if (event.charCode == 13) {
        nameTheLion();
    }
};

var nameTheLion = function () {
    var nameTextbox = document.getElementById("nameTextbox");

    lionInfo.name = nameTextbox.value;

    updateSaveData();
    updatePage();
};

var selectLion = function (element) {
    selectedLion = lionSelect.selectedIndex;

    lionInfo = lions[selectedLion];

    updateSaveData();
    updatePage();
};

var clickAssignDesires = function () {

    //give all the lions new desires
    var lion
    var lionIndex = 0;
    while (lionIndex < lions.length) {
        lion = lions[lionIndex];
        assignDesires(lion, desiresToCreate);
        lionIndex += 1;
    }

    updateSaveData();
    updatePage();
};

var clickSatisfyDesire = function () {

    lionInfo.desires.splice(0, 1);

    updateSaveData();
    updatePage();
};

var updateLionColorLabels = function () {
    var color, colorTag, huePortion;

    //mane color
    color = getColorByName(lionInfo.maneColor);
    colorTag = document.getElementById("maneColorLabel");
    colorTag.textContent = "Mane: " + color.name;

    //eyes color
    color = getColorByName(lionInfo.eyeColor);
    colorTag = document.getElementById("eyeColorLabel");
    colorTag.textContent = "Eyes: " + color.name;

    //fur color
    color = getColorByName(lionInfo.furColor);
    colorTag = document.getElementById("furColorLabel");
    colorTag.textContent = "Fur: " + color.name;
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