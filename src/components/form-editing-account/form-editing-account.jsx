/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import classNames from 'classnames';
import { openWindows, closeWindows } from '../../stores/sliceBlog';
import { apiEditingAccount } from '../../servis/apiEditingAccount';
import styles from './form-editing-account.module.scss';

function FormEditingAccount() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [apiMessage, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const user = useSelector((state) => state.blog.user);
  const error = useSelector((state) => state.blog.error);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openWindows());
    return () => {
      dispatch(closeWindows());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error && error.errors) {
      const errorMessages = Object.entries(error.errors)
        .map(([key, value]) => `${key} ${value}`)
        .join('. ');

      apiMessage.error({
        message: 'Ошибка в редактировании данных',
        description: errorMessages,
      });
    }
  }, [error]);
  const onSubmit = (data) => {
    const updatedUserInfo = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && data[key].length > 0) {
        updatedUserInfo[key] = data[key];
      }
    }
    dispatch(apiEditingAccount(updatedUserInfo));
    notification.success({
      message: 'данные успешно изменены',
    });
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      if (user.image) setValue('image', user.image);
    }
  }, [setValue, user]);
  return (
    <>
      {contextHolder}

      <form className={styles.form__new__account} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={styles.form__new__account__title}>Edit Profile</h5>
        <div className={styles.form__new__account__username}>
          <h6>Username</h6>
          <input
            className={classNames(styles.form__new__account__input, {
              [styles.input__error]: errors.username,
            })}
            type="text"
            name="username"
            placeholder="username"
            {...register('username', {
              required: 'Поле обязательное к заполнению',
              minLength: { value: 5, message: ' Минимум 5 символов' },
              maxLength: { value: 20, message: 'максисум 20 символов' },
            })}
          />
          <span className={styles.form__new__account__username__error}>
            {errors?.username && <p>{errors?.username?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__email}>
          <h6>Email address</h6>
          <input
            className={classNames(styles.form__new__account__input, {
              [styles.input__error]: errors.Email,
            })}
            type="email"
            name="Email address"
            placeholder="Email"
            autoComplete="email-address"
            {...register('Email', {
              required: 'Поле обязательное к заполнению',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'email должен быть корректным почтовым адресом',
              },
            })}
          />
          <span className={styles.form__new__account__email__error}>
            {errors?.Email && <p>{errors?.Email?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__password}>
          <h6>New password</h6>
          <div className={styles.inputWrapper}>
            <input
              className={classNames(styles.form__new__account__input, {
                [styles.input__error]: errors.password,
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="New password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Поле обязательное к заполнению',
                minLength: { value: 6, message: ' Минимум 6 символов' },
                maxLength: { value: 40, message: 'максисум 40 символов' },
              })}
            />
            <i
              aria-label="Переключить видимость пароля"
              role="button"
              tabIndex="0"
              onClick={togglePasswordVisibility}
              onKeyPress={togglePasswordVisibility}
              className={`fa ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </div>
          <span className={styles.form__new__account__password__error}>
            {errors?.password && <p>{errors?.password?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__username}>
          <h6>Avatar image (url)</h6>
          <input
            {...register('image', {
              pattern: {
                value: /^https?:\/\/.+$/,
                message: 'не верный формат URL',
              },
            })}
            type="text"
            name="image"
            placeholder="Avatar image (url)"
            className={classNames(styles.form__new__account__input, {
              [styles.input__error]: errors.image,
            })}
          />
          <span className={styles.form__new__account__username__error}>
            {errors?.image && <p>{errors?.image?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__button__container}>
          <button type="submit" className={styles.form__new__account__button}>
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default FormEditingAccount;
