import React, { useState } from 'react';
import styles from './ModalForm.module.css';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  addProductThunk,
  editProductThunk,
} from '../../store/products/productsThunk';
import { v4 as uuidv4 } from 'uuid';

export type formInitialStateType = {
  id: string;
  name: string;
  count: string;
  height: string;
  width: string;
  weight: string;
};

type ModalFromProps = {
  isOpen: boolean;
  onCloseModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  filledForm?: formInitialStateType;
};
const FormInitilaState = {
  id: '',
  name: '',
  count: '',
  height: '',
  width: '',
  weight: '',
};

const ModalFrom: React.FC<ModalFromProps> = React.forwardRef(
  ({ isOpen, onCloseModal, filledForm }, ref) => {
    const [formValues, setFormValues] = useState(
      filledForm ? filledForm : FormInitilaState
    );

    const [isInputValid, setInputValid] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();

      if (filledForm) {
        if (
          Object.values(formValues).filter((el) => el.length > 0).length === 6
        ) {
          dispatch(
            editProductThunk({
              id: formValues.id,
              product: {
                id: formValues.id,
                name: formValues.name,
                count: parseInt(formValues.count),
                size: {
                  height: parseInt(formValues.height),
                  width: parseInt(formValues.width),
                },
                weight: formValues.weight,
              },
            })
          );
          setFormValues(FormInitilaState);
          onCloseModal(event);
        } else {
          setInputValid(false);
        }
      } else {
        if (
          Object.values(formValues).filter((el) => el.length > 0).length === 5
        ) {
          dispatch(
            addProductThunk({
              id: uuidv4(),
              name: formValues.name,
              count: parseInt(formValues.count),
              size: {
                height: parseInt(formValues.height),
                width: parseInt(formValues.width),
              },
              weight: formValues.weight,
            })
          );
          setFormValues(FormInitilaState);
          onCloseModal(event);
        } else {
          setInputValid(false);
        }
      }
    };

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setInputValid(true);
    };

    return (
      <Modal
        open={isOpen}
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        onClose={onCloseModal}
      >
        <div className={styles.modalForm_container}>
          <h3 className={styles.modalForm_title}>
            {filledForm ? 'Edit Product' : 'Add product'}
          </h3>
          <form
            ref={ref as React.Ref<HTMLFormElement>}
            className={styles.input_property_form}
          >
            <div className={styles.input_property_container}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onInput}
                value={formValues.name}
                className={styles.input_item}
              />
            </div>
            <div className={styles.input_property_container}>
              <label htmlFor="count">Count:</label>
              <input
                type="number"
                id="count"
                name="count"
                onChange={onInput}
                value={formValues.count}
                className={styles.input_item}
              />
            </div>
            <div className={styles.input_property_container}>
              <label htmlFor="height">Height:</label>
              <input
                type="number"
                id="height"
                name="height"
                onChange={onInput}
                value={formValues.height}
                className={styles.input_item}
              />
            </div>
            <div className={styles.input_property_container}>
              <label htmlFor="width">Width:</label>
              <input
                type="number"
                id="width"
                name="width"
                onChange={onInput}
                value={formValues.width}
                className={styles.input_item}
              />
            </div>
            <div className={styles.input_property_container}>
              <label htmlFor="weight">Weight:</label>
              <input
                type="text"
                id="weight"
                name="weight"
                onChange={onInput}
                value={formValues.weight}
                className={styles.input_item}
              />
            </div>
          </form>
          {!isInputValid && (
            <p className={styles.error_message}>
              Please, fill in all the details
            </p>
          )}
          <div className={styles.form_add_btn_container}>
            <button onClick={onCloseModal} className={styles.form_add_btn}>
              Cancel
            </button>
            <button
              className={styles.form_add_btn}
              onClick={handleSubmit}
              style={{ backgroundColor: 'rgb(0, 184, 0)' }}
            >
              {filledForm ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ModalFrom;
