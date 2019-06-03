function initRelease() {
    var split = "_"
    var clientMap = {} 
    clientTypes.forEach(function(v) {
        var key = clientName + split + version + split + v
        var val = downloadUrl + key
        clientMap[key] = val
    })
    console.log(clientMap)
    makeReleaseDesc()
    makeSelector(clientMap)

    initPricing();
}

function makeReleaseDesc() {
    var descDiv = document.getElementById("descPanel");
    var clientTitleH2 = document.createElement("h2");
    clientTitleH2.innerHTML = clientName;
    clientTitleH2.style = "color: #fff; margin-bottom: -5px;"
    descDiv.appendChild(clientTitleH2);

    var ele = document.createElement("div");
    ele.innerHTML = featureDesc;
    descDiv.appendChild(ele);

    // // changelog
    // var changelog = document.createElement("a");
    // changelog.href = changeLogUrl;
    // changelog.innerHTML = "ChangeLog";
    // descDiv.appendChild(changelog);
}

function makeSelector(clientMap) {
    localStorage.setItem("clientMap", JSON.stringify(clientMap));
    var archDiv = document.getElementById("arch");
    var downloadLnk = document.getElementById("downloadLnk");
    var i = 0;
    for(var k in clientMap){
        if (archDiv.length > 0 || k.indexOf("/") > -1 || k.indexOf("windows") == -1) {
            continue
        }
        var op = document.createElement("option");
        op.innerHTML = '' + k;
        op.selected="selected";
        op.value = i + 1;
        archDiv.appendChild(op);
        downloadLnk.href = clientMap[k];
        i++;
    }
    for(var k in clientMap){
        if (k.indexOf("/") > -1 || k.indexOf("windows") > -1){
            continue
        }
        var op = document.createElement("option");
        op.innerHTML = '' + k;
        op.value = i + 1;
        archDiv.appendChild(op);
        i++;
    }

    $("#arch").goSelectInput({
        height: 30,
        width: 300,
        clickCallback: changeArch
    });
}

function changeArch(filename) {
    var downloadLnk = document.getElementById("downloadLnk");
    var clientMap = JSON.parse(localStorage.getItem("clientMap"));
    downloadLnk.href = clientMap[filename];
    if(filename.indexOf("windows")>-1){
        imgDownload.src="../img/windows.jpg";
    }else if (filename.indexOf("darwin")>-1){
        imgDownload.src="../img/darwin.jpg";
    }else{
        imgDownload.src="../img/unix.jpg";
    }
}