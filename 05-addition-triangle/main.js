const model = {
    button : document.getElementById('generate'),
    inputValues : document.getElementById('inputValues'),
    divTriangle : document.getElementById('row'),
    initVal : '',
    totArr : []
};
const controller = {
    generateTriangle : () => {
        if(model.inputValues.value.length > 0){
            let splitInputs = model.inputValues.value.trim().split(" ");
            if(splitInputs.length > 1 && splitInputs.length <12){
                model.initVal = splitInputs;
                controller.buildTriangle(splitInputs,splitInputs.length);
            }                
        }
    },
    buildTriangle : (array) => {
        let new_array = [];
        if(array.length >= 1){
            model.totArr.push(array);
            array.forEach(function (i,j) {
                if(parseInt(array.length) -1 != j){
                    let sum = parseInt(array[j]) + parseInt(array[j+1]);
                    new_array.push(sum);
                }
            });
            controller.buildTriangle(new_array);   
        }
        if(array.length==1){
            view.getArray(model.totArr);
        }
    }
};
const view = {
    getArray : (array) => {
        let maxLength = [];
        array.forEach(element => {
            maxLength.push(element.toString().replace( /,/g, "" ).length);
        });
        let maxvalue = Math.max.apply(null,maxLength);
        let maxIndex = [];
        maxLength.forEach((l,m) => {
            if(l == maxvalue){
                maxIndex.push(m);
            }
        });
        array.forEach((ele, indx) => {
            var el = document.createElement('p');
            el.innerHTML = ele.toString().replace( /,/g, "" );
            let txt = '';
            if(maxIndex.includes(indx)){
                for(let a =0; a<maxIndex.length; a++){
                    for(let b=0; b<ele.length; b++){
                        if(a==0){
                            let sp = new Array(array.length + 1).join('&nbsp');
                            txt += ele[b] + sp;
                        }
                    }
                }
                
            }else{
                for(let b=0; b<ele.length; b++){
                    let sp = new Array(array.length + 1).join('&nbsp');
                    txt += ele[b] + sp;
                }
            }        
            model.divTriangle.insertAdjacentHTML("afterend", "<p style='color:red;font-size:28px;font-weight:bold;'>"+
                txt
            +"</p>");           
        });
    }
};
model.button.addEventListener('click', controller.generateTriangle);