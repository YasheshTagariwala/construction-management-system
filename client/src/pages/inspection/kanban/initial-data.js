const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Clean the area' },
        'task-3': { id: 'task-3', content: 'Water leak' },
        'task-4': { id: 'task-4', content: 'short circuit' },
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
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
