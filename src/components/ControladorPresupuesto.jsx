import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import shortid from 'shortid'

import { Row, Col, Form, Button } from 'react-bootstrap';

import { helpers } from '../helpers/helpers'
import Error from './error';
import Gastos from './Gastos';

const ControladorPresupuesto = ({presupuestoGeneral, setActivarNopresupuesto}) => {

    let presupuestoRestanteInicial = JSON.parse(localStorage.getItem('presupuestoRestante'));
    if(presupuestoRestanteInicial < 1 || !presupuestoRestanteInicial){
        presupuestoRestanteInicial = presupuestoGeneral;
    }

    let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
    if(gastosIniciales.length < 1 || !gastosIniciales){
        gastosIniciales = [];
    }

    const [presupuestoInicial] = useState(presupuestoGeneral);
    const [presupuestoRestante, setPresupuestoRestante] = useState(presupuestoRestanteInicial);
    const [gasto, setGasto] = useState({
        id: shortid.generate(),
        nombre: '',
        presupuesto: 0
    });
    const [error, setError] = useState({
        mensaje : '',
        activo: false
    });
    const [gastos, setGastos] = useState(gastosIniciales);

    const { nombre, presupuesto } = gasto;
    const { activo, mensaje } = error;

    useEffect(() => {
        if(presupuestoRestante === 0){
            setActivarNopresupuesto(true);
            localStorage.setItem('simuladorPresupuestoGeneral', localStorage.getItem('presupuestoGeneral'));
            localStorage.setItem('presupuestoGeneral', JSON.stringify(0));
        }
        localStorage.setItem('gastos', JSON.stringify(gastos));
        localStorage.setItem('presupuestoRestante', JSON.stringify(presupuestoRestante));
    })

    const toggleSubmit = e => {
        e.preventDefault();

        if(presupuesto < 1 || nombre.length < 1){
            setError({
                mensaje:`El valor tiene que ser mayor a 0 y el nombre no puede estar vacío`,
                activo: true
            });
            return;
        }

        if((presupuestoRestante - presupuesto) < 0){
            setError({
                mensaje:`El valor excede el presupuesto restante (${presupuestoRestante})`,
                activo: true
            });
            return;
        }

        setError(false);
        setGastos([...gastos, gasto]);
        setGasto({
            id: shortid.generate(),
            nombre: '',
            presupuesto: 0
        })
        setPresupuestoRestante(presupuestoRestante - presupuesto);
        localStorage.setItem('presupuestoRestante', JSON.stringify(presupuestoRestante-presupuesto));
    }

    return ( 
        <Row>
            <Col xs={12} lg={7} className="mt-4">
                <Form onSubmit={toggleSubmit}>
                    <h4 className="title-presupuesto mb-1">REGISTRAR GASTO</h4>
                    <Row className="d-flex justify-content-center align-items-center mt-4">
                        <Col md={3}>
                            <Form.Label className="mr-3" style={{width:'100%'}}>Gasto</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control 
                                type="text" 
                                name="nombre"
                                 value={ nombre }
                                 onChange={ e => setGasto({...gasto, nombre : e.target.value}) }
                                placeholder="Digita aquí el gasto" />
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center mt-4">
                        <Col md={3}>
                            <Form.Label className="mr-3" style={{width:'100%'}}>Valor</Form.Label>
                        </Col>
                        <Col md={9}>
                            <Form.Control 
                                type="number" 
                                name="presupuesto"
                                value={ presupuesto }
                                onChange={ e => setGasto({...gasto, presupuesto : e.target.value}) }
                                placeholder="Digita aquí valor gastado" />
                            {(activo) ? <Error texto={mensaje} /> : null}
                        </Col>
                    </Row>
                    <Button 
                        type="submit" 
                        variant="success" 
                        className="mt-4"
                        style={{width:'100%'}}> 
                            Registrar Gasto 
                    </Button>
                </Form>
            </Col>
            <Col xs={12} lg={5} className="mb-4">
                <div className="container-presupuestoInicial d-flex justify-content-center py-4">
                    <h5 className="title-presupuesto text-left mx-2">Presupuesto Inicial</h5>
                    <div className="title-presupuesto presupuestoInicial bg-presupuestoInicial d-flex justify-content-center align-items-center p-2 m-2">
                        <b>{presupuestoInicial}$</b>
                    </div>
                </div>
                <div className="container-presupuestoInicial d-flex justify-content-center ">
                    <h5 className="title-presupuesto text-left m-2">Presupuesto Restante</h5>
                    <div className={helpers(JSON.parse(localStorage.getItem('presupuestoGeneral')), JSON.parse(localStorage.getItem('presupuestoRestante')), 'title-presupuesto presupuestoInicial d-flex justify-content-center align-items-center p-2 m-2 ')}>
                        <b>{presupuestoRestante}$</b>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="title-presupuesto text-center">Gastos</h3>
                    <div>
                        <Gastos gastosData={gastos}></Gastos>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

ControladorPresupuesto.propTypes = {
    presupuestoGeneral : PropTypes.string.isRequired,
    setActivarNopresupuesto : PropTypes.func.isRequired
}
 
export default ControladorPresupuesto;