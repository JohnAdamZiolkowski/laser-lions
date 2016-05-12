var lions;
var lionInfo;
var selectedLion;

var setup = function () {
    var loadData = load_from_storage();

    if (loadData) {
        lions = loadData.lions;
        selectedLion = loadData.selectedLion;
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

    assignDesires(lionInfo, desiresToCreate);

    return lionInfo;
};

var assignDesires = function (lionInfo, desireCount) {

    //create a list of actions based the desires the lion has
    var desireChoices = [];

    var found, chanceAmount;
    var desire;
    var desireIndex = 0;
    while (desireIndex < desires.length) {
        desire = desires[desireIndex];

        chanceAmount = 0;
        found = false;

        //search the lion's traits for one that modifies the desire
        var trait;
        var traitIndex = 0;
        while (traitIndex < lionInfo.traits.length) {
            trait = lionInfo.traits[traitIndex];

            if (desire.less == trait) {
                chanceAmount = 1;
            } else if (desire.more == trait) {
                chanceAmount = 4;
            }

            //if more or less
            if (chanceAmount) {
                found = true;
                break;
            }

            traitIndex += 1;
        }

        //if the lion had no trait that affected this desire
        if (!chanceAmount) {
            chanceAmount = 2;
        }

        //make a weighted list of actions to take
        var chanceIndex = 0;
        while (chanceIndex < chanceAmount) {
            desireChoices.push(desire.action);
            chanceIndex += 1;
        }

        desireIndex += 1;
    }

    //choose a set from the actions
    var lionDesires = [];
    var choiceIndex = 0;
    var choice;
    while (choiceIndex < desireCount) {

        //todo: handle duplicates?
        var desireIndex = Math.floor(Math.random() * desireChoices.length);
        var desireName = desireChoices[desireIndex];
        lionDesires.push(desireName);

        choiceIndex += 1;
    }

    lionInfo.desires = lionDesires;
};


var updateSaveData = function () {
    var saveData = {};
    saveData.lions = lions;
    saveData.selectedLion = selectedLion;

    save_into_storage(saveData);
};