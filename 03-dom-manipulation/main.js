
//DOM Manipulation
let app_li = document.querySelectorAll(".classifiedColumn > li:first-child"); //Get the parent columns to append the child nodes
const x = document.getElementById("pocket"); //Declare variable for eventListener
//Call EventListener Function
x.addEventListener("click", elementClick); 

//Trigger Events on clicking the element
function elementClick(e) { 
    let matchingIndex = matchUl(e.target.innerText[0]); //Get the first character of the innertext
    let text = e.target;
    //If matchingIndex is number then call Append List function
    if(!isNaN(matchingIndex)){
        appendLi(matchingIndex,text); 
    }
}

//Check the matching parent of selected itemt
function matchUl(ulText){
    for(let i=0;i<app_li.length;i++){
        let liChar = app_li[i].innerText.slice(-1);
        if(liChar == ulText){ 
            return i;
        }
    }
}

//Append child list to parent
function appendLi(index,text){
    let ul = document.querySelectorAll("ul")[index];
    ul.appendChild(text);
    sortList(ul);
}
  
function sortList(ul) {  
    //Sort Function
    Array.from(ul.getElementsByTagName("LI"))
      .sort(function(a, b){
        a = a.textContent[1];
        b = b.textContent[1]; 
        if(!isNaN(a) && !isNaN(b)){
            return a < b ? -1 : (a > b) ? 1 : 0;
        }
      }).forEach(li => {ul.appendChild(li)});

      let pocket_li = document.querySelectorAll("#pocket ul > li").length; //Check the length of elements onclick
      //Remove Div if all elements are sorted
      if(pocket_li==0){
          var element = document.getElementById("pocket");
          element.parentNode.removeChild(element);
      }
  }  