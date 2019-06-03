function initPricing() {
    var index = 1
    pricingItems.forEach(function(v) {
        console.log(v)
        makePricingItems(v, index)
        index = index + 1;
    })
}

function makePricingItems(priceItemMap, index) {
    var name = priceItemMap["name"];
    var price = priceItemMap["price"];
    var period = priceItemMap["period"];
    var desc = priceItemMap["desc"];
    var featured = priceItemMap["featured"];

    var liName = document.createElement("li");
    liName.setAttribute("class", "plan-name");
    liName.innerHTML = name;

    var liPeriod = document.createElement("li");
    liPeriod.setAttribute("class", "plan-price");
    liPeriod.innerHTML = '<strong>$' + price + '</strong>' + ' / ' + period;

    var liDesc = document.createElement("li");
    liDesc.innerHTML = desc;
    liDesc.style = "color: rgb(231, 104, 20);";
    
    makePricingPanel(liName, liPeriod, liDesc, featured, index);
}

function makePricingPanel(liName, liPrice, liDesc, featured, index) {
    console.log(liName)
    var pricePanel = document.createElement("ul");
    if (featured !== "") {
        pricePanel.setAttribute("class", "plan plan" + index + ' ' + featured);
    } else {
        pricePanel.setAttribute("class", "plan plan" + index);
    }

    var liBuy = document.createElement("li");
    liBuy.setAttribute("class", "plan-action");
    liBuy.innerHTML = `<a href="#" class="btn btn-danger btn-lg">Buy</a>`;

    pricePanel.appendChild(liName);
    pricePanel.appendChild(liPrice);
    pricePanel.appendChild(liDesc);
    pricePanel.appendChild(liBuy);

    var priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "col-lg-3 col-md-3 col-xs-6");
    priceDiv.appendChild(pricePanel);

    var priceContainer = document.getElementById("priceContainer");
    priceContainer.appendChild(priceDiv);
}