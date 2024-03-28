'use client';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'next/navigation';
import Back from './Back';

function EditarContacto({ id }) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Lógica para obtener y establecer los datos del contacto con el idContacto
        const obtenerContacto = async () => {
            try {
                const response = await axios.get(`http://contactos.local/contactos/${id}`);
                console.log("Response data:", response.data);
                const { nombre, telefono, email, provincia } = response.data[0];
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
            await axios.put(`http://contactos.local/contactos/${id}`, { nombre, telefono, email});
            window.location.href = '/';

        } catch (error) {
            console.error('Error al agregar el contacto:', error);
        }
    }

    return (
        <div>
            <Back/><br/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Teléfono:
                        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Email:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <button className='editar' type="submit">Editar</button>
            </form>
        </div>
    );
}

export default EditarContacto;