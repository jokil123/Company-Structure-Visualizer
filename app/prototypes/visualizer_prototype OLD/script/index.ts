class Bubble {
  title: string;
  text: string;

  parent: Bubble;
  children: Bubble[];

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
  }

  addChild(bubble: Bubble) {
    this.children.push(bubble);
    bubble.parent = this;
  }
}

let bubble1 = new Bubble("Company", "abc");
bubble1.addChild(new Bubble("HR", "Human Ressources"));
