const projectList = document.querySelector('[project-list]');
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list]')

// Selectors specific for the tasks

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

// Local storage ste below

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListsId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListsId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

// This event listener sets the selectedListId variable when user clicks on one of the projects
projectList.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListsId = e.target.dataset.listId
        saveAndRender()
    }
})

// This event listener will delete a task/s from the active project list if checked is true
clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListsId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
}); 

// This event listener will delete a project from the list with the active-list/selectedListsId 
deleteListButton.addEventListener('click', e => {
    // Essentially it regens the project list without the one that was set to active when it was called
    lists = lists.filter(list => list.id !== selectedListsId)
    selectedListsId = null
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListsId)
    selectedList.tasks.push(task)
    saveAndRender()
})

function createTask(name) {
    return { id: Date.now().toString(), 
             name: name, 
             complete: false
      }
}

function createList(name) {
    return { id: Date.now().toString(), 
             name: name, 
             tasks: []
           }
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListsId)
}

function render() {
    clearElement(projectList)
    renderLists()

    // Store the active / selected list in a variable for use
    const selectedList = lists.find(list => list.id === selectedListsId)
    if (selectedListsId == null) {
        // Hides the Tasks Pane if nothing is selected or project is deleted
        listDisplayContainer.style.display = 'none'
    } else {
        // Unhides the Task Pane when a project is selected
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

function renderTasks(selectedList) {
    clearElement(tasksContainer);

    if (selectedList && selectedList.tasks) {
        selectedList.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = task.id;
            checkbox.checked = task.complete;
            
            checkbox.addEventListener('change', () => {
                // Update the task's complete state when the checkbox changes
                task.complete = checkbox.checked;
                saveAndRender();
            });

            const label = document.createElement('label');
            label.htmlFor = task.id;
            label.innerText = task.name;

            taskElement.appendChild(checkbox);
            taskElement.appendChild(label);
            tasksContainer.appendChild(taskElement);
        });
    }
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        if (list.id == selectedListsId) {
            listElement.classList.add('active-list')
        }
        projectList.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export default render

