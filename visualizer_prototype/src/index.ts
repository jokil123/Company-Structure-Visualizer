class HtmlComponent extends HTMLElement {
  parent: HtmlComponent | HTMLElement;
  children: HtmlComponent[];

  setParent(parent: HTMLElement) {
    let oldParent = this.parent;
    oldParent.children.;

    this.parent = parent;
    parent;
  }

  removeChild(child: HtmlComponent): void {
    let index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  addChild(child: HTMLElement): void {
    this.children.push(child);
  }
}
