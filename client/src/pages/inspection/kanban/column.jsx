import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Task from './task';

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.props.tasks;
    }

    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} taskClick={this.props.taskClick}/>
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {provided => (
                    <div className="main-container" {...provided.draggableProps} ref={provided.innerRef}>
                        <h3 {...provided.dragHandleProps}>
                            {this.props.column.title}
                        </h3>
                        <Droppable droppableId={this.props.column.id} type="task">
                            {(provided, snapshot) => (
                                <div className="task-list"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                     isdraggingover={snapshot.isDraggingOver.toString()}
                                >
                                    <InnerList tasks={this.props.tasks} taskClick={this.props.taskClick}/>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        );
    }
}
