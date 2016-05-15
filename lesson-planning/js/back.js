var lions;
var lionInfo;
var selectedLion;

var dateLastUpdated;

var timer;

var setupGlobal = function () {
    var loadData = load_from_storage();

    if (loadData) {
        lions = loadData.lions;
        selectedLion = loadData.selectedLion;
        lionInfo = lions[selectedLion];
        dateLastUpdated = Date.parse(loadData.dateLastUpdated);
    } else {
        restart();
    }

    toggleTimer(true);
};

var setupPage = function (page) {
    setupGlobal();
    currentPage = page;
    updatePage();
};


var restart = function () {
    createLions();
    updateSaveData();
    backToArea();
    //updatePage();
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

    lionInfo.desires = [];
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
        lionInfo.desires.unshift(desireName);

        choiceIndex += 1;
    }

    //limit the number of desires to max
    lionInfo.desires = lionInfo.desires.slice(0, desiresToCreate);
};

var checkTime = function () {

    if (!dateLastUpdated) {
        dateLastUpdated = new Date();
    }

    var date = new Date();
    var difference = date - dateLastUpdated;
    //console.log("difference: " + difference);
    var timePassed = Math.floor(difference / updatePeriod);
    //console.log("time passed: " + timePassed);

    if (timePassed < 1) {
        updateSaveData();
        return;
    }

    if (timePassed > updateLimit) {
        timePassed = updateLimit;
    }

    dateLastUpdated = date;
    updateDesires(timePassed);
};

var updateDesires = function (timePassed) {

    //figure out how many desires to spread around based on time
    //modify this by the number of lions?
    //for every 2 lions, add another desire?
    //1 hour with
    //1-2 lion: 1 desire
    //3-4 lions: 2 desires
    //5-6 lions: 3 desires
    //7-8 lions: 4 desires
    //9-10 lions: 5 desires
    //this way all lions want 4 things by the end of 8 hours
    var desiresToAssign = Math.ceil(timePassed * lions.length / 2);

    //use that number to randomly make a list of that many lions
    var lionsWhoDesire = [];
    var desireIndex = 0;
    while (desireIndex < desiresToAssign) {

        var lionIndex = Math.floor(Math.random() * lions.length);
        var lion = lions[lionIndex];

        lionsWhoDesire.push(lion);

        desireIndex += 1;
    }

    //assign desires to each of the lions
    var lion;
    var lionIndex = 0;
    while (lionIndex < lionsWhoDesire.length) {

        lion = lionsWhoDesire[lionIndex];

        assignDesires(lion, 1);
        console.log(lion.name + " now wants to " + lion.desires[0]);

        lionIndex += 1;
    }

    updateSaveData();
    updatePage();
}

var updateSaveData = function () {
    var saveData = {};
    saveData.lions = lions;
    saveData.selectedLion = selectedLion;
    saveData.dateLastUpdated = new Date(dateLastUpdated).toUTCString();

    save_into_storage(saveData);
};

var getLionIndexByName = function (lionName) {

    var lionIndex = 0;
    while (lionIndex < lions.length) {
        var lion = lions[lionIndex];
        if (lionName == lion.name) {
            return lionIndex;
        }
        lionIndex += 1;
    }
};

var toggleTimer = function (turnOn) {
    //    var timerTag = document.getElementById("timerTag");
    clearInterval(timer);
    //    var text = "Timer: Off";

    if (turnOn) {
        timer = setInterval(checkTime, updateCheck);
        //        text = "Timer: On";
    }
    //    timerTag.textContent = text;
};