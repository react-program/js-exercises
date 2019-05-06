let column = document.querySelectorAll(".classifiedColumn");
let tile = document.querySelectorAll("#pocket li");

function push_stack(val)
{
    if(val.target.innerHTML[0] === "A")
    {
        column[0].appendChild(val.target);
    }
    else if(val.target.innerHTML[0] === "B")
    {
        column[1].appendChild(val.target);
    }
    else if(val.target.innerHTML[0] === "C")
    {
        column[2].appendChild(val.target);
    }
    push_sort(val.target.innerHTML[1]);
}
function push_sort(index)
{
    let ul = document.querySelectorAll("ul")[index-1];
    Array.from(ul.getElementsByTagName("li"))
    .sort(function(a, b){
        a = a.textContent[1];
        b = b.textContent[1];
        if(!isNaN(a) && !isNaN(b)){
            return a < b ? -1 : (a > b) ? 1 : 0;
        }
    }).forEach(li => {ul.appendChild(li)});
    let pocket_li = document.querySelectorAll("#pocket ul > li").length;
    if(pocket_li==0){
        var element = document.getElementById("pocket");
        element.parentNode.removeChild(element);
    }
}

for (let i = 0; i < tile.length; i++) {
    tile[i].addEventListener("click", function(event){
        push_stack(event);
    })
}
