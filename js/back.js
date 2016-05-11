var lions;
var lionInfo;
var selectedLion;

var setup = function () {
    load_from_cookie();

    lions = game_data.lions;
    if (lions) {
        selectedLion = game_data.selectedLion;
        lionInfo = lions[selectedLion];
    } else {
        restart();
    }

    updatePage();
};

var restart = function () {
    createLions();
    updateSaveData();
    updatePage();
};


var createLions = function () {
    lions = [];

    var l;
    for (l = 0; l < lionsToCreate; l++) {
        var newLion = createLion();
        lions.push(newLion);
    }
    selectedLion = 0;
    lionInfo = lions[selectedLion];
};

var createLion = function () {
    var lionInfo = {};
    lionInfo.name = "unnamed";
    lionInfo.age = "Adult";

    var foodIndex = Math.random();
    foodIndex = foodIndex * foods.length;
    foodIndex = Math.floor(foodIndex);

    lionInfo.food = foods[foodIndex];


    //deside traits
    lionInfo.traits = [];

    //creates a copy of the array
    var availableDesires = desires.slice(0);

    while (lionInfo.traits.length < traitsToCreate) {

        var desireIndex = Math.floor(Math.random() * availableDesires.length);
        var desire = availableDesires[desireIndex];

        //remove the chosen one from list of available options
        availableDesires.splice(desireIndex, 1);

        var desireLevel = Math.floor(Math.random() * 2);

        var trait;
        if (desireLevel == 0) {
            trait = desire.less;
        } else {
            trait = desire.more;
        }
        lionInfo.traits.push(trait);
    }

    var colorIndex = Math.floor(Math.random() * colors.length);
    lionInfo.maneColor = colors[colorIndex].name;

    colorIndex = Math.floor(Math.random() * colors.length);
    lionInfo.eyeColor = colors[colorIndex].name;

    colorIndex = Math.floor(Math.random() * colors.length);
    lionInfo.furColor = colors[colorIndex].name;

    return lionInfo;
};

var updateSaveData = function () {
    var saveData = {};
    saveData.lions = lions;
    saveData.selectedLion = selectedLion;

    update_game_from_object(saveData);
    save_game_into_cookie();
};