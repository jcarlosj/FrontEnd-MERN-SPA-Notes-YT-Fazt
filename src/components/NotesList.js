import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';                  // Paquete que permite hacer peticiones HTTP
import { format } from 'timeago.js';    // Librería para formatear la fecha 

export default class NotesList extends Component {

    // Define el estado de los datos en el Componente
    state = {
        notes: []
    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    componentDidMount = async () => {
        this .getNotes();
    }

    getNotes = async () => {
        const notes = await axios .get( 'http://localhost:4000/api/notes' );
        console .log( 'data', notes );

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            notes: notes .data
        });
    }

    // Método: Envia datos al API al hacer doble click sobre el elemento de la lista (DELETE)
    deleteNote = async ( id ) => {
        console .log( 'ID', id );
        await axios .delete( `http://localhost:4000/api/notes/${ id }` );
        this .getNotes();       // Obtener las notas
    }

    render() {
        return (
            <div className="row">
                {
                    this .state .notes .map( note => (
                        <div className="col-md-4 p-2" key={ note ._id }>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">{ note .title }</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{ note .author }</h6>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><small className="text-muted">{ format( note .date ) }</small></p>
                                    <p className="card-text">{ note .content }</p>
                                    <Link className="card-link" to={ `/edit/${ note ._id }` }>Editar</Link>
                                    <a href="#" className="card-link" onClick={ () => this .deleteNote( note ._id ) }>Eliminar</a>
                                </div>
                            </div>
                        </div>
                    ) )
                }
            </div>
        )
    }
}