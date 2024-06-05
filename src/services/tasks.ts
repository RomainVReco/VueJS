export interface Task {
    id:number,
    name:string,
    description:string,
    temporality:string
}

let tasks:Task[] = []

function create(task:Task) {
    tasks = [task, ...tasks]
    console.log('tasks', tasks)
}

function read():Task[] {
    return tasks;
}

function convertCase (temporality:string):string {
    let result:string;
    switch (temporality) {
        case 'short-term':
            result = "Court terme"
            break;
        case 'medium-term':
            result = "Moyen terme"
            break;
        case 'long-term':
            result = "Long terme"
            break;
        default:
            result = "Erreur"
            break;
    }
    return result
}

export default {
    create, read, convertCase
}