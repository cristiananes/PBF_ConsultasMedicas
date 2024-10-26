// src/pages/DoctorConsults.jsx
import React from 'react';
import ConsultList from '../components/ConsultList';
import Whitebox from '../components/Whitebox';

const Consults = () => {
    return (
        <Whitebox>
            <h1>Consultas </h1>
            <ConsultList />
        </Whitebox>
    );
};

export default Consults;
