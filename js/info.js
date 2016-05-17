var updateInfoPage = function () {
    updateNameTag();

    var ageTag = document.getElementById("ageTag");
    var favefood = document.getElementById("foodTag");

    ageTag.textContent = "Age: " + lionInfo.age;
    favefood.textContent = "Favourite Food: " + lionInfo.food;

    var nameTextbox = document.getElementById("nameTextbox");
    nameTextbox.value = "";

    var imageTag = document.getElementById("lionImage");
    var imageSrc = "../images/Sprite2biggermane.png";
    updateLionColors(imageTag, imageSrc, lionInfo);

    var location = findLionLocationByName(lionInfo.name);
    if (location.direction == "left") {
        imageTag.style.transform = "scaleX(-1)";
    } else {
        imageTag.style.transform = "";
    }

    var lionImageDiv = document.getElementById("lionImageDiv");
    var bubbleImage = document.getElementById("bubbleImage");
    if (bubbleImage) {
        lionImageDiv.removeChild(bubbleImage);
    }

    if (lionInfo.desires.length > 0) {
        var img = document.createElement("img");
        img.src = "../images/bubble.png";
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.zIndex = 2;
        img.width = 64;
        img.height = 64;
        img.id = "bubbleImage";
        if (location.direction != "left") {
            img.style.transform = "scaleX(-1)";
            img.style.left = 0;
        } else {
            img.style.right = 0;
        }
        lionImageDiv.appendChild(img);
    }

    updateLionColorLabels();

    updateTraitList();
    updateDesiresList();
    updateLionSelect();
    updateHappiness();
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

var clickDivButton = function (element) {
    var row = element.parentElement.parentElement;

    var cellIndex = 0;
    while (cellIndex < row.cells.length) {

        var cell = row.cells[cellIndex];
        var button = cell.children[0];

        var divId = button.value + "Div";
        var div = document.getElementById(divId);
        div.style.display = "none";

        cellIndex += 1;
    };

    var divId = element.value + "Div";
    var div = document.getElementById(divId);
    div.style.display = "block";

};