'use client';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";


function Listacontactos() {
    const [data, setData] = useState([]);
    const [contacto, setContacto] = useState(null);
    const [id, setId] = useState('');


    useEffect(() => {
        const fecthAPI = async () => {
            const response = await axios.get('http://contactos.local/contactos/');
            setData(response.data);
        }

        fecthAPI();
    }, []);

    useEffect(() => {
        const fetchContacto = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://contactos.local/contactos/${id}`);
                        console.log("Response data:", response.data);
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        // Si la respuesta es un array, tomamos el primer elemento
                        setContacto(response.data[0]);
                    } else {
                        // Si la respuesta no es un array o está vacía, establecemos contacto en null
                        setContacto(null);
                    }
                } catch (error) {
                    console.error("Error al obtener el contacto:", error);
                    setContacto(null); // Reinicia el estado de contacto si hay un error
                }
            } else {
                setContacto(null);
            }
        }
        fetchContacto();
    }, [id]);

    const handleIdChange = (event) => {
        setId(event.target.value);
    }

    return (
        <>
        <br/>
        <div className="">
            
            <header className="">
                    <Link href="/add">
                        <button type="button" className="button">
                            <span className="button__text">Nuevo</span>
                            <span className="button__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                                    <line y2="19" y1="5" x2="12" x1="12"></line>
                                    <line y2="12" y1="12" x2="19" x1="5"></line>
                                </svg>
                            </span>
                        </button>
                    </Link>
            </header>

        </div><br/><br/>
            <h2>Buscar:</h2>
            <input className="input-search" type="text" value={id} onChange={handleIdChange} placeholder="Introduce el ID del contacto"/>
            <br/><br/>
            <div className=""><h2>Lista de contactos</h2></div><br/>
            <ul>
                {contacto ? (
                    <li key={contacto.id}>
                        <ul className="contact-list">
                            <li className="contact-name">{contacto.nombre}</li>
                            <li className="contact-phone">{contacto.telefono}</li>
                            <li className="contact-email">{contacto.email}</li>
                            <li className="btn-edit"><Link href={"/edit/" + contacto.id}>Edit</Link></li>
                            <li className="btn-delete"><Link href={"/delete/" + contacto.id}>Delete</Link></li>
                        </ul>
                    </li>
                ) : (
                    data.map((contacto) => (
                        <li key={contacto.id}>
                            <ul className="contact-list">
                                <li className="contact-name">{contacto.nombre}</li>
                                <li className="contact-phone">{contacto.telefono}</li>
                                <li className="contact-email">{contacto.email}</li>
                                <li className="btn-edit"><Link href={"/edit/" + contacto.id}>Edit</Link></li>
                                <li className="btn-delete"><Link href={"/delete/" + contacto.id}>Delete</Link></li>
                            </ul>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}

export default Listacontactos;