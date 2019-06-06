const model = {
    button : document.getElementById('generate'),
    inputValues : document.getElementById('inputValues'),
    divTriangle : document.getElementById('row')
};
const controller = {
    generateTriangle : () => {
        if(model.inputValues.value.length > 0){
            let splitInputs = model.inputValues.value.trim().split(" ");
            if(splitInputs.length > 1 && splitInputs.length <12){
                controller.buildTriangle(splitInputs);
            }                
        }
    },
    buildTriangle : (array) => {
        let new_array = [];
        if(array.length >= 1){
            array.forEach(function (i,j) {
                if(parseInt(array.length) -1 != j){
                    let sum = parseInt(array[j]) + parseInt(array[j+1]);
                    new_array.push(sum);
                }
            });
            setTimeout(function() {
                view.renderTriangle(array);
                controller.buildTriangle(new_array);
            },1000);           
        }
    }
};
const view = {
    renderTriangle : (new_array) => {
        var el = document.createElement('p');
        el.innerHTML = new_array.toString().replace( /,/g, "  " );
        let wh_space = new Array(new_array.length + 1).join('&nbsp');
        model.divTriangle.insertAdjacentHTML("afterend", "<p style='color:red;font-size:28px;font-weight:bold;'>"+wh_space+el.innerHTML+"</p>");             
    }
};
model.button.addEventListener('click', controller.generateTriangle);