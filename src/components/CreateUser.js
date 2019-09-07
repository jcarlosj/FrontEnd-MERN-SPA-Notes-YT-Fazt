import React, { Component } from 'react';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP

export default class CreateUser extends Component {

    // Define el estado de los datos en el Componente
    state = {
        users: [],
        user_name: ''
    }

    // Escuchará los cambios (Al usar la función flecha evitamos el uso de bind() )
    onChangeUserName = ( data ) => {           // 'data' son los datos que vamos escribiendo en el campo del formulario
        console .log( data .target .value );   // Datos escritos en el campo del formulario Crear Usuario

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            user_name: data .target .value
        });
    }

    getUsers = async () => {
        /** Realiza petición HTTP al API usando axios para mostrar la lista de usuarios */
        const users = await axios .get( 'http://localhost:4000/api/users' );    // Es una operación Asincrona por lo que se puede usar: un callback, una Promesa o en este último caso convertir nuestra funcion en una funcion asincrona. Podria usarse el tipico fetch() de JavaScript Promise, etc
        console .log( users );

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            users: users .data
        });

    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    async componentDidMount() {
        const users = this .getUsers(); // Obtiene los usuarios
        console .log( 'Estado de usuarios', this .state .users );
    }

    // Método: Envia datos al API a través del formulario (POST)
    onSubmit = async e => {
        e .preventDefault();    // Cancela el comportamiento por defecto del formulario de recargar la página
    
        /** Realiza peticion HTTP al API usando axios y enviando el valor 'userName' para insertarlo */
        const res = await axios .post( 'http://localhost:4000/api/users', {                 // Es una operación Asincrona por lo que se puede usar: un callback, una Promesa o en este último caso convertir nuestra funcion en una funcion asincrona. Podria usarse el tipico fetch() de JavaScript Promise, etc
            userName: this .state .user_name                                                // Pasamos el dato del formulario establecido en el Estado del Componente
        });
        console .log( res );

        this .getUsers();       // Obtener los usuarios
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear Usuario</h3>
                        <form onSubmit={ this .onSubmit }>
                            <div className="form-group">
                                { /** onChange: Método para escuchar por cambios en el elemento */}
                                <input type="text" className="form-control" onChange={ this .onChangeUserName } />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        { this .state .users .map( user => {
                            return ( <li className="list-group-item list-group-item-action" key={ user ._id }>{ user .userName }</li> );
                        }) }
                    </ul>
                </div>
            </div>
        )
    }
}
