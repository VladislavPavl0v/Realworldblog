/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import { apiCreateArticle } from '../../servis/apiCreateArticle';
import { closeWindows, openWindows } from '../../stores/sliceBlog';

import styles from './create-article.module.scss';

function CreateArticle() {
  const token = useSelector((state) => state.blog.user.token);
  const error = useSelector((state) => state.blog.error);
  const navigate = useNavigate();
  const [apiMessage, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tag: [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tag',
    control,
    rules: {
      required: '',
      validate: () => {},
    },
  });
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
  useEffect(() => {
    dispatch(openWindows());
    return () => {
      dispatch(closeWindows());
    };
  }, [dispatch]);
  const onSubmit = (data) => {
    dispatch(
      apiCreateArticle({
        newArticleInfo: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: data.tag.map((t) => t.name),
        },
        token,
      }),
    ).then(() => {
      notification.success({
        message: 'Статья успешно добавлена!',
      });
      navigate('/');
    });
  };

  return (
    <>
      {contextHolder}
      <form className={styles.create__article} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.create__article__head}>Create new article</h3>
        <div className={styles.create__article__titleContainer}>
          <span>Title</span>
          <input
            className={classNames(styles.create__article__input, {
              [styles.input__error]: errors.title,
            })}
            type="text"
            placeholder="Title"
            name="title"
            {...register('title', {
              minLength: { value: 1, message: ' Минимум 1 символ' },
              required: '*Минимум 1 символ',
            })}
          />
          <span className={styles.create__article__titleContainer__error}>
            {errors?.title && <p>{errors?.title?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.create__article__ShortContainer}>
          <span>Short description</span>
          <input
            className={classNames(styles.create__article__ShortContainer__input, {
              [styles.input__error]: errors.shortDescription,
            })}
            type="text"
            placeholder="Short description"
            name="shortDescription"
            {...register('shortDescription', {
              minLength: { value: 1, message: ' Минимум 1 символ' },
              required: '*Минимум 1 символ',
            })}
          />
          <span className={styles.create__article__ShortContainer__error}>
            {errors?.shortDescription && <p>{errors?.shortDescription?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.create__article__TextContainer}>
          <span>Text</span>
          <textarea
            className={classNames(styles.create__article__TextContainer__input, {
              [styles.input__error]: errors.text,
            })}
            type="text"
            placeholder="Text"
            name="text"
            {...register('text', {
              minLength: { value: 1, message: ' Минимум 1 символ' },
              required: '*Минимум 1 символ',
            })}
          />
          <span className={styles.create__article__TextContainer__error}>
            {errors?.text && <p>{errors?.text?.message || 'Error'}</p>}
          </span>
        </div>
        <div className={styles.create__article__TagsContainer}>
          <h3>Tags</h3>
          <div className={styles.create__article__TagsContainer__inputTagsContainer}>
            {fields.map((field, index) => (
              <div
                className={styles.create__article__TagsContainer__inputTagsContainer__map}
                key={field.id}
              >
                <input
                  className={styles.create__article__TagsContainer__inputTagsContainer__input}
                  type="text"
                  name="tag"
                  placeholder="Tag"
                  {...register(`tag.${index}.name`, {
                    required: true,
                  })}
                />

                <button
                  className={styles.create__article__TagsContainer__inputTagsContainer__button__del}
                  type="button"
                  onClick={() => remove(index)}
                >
                  delete
                </button>
              </div>
            ))}
            <button
              className={styles.create__article__TagsContainer__inputTagsContainer__button}
              type="button"
              onClick={() =>
                append({
                  name: '',
                })
              }
            >
              Add tag
            </button>
          </div>
        </div>
        <div className={styles.create__article__buttonSubmit}>
          <button className={styles.create__article__buttonSubmit__button} type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateArticle;
