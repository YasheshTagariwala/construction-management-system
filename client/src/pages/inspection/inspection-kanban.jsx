import React, {useEffect, useState, useRef, useCallback} from "react";
import Loader from "../../components/loader";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import moment from "moment";
import styles from './inspection-kanban.scss';
import ListAdd from "./kanban-components/list-add/list-add";

const parseDndId = (dndId) => dndId.split(':')[1];

function InspectionKanban(props) {

    let { isCardModalOpened, canEdit, onListCreate, onListMove, onCardMove } = props;
    const [listIds, setListIds] = useState([]);
    const [isListAddOpened, setIsListAddOpened] = useState(false);

    const wrapper = useRef(null);
    const prevPosition = useRef(null);

    const handleAddListClick = useCallback(() => {
        setIsListAddOpened(true);
    }, []);

    const handleAddListClose = useCallback(() => {
        setIsListAddOpened(false);
    }, []);

    const handleDragStart = useCallback(() => {
        closePopup();
    }, []);

    const handleDragEnd = useCallback(
        ({ draggableId, type, source, destination }) => {
            if (
                !destination ||
                (source.droppableId === destination.droppableId && source.index === destination.index)
            ) {
                return;
            }

            const id = parseDndId(draggableId);

            switch (type) {
                case 'LIST':
                    onListMove(id, destination.index);

                    break;
                case 'CARD':
                    onCardMove(id, parseDndId(destination.droppableId), destination.index);

                    break;
                default:
            }
        },
        [onListMove, onCardMove],
    );

    const handleMouseDown = useCallback(
        (event) => {
            if (event.target !== wrapper.current && !event.target.dataset.dragScroller) {
                return;
            }

            prevPosition.current = event.clientX;
        },
        [wrapper],
    );

    const handleWindowMouseMove = useCallback(
        (event) => {
            if (!prevPosition.current) {
                return;
            }

            event.preventDefault();

            window.scrollBy({
                left: prevPosition.current - event.clientX,
            });

            prevPosition.current = event.clientX;
        },
        [prevPosition],
    );

    const handleWindowMouseUp = useCallback(() => {
        prevPosition.current = null;
    }, [prevPosition]);

    useEffect(() => {
        document.body.style.overflowX = 'auto';

        return () => {
            document.body.style.overflowX = null;
        };
    }, []);

    useEffect(() => {
        if (isListAddOpened) {
            window.scroll(document.body.scrollWidth, 0);
        }
    }, [listIds, isListAddOpened]);

    useEffect(() => {
        window.addEventListener('mouseup', handleWindowMouseUp);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [handleWindowMouseUp, handleWindowMouseMove]);

    return (
        <main className="h-full pb-16 overflow-y-auto">
            {props.loading && <Loader/>}
            <>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div ref={wrapper} className={styles.wrapper} onMouseDown={handleMouseDown}>
                    <div>
                        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                            <Droppable droppableId="board" type={DroppableTypes.LIST} direction="horizontal">
                                {({ innerRef, droppableProps, placeholder }) => (
                                    <div
                                        {...droppableProps} // eslint-disable-line react/jsx-props-no-spreading
                                        data-drag-scroller
                                        ref={innerRef}
                                        className={styles.lists}>
                                        {listIds.map((listId, index) => (
                                            <ListContainer key={listId} id={listId} index={index} />
                                        ))}
                                        {placeholder}
                                        {canEdit && (
                                            <div data-drag-scroller className={styles.list}>
                                                {isListAddOpened ? (
                                                    <ListAdd onCreate={onListCreate} onClose={handleAddListClose} />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className={styles.addListButton}
                                                        onClick={handleAddListClick}
                                                    >
                                                        <PlusMathIcon className={styles.addListButtonIcon} />
                                                        <span className={styles.addListButtonText}>
                              {listIds.length > 0
                                  ? 'Add another list'
                                  : 'Add list'}
                            </span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                {isCardModalOpened && <CardModalContainer />}
            </>
        </main>
    )
}

export default InspectionKanban
