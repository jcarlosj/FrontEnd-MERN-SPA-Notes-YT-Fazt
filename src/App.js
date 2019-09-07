import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';		// BrowserRouter(Contenedor): Permite crear URLs en nuestra aplicación. Route(Rutas): Permite especificar Rutas
import './App.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
		<Navigation/>
		<h1>Notes App</h1>
		<h3>MERN Stack (API RestFul)</h3>
		{/** Creamos las rutas para nuestros componentes (exact: Muestra exactamente el componente que conincide con la ruta, evita que se muestre en las otras rutas) */}
		<Route path="/" exact component={ NotesList } />
		<Route path="/edit/:id" component={ CreateNote } />
		<Route path="/create" component={ CreateNote } />
		<Route path="/user" component={ CreateUser } />
	</Router>
  );
}

export default App;
