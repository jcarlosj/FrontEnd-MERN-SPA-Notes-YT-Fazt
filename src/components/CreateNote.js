import React, { Component } from 'react';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP

import DatePicker from 'react-datepicker';             // Importa código JavaScript de DatePicker para React
import 'react-datepicker/dist/react-datepicker.css';    // Importa código CSS de DatePicker para React

export default class CreateNote extends Component {

    // Define el estado de los datos en el Componente
    state = {
        users: [],
        user_selected: '',      // Select del Formulario
        title: '',              // Input del Formulario
        content: '',        // Textarea del Formulario
        date: new Date()        // Fecha Actual por defecto
    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    async componentDidMount() {
        /** Realiza peticion HTTP al API usando axios */
        const res = await axios .get( 'http://localhost:4000/api/users' );          // Es una operación Asincrona por lo que se puede usar: un callback, una Promesa o en este último caso convertir nuestra funcion en una funcion asincrona. Podria usarse el tipico fetch() de JavaScript Promise, etc

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            users: res .data .map( user => user .userName ),                          // Mapeamos solo el campo userName de todo el Array de Objetos por usuario
            user_selected: res .data[ 0 ] .userName                                   // Establece el usuario seleccionado por defecto como el primero en la lista del selector Obtenida
        });
        console .log( 'Solo los userName de usuarios', this .state .users );
    }

    onSubmit = async ( e ) => {
        e .preventDefault();

        console .group( 'state' );
        console .log( 'user_selected', this .state .user_selected );
        console .log( 'title', this .state .title );
        console .log( 'content', this .state .content );
        console.groupEnd();

        const newNote = {
            author: this .state .user_selected,
            title: this .state .title,
            content: this .state .content,
            date: this .state .date
        }

        const res = await axios .post( 'http://localhost:4000/api/notes', newNote );
        console .log( res );
        window .location .href = "/";                                                 // Redirecciona al Home (Listado Notas)
    }

    // Método: Establece en el estado del Compomente cuando el valor de uno o másl campos del formulario cambian
    onChangeFormFieldsValue = e => {
        console .log( '[', e. target .name, ']: ', e. target .value );   // Obtiene el valor de los atributo 'name' y 'value' de los campos nativos del formulario (DatePicker no es nativo)

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            [ e .target .name ]: e .target .value   // Establece valor al atributo seleccionado (userSelected, title, content) del formulario.
        });

    } 

    // Método: Establece en el estado del Componente la fecha cuando se cambia usando el DatePicker
    onChangeDate = date => {
        console .log( '[ date-picker ]: ', date );

        // Almacena los datos en el Estado de la Aplicación del Componente
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
                                name="user_selected"
                                onChange={ this .onChangeFormFieldsValue }
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
                                onChange={ this .onChangeFormFieldsValue }
                                placeholder="Título" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                name="content"
                                onChange={ this .onChangeFormFieldsValue }
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
