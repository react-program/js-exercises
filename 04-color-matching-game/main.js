//Color matching game
const model = {
    el : document.getElementById('board'),
    curEl : document.querySelectorAll('#board li'),
    checkAttribute: document.querySelectorAll('.board li'),
    steps : '',
    colors : ['red', 'green','blue', 'orange','cyan', 'Chocolate ','black', 'purple'],
    oldColor : '',
    newColor : '',
    nodes : Array.prototype.slice.call( document.getElementById('board').children ),
    li : []
}
const controller = {
    shuffle: clrs => {
        return clrs.map(item => [item, item]).flat()
        .sort(() => Math.random() - 0.5).map(item => {
            return {color: item, freeze: false}
        });
    },
    elAction : (e) => {
        curLi = model.nodes.indexOf(e.target); 
        model.steps = model.steps+1;        
        view.renderView(e,curLi,steps);
    },
    checkOpenedLi : (oldColor) => {
        let checkAttr = model.checkAttribute;
        let totArr = [];
        for(let a=0; a<checkAttr.length;a++){
            if(checkAttr[a].getAttribute('open') == 'true' && checkAttr[a].getAttribute('freeze') == 'false'){    
                totArr.push(a);
            }
        }
        if(totArr.length == 2){
            if(y[totArr[0]].color === y[totArr[1]].color){
                model.curEl[totArr[0]].style.backgroundColor = y[totArr[0]].color;
                model.curEl[totArr[1]].style.backgroundColor = y[totArr[1]].color;
                model.curEl[totArr[0]].setAttribute('freeze', true);
                model.curEl[totArr[1]].setAttribute('freeze', true);
            }else{
                //setTimeout(function() {
                    model.curEl[totArr[0]].style.backgroundColor = null;
                    model.curEl[totArr[1]].style.backgroundColor = null;
                //}, 1000); 
                model.curEl[totArr[0]].setAttribute('open', false);
                model.curEl[totArr[1]].setAttribute('open', false);
            }
            totArr = [];
        }
    }
}
const view = {
    renderView : (e,curLi,steps) => {
        console.log(steps);
        model.curEl[curLi].setAttribute('open', true);
        model.curEl[curLi].setAttribute('freeze', false);
        model.curEl[curLi].setAttribute('style','background-color:'+y[curLi].color);
        model.steps.text = 'Steps '+steps;
        controller.checkOpenedLi(model.oldColor);
    }
}

const y = controller.shuffle(model.colors);
model.el.addEventListener('click', controller.elAction);