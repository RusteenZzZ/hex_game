import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CanvasState from './store/canvasState';
import WorldMap from './types/map';
import mapLoader from './services/mapLoader';
// TODO: Remove new CanvasState from here to the lower levels
// 

const worldMap: WorldMap = mapLoader( "map1" )

const canvasState = new CanvasState(worldMap)

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
