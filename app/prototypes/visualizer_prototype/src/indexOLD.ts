import { SVG } from "@svgdotjs/svg.js";

function BubbleComponent(bubbles: Bubble[]): HTMLElement {
  let a: HTMLElement;
  return a;
}

function OptimalGridLayout(tileAmmount: number): number[] {
  let sqrt = Math.sqrt(tileAmmount);

  let x = Math.ceil(sqrt);
  let y = Math.round(sqrt);

  return [x, y];
}

class Appendix {
  children: Bubble[];

  constructor() {
    this.children = [];
  }

  addChild(bubble: Bubble): Bubble {
    this.children.push(bubble);
    bubble.parent = this;
    return bubble;
  }
}

class VisualizerContainer extends Appendix {
  domParent: HTMLElement;
  element: HTMLElement;

  constructor(domParent: HTMLElement) {
    super();

    this.domParent = domParent;
    this.element = this.createElement();
    domParent.appendChild(this.element);
  }

  createElement(): HTMLElement {
    let container = document.createElement("div");
    container.style.border = "1px solid black;";
    return container;
  }
}

class Bubble extends Appendix {
  title: string;
  text: string;

  parent: Appendix;

  htmlElement: HTMLElement;

  constructor(title: string, text: string) {
    super();

    this.title = title;
    this.text = text;
    this.parent = undefined;
    this.htmlElement = this.createElement();
  }

  createElement(): HTMLElement {
    let bubble = document.createElement("div");
    bubble.style.border = "1px solid black";

    return bubble;
  }
}

let visualizer = new VisualizerContainer(document.getElementById("container"));

let bubble = visualizer.addChild(new Bubble("Company", "abc"));
bubble.addChild(new Bubble("HR", "Human Ressources"));
