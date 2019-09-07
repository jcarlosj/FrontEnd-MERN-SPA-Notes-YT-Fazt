import React, { Component } from 'react';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP

export default class CreateUser extends Component {

    // Define el estado de los datos en el Componente
    state = {
        users: []
    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    async componentDidMount() {
        /** Realiza petición HTTP al API usando axios */
        const users = await axios .get( 'http://localhost:4000/api/users' );    // Es una operación Asincrona por lo que se puede usar: un callback, una Promesa o en este último caso convertir nuestra funcion en una funcion asincrona. Podria usarse el tipico fetch() de JavaScript Promise, etc
        console .log( users );

        // Almacena los datos en el Estado de la Aplicación
        this .setState({
            users: users .data
        });
        console .log( 'Estado de usuarios', this .state .users );
    }

    render() {
        return (
            <div>
                Create User
            </div>
        )
    }
}
