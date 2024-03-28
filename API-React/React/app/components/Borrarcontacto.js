'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from './Back';

function BorrarContacto({ id }) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Lógica para obtener y establecer los datos del contacto con el idContacto
        const obtenerContacto = async () => {
            try {
                const response = await axios.get(`http://contactos.local/contactos/${id}`);
                console.log("Response data:", response.data);
                const { nombre, telefono, email } = response.data[0];
                setNombre(nombre || ''); // Si el valor es undefined, establecerlo como una cadena vacía
                setTelefono(telefono || '');
                setEmail(email || '');
            } catch (error) {
                console.error('Error al obtener el contacto:', error);
            }
        };

        obtenerContacto();
    }, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`http://contactos.local/contactos/${id}`);
            window.location.href = '/';

        } catch (error) {
            console.error('Error al borrar el contacto:', error);
        }
    }

    return (
        <div>
            <Back/><br/>
            <div className='confirmacion-borrado'>
                <strong>¿Estas seguro de borrar a {nombre}?</strong>
                <p>Nombre: {nombre}</p>
                <p>Teléfono: {telefono}</p>
                <p>Email: {email}</p>
                <button onClick={handleSubmit}>Borrar</button>
            </div>
        </div>
    );
}

export default BorrarContacto;