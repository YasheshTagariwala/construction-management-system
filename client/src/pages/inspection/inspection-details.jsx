import React from 'react';
import styled from 'styled-components';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import InspectionKanban from "./inspection-kanban";
import Loader from "../../components/loader";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

function InspectionDetails(props) {
    return (
        <div>
            <Card className={'col-6 p-2 m-3'}>
                <CardImg top width="100%" style={{height: '300px'}} src="https://picsum.photos/seed/picsum/200/300" alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">Task Title</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Status: To do</CardSubtitle>
                    <CardText>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</CardText>
                    {/*<Button>Button</Button>*/}
                </CardBody>
            </Card>
        </div>
    )
}

export default InspectionDetails
