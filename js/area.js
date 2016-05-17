var updateAreaPage = function () {
    var areaTable = document.getElementById("areaTable");

    //clear table
    while (areaTable.rows.length > 0) {
        areaTable.deleteRow(0);
    }

    var rowIndex = 0;
    while (rowIndex < rowsToCreate) {
        var row = areaTable.insertRow(-1);

        var colIndex = 0;
        while (colIndex < colsToCreate) {
            var col = row.insertCell(-1);

            colIndex += 1;
        }
        rowIndex += 1;
    }
    distributeLions();
};

var distributeLions = function () {
    var table = document.getElementById("areaTable");
    var area = areas[0];

    var rowIndex = 0;
    while (rowIndex < rowsToCreate) {
        var row = table.rows[rowIndex];

        var colIndex = 0;
        while (colIndex < colsToCreate) {
            var col = row.cells[colIndex];

            var contents = area.rows[rowIndex][colIndex];

            //console.log("contents: " + rowIndex + " at " + colIndex + ": " + contents);

            if (contents) {
                if (contents.type != "lion") {
                    console.log("unexpected content type: " + contents.type);
                    continue;
                }

                var div = document.createElement("div");
                div.style.position = "relative";
                div.style.width = "64px";
                div.style.height = "64px";

                var lionIndex = getLionIndexByName(contents.name);
                var lionInfo = lions[lionIndex];

                var img = document.createElement("img");
                img.src = "../images/Sprite2biggermane.png";
                img.style.visibility = "hidden";
                img.width = 64;
                img.height = 64;
                img.style.position = "absolute";
                img.style.top = 0;
                img.style.left = 0;
                img.style.zIndex = 1;
                img.dataset.lionIndex = lionIndex;
                img.onclick = function () {
                    clickLionIcon(this);
                };
                if (contents.direction == "left") {
                    img.style.transform = "scaleX(-1)";
                }
                col.appendChild(div);
                div.appendChild(img);

                var imageSrc = "../images/Sprite2biggermane.png";

                updateLionColors(img, imageSrc, lionInfo, true);

                if (lionInfo.desires.length > 0) {
                    var img = document.createElement("img");
                    img.src = "../images/bubble.png";
                    img.style.position = "absolute";
                    img.style.top = 0;
                    img.style.zIndex = 2;
                    img.dataset.lionIndex = lionIndex;
                    img.onclick = function () {
                        clickLionIcon(this);
                    };
                    if (contents.direction != "left") {
                        img.style.transform = "scaleX(-1)";
                        img.style.left = 0;
                    } else {
                        img.style.right = 0;
                    }
                    div.appendChild(img);

                }
            }

            colIndex += 1;
        }
        rowIndex += 1;
    }
};

var distributeLionsOld = function () {
    var areaTable = document.getElementById("areaTable");

    var unplacedLions = lions.slice(0);

    while (unplacedLions.length > 0) {

        var rowIndex = Math.floor(Math.random() * rowsToCreate);
        var colIndex = Math.floor(Math.random() * colsToCreate);

        var row = areaTable.rows[rowIndex];
        var col = row.cells[colIndex];

        if (col.children.length == 0) {
            var div = document.createElement("div");
            div.style.position = "relative";
            div.style.width = "64px";
            div.style.height = "64px";

            var lionIndex = Math.floor(Math.random() * unplacedLions.length);
            var lionInfo = unplacedLions[lionIndex];
            unplacedLions.splice(lionIndex, 1);

            var img = document.createElement("img");
            img.src = "../images/Sprite2biggermane.png";
            img.style.visibility = "hidden";
            img.width = 64;
            img.height = 64;
            img.style.position = "absolute";
            img.style.top = 0;
            img.style.left = 0;
            img.style.zIndex = 1;
            img.dataset.lionIndex = getLionIndexByName(lionInfo.name);
            img.onclick = function () {
                clickLionIcon(this);
            };
            col.appendChild(div);
            div.appendChild(img);

            var imageSrc = "../images/Sprite2biggermane.png";

            updateLionColors(img, imageSrc, lionInfo, true);


            if (lionInfo.desires.length > 0) {
                var img = document.createElement("img");
                img.src = "../images/bubble.png";
                img.style.position = "absolute";
                img.style.top = 0;
                img.style.left = 0;
                img.style.zIndex = 2;
                img.style.transform = "scaleX(-1)";
                div.appendChild(img);

            }
        }
    }

};

var clickLionIcon = function (element) {

    var lionIndex = element.dataset.lionIndex;
    var lionInfo = lions[lionIndex];

    selectedLion = lionIndex;
    updateSaveData();
    window.location.replace("closeup.html");
};