/* {
    id: 1,
    name: 'Physics',
    value: 'physics',
    total: 1,
    color: 'red',
    createdAt: 1557215750,
    editedAt: false,
    createdBy: 'T. Marchand'
} */

(function () {
    const socket = io();

    const tags = document.querySelector('.tags');
    const tagsForm = document.querySelector('.tags-form');

    tagsForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const values = e.target;
        const name = values.querySelector('input#tag-name').value;
        const color = values.querySelector('input#tag-color').value;

        if(name !== '' && color !== '') {
            const tag = {
                id: 1,
                name: values.querySelector('input#tag-name').value,
                value: name.toLowerCase(),
                total: 0,
                color: color.toLowerCase(),
                createdAt: Date.now(),
                editedAt: false,
                createdBy: 'T. Marchand'
            }
    
            socket.emit('new tag', tag);
    
            const formElements = tagsForm.querySelectorAll('input');
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type == "text") {
                    formElements[i].value = "";
                }
            }
        } else {
            console.log('FOUT');
        }
    });

    socket.on('all tags', function(allTags) {
        allTags.forEach(function(tag) {
            tags.insertAdjacentHTML('beforeend', `<button style="background-color:${tag.color};" class="tags__tag badge badge-primary">${tag.name}<span>(${tag.total})</span></button>`);
        });
    });

    socket.on('new tag', function(tag) {
        tags.insertAdjacentHTML('beforeend', `<button style="background-color:${tag.color};" class="tags__tag badge badge-primary">${tag.name} <span>(${tag.total})</span></button>`);
    });

    socket.on('error message', function(msg) {
        alert(msg);
    })
})();