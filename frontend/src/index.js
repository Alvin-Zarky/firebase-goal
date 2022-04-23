import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './context/authContext';
import './assets/scss/style.scss'
import './assets/scss/responsive.scss'

// ReactDOM.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <App />
//     </ContextProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const container= document.getElementById('root')
const root= ReactDOM.createRoot(container)
root.render(
  <>
    <ContextProvider>
      <App />
    </ContextProvider>
  </>
)
