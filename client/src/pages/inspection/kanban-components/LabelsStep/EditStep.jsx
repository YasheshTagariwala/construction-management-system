import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Popup } from '../../../../lib/custom-ui';

import { useForm, useSteps } from '../../../../hooks';
import LabelColors from '../../../../constants/LabelColors';
import Editor from './Editor';
import DeleteStep from '../DeleteStep/DeleteStep';

import styles from './EditStep.module.scss';

const StepTypes = {
  DELETE: 'DELETE',
};

const EditStep = React.memo(({ defaultData, onUpdate, onDelete, onBack }) => {

  const [data, handleFieldChange] = useForm(() => ({
    color: LabelColors[0],
    ...defaultData,
    name: defaultData.name || '',
  }));

  const [step, openStep, handleBack] = useSteps();

  const handleSubmit = useCallback(() => {
    const cleanData = {
      ...data,
      name: data.name.trim() || null,
    };

    if (cleanData !== defaultData) {
      onUpdate(cleanData);
    }

    onBack();
  }, [defaultData, data, onUpdate, onBack]);

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title={'DeleteLabel'}
        content={'Are You Sure You Want To Delete This Label'}
        buttonContent={'DeleteLabel'}
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Popup.Header onBack={onBack}>
        {'EditLabel'}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <Editor data={data} onFieldChange={handleFieldChange} />
          <Button positive content={'action.save'} />
        </Form>
        <Button
          content={'action.delete'}
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        />
      </Popup.Content>
    </>
  );
});

EditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default EditStep;
