import React, { Component } from 'react';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP

import DatePicker from 'react-datepicker';             // Importa código JavaScript de DatePicker para React
import 'react-datepicker/dist/react-datepicker.css';    // Importa código CSS de DatePicker para React

export default class CreateNote extends Component {

    // Define el estado de los datos en el Componente
    state = {
        users: [],
        user_selected: '',
        date: new Date()        // Fecha Actual por defecto
    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    async componentDidMount() {
        /** Realiza peticion HTTP al API usando axios */
        const res = await axios .get( 'http://localhost:4000/api/users' );          // Es una operación Asincrona por lo que se puede usar: un callback, una Promesa o en este último caso convertir nuestra funcion en una funcion asincrona. Podria usarse el tipico fetch() de JavaScript Promise, etc

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            users: res .data .map( user => user .userName )                           // Mapeamos solo el campo userName de todo el Array de Objetos por usuario
        });
        console .log( 'Solo los userName de usuarios', this .state .users );
    }

    onSubmit = ( e ) => {

        e .preventDefault();
    }

    // Método: Establece en el estado del Componente cuando el valor seleccionado cambia
    onInputChange = ( e ) => {
        console .log( e .target .value );       // Obtiene el valor seleccionado en el selector del formulario
        
        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            user_selected: e .target .value                           // Establece el usuario seleccionado
        });
    }

    // Método: Establece en el estado del Componente la fecha cuando se cambia usando el DatePicker
    onChangeDate = date => {
        this .setState({
            date            // ES6: No se necesita asignar cuando el valor asignado y la variable de destino se llaman igual ( date: date )
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-body">
                        <h3>Crear Nota</h3>
                        {/** Select User */}
                        <div className="form-group">
                            <select 
                                className="form-control"
                                name="userSelected"
                                onChange={ this .onInputChange }
                            >
                                {
                                    this .state .users .map( user => <option key={ user } value={ user }>{ user }</option> )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                type="text" 
                                name="title" 
                                placeholder="Título" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                name="description"
                                className="form-control"
                                placeholder="Descripción"
                                required
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <DatePicker 
                                className="form-control" 
                                selected={ this .state .date }
                                onChange={ this .onChangeDate }
                            />
                        </div>

                        <form onSubmit={ this .onSubmit }>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
