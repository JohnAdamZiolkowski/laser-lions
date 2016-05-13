var save_name = "game";

var load_from_storage = function () {
    //get the data
    var encoded = localStorage.getItem(save_name);
    //console.log(encoded);

    //decode into json
    var json = decodeURI(encoded);
    //console.log(json);

    if (json == "") {
        return;
    }

    //parse json into object
    var load_data = JSON.parse(json);
    //console.log(load_data);

    return load_data;
};

var save_into_storage = function (save_data) {

    var json = JSON.stringify(save_data);
    //console.log(json);

    var encoded = encodeURI(json);
    //console.log(encoded);

    localStorage.setItem(save_name, encoded);
};