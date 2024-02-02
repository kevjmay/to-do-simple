console.log('Hello World! From the project file!')

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
