var lions;
var lionInfo;
var selectedLion;

var areas;

var dateLastUpdated;

var timer;
var timerOn;

var setupGlobal = function () {
    var loadData = load_from_storage();

    if (loadData) {
        lions = loadData.lions;
        validateLions();

        selectedLion = loadData.selectedLion;
        lionInfo = lions[selectedLion];

        areas = loadData.areas;
        if (!areas) {
            createAreas();
        }

        dateLastUpdated = Date.parse(loadData.dateLastUpdated);
        if (dateLastUpdated == undefined) {
            dateLastUpdated = new Date();
        }

        timerOn = loadData.timerOn;
        if (timerOn == undefined) {
            timerOn = true;
        }
    } else {
        restart();
    }

    toggleTimer();
};

var validateLions = function () {

    var lionIndex = 0;
    while (lionIndex < lions.length) {
        var lionInfo = lions[lionIndex];

        if (lionInfo.level == undefined) {
            assignLevel(lionInfo);
        }

        lionIndex += 1;
    }

    //console.log(lions);
};

var setupPage = function (page) {
    setupGlobal();
    currentPage = page;
    updatePage();
};

var restart = function () {
    createLions();
    createAreas();

    dateLastUpdated = new Date();
    timerOn = true;

    updateSaveData();
    backToArea();
};

var createLions = function () {
    lions = [];

    var l;
    for (l = 0; l < lionsToCreate; l++) {
        var newLion = createLion(l);
        lions.push(newLion);
    }
    selectedLion = 0;
    lionInfo = lions[selectedLion];
};

var createLion = function (lionIndex) {
    var lionInfo = {};
    lionInfo.name = "unnamed" + lionIndex;
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

    assignLevel(lionInfo);

    return lionInfo;
};

var assignLevel = function (lionInfo) {
    lionInfo.level = Math.floor(Math.random() * 4) + 1;
    lionInfo.next = Math.floor(lionInfo.level / 2) + 8;
    lionInfo.experience = Math.floor(Math.random() * lionInfo.next);
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

var createAreas = function () {
    areas = [];

    var area = {};
    area.name = "Laser Lions";
    area.rows = [];

    var rowIndex = 0;
    while (rowIndex < rowsToCreate) {
        var row = [];

        var colIndex = 0;
        while (colIndex < colsToCreate) {
            var col = undefined;

            row.push(col);
            colIndex += 1;
        }
        area.rows.push(row);
        rowIndex += 1;
    }
    areas.push(area);
    distributeLionsIntoArea();
};

var distributeLionsIntoArea = function () {

    var unplacedLions = lions.slice(0);

    var area = areas[0];

    while (unplacedLions.length > 0) {

        var rowIndex = Math.floor(Math.random() * rowsToCreate);
        var colIndex = Math.floor(Math.random() * colsToCreate);

        var row = area.rows[rowIndex];
        var contents = row[colIndex];

        if (!contents) {

            var lionIndex = Math.floor(Math.random() * unplacedLions.length);
            var lionInfo = unplacedLions[lionIndex];
            unplacedLions.splice(lionIndex, 1);

            var contents = {}
            contents.type = "lion";
            contents.name = lionInfo.name;

            directionIndex = Math.floor(Math.random() * 2);
            if (directionIndex == 1) {
                contents.direction = "left";
            } else {
                contents.direction = "right";
            }

            row[colIndex] = contents;
        }
    }
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
    updateGame(timePassed);
};

var updateGame = function (timePassed) {
    updateDesires(timePassed);
    updateAreas(timePassed);

    dateLastUpdated = new Date();

    updateSaveData();

    updatePage();
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
};

var updateAreas = function () {
    createAreas();
    //    distributeLionsIntoArea();
};

var updateSaveData = function () {
    var saveData = {};
    saveData.lions = lions;
    saveData.selectedLion = selectedLion;

    saveData.areas = areas;

    saveData.dateLastUpdated = new Date(dateLastUpdated).toUTCString();
    saveData.timerOn = timerOn;

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

var findLionLocationByName = function (lionName) {
    var area = areas[0];

    var rowIndex = 0;
    while (rowIndex < rowsToCreate) {
        var row = area.rows[rowIndex];

        var colIndex = 0;
        while (colIndex < colsToCreate) {
            var contents = row[colIndex];

            if (contents) {
                if (contents.type == "lion" &&
                    contents.name == lionName) {

                    var results = {};
                    results.direction = contents.direction;
                    results.area = area.name;
                    results.row = rowIndex;
                    results.col = colIndex;
                    return results;
                }
            }
            colIndex += 1;
        }
        rowIndex += 1;
    }
};

var increaseHappiness = function (lionInfo) {

    var amount = 3;

    while (amount > 0) {
        lionInfo.experience += 1;

        if (lionInfo.experience >= lionInfo.next) {
            increaseLevel(lionInfo);
        }

        amount -= 1;
    }
    lionInfo.experience;
};

var increaseLevel = function (lionInfo) {

    lionInfo.level += 1;
    lionInfo.next = Math.floor(lionInfo.level / 2) + 8;
    lionInfo.experience = 0;
};

var toggleTimer = function (turnOn) {
    clearInterval(timer);
    timer = undefined;

    if (turnOn != undefined) {
        timerOn = turnOn;
        dateLastUpdated = new Date();
    }

    if (timerOn) {
        timer = setInterval(checkTime, updateCheck);
    }
};

var renameLion = function (lionInfo, newName) {

    //check if the name is valid
    if (newName == undefined) {
        alert("Rename lion error: can not be undefined");
        return;
    }
    if (newName == "") {
        alert("Rename lion error: can not be blank");
        return;
    }

    //check if the name is not changing
    if (newName == lionInfo.name) {
        alert("Rename lion error: this lion is already called " + newName);
        return;
    }

    //check if the name is not unique
    var lionIndex = 0;
    while (lionIndex < lions.length) {
        var otherLion = lions[lionIndex];
        if (lionInfo.name == otherLion.name) {
            //don't bother checking against current lion
            lionIndex += 1;
            continue;
        }
        if (newName == otherLion.name) {
            alert("Rename lion error: another lion is already called " + newName);
            return;
        }

        lionIndex += 1;
    }

    var oldName = lionInfo.name;

    //update the lionInfo
    lionInfo.name = newName;

    //update the areas
    var areaIndex = 0;
    while (areaIndex < areas.length) {
        var area = areas[areaIndex];

        var rowIndex = 0;
        while (rowIndex < area.rows.length) {
            var row = area.rows[rowIndex];

            var colIndex = 0;
            while (colIndex < row.length) {
                var contents = row[colIndex];

                if (contents) {
                    if (contents.type == "lion") {
                        if (contents.name == oldName) {
                            contents.name = newName;
                        }
                    }
                }

                colIndex += 1;
            }
            rowIndex += 1;
        }
        areaIndex += 1;
    }

    //todo: update any relationships the lion had

    //update save data and update the page
    updateSaveData();
    updatePage();
};