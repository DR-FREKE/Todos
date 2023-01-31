import { combineReducers } from 'redux';
import { DataResponse } from '../actions';
import { DefaultTodoState, TodoReducer } from './todo.reducer';

export interface Storestate {
  todos: DefaultTodoState;
}

export const reducers = combineReducers<Storestate>({
  todos: TodoReducer,
});
