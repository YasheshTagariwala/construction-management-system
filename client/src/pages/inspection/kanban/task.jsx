import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Task extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div className="task-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging.toString()}
                        aria-roledescription="Press space bar to lift the task"
                        onClick={() => {this.props.taskClick(this.props.task)}}
                    >
                        {this.props.task.name}
                    </div>
                )}
            </Draggable>
        );
    }
}
