let authorData = [];

function init(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp => resp.json())
    .then(resp => renderPosts(resp))
    .catch(resp => {
        showError(resp);
    });
}

function showError(resp){
    document.getElementById("exampleModalLabel").innerText = 'Error';
    document.querySelector(".modal-body").innerHTML = resp;
    $('#exampleModal').modal('show');
}

function cardTemplate(){
    let divElement = document.createElement('div');
    divElement.innerHTML = `<div class="card mb-4">
                                <div class="card-header text-info"></div>
                                <div class="card-body text-info"><p class="card-text"></p></div>
                                <div class="card-footer"><small class="text-muted"><button type="button" class="btn btn-info custom" data-toggle="modal" data-target="#exampleModal">Author Details</button></small></div>
                            </div>`;
    return divElement;    
}

function getAuthorDetails(){
    let id = this.getAttribute('user-id');    
    let getAuthor = checkAuthor(id);
    if(getAuthor){
        renderPopup(getAuthor);
    }else{
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(resp => resp.json())
        .then(resp => {           
            authorData.push(resp);
            renderPopup(resp);
        })      
        .catch(resp => {
            showError(resp);
        });
    }    
}

function renderPosts(resp){
    let createFragment = document.createDocumentFragment();
    resp.forEach(element => {
        let html = cardTemplate().cloneNode(true);
        html.querySelector('.card-header').innerHTML = element['title'];
        html.querySelector('.card-text').innerHTML = element['body'];
        html.querySelector('.custom').setAttribute('user-id',element['userId']);
        html.querySelector('.custom').addEventListener('click', getAuthorDetails);
        createFragment.appendChild(html);
    });    
    document.getElementById("content").appendChild(createFragment);
}

function renderPopup(resp){
    let modal = document.querySelector('.modal-body');
    modal.querySelector('.alert-primary').innerHTML = `Name : ${resp.name}`;
    modal.querySelector('.alert-secondary').innerHTML = `Email : ${resp.email}`;
    modal.querySelector('.alert-success').innerHTML = `Company : ${resp.company.name}`;
    modal.querySelector('.alert-danger').innerHTML = `Address : ${resp.name}`;
    modal.querySelector('.alert-warning').innerHTML = `Website : ${resp.website} <br/> ${resp.address.street} <br/> ${resp.address.city} <br/> ${resp.address.zipcode}`;
}

function checkAuthor(id){
    let authData = authorData.find(author => {return author.id == id});
    return authData;
}

init();