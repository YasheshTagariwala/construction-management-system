import React, {useEffect, useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import initialData from './kanban/initial-data';
import Column from './kanban/column';
import Loader from "../../components/loader";
import {Button, Container} from "reactstrap";
import {inspectionList} from "../../redux/inspection/actions";
import {connect} from "react-redux";

class InnerList extends React.PureComponent {
    render() {
        const {column, taskMap, index} = this.props;
        const tasks = column.taskIds.map(taskId => taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index} taskClick={this.props.taskClick}/>;
    }
}

function InspectionKanban(props) {

    const {inspectionList: getInspectionList} = props;
    const [inspectionList, setInspectionList] = useState([]);
    const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
    const [columns, setColumns] = useState(initialData.columns);
    const [tasks, setTasks] = useState(initialData.tasks);

    useEffect(() => {
        // getInspectionList({text: 'ogemp'})
        getInspectionList({text: props.user.role})
    }, [getInspectionList, props.user.role])

    useEffect(() => {
        const mColumn = columns;
        const mTasks = {};
        mColumn['column-1']['taskIds'] = [];
        const mInspectionList = (props.inspections || []).map((x, i) => {
            x.id = `ins-${i + 1}`
            mColumn['column-1']['taskIds'].push(x.id)
            mTasks[x.id] = x;
            return x;
        });
        setInspectionList(mInspectionList);
        setColumns(mColumn);
        setTasks(mTasks);
    }, [props.inspections])

    const onDragStart = (start, provided) => {
        provided.announce(
            `You have lifted the task in position ${start.source.index + 1}`,
        );
    };

    const onDragUpdate = (update, provided) => {
        const message = update.destination
            ? `You have moved the task to position ${update.destination.index + 1}`
            : `You are currently not over a droppable area`;

        provided.announce(message);
    };

    const onDragEnd = (result, provided) => {
        const message = result.destination
            ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
            : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

        provided.announce(message);

        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            setColumnOrder(newColumnOrder)
            return;
        }

        const home = columns[source.droppableId];
        const foreign = columns[destination.droppableId];

        if (home === foreign) {
            const newTaskIds = Array.from(home.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };

            setColumns({
                ...columns,
                [newHome.id]: newHome,
            })
            return;
        }

        // moving from one list to another
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        setColumns({
            ...columns,
            [newHome.id]: newHome,
            [newForeign.id]: newForeign,
        })
    };

    const taskClick = (task) => {
        props.history.push(`/${props.user?.role}/inspection-kanban/details/${task.id}`);
    }

    return (
        <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h3 className="mb-0 font-weight-normal">Inspections</h3>
                <Button className="add-button" color="default"
                        onClick={() => props.history.push(`/${props.user?.role}/inspection/add`)}
                        size="sm"><i className="fa fa-plus"/></Button>
            </div>
            <Container fluid className="m-0 p-0">
                {props.loading && <Loader/>}
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                    onDragEnd={onDragEnd}
                >
                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {provided => (
                            <div className="d-flex"
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}
                                 style={{height: '100%'}}
                            >
                                {columnOrder.map((columnId, index) => {
                                    const column = columns[columnId];
                                    return (
                                        <InnerList
                                            key={column.id}
                                            column={column}
                                            taskMap={tasks}
                                            index={index}
                                            taskClick={taskClick}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Container>
        </React.Fragment>
    )
}

const mapStateToProps = ({inspectionsReducer, authUser}) => {
    const {inspections, loading, error, success} = inspectionsReducer
    const {user} = authUser
    return {inspections, loading, error, user, success}
}

const mapActionsToProps = {inspectionList}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(InspectionKanban)
