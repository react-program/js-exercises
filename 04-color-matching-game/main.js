//Color matching game
const model = {
    el : document.getElementById('board'),
    colors : ['red', 'green', 'blue', 'orange', 'yellow'],
    color : ''
}
const controller = {
    elAction : (e) => {
        color = model.colors[Math.floor(Math.random() * model.colors.length)];
        view.renderView(e,color);
    }
}
const view = {
    renderView : (e,color) => {
        //console.log(e.target)
        e.target.style.backgroundColor = color;
        //console.log(e.target+" -> "+color);
    }
}

model.el.addEventListener('click', controller.elAction);