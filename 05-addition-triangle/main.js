const model = {
    button : document.getElementById('generate'),
    inputValues : document.getElementById('inputValues'),
    divTriangle : document.getElementById('triangle'),
};
const controller = {
    generateTriangle : () => {
        if(model.inputValues.value.length > 0){
            let splitInputs = model.inputValues.value.split(" ");
            controller.buildTriangle(splitInputs);
            //console.log("Length ",model.inputValues.value.length);
        }
    },
    buildTriangle : (array) => {
        let new_array = [];
        //console.log("leng", splitInputs.length);
        if(array.length >= 2){
            array.forEach(function (i,j) {
                console.log(j);
                if(parseInt(array.length) -1 != j){
                    let sum = parseInt(array[j]) + parseInt(array[j+1]);
                    //console.log("Sum '",sum);
                    new_array.push(sum);
                }
            });
            console.log(new_array);
            view.renderTriangle(new_array);
            controller.buildTriangle(new_array);
        }
    }
};
const view = {
    renderTriangle : (new_array) => {
        var el = document.getElementById("triangle");
        // var height = el.offsetHeight;
        // var newHeight = height + 200;
        // el.style.height = newHeight + 'px';
        el.style.height = '200px';
        el.style.textAlign = 'center';
        model.divTriangle.prepend(new_array);
    }
};
model.button.addEventListener('click', controller.generateTriangle)