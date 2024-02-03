// Serves to create the new project in project pane

function createList(name) {
    return { id: Date.now().toString(), 
             name: name, 
             task: []
           }
}

export default createList