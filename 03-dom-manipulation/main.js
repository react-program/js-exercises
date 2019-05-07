let column = Array.from(document.querySelectorAll(".classifiedColumn"));
let tile = document.querySelectorAll("#pocket li");

function push_stack(val)
{
    for (let i = 0; i < column.length; i++) {
        if(column[i].querySelector("li").innerText.includes(val.target.innerHTML[0]))
        {
            column[i].appendChild(val.target);
            push_sort(i);
        }
    }
}
function push_sort(index)
{
    let ul = document.querySelectorAll("ul")[index];
    Array.from(ul.getElementsByTagName("li"))
    .sort((a, b) => {
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
