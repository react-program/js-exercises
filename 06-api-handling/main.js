let authorData = [];

function init(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp => resp.json())
    .then(resp => renderPosts(resp))
    .catch(resp => {
        document.getElementById("exampleModalLabel").innerText = 'Error';
        document.getElementById("modal-body").innerHTML = resp;
        $('#exampleModal').modal('show');
    });
}

function cardTemplate(){
    let divElement = document.createElement('div');
    divElement.innerHTML = '<div class="card mb-4">'+
                                '<div class="card-header text-info"></div>'+
                                '<div class="card-body text-info"><p class="card-text"></p></div>'+
                                '<div class="card-footer"><small class="text-muted"><button type="button" class="btn btn-info custom" data-toggle="modal" data-target="#exampleModal">Author Details</button></small></div>'+
                            '</div>';
    return divElement;    
}

function getAuthorDetails(){
    let id = this.getAttribute('user-id');    
    let getAuthor = checkAuthor(id);
    if(getAuthor){
        renderPopup(getAuthor);
    }else{
        fetch('https://jsonplaceholder.typicode.com/users/'+id)
        .then(resp => resp.json())
        .then(resp => {           
            authorData.push(resp);
            document.getElementById("modal-body").innerHTML = '';
            renderPopup(resp);
        })      
        .catch(resp => {
            document.getElementById("exampleModalLabel").innerText = 'Error';
            document.getElementById("modal-body").innerHTML = resp;
            $('#exampleModal').modal('show');
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
    var html = '<p class="alert alert-primary"> Name : '+resp.name+'</p>';
    html += '<p class="alert alert-secondary"> Email : '+resp.email+'</p>';
    html += '<p class="alert alert-success"> Company : '+resp.company.name+'</p>';
    html += '<p class="alert alert-danger"> Address : '+resp.address.suite+'<br/>'+resp.address.street+'<br/>'+resp.address.city+'<br/>'+resp.address.zipcode+'</p>';
    html += '<p class="alert alert-warning"> Website : '+resp.website+'</p>';
    document.getElementById("modal-body").innerHTML = html;
}

function checkAuthor(id){
    let authData = authorData.find(author => {return author.id == id});
    return authData;
}

init();