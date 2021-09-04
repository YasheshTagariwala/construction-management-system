import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loader from "../../components/loader";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import moment from "moment";
import './kan-ban.css'
import ListHolder from "./Comps/list-holder/list-holder";

const parseDndId = (dndId: any) => dndId.split(':')[1];

function InspectionKanban(props: any) {

    const wrapper = useRef(null);
    const prevPosition = useRef<any>(null);

    const [listIds, setListIds] = useState<any[]>([
        {}, {}, {}, {}
    ]);
    const [isListAddOpened, setIsListAddOpened] = useState(false);
    const [inspectionList, setInspectionList] = useState<any[]>([

    ]);
    const handleAddListClick = useCallback(() => {
        setIsListAddOpened(true);
    }, []);

    const handleAddListClose = useCallback(() => {
        setIsListAddOpened(false);
    }, []);

    const handleDragStart = useCallback(() => {
        // closePopup();
    }, []);

    const onListMove = (id: any, index: any) => ({
        type: 'LIST_MOVE',
        payload: {
            id,
            index,
        },
    });

    const onCardMove = (id: any, listId: any, index = 0) => ({
        type: 'CARD_MOVE',
        payload: {
            id,
            listId,
            index,
        },
    });

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
            document.body.style.overflowX = 'unset';
        };
    }, []);

    useEffect(() => {
        if (isListAddOpened) {
            window.scroll(document.body.scrollWidth, 0);
        }
    // }, [listIds, isListAddOpened]);
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
            <div ref={wrapper} className={'wrapper'} onMouseDown={handleMouseDown}>
                <div>
                    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                        <Droppable droppableId="board" type={'LIST'} direction="horizontal">
                            {({ innerRef, droppableProps, placeholder }) => (
                                <div
                                    {...droppableProps} // eslint-disable-line react/jsx-props-no-spreading
                                    data-drag-scroller
                                    ref={innerRef}
                                    className={'lists'}
                                >
                                    {listIds.map((listId, index) => (
                                        <ListHolder key={listId} id={listId} index={index} />
                                    ))}
                                    {placeholder}
                                    {/*{canEdit && (
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
                                  ? t('action.addAnotherList')
                                  : t('action.addList')}
                            </span>
                                                </button>
                                            )}
                                        </div>
                                    )}*/}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </main>
    )
}

export default InspectionKanban
