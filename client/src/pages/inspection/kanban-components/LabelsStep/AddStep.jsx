import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Popup } from '../../../../lib/custom-ui';

import { useForm } from '../../../../hooks';
import LabelColors from '../../../../constants/LabelColors';
import Editor from './Editor';

import styles from './AddStep.module.scss';

const AddStep = React.memo(({ onCreate, onBack }) => {

  const [data, handleFieldChange] = useForm(() => ({
    name: '',
    color: LabelColors[0],
  }));

  const handleSubmit = useCallback(() => {
    const cleanData = {
      ...data,
      name: data.name.trim() || null,
    };

    onCreate(cleanData);
    onBack();
  }, [data, onCreate, onBack]);

  return (
    <>
      <Popup.Header onBack={onBack}>
        {'Create Label'}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <Editor data={data} onFieldChange={handleFieldChange} />
          <Button positive content={'Create Label'} className={styles.submitButton} />
        </Form>
      </Popup.Content>
    </>
  );
});

AddStep.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AddStep;
