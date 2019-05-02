
//DOM Manipulation
var M = {}, V = {}, C = {};
let matchingIndex,text = '';

M = {
    data: {
        appLi : document.querySelectorAll(".classifiedColumn > li"),
        pocketLi : document.querySelectorAll("#pocket ul > li").length
    }, 
    setData : function(d){
        this.data.appLi = d.appLi;
        this.data.pocketLi = d.pocketLi;
    },
    getData : function(){        
        return data;
    }
}

V = {
    update: function(matchingIndex,text){        
        //If matchingIndex is number then call sortList function
        if(!isNaN(matchingIndex)){        
            let ul = document.querySelectorAll("ul")[matchingIndex];
            ul.appendChild(text);
            //Sort Function
            Array.from(ul.getElementsByTagName("LI"))
            .sort(function(a, b){
            a = a.textContent[1];
            b = b.textContent[1]; 
            if(!isNaN(a) && !isNaN(b)){
                return a < b ? -1 : (a > b) ? 1 : 0;
            }
            }).forEach(li => {ul.appendChild(li)});
        }
    }
}

C = {
    model: M,
    view: V,
    handler: function(e){
       let app_li = M.data.appLi;
        if(e.target.nodeName=="LI"){
            let ulText = e.target.innerText[0]; //Get the first character of the innertext
            text = e.target;
            for(let i=0;i<app_li.length;i++){
                let liChar = app_li[i].innerText.slice(-1);
                if(liChar == ulText){ 
                    matchingIndex = i;
                }
            }
        }
        this.view.update(matchingIndex,text);
    }
}

document.querySelector("#pocket").addEventListener("click", function(e){
    C.handler.call(C,e);
}); 