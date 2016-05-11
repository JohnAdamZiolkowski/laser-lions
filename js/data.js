var lionsToCreate = 10;

//must be less than the number of desires
var traitsToCreate = 3;

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
    },
    {
        action: "sleep",
        more: "lazy",
        less: "energetic",
    },
    {
        action: "play",
        more: "playful",
        less: "serious",
    },
    {
        action: "give present",
        more: "generous",
        less: "hoarder",
    },
    {
        action: "be pet",
        more: "affectionate",
        less: "reserved",
    },
    {
        action: "fight",
        more: "brave",
        less: "nervous",
    },
    {
        action: "be photographed",
        more: "proud",
        less: "shy",
    },
    {
        action: "love",
        more: "charming",
        less: "reserved",
    },
    {
        action: "befriend",
        more: "friendly",
        less: "loner",
    },
    {
        action: "have an egg",
        more: "impulsive",
        less: "cautious",
    },
    {
        action: "raise a cub",
        more: "nuturing",
        less: "free",
    },
    {
        action: "grow up",
        more: "mature",
        less: "youthful",
    },
    {
        action: "take medicine",
        more: "delicate",
        less: "hearty",
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