
//DOM Manipulation
/* Model View Controller Pattern with Form Example */


/* Controller Handles the Events */

M = {
    data: {
        userName : "Dummy Guy",
        userNumber : "000000000"
    }, 
    setData : function(d){
        this.data.userName = d.userName;
        this.data.userNumber = d.userNumber;
    },
    getData : function(){
        return data;
    }
}

V = {
    userName : document.querySelector("#inputUserName"),
    userNumber : document.querySelector("#inputUserNumber"),
    update: function(M){
        this.userName.value = M.data.userName;
        this.userNumber.value = M.data.userNumber;
    }
}

C = {
    model: M,
    view: V,
    handler: function(){
        this.view.update(this.model);
    }
}

document.querySelector("#bt").addEventListener("click", function(){
    console.log('a')
    C.handler.call(C);
}); 

/* Model Handles the Data */

/* View Handles the Display */


let app_li = document.querySelectorAll(".classifiedColumn > li:first-child"); //Get the parent columns to append the child nodes
const x = document.getElementById("pocket"); //Declare variable for eventListener
let pocket_li = document.querySelectorAll("#pocket ul > li").length; //Check the length of elements onclick
// //Remove Div if all elements are sorted
// if(pocket_li==0){
//     var element = document.getElementById("pocket");
//     element.parentNode.removeChild(element);
// }
//Call EventListener Function
x.addEventListener("click", elementClick); 

//Trigger Events on clicking the element
function elementClick(e) { 
    if(e.target.nodeName=="LI"){
        let ulText = e.target.innerText[0]; //Get the first character of the innertext
        let text = e.target;
        let matchingIndex = '';
        for(let i=0;i<app_li.length;i++){
            let liChar = app_li[i].innerText.slice(-1);
            if(liChar == ulText){ 
                matchingIndex = i;
            }
        }
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


/*



let app_li = document.querySelectorAll(".classifiedColumn > li:first-child"); //Get the parent columns to append the child nodes
const x = document.getElementById("pocket"); //Declare variable for eventListener
let pocket_li = document.querySelectorAll("#pocket ul > li").length; //Check the length of elements onclick
// //Remove Div if all elements are sorted
// if(pocket_li==0){
//     var element = document.getElementById("pocket");
//     element.parentNode.removeChild(element);
// }
//Call EventListener Function
// x.addEventListener("click", elementClick); 

// //Trigger Events on clicking the element
// function elementClick(e) { 
//     // console.log(e.target.innerText[0]);
//     // console.log(app_li);
//     if(e.target.nodeName=="LI"){
//         let ulText = e.target.innerText[0]; //Get the first character of the innertext
//         let text = e.target;
//         let matchingIndex = '';
//         for(let i=0;i<app_li.length;i++){
//             let liChar = app_li[i].innerText.slice(-1);
//             if(liChar == ulText){ 
//                 matchingIndex = i;
//             }
//         }
//         //If matchingIndex is number then call sortList function
//         if(!isNaN(matchingIndex)){        
//             let ul = document.querySelectorAll("ul")[matchingIndex];
//             ul.appendChild(text);
//             //Sort Function
//             Array.from(ul.getElementsByTagName("LI"))
//             .sort(function(a, b){
//             a = a.textContent[1];
//             b = b.textContent[1]; 
//             if(!isNaN(a) && !isNaN(b)){
//                 return a < b ? -1 : (a > b) ? 1 : 0;
//             }
//             }).forEach(li => {ul.appendChild(li)});
//         }
//     }
// }

*/



//DOM Manipulation
var M = {}, V = {}, C = {};
let matchingIndex,text = '';

M = {
    data: {
        appLi : document.querySelectorAll(".classifiedColumn > li")
    }
}

V = {
    update: function(matchingIndex,text,poc_li){        
        //If matchingIndex is number then call sortList function
        if(!isNaN(matchingIndex)){        
            let ul = document.querySelectorAll("ul")[matchingIndex];
            let poc_li = document.querySelectorAll("#pocket ul > li").length;
            ul.appendChild(text);
            //Sort Function
            Array.from(ul.getElementsByTagName("LI")).sort(function(a, b){ a = a.textContent[1]; b = b.textContent[1]; 
            if(!isNaN(a) && !isNaN(b)){
                return a < b ? -1 : (a > b) ? 1 : 0;
            }}).forEach(li => {ul.appendChild(li)});
            if(poc_li==1){
                var element = document.getElementById("pocket");
                element.parentNode.removeChild(element);
            }
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