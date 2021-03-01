import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import Error from './error'

const Presupuesto = ({setPresupuestoGeneral}) => {

    const [presupuesto, setPresupuesto] = useState(0);
    const [error, setError] = useState(false);

    const toggleSubmit = (e) => {
        e.preventDefault();
        if(presupuesto < 1){
            setError(true)
        } else {
            setPresupuestoGeneral(presupuesto);
        }
    }
    
    return ( 
        <div>
            <Form onSubmit={toggleSubmit}>
                <h2 className="text-center mb-4 title-presupuesto">Presupuesto</h2>
                <Form.Label>Digita el presupuesto</Form.Label>
                <Form.Control 
                    type="number" 
                    name="presupuesto"
                    value={ presupuesto }
                    onChange={ e => setPresupuesto(e.target.value) }
                    placeholder="Digita aquí tu presupuesto" />
                {error ? (
                    <Error texto="El presupuesto tiene que ser mayor que 0"/>
                ) : null}
                <Button 
                    type="submit" 
                    variant="success" 
                    className="mt-4 mb-4 button-presupuesto" >
                        Enviar presupuesto
                </Button>
            </Form>
        </div> 
    );
}
 
export default Presupuesto;