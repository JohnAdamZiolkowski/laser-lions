//with current set up, cookie save limit is 15
var lionsToCreate = 10;

//must be less than the number of desires
var traitsToCreate = 3;

//must be less than the number of desires
var desiresToCreate = 4;

//time between updates
var updatePeriod = 1000 * 60; // every minute
//var updatePeriod = 1000 * 60 * 60; //every hour

//how often to check to see if an hour has passed
var updateCheck = 1000 * 10; // every 10 seconds
//var updateCheck = 1000 * 5 * 60; //every 5 minutes

//how many updates to stack at maximum
var updateLimit = 8; // enough to let all lions have max desire

//size of the area
var rowsToCreate = 5;
var colsToCreate = 5;

var ages = [
    {
        name: "egg",
        image: "images/egg.png",
    },
    {
        name: "cub",
        image: "images/cub.png",
    },
    {
        name: "teen",
        image: "images/teen.png",
    },
    {
        name: "adult",
        image: "images/adult.png",
    },
    {
        name: "senior",
        image: "images/senior.png",
    },
];

var gameStates = [
    "startup",
    "area",
    "lionCloseup",
    "lionInfo",
    "optionPicker",
    //    "lionPicker",
    //    "foodPicker",
    //    "toyPicker",
    //    "clothingPicker",
    "photo",
    "play",
    "petting",
    "fight",
    "giveHappiness",
    "animation",
    //give present
    //evolve
    //befriend
    //love
    //into the cave
    //raising cub
    //lion pile
    //eat
    //level up
    "menu",
    "lionList",
    "areaList",
    "itemList",
    "restart",
];

var foods = [
    "Cookies",
    "Waffles",
    "Muffins",
    "Sour Gummy Bears",
    "Spaghetti",
    "Cheese Burger",
    "Watermelon",
    "Steak",
    "Cupcakes",
    "Bacon",
    "Sausage",
    "Chicken",
    "Fish",
    "Bread",
];

//action is what the lion might want to do
//more and less are names of personality traits
//traits will affect how often the action is desired
var desires = [
    {
        action: "eat",
        more: "insatiable",
        less: "nibbler",
        type: "player",
        icon: "food",
        //list of food in inventory
        //lion may like food for 2 happiness
        //lion may dislike food for 0 happiness
    },
    {
        action: "sleep",
        more: "lazy",
        less: "energetic",
        type: "blocking",
        icon: "sleep",
        //list of places to sleep?
        //list of lions that also want to sleep?
        //pile of lions?
        //lion will sleep for some time
    },
    {
        action: "play",
        more: "playful",
        less: "serious",
        type: "player",
        icon: "ball",
        //list of toys in inventory
        //switch to toy play mode
        //toss a ball to make it fetch
        //swing fish on a string to make it paw
        //move laser pointer around to make it chase
    },
    {
        action: "give present",
        more: "generous",
        less: "hoarder",
        type: "player",
        icon: "present",
        //accept a present - surprise!
        //switch to accept present mode
        //get a random new item for the inventory
    },
    {
        action: "be pet",
        more: "affectionate",
        less: "reserved",
        type: "player",
        icon: "paw",
        //rub a dub
        //switch to petting mode
        //head petting
        //back petting
        //belly petting, but the lion may bite
    },
    {
        action: "fight",
        more: "brave",
        less: "nervous",
        type: "player",
        icon: "fight",
        //pew pew
        //switch to laser game mode
        //your lions team up against random lions?
        //selected lion plays against other lions?
    },
    {
        action: "be photographed",
        more: "proud",
        less: "shy",
        type: "player",
        icon: "photo",
        //dress up, pose, action
        //switch to photo mode
        //option to save photo to device
        //list of accessories in inventory
    },
    {
        action: "love",
        more: "charming",
        less: "reserved",
        type: "passive",
        icon: "heart",
        //list of lions - that also want love?
        //restricted to teen and adult lions
        //selected lions will hang out together with hearts
        //chance of adding eachother to love list?
    },
    {
        action: "befriend",
        more: "friendly",
        less: "loner",
        type: "passive",
        icon: "happy",
        //list of lions - that also want friendship?
        //selected lions will hang out together with smiles
        //chance of adding eachother to friend list?
    },
    {
        action: "have an egg",
        more: "impulsive",
        less: "cautious",
        type: "blocking",
        icon: "egg",
        //list of lions - that also want do have an egg?
        //restricted to adult lions, maybe teens?
        //selected lions will go off into a cave together
        //later, an egg will be presented
    },
    {
        action: "raise a cub",
        more: "nuturing",
        less: "free",
        type: "passive",
        icon: "cub",
        //list of lions - that are cubs and want to grow up?
        //restricted to adult lions
        //selected lions will hang out together with up arrows
        //cub lion will get a trait or skill from raiser?
    },
    {
        action: "grow up", // also hatch, develop, retire?
        more: "mature",
        less: "youthful",
        type: "passive",
        icon: "adult",
        //list of lions - that are adults and want to raise?
        //restricted to cub lions, (also eggs, teens, adults?)
        //selected lions will hang out together with up arrows
        //cub lion will get a trait or skill from raiser?
    },
    {
        action: "take medicine",
        more: "delicate",
        less: "hearty",
        type: "blocking",
        icon: "needle",
        //give medicine
        //must be feeling under the weather
        //might have to choose the right medicine for the illness?
    }
];

//hues are out of 360
//base is the standard hue
//high and low are the colors limits
var colors = [
    {
        name: "red",
        low: 340,
        base: 0,
        high: 10,
    },
    {
        name: "orange",
        low: 20,
        base: 30,
        high: 40,
    },
    {
        name: "yellow",
        low: 50,
        base: 60,
        high: 70,
    },
    {
        name: "green",
        low: 90,
        base: 120,
        high: 150,
    },
    {
        name: "miku",
        low: 170,
        base: 180,
        high: 190,
    },
    {
        name: "blue",
        low: 200,
        base: 220,
        high: 240,
    },
    {
        name: "purple",
        low: 270,
        base: 280,
        high: 290,
    },
    {
        name: "magenta",
        low: 300,
        base: 310,
        high: 320,
    },
];

var getColorByName = function (name) {

    var color;

    var colorIndex = 0;
    while (colorIndex < colors.length) {

        color = colors[colorIndex];

        if (color.name == name) {
            return color;
        }

        colorIndex += 1;
    }
};

var getDesireByActionName = function (name) {

    var desire;

    var desireIndex = 0;
    while (desireIndex < desires.length) {

        desire = desires[desireIndex];

        if (desire.action == name) {
            return desire;
        }

        desireIndex += 1;
    }
};