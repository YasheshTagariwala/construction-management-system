import React, { useCallback, useEffect, useRef, useState } from 'react';
import './list-holder.css'
import {Draggable, Droppable} from "react-beautiful-dnd";

const parseDndId = (dndId: any) => dndId.split(':')[1];

function ListHolder(props: any) {

    const [isAddCardOpened, setIsAddCardOpened] = useState(false);
    const [isPersisted, setIsPersisted] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [cardIds, setCardIds] = useState<any[]>([
        {}, {}, {}, {}
    ]);

    const nameEdit = useRef<any>(null);
    const listWrapper = useRef<any>(null);

    // const handleHeaderClick = useCallback(() => {
    //     if (isPersisted && canEdit) {
    //         nameEdit.current.open();
    //     }
    // }, [isPersisted, canEdit]);

    // const handleNameUpdate = useCallback(
    //     (newName) => {
    //         onUpdate({
    //             name: newName,
    //         });
    //     },
    //     [onUpdate],
    // );

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
            droppableId={`list:${props.id}`}
            type={'CARD'}
            isDropDisabled={!isPersisted}
        >
            {({ innerRef, droppableProps, placeholder }) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <div {...droppableProps} ref={innerRef}>
                    <div className={'cards'}>
                        {cardIds.map((cardId, cardIndex) => (
                            <div>132132</div>
                            // <CardContainer key={cardId} id={cardId} index={cardIndex} />
                        ))}
                        {placeholder}
                        {/*{canEdit && (
                            <CardAdd
                                isOpened={isAddCardOpened}
                                onCreate={onCardCreate}
                                onClose={handleAddCardClose}
                            />
                        )}*/}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <Draggable draggableId={`list:${props.id}`} index={props.index} isDragDisabled={!isPersisted || !canEdit}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    {...draggableProps} // eslint-disable-line react/jsx-props-no-spreading
                    data-drag-scroller
                    ref={innerRef}
                    className={'innerWrapper'}
                >
                    <div className={'outerWrapper'}>
                        <div
                            {...dragHandleProps}
                            className={`header ${canEdit ? 'headerEditable' : ''}`}
                            // className={classNames(styles.header, canEdit && styles.headerEditable)}
                            // onClick={handleHeaderClick}
                            onClick={() => {}}
                        >
                            {/*<NameEdit ref={nameEdit} defaultValue={name} onUpdate={handleNameUpdate}>
                                <div className={'headerName'}>{name}</div>
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
                            )}*/}
                        </div>
                        <div
                            ref={listWrapper}
                            className={`cardsInnerWrapper ${(isAddCardOpened || !canEdit) ? 'cardsInnerWrapperFull' : ''}`}
                            // className={classNames(styles.cardsInnerWrapper, (isAddCardOpened || !canEdit) && styles.cardsInnerWrapperFull)}
                        >
                            <div className={'cardsOuterWrapper'}>{cardsNode}</div>
                        </div>
                        {!isAddCardOpened && canEdit && (
                            <button
                                type="button"
                                disabled={!isPersisted}
                                className={'addCardButton'}
                                onClick={handleAddCardClick}
                            >
                                {/*<PlusMathIcon className={styles.addCardButtonIcon} />*/}
                                <span className={'addCardButtonText'}>
                    {/*{cardIds.length > 0 ? t('action.addAnotherCard') : t('action.addCard')}*/}
                  </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default ListHolder
