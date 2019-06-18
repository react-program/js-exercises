const model = {
   contentDiv : document.getElementById("content"),
   modalDiv : document.getElementById("modal-body")
};
const controller = {
    init : _ => {
        fetch('https://jsonplaceholder.typicode.com/posts').then(resp => resp.json()).then(resp => view.renderPosts(resp));
    },
    getAuthorDetails : (id) => {
        fetch('https://jsonplaceholder.typicode.com/users/'+id).then(resp => resp.json()).then(resp => view.renderPopup(resp));
    }
};
const view = {
    renderPosts : (resp) => {
        let html = '';
        resp.forEach(element => {
            html += '<div class="col-md-4">'+
                            '<div class="card border-success mb-4">'+
                                '<div class="card-header">'+element['title']+'</div>'+
                                '<div class="card-body text-secondary">'+
                                    '<p class="card-text">'+element['body']+'</p>'+
                                    '<div class="d-flex justify-content-between align-items-center">'+
                                        '<div class="btn-group">'+
                                            '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick="controller.getAuthorDetails('+element["userId"]+');">Author Details</button>'+                                            
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        });
        model.contentDiv.insertAdjacentHTML( 'beforeend', html );
    },
    renderPopup : (resp) => {
        var html = '<p class="alert alert-primary"> Name : '+resp.name+'</p>';
        html += '<p class="alert alert-secondary"> Email : '+resp.email+'</p>';
        html += '<p class="alert alert-success"> Company : '+resp.company.name+'</p>';
        html += '<p class="alert alert-danger"> Address : '+resp.address.suite+'<br/>'+resp.address.street+'<br/>'+resp.address.city+'<br/>'+resp.address.zipcode+'</p>';
        html += '<p class="alert alert-warning"> Website : '+resp.website+'</p>';
        model.modalDiv.insertAdjacentHTML( 'beforeend', html );
    }
};
controller.init();