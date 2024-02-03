import clearElement from "./clearProject";
import createList from "./createList";

const projectList = document.querySelector('[project-list]');
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list]')

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

export default render

