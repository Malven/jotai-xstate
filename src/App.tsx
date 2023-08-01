import { Suspense } from 'react';
import './App.css';
import './index.css';
import { TodoList } from './todo/todo-list';

const App = () => {
  return (
    <main className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </main>
  );
};

export default App;
