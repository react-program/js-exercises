//Color matching game
const model = {
    el : document.getElementById('board'),
    curEl : document.querySelectorAll('#board li'),
    checkAttribute: document.querySelectorAll('.board li'),
    colors : ['red', 'green','blue', 'orange','cyan', 'Chocolate ','black', 'purple'],
    nodes : Array.prototype.slice.call( document.getElementById('board').children )
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
        view.renderView(e,curLi);
    },
    checkOpenedLi : () => {
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
                view.checkCompleted();
            }else{
                localStorage.setItem('c1',totArr[0]);
                localStorage.setItem('c2',totArr[1]);
                model.curEl[totArr[0]].setAttribute('open', false);
                model.curEl[totArr[1]].setAttribute('open', false);
                view.clearColor(localStorage.getItem('c1'),localStorage.getItem('c2'));      
            }
            totArr = [];  
        }
    }
}
const view = {
    renderView : (e,curLi) => {
        model.curEl[curLi].setAttribute('open', true);
        model.curEl[curLi].setAttribute('freeze', false);
        model.curEl[curLi].setAttribute('style','background-color:'+y[curLi].color);
        controller.checkOpenedLi();

        let step = 0;
        if (localStorage.getItem("steps") === null) {
            localStorage.setItem("steps", 1);
            step = 1;
        }else{
            step = parseInt(localStorage.getItem('steps')) + 1;
            localStorage.setItem("steps", step);
        }
        document.getElementById('steps').innerHTML = 'Steps '+step;
        //console.log(step,'c');
    },
    checkCompleted : () => {
        let completed = 0;
        if (localStorage.getItem("completed") === null) {
            localStorage.setItem("completed", 2);
            completed = 2;
        }else{
            completed = parseInt(localStorage.getItem('completed')) + 2;
            localStorage.setItem("completed", completed);
        }
        if(completed==16){
            document.getElementById('congrats').style.display = 'block';
            localStorage.removeItem("completed");
            localStorage.removeItem("steps");
        }
    },
    clearColor : (c1,c2) => {
        setTimeout(function() {
            model.curEl[c1].style.backgroundColor = null;
            model.curEl[c2].style.backgroundColor = null;
            localStorage.removeItem('c1');
            localStorage.removeItem('c2');
        }, 500);
    }
}

const y = controller.shuffle(model.colors);
console.log(y);
model.el.addEventListener('click', controller.elAction);