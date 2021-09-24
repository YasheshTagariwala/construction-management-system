const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Clean the area' },
        'task-3': { id: 'task-3', content: 'Water leak' },
        'task-4': { id: 'task-4', content: 'short circuit' },
        'task-5': { id: 'task-5', content: 'Gas leak' },
        'task-6': { id: 'task-6', content: 'Door lock' },
        'task-7': { id: 'task-7', content: 'Open wires' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: ['task-3'],
        },
        'column-3': {
            id: 'column-3',
            title: 'On Visit',
            taskIds: ['task-4'],
        },
        'column-4': {
            id: 'column-4',
            title: 'Need Attention',
            taskIds: ['task-5'],
        },
        'column-5': {
            id: 'column-5',
            title: 'ABout To Start',
            taskIds: ['task-6', 'task-7'],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
};

export default initialData;
