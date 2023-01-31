import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

const url: string = 'https://jsonplaceholder.typicode.com/todos';

export interface DataResponse {
  //   id: number;
  //   title: string;
  //   completed: boolean;
  [x: string]: number | string | string[] | number[] | any; // could have just been type any
}

/** this interface is meant to describe the object passed to the dispatch action in the fetchTodos function */
export interface FetchTodosAction extends TodosAction {
  type: ActionTypes;
  payload: DataResponse[];
}

export interface DeleteTodosAction extends TodosAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export interface TodosAction {
  type: ActionTypes;
  payload: any;
}

export const fetchTodos = (types: ActionTypes) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.loading });
  try {
    const response = await axios.get<DataResponse[]>(url); // tells response data to be of type DataResponse in array of course

    dispatch<FetchTodosAction>({
      type: types,
      payload: response.data,
    });
  } catch (error: any) {
    // dispatch({ type: "ERROR_OCCURED", payload: error.message });
  }
};

export const deleteTodos = (id: number): DeleteTodosAction => ({
  type: ActionTypes.deleteTodo,
  payload: id,
});
