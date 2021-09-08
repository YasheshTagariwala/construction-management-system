import React, {useEffect, useState, useRef, useCallback} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import styles from './list.scss';
import Card from "../Card";
import CardAdd from "./CardAdd";
import NameEdit from "../Card/NameEdit";
import ActionsPopup from "../Card/ActionsPopup";
import {Button, Icon} from "semantic-ui-react";
import classNames from "classnames";

function List(props) {

    const {id, index, name, isPersisted, cardIds, canEdit, onUpdate, onDelete, onCardCreate} = props
    const [isAddCardOpened, setIsAddCardOpened] = useState(false);

    const nameEdit = useRef(null);
    const listWrapper = useRef(null);

    const handleHeaderClick = useCallback(() => {
        if (isPersisted && canEdit) {
            nameEdit.current.open();
        }
    }, [isPersisted, canEdit]);

    const handleNameUpdate = useCallback(
        (newName) => {
            onUpdate({
                name: newName,
            });
        },
        [onUpdate],
    );

    const handleAddCardClick = useCallback(() => {
        setIsAddCardOpened(true);
    }, []);

    const handleAddCardClose = useCallback(() => {
        setIsAddCardOpened(false);
    }, []);

    const handleNameEdit = useCallback(() => {
        nameEdit.current.open();
    }, []);

    const handleCardAdd = useCallback(() => {
        setIsAddCardOpened(true);
    }, []);

    useEffect(() => {
        if (isAddCardOpened) {
            listWrapper.current.scrollTop = listWrapper.current.scrollHeight;
        }
    }, [cardIds, isAddCardOpened]);

    const cardsNode = (
        <Droppable
            droppableId={`list:${id}`}
            type={'CARD'}
            isDropDisabled={!isPersisted}
        >
            {({ innerRef, droppableProps, placeholder }) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <div {...droppableProps} ref={innerRef}>
                    <div className={styles.cards}>
                        {cardIds.map((cardId, cardIndex) => (
                            <Card key={cardId} id={cardId} index={cardIndex} />
                        ))}
                        {placeholder}
                        {canEdit && (
                            <CardAdd
                                isOpened={isAddCardOpened}
                                onCreate={onCardCreate}
                                onClose={handleAddCardClose}
                            />
                        )}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <Draggable draggableId={`list:${id}`} index={index} isDragDisabled={!isPersisted || !canEdit}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    {...draggableProps} // eslint-disable-line react/jsx-props-no-spreading
                    data-drag-scroller
                    ref={innerRef}
                    className={styles.innerWrapper}
                >
                    {/* eslint-disable jsx-a11y/click-events-have-key-events,
                               jsx-a11y/no-static-element-interactions,
                               react/jsx-props-no-spreading */}
                    <div className={styles.outerWrapper}>
                        <div
                            {...dragHandleProps}
                            className={classNames(styles.header, canEdit && styles.headerEditable)}
                            onClick={handleHeaderClick}
                        >
                            {/* eslint-enable jsx-a11y/click-events-have-key-events,
                                jsx-a11y/no-static-element-interactions,
                                react/jsx-props-no-spreading */}
                            <NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
                                <div className={styles.headerName}>{name}</div>
                            </NameEdit>
                            {isPersisted && canEdit && (
                                <ActionsPopup
                                    onNameEdit={handleNameEdit}
                                    onCardAdd={handleCardAdd}
                                    onDelete={onDelete}
                                >
                                    <Button className={classNames(styles.headerButton, styles.target)}>
                                        <Icon fitted name="pencil" size="small" />
                                    </Button>
                                </ActionsPopup>
                            )}
                        </div>
                        <div
                            ref={listWrapper}
                            className={classNames(
                                styles.cardsInnerWrapper,
                                (isAddCardOpened || !canEdit) && styles.cardsInnerWrapperFull,
                            )}
                        >
                            <div className={styles.cardsOuterWrapper}>{cardsNode}</div>
                        </div>
                        {!isAddCardOpened && canEdit && (
                            <button
                                type="button"
                                disabled={!isPersisted}
                                className={classNames(styles.addCardButton)}
                                onClick={handleAddCardClick}
                            >
                                {/*<PlusMathIcon className={styles.addCardButtonIcon} />*/}
                                {'###add_icon###'}
                                <span className={styles.addCardButtonText}>
                    {cardIds.length > 0 ? 'Add Another Card' : 'action.addCard'}
                  </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default List
