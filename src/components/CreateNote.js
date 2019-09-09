import React, { Component } from 'react';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP

export default class CreateNote extends Component {

    // Define el estado de los datos en el Componente
    state = {
        users: []
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
                               
                            >
                                {
                                    this .state .users .map( user => <option key={ user } value={ user }>{ user }</option> )
                                }
                            </select>
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
