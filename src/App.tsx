import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DataResponse, fetchTodos, deleteTodos, DeleteTodosAction } from './actions';
import { connect } from 'react-redux';
import { Storestate } from './reducers';
import { DefaultTodoState } from './reducers/todo.reducer';
import { ActionTypes } from './actions/types';

type ListProps = { title: string; id: number; handleDelete(): void };

const TodoList = ({ title, id, handleDelete }: ListProps): JSX.Element => (
  <li key={id}>
    <span>{title}</span>
    <span onClick={handleDelete}>X</span>
  </li>
);

interface AppProp {
  // color?: string;
  data: DataResponse[];
  fetchTodos: Function; // issue with type definition for redux thunk
  loading: boolean;
  deleteTodos: typeof deleteTodos;
}
type AppProps = { color?: string };

const App = (props: AppProp): JSX.Element => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    props.fetchTodos(ActionTypes.fetchTodos);
  }, []);

  const onIncrement = (): void => {
    setCounter(counter + 1);
  };

  const onDecrement = (): void => {
    setCounter(counter - 1);
  };

  const handleFetchTodos = (): void => {
    props.fetchTodos(ActionTypes.fetchTodos);
  };

  const onDelete = (id: number): void => {
    props.deleteTodos(id);
  };

  return (
    <div className="App">
      <div>
        {props.loading ? (
          <span>loading...</span>
        ) : (
          <ul>
            {props.data.map((content: DataResponse) => (
              <TodoList title={content.title} id={content.id} handleDelete={() => onDelete(content.id)} />
            ))}
          </ul>
        )}
      </div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      <button onClick={handleFetchTodos}>fetch todos</button>
      {counter}
    </div>
  );
};

const mapStateToProps = (state: Storestate): DefaultTodoState => ({
  data: state.todos.data,
  loading: state.todos.loading,
  error: state.todos.error,
});

export default connect(mapStateToProps, { fetchTodos, deleteTodos })(App);
