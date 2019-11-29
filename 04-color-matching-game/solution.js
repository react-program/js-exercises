const model = Object.assign(new EventEmitter(), {
  blocks: [],
  openBlockIndex: null,
  steps: 0,
  frozenBlocks: 0,
  generate() {
    const colors = [
      "red",
      "red",
      "green",
      "green",
      "blue",
      "blue",
      "cyan",
      "cyan",
      "magenta",
      "magenta",
      "yellow",
      "yellow",
      "black",
      "black",
      "purple",
      "purple"
    ];
    colors.forEach((color, index) => {
      const randomIndex = parseInt(Math.random() * colors.length);
      let temp = colors[randomIndex];
      colors[randomIndex] = color;
      colors[index] = temp;
    });
    this.blocks = colors.map(color => ({ color, open: false, freeze: false }));
    this.emit("blockupdate");
    console.table(this.blocks);
  },
  openBlock(index) {
    this.blocks[index].open = true;
    this.increaseSteps();
    if (typeof this.openBlockIndex === "number") {
      setTimeout(() => {
        if (this.compareBlocks(this.openBlockIndex, index)) {
          this.freezeBlocks(this.openBlockIndex, index);
        } else {
          this.closeBlocks(this.openBlockIndex, index);
        }
        this.emit("blockupdate");
        if (this.hasGameCompleted()) {
          this.emit("complete");
        }
      }, 200);
    } else {
      this.openBlockIndex = index;
    }
    this.emit("blockupdate");
    console.table(this.blocks);
  },
  compareBlocks(openIndex, currentIndex) {
    return this.blocks[openIndex].color === this.blocks[currentIndex].color;
  },
  freezeBlocks(openIndex, currentIndex) {
    this.openBlockIndex = null;
    this.blocks[openIndex].freeze = true;
    this.blocks[currentIndex].freeze = true;
    this.frozenBlocks += 2;
    console.table(this.blocks);
  },
  closeBlocks(openIndex, currentIndex) {
    this.openBlockIndex = null;

    this.blocks[openIndex] && (this.blocks[openIndex].open = false);
    this.blocks[currentIndex] && (this.blocks[currentIndex].open = false);
    console.table(this.blocks);
  },
  increaseSteps() {
    this.steps++;
  },
  hasGameCompleted() {
    return this.frozenBlocks === this.blocks.length;
  }
});

const view = {
  board: document.getElementById("board"),
  attachHandler(onBlockClick) {
    this.board.addEventListener(
      "click",
      event => {
        if (event.target.tagName === "LI") {
          const index = Array.prototype.indexOf.call(
            this.board.children,
            event.target
          );
          onBlockClick(index);
        }
      },
      { once: true }
    );
  },
  render({ blocks, steps, onBlockClick, onComplete }) {
    this.renderBlocks(blocks);
    this.renderSteps(steps);
    this.attachHandler(onBlockClick);
    if (onComplete) {
      alert("Game solved");
    }
  },
  renderBlocks(blocks) {
    this.board.innerText = "";
    const liBlocks = blocks.map(block => {
      const li = document.createElement("li");
      if (block.open) li.style.backgroundColor = block.color;
      return li;
    });
    this.board.append(...liBlocks);
  },
  renderSteps(count) {
    document.getElementById("steps").innerHTML = `Steps: ${count}`;
  }
};

const controller = {
  model: null,
  view: null,
  onBlockClick(index) {
    this.model.openBlock(index);
  },
  init(model, view) {
    this.model = model;
    this.view = view;
    this.model.on("blockupdate", () => this.update());
    this.model.on("complete", () => {
      alert("Game Completed");
    });
    model.generate();
  },
  update() {
    const { blocks, steps } = this.model;
    view.render({ blocks, steps, onBlockClick: this.onBlockClick.bind(this) });
  }
};

controller.init(model, view);
