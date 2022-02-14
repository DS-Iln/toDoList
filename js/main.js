$(function() {
    const formInput = $('.header-input'),
          formBtn = $('#add'),
          toDoItemClone = $('.example-item').clone().removeClass('example-item').prop('style', ''),
          emptyList = $('.todo-list__article'),
          emptyCompleted = $('.todo-complete__article');

    formBtn.click((e) => {
        e.preventDefault();

        if ($(formInput).val() !== '') {
            let newItem = toDoItemClone.clone();
            $(newItem).children('.text-todo').text($(formInput).val());

            $(newItem).insertAfter($('#todo').children().last());
        }

        saveLists();
        hideArticle($('#todo').children('.todo-item:not(:first-child)'), emptyList);
    });
    
    // Remove/complete buttons delegation
    $(document).delegate('button', 'click', function() {
        if ($(this).hasClass('todo-remove')) {
            $(this).parent().parent().remove();
        }

        saveLists();
        showArticle($('#todo').children('.todo-item:not(".example-item")'), emptyList);
        showArticle($('#completed').children('.todo-item:not(".example-item")'), emptyCompleted);
    });

    $(document).delegate('button', 'click', function() {
        if ($(this).hasClass('todo-complete')) {
            let toDoComplete = $('#completed');

            $(toDoComplete).append($(this).parent().parent());
        }
        
        saveLists();
        showArticle($('#todo').children('.todo-item:not(".example-item")'), emptyList);
        hideArticle($('#completed').children('.todo-item:not(".example-item")'), emptyCompleted);
    });

    // Save tasks in LocalStorage function
    function saveLists() {
        let toDoItems = $('.todo-item:not(".example-item")');
        let storageObj = {};

        $(toDoItems).each(index => {
            let item = $(toDoItems)[index];
            storageObj[$(item).children('.text-todo').text()] = $(item).parent().prop('id');
        })

        localStorage.setItem('tasks', JSON.stringify(storageObj));

        return;
    };

    // Load tasks from LocalStorage function
    (function loadSaves() {
        let tasks = localStorage.getItem('tasks');
        if (tasks !== '{}') {
            tasks = JSON.parse(tasks);

            for(let key in tasks) {
                if (tasks.hasOwnProperty(key)) {
                    let newItem = toDoItemClone.clone();
                    $(newItem).children('.text-todo').text(key);
                    if (tasks[key] === 'todo') {
                        $(newItem).insertAfter($('#todo').children().last());
                    } else if (tasks[key] === 'completed') {
                        $(newItem).insertAfter($('#completed').children().last());
                    }
                }
            }
        }
    })();

    // Implementation to avoid code duplication
    function showArticle(list, article) {
        if ($(list)[0] === undefined) {
            $(article).show();
        }

        return;
    };

    function hideArticle(list, article) {
        if ($(list)[0] !== undefined) {
            $(article).hide();
        }

        return;
    };

    // Initial Check
    showArticle($('#todo').children('.todo-item:not(".example-item")'), emptyList);
    hideArticle($('#completed').children('.todo-item:not(".example-item")'), emptyCompleted);
})