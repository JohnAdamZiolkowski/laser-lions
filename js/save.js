var game_data = {};
var cookie_name = "game";
//
//var click_progress = function () {
//    progress();
//};
//
//var click_restart = function () {
//    restart();
//};
//
//var click_load_cookie = function () {
//    load_from_cookie();
//};
//
//var click_save_cookie = function () {
//    save_game_into_cookie();
//};
//
//var click_save_file = function () {
//    download_save_file();
//};
//
//var change_auto_save = function (e) {
//    //console.log("change auto save to: " + e.checked);
//    var load_cookie_button = document.getElementById("load_from_cookie_button");
//    var save_cookie_button = document.getElementById("save_into_cookie_button");
//    var auto_save_label = document.getElementById("auto-save_label");
//    
//    if (e.checked) {
//        auto_save_label.textContent = "Auto-Save ON";
//        load_cookie_button.disabled = "disabled";
//        save_cookie_button.disabled = "disabled";
//    } else {
//        auto_save_label.textContent = "Auto-Save OFF";
//        load_cookie_button.disabled = null;
//        save_cookie_button.disabled = null;
//    }
//};

//var progress = function () {
//    game_data.progress += 1;
//    
//    auto_save_game_into_cookie();
//    
//    update_ui();   
//};
//
//var restart = function () {
//    game_data = {};
//    game_data.progress = 0;
//    
//    auto_save_game_into_cookie();
//    
//    update_ui();    
//};

//var update_ui = function () {
//    var header = document.getElementById("progress");
//    header.textContent = "Progress: " + game_data.progress;
//};

var load_from_cookie = function () {
    //get the cookie
    var encoded = get_cookie(cookie_name);
    console.log(encoded);

    //decode into json
    var json = decodeURI(encoded);
    console.log(json);

    load_from_json(json);
    
//    update_ui();
};
//
//var load_from_save_file = function (json) {
//
//    load_from_json(json);
//
//    auto_save_game_into_cookie();
//
//    update_ui();
//};

var load_from_json = function (json) {
    if (json == "") {
//        restart();
        return;
    }

    //parse json into object
    var object = JSON.parse(json);
    console.log(object);

    //update game from object
    update_game_from_object(object);
};

var update_game_from_object = function (object) {
    //set all the important variables
    game_data = object;
};

//var auto_save_game_into_cookie = function () {
//    var auto_save_checkbox = document.getElementById("auto-save_checkbox");
//    if (auto_save_checkbox.checked) {
//        save_game_into_cookie();
//    }
//};

var save_game_into_cookie = function () {
    var object = save_game_as_object();
    console.log(object);

    var json = JSON.stringify(object);
    console.log(json);

    var encoded = encodeURI(json);
    console.log(encoded);

    set_cookie(cookie_name, encoded);
};

var save_game_as_object = function () {
    //create one game object with all the important data
    var object = game_data;
    return object;
};

//var download_save_file = function () {
//    var object = save_game_as_object();
//    console.log(object);
//
//    var json = JSON.stringify(object);
//    console.log(json);
//
//    var date_string = get_date_string();
//
//    download(cookie_name + "-" + date_string + ".json", json);
//};

//var get_date_string = function () {
//    var date = new Date();
//    var day = date.getDate();
//    var monthIndex = date.getMonth() + 1;
//    var year = date.getFullYear();
//    var date_string = "" + year + "-" + ("0" + monthIndex).slice(-2) + "-" + ("0" + day).slice(-2);
//    
//    return date_string;
//};

var set_cookie = function (cname, cvalue) {
    var d = new Date();
    var exdays = 365;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; Path=/; " + expires;
};

var get_cookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
//
//var download = function (filename, text) {
//    var element = document.createElement('a');
//
//    //warning: currently set to JSON
//    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
//    element.setAttribute('download', filename);
//
//    //only do this if in safari
//    //window.open('data:application/json;charset=utf-8,' + encodeURIComponent(text))
//
//    element.style.display = 'none';
//    document.body.appendChild(element);
//
//    element.click();
//
//    document.body.removeChild(element);
//};
//
//var upload = function (element) {
//
//    if (element.value == "")
//        return;
//
//    var file = element.files[0];
//
//    var textType = /application.json/;
//
//    if (file.type.match(textType)) {
//        var reader = new FileReader();
//
//        reader.onload = function (e) {
//            load_from_save_file(reader.result);
//            element.value = "";
//        };
//
//        reader.readAsText(file);
//    } else {
//        fileDisplayArea.innerText = "File type not supported!"
//    }
//
//};