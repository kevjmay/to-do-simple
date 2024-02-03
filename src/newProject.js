import clearElement from "./clearProject";
import createList from "./createList";

const projectList = document.querySelector('[project-list]');
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')


let lists = [{id: 1, 
              name: 'First Project'
             }, 
             {id: 2, 
              name:'Second Project'
             }]

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    render()
})

function render() {
    clearElement(projectList)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        projectList.appendChild(listElement)
    })
}

export default render

