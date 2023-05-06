import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CanvasState from './store/canvasState';

const canvasState = new CanvasState()

export const Context = createContext({
  canvasState
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{canvasState}}>
    <App/>
  </Context.Provider>
);
