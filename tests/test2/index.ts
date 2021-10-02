class Bubble {
  title: string;
  text: string;

  element: HTMLElement;

  children: Bubble[];

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
    this.children = [];
  }

  addChild(bubble: Bubble) {
    this.children.push(bubble);
  }

  GenerateHTMLElement(): HTMLElement {
    let element = this.CreateBubbleBody();

    element.appendChild(createGrid(FindOptimalGrid(this.children.length)));

    let gridNodes = element.getElementsByTagName("td");

    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i].GenerateHTMLElement();
      gridNodes[i].appendChild(child);
    }

    this.element = element;
    return element;
  }

  CreateBubbleBody(): HTMLElement {
    let bubbleBody = document.createElement("div");
    bubbleBody.style.border = "1px solid black";
    bubbleBody.style.margin = "10px";

    let bubbleText = document.createElement("div");
    bubbleBody.appendChild(bubbleText);

    let title = document.createElement("p");
    title.innerHTML = this.title;
    bubbleText.appendChild(title);

    let text = document.createElement("p");
    text.innerHTML = this.text;
    bubbleText.appendChild(text);

    return bubbleBody;
  }
}

function FindOptimalGrid(items: number): number[] {
  let itemsSqrt = Math.sqrt(items);

  let x = Math.ceil(itemsSqrt);
  let y = Math.round(itemsSqrt);

  return [x, y];
}

function createGrid(size: number[]): HTMLTableElement {
  let tableDataIndex = 0;
  let table = document.createElement("table");

  for (let i = 0; i < size[1]; i++) {
    let tableRow = document.createElement("tr");

    table.appendChild(tableRow);

    for (let j = 0; j < size[0]; j++) {
      let tableData = document.createElement("td");
      tableData.className = tableDataIndex.toString();

      tableRow.appendChild(tableData);
      tableDataIndex++;
    }
  }

  return table;
}

let bubble1 = new Bubble("Company", "abc");
bubble1.addChild(new Bubble("HR", "Human Ressources"));
bubble1.addChild(new Bubble("No", "NoOn"));
bubble1.addChild(new Bubble("IDK", "I DONT"));

document.getElementById("container").appendChild(bubble1.GenerateHTMLElement());
