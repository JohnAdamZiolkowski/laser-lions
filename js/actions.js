var promptAction = function (action) {
    console.log(action);

    if (action == "eat") {
        promptEat();

    } else if (action == "sleep") {

    } else if (action == "play") {

    } else if (action == "give you a present") {

    } else if (action == "be pet") {

    } else if (action == "fight") {

    } else if (action == "be photographed") {

    } else if (action == "find a love") {

    } else if (action == "make a new friend") {

    } else if (action == "have an egg") {

    } else if (action == "raise a cub") {

    } else if (action == "grow up") {

    } else if (action == "take medicine") {

    }

};

var promptEat = function () {

    var currentFood = getHeldFood();

    var pages = paginate(currentFood);

    console.log(pages);
};

var getHeldFood = function () {
    return foods;
};

var makeArray = function (amount) {
    var array = [];

    while (array.length < amount) {
        array.push("item" + array.length);
    }

    return array;
};

var testPaginate = function () {
    var loopCount = 0;
    while (loopCount < 28) {
        var currentFood = makeArray(loopCount);

        var pages = paginate(currentFood);

        console.log(pages);

        loopCount += 1;
    }
};

var paginate = function (list) {

    var numItems = list.length;

    var pageIndex = 0;

    var fullPageAmount = 8;
    var endPageAmount = fullPageAmount - 1; //next / prev buttons
    var midPageAmount = endPageAmount - 1; //next & prev buttons

    var numPages = 0;

    var remainder = numItems;

    var pages = [];

    if (!list.length) {
        return pages;
    }

    //if one page can hold all items
    if (list.length <= fullPageAmount) {
        insertPage(list, pages, list.length);
        return pages;
    } else {
        insertPage(list, pages, endPageAmount);
        pages[pages.length - 1].push("next");
    }

    //mid pages
    while (list.length) {
        insertPage(list, pages, midPageAmount);
        pages[pages.length - 1].unshift("prev");
        if (list.length == 1) {
            pages[pages.length - 1].push(list.pop());
        } else if (list.length) {
            pages[pages.length - 1].push("next");
        }
    }

    return pages;
};

var insertPage = function (list, pages, amount) {
    //make a new page
    var page = list.slice(0, amount);
    pages.push(page);

    //remove the pages items from the main list
    list.splice(0, amount);
};

//tap desire
//open desire dialog
//reveal specific picker
//tap an item
//show an animation
//show happiness