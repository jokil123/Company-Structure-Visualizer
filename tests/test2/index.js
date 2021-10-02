var Bubble = /** @class */ (function () {
    function Bubble(title, text) {
        this.title = title;
        this.text = text;
        this.children = [];
    }
    Bubble.prototype.addChild = function (bubble) {
        this.children.push(bubble);
    };
    Bubble.prototype.GenerateHTMLElement = function () {
        var element = this.CreateBubbleBody();
        element.appendChild(createGrid(FindOptimalGrid(this.children.length)));
        var gridNodes = element.getElementsByTagName("td");
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i].GenerateHTMLElement();
            gridNodes[i].appendChild(child);
        }
        this.element = element;
        return element;
    };
    Bubble.prototype.CreateBubbleBody = function () {
        var bubbleBody = document.createElement("div");
        bubbleBody.style.border = "1px solid black";
        bubbleBody.style.margin = "10px";
        var bubbleText = document.createElement("div");
        bubbleBody.appendChild(bubbleText);
        var title = document.createElement("p");
        title.innerHTML = this.title;
        bubbleText.appendChild(title);
        var text = document.createElement("p");
        text.innerHTML = this.text;
        bubbleText.appendChild(text);
        return bubbleBody;
    };
    return Bubble;
}());
function FindOptimalGrid(items) {
    var itemsSqrt = Math.sqrt(items);
    var x = Math.ceil(itemsSqrt);
    var y = Math.round(itemsSqrt);
    return [x, y];
}
function createGrid(size) {
    var tableDataIndex = 0;
    var table = document.createElement("table");
    for (var i = 0; i < size[1]; i++) {
        var tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        for (var j = 0; j < size[0]; j++) {
            var tableData = document.createElement("td");
            tableData.className = tableDataIndex.toString();
            tableRow.appendChild(tableData);
            tableDataIndex++;
        }
    }
    return table;
}
var bubble1 = new Bubble("Company", "abc");
bubble1.addChild(new Bubble("HR", "Human Ressources"));
bubble1.addChild(new Bubble("No", "NoOn"));
bubble1.addChild(new Bubble("IDK", "I DONT"));
document.getElementById("container").appendChild(bubble1.GenerateHTMLElement());
