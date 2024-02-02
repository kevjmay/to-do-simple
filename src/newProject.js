console.log('Hello World! From the project file!')

const addProject = document.querySelector('.projectForm');
const projectInput = document.querySelector('.addTaskInput');

addProject.addEventListener('submit', e => {
    e.preventDefault()
    const input = projectInput.value
    console.log('The form is connected!')
    if (input.value == null || input.value === '') return
    const inputs = newProject(input)
})

function newProject(name) {
    return {
        id : Date.now().toString(),
        name : name,
        tasks : []
    }
}

const project = new newProject('projectOne');
console.log(project)

export default newProject
