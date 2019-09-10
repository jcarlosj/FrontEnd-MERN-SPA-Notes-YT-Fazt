import React, { Component } from 'react';
import axios from 'axios';

export default class NotesList extends Component {

    // Define el estado de los datos en el Componente
    state = {
        notes: []
    }

    // Método: Ejecuta acciones una vez el componente a sido montado
    componentDidMount = async () => {
        const notes = await axios .get( 'http://localhost:4000/api/notes' );
        console .log( 'data', notes );

        // Almacena los datos en el Estado de la Aplicación del Componente
        this .setState({
            notes: notes .data
        });
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
                                    <p class="card-text"><small class="text-muted">{ note .date }</small></p>
                                    <p className="card-text">{ note .content }</p>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                        </div>
                    ) )
                }
            </div>
        )
    }
}
