'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Back from './Back';

function AgregarContacto() {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://contactos.local/contactos/', { nombre, telefono, email });
            window.location.href = '/';

        } catch (error) {
            console.error('Error al agregar el contacto:', error);
        }
    }

    return (
        <div>
            <Back/><br/>
            <form className='formulario' onSubmit={handleSubmit}>
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
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarContacto;