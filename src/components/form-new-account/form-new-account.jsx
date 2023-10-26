/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import { Checkbox, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openWindows, closeWindows } from '../../stores/sliceBlog';
import { apiRegisterUser } from '../../servis/apiRegisterUsers';
import { apiLoginUsers } from '../../servis/apiLoginUsers';

import styles from './form-new-account.module.scss';

function FormNewAccount() {
  const error = useSelector((state) => state.blog.error);
  const navigate = useNavigate();
  const [apiMessage, contextHolder] = notification.useNotification();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm({
    mode: 'onBlur',
  });
  const password = watch('password');
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
        message: 'Ошибка регистрации',
        description: errorMessages,
      });
    }
  }, [error]);

  const onSubmit = (data) => {
    dispatch(apiRegisterUser(data)).then((response) => {
      if (response.payload) {
        dispatch(
          apiLoginUsers({
            username: data.username,
            password: data.password,
          }),
        ).then((loginResponse) => {
          console.log(loginResponse)
          if (loginResponse.payload && !loginResponse.error) {
            notification.success({
              message: 'Новый акаунт создан',
            });
            reset();
            navigate('/');
          }
        });
      }
    });
  };

  return (
    <>
      {contextHolder}
      <form className={styles.form__new__account} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={styles.form__new__account__title}>Create new account</h5>
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
          <h6>Password</h6>
          <div className={styles.inputWrapper}>
            <input
              className={classNames(styles.form__new__account__input, {
                [styles.input__error]: errors.password,
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="password"
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
        <div className={styles.form__new__account__passwordRepeat}>
          <h6>Repeat Password</h6>
          <div className={styles.inputWrapper}>
            <input
              className={classNames(styles.form__new__account__input, {
                [styles.input__error]: errors.RepeatPassword,
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              name="repeatPassword"
              placeholder="RepeatPassword"
              autoComplete="new-password"
              {...register('RepeatPassword', {
                required: 'Поле обязательное к заполнению',
                minLength: { value: 6, message: ' Минимум 6 символов' },
                maxLength: { value: 40, message: 'максисум 40 символов' },
                validate: (value) => value === password || 'Пароли должны совпадать',
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
          <span className={styles.form__new__account__passwordRepeat__error}>
            {errors?.RepeatPassword && <p>{errors?.RepeatPassword?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__checkbox}>
          <Controller
            name="checkbox"
            control={control}
            defaultValue={false}
            rules={{ required: 'галочка согласия должна быть отмечена' }}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
          <span className={styles.form__new__account__checkbox__error}>
            {errors.checkbox && <p>{errors.checkbox.message}</p>}
          </span>
        </div>
        <div className={styles.form__new__account__button__container}>
          <button type="submit" className={styles.form__new__account__button}>
            Create
          </button>
          <span className={styles.form__new__account__button__container__title}>
            Already have an account?
            <a className={styles.form__new__account__button__container__title__a}> Sign In.</a>
          </span>
        </div>
      </form>
    </>
  );
}

export default FormNewAccount;
