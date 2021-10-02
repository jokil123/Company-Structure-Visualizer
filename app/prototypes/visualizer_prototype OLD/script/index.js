var Bubble = /** @class */ (function () {
    function Bubble(title, text) {
        this.title = title;
        this.text = text;
    }
    Bubble.prototype.addChild = function (bubble) {
        this.children.push(bubble);
        bubble.parent = this;
    };
    return Bubble;
}());
var bubble1 = new Bubble("Company", "abc");
bubble1.addChild(new Bubble("HR", "Human Ressources"));
