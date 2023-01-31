import { DataResponse, FetchTodosAction, TodosAction } from '../actions';
import { ActionTypes } from '../actions/types';

export interface DefaultTodoState {
  loading: boolean;
  data: DataResponse[];
  error?: string | null;
}

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const TodoReducer = (state: DefaultTodoState = initialState, action: TodosAction) => {
  switch (action.type) {
    case ActionTypes.loading:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.fetchTodos:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ActionTypes.deleteTodo:
      return {
        ...state,
        data: state.data.filter((todo: DataResponse) => todo.id != action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
