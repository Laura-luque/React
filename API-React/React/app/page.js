'use client';

import React from 'react';
import './style.css';
import Listacontactos from './components/Listacontactos';


export default function Home() {
    return (
        <main className='main'>
            <h1>Contactos</h1>
            <Listacontactos />
        </main>
    );
}