(function () {
    const socket = io();

    const page = window.location.pathname;

    const addTagsForm = document.querySelector('.add-tags-form');
    const addTagsFormName = document.querySelector('#tag-name');
    const tags = document.querySelector('.tags');

    document.addEventListener('click', function (e) {
        if (e.target && e.target.tagName === 'BUTTON') {
            const id = e.path[1].dataset.id;
            socket.emit('delete tag', id);
        }

        if (e.target && e.target.tagName === 'SPAN') {
            const suggestionForm = document.querySelector('.suggestion-form');
            if (e.target.id === 'tag-Other') {
                if (!suggestionForm) {
                    const suggestionForm = `
                        <form class="suggestion-form">
                            <input type="text" placeholder="Enter a suggestion" name="tag-suggestion" id="tag-suggestions">
                            <button class="btn btn-primary" type="submit">Suggest tag name</button>
                        </form>
                    `;

                    tags.insertAdjacentHTML('afterend', suggestionForm);

                    const suggestionFormDom = document.querySelector('.suggestion-form');
                    suggestionFormDom.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const tagSuggestion = e.target.querySelector('input').value;
                        const tag = {
                            name: tagSuggestion + ' (suggestion)',
                            value: tagSuggestion.toLowerCase(),
                            total: 0,
                            color: 'blue',
                            createdAt: Date.now(),
                            editedAt: false,
                            createdBy: 'User',
                            suggestion: true,
                            delete: true
                        }
                        socket.emit('new tag', tag);
                        suggestionFormDom.parentNode.removeChild(suggestionFormDom);
                    });
                } else {
                    document.querySelector('.suggestion-form').parentNode.removeChild(document.querySelector('.suggestion-form'));
                }
            } else {
                document.querySelector('.run-tags').appendChild(e.target);
                !e.target.classList.contains('tags__tag--active') ? e.target.classList.add('tags__tag--active') : e.target.classList.remove('tags__tag--active');
                
            }
        }
    });

    if (addTagsForm) {
        addTagsForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const tagData = createTag(e);
            addTagsForm.querySelector('input#tag-name').value = '';
            addTagsForm.querySelectorAll('.colors input[name="color"]').forEach(function(radio) {
                radio.checked = false;
            });
            socket.emit('new tag', tagData);
        });
    }

    function createTag(e) {
        if (addTagsFormName !== '') {
            const tagName = e.target.querySelector('#tag-name').value;
            let tagColor;
            Array.prototype.slice.call(e.target.querySelectorAll('input[name="color"]')).forEach(function (input) {
                if (input.checked === true) {
                    tagColor = input.value;
                }
            });

            return {
                name: tagName,
                value: tagName.toLowerCase(),
                total: 0,
                color: tagColor ? '#' + tagColor : 'blue',
                createdAt: Date.now(),
                editedAt: false,
                createdBy: 'T. Marchand',
                suggestion: true,
                delete: true
            }
        }
    }

    socket.on('new tag', function (filteredTag) {
        const tag = `
            <span data-id=${filteredTag.id} style="background-color: ${filteredTag.color}" class="tags__tag" id="tag-${filteredTag.name}">${filteredTag.name} ${page.includes('tags') ? `<button>X</button>` : ''} </span>
        `;

        tags.insertAdjacentHTML('beforeend', tag);
    });

    socket.on('all tags', function (allTags) {
        if (allTags.length > 0) {
            tags.innerHTML = "";

            allTags.forEach(function (allTag) {
                const tag = `
                    <span data-id=${allTag.id} style="background-color: ${allTag.color}" class="tags__tag" id="tag-${allTag.name}">${allTag.name} ${page.includes('tags') ? `<button>X</button>` : ''} </span>
                `;

                tags.insertAdjacentHTML('beforeend', tag);
            });
        }
    })
})();