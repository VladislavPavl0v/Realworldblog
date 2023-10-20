import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './sliceBlog'

export default configureStore ({
reducer: {
blog: blogReducer,
}
});