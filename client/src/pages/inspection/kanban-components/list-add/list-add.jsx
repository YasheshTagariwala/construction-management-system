import React, {useEffect, useState, useRef, useCallback} from "react";
import { useDidUpdate, useToggle } from '../../../../lib/hooks';
import { useClosableForm, useForm } from '../../../../hooks';
import { Button, Form, Input } from 'semantic-ui-react';
import styles from './list-add.scss';

const DEFAULT_DATA = {
    name: '',
};

function ListAdd(props) {

    const {onCreate, onClose} = props;
    const [data, handleFieldChange, setData] = useForm(DEFAULT_DATA);
    const [selectNameFieldState, selectNameField] = useToggle();

    const nameField = useRef(null);

    const handleFieldKeyDown = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose],
    );

    const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(onClose);

    const handleSubmit = useCallback(() => {
        const cleanData = {
            ...data,
            name: data.name.trim(),
        };

        if (!cleanData.name) {
            nameField.current.select();
            return;
        }

        onCreate(cleanData);

        setData(DEFAULT_DATA);
        selectNameField();
    }, [onCreate, data, setData, selectNameField]);

    useEffect(() => {
        nameField.current.select();
    }, []);

    useDidUpdate(() => {
        nameField.current.select();
    }, [selectNameFieldState]);

    return (
        <Form className={styles.wrapper} onSubmit={handleSubmit}>
            <Input
                ref={nameField}
                name="name"
                value={data.name}
                placeholder={'Enter list title...'}
                className={styles.field}
                onKeyDown={handleFieldKeyDown}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
            />
            <div className={styles.controls}>
                {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                <Button
                    positive
                    content={'Add list'}
                    className={styles.submitButton}
                    onMouseOver={handleControlMouseOver}
                    onMouseOut={handleControlMouseOut}
                />
            </div>
        </Form>
    );
}

export default ListAdd
