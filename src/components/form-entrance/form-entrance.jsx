/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { openWindows, closeWindows } from '../../stores/sliceBlog';
import { apiLoginUsers } from '../../servis/apiLoginUsers';
import styles from './form-entrance.module.scss';
import { SIGN_UP_PATH, ROOT_PATH } from '../../routers/routePaths';

function FormEntrance() {
  const [apiMessage, contextHolder] = notification.useNotification();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const error = useSelector((state) => state.blog.error);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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
        message: 'Ошибка авторизации',
        description: errorMessages,
      });
    }
  }, [error]);

  const onSubmit = (data) => {
    dispatch(apiLoginUsers(data))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Вы успешно вошли в свой аккаунт',
        });
        navigate(ROOT_PATH);
        reset();
      })
      .catch(() => {});
  };

  return (
    <>
      {contextHolder}
      <form className={styles.form__entrance__account} onSubmit={handleSubmit(onSubmit)}>
        <h5 className={styles.form__entrance__account__title}>Sign In</h5>
        <div className={styles.form__entrance__account__email}>
          <h6>Email address</h6>
          <input
            className={classNames(styles.form__entrance__account__input, {
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
          <span className={styles.form__entrance__account__email__error}>
            {errors?.Email && <p>{errors?.Email?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__entrance__account__password}>
          <h6>Password</h6>
          <div className={styles.inputWrapper}>
            <input
              className={classNames(styles.form__entrance__account__input, {
                [styles.input__error]: errors.password,
              })}
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="password"
              autoComplete="new-password"
              {...register('password', {
                required: 'Поле обязательное к заполнению',
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
          <span className={styles.form__entrance__account__password__error}>
            {errors?.password && <p>{errors?.password?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.form__entrance__account__button__container}>
          <button type="submit" className={styles.form__entrance__account__button}>
            Login
          </button>
          <span className={styles.form__entrance__account__button__container__title}>
            Already have an account?
            <Link
              to={SIGN_UP_PATH}
              className={styles.form__entrance__account__button__container__title__a}
            >
              {' '}
              Sign Up.
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default FormEntrance;
