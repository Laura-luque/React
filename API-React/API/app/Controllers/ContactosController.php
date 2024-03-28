<?php
namespace App\Controllers;

use App\Models\Contactos;

// Este controlador no genera vista
class ContactosController 
{
    # Propiedades de la clase
    private $requestMethod; // Método http
    private $contactosId; // id
    private $contactos; // Contactos (Objeto del modelo)

    # Constructor. Necesita petición, contactosId
    public function __construct($requestMethod, $contactosId) 
    {
        $this->requestMethod = $requestMethod;
        $this->contactosId = $contactosId;
        $this->contactos = contactos::getInstancia();
    }

    /**
     * Función que procesa la petición
     * return: Respuesta de la petición
     */
    public function processRequest() 
    {
        switch($this->requestMethod) {
            case 'GET':
                if ($this->contactosId) { // si tengo un contactos(id)
                    $response = $this->getContactos($this->contactosId);
                } else {
                    $response = $this->getAllContactos(); // Dependiendo del modelo puede ser recomendable utilizarlo
                };
                break;
            case 'POST':
                // $input = (array) json_decode(file_get_contents('php://input'), TRUE);
                $response = $this->createContactosFromRequest();
                break;
            case 'PUT':
                // $input = (array) json_decode(file_get_contents('php://input'),TRUE);
                $response = $this->updateContactosFromRequest($this->contactosId);
                break;
            case 'DELETE':
                if ($this->contactosId) { // si tengo un contactos(id)
                    $response = $this->deleteContactos($this->contactosId);
                };
                break;
            default:
            $response = $this->notFoundResponse();
            break;
        }
        header($response['status_code_header']); 
        if ($response['body']) {
            echo $response['body'];
        }
    }
    /**
     * Funcion que se encarga de conectar el modelo para recuperar la informacion
     * @input: id del contacto que queremos recuperar
     * @return: respuesta codificada en JSON
     */
    private function getContactos($id) 
    {
        // Consultamos el modelo
        $result = $this->contactos->get($id);
        if (!$result) { // si no lo encuentra, mensaje de error
            return $this->notFoundResponse();
        }
        # Cargamos los datos en $response para crear la respuesta
        # La respuesta es un array asociativo con indices status_code_header y body
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    /**
     * Funcion que crea la respuesta cuando no se han encontrado los datos en el modelo
     * 
     * @return array
     */
    private function notFoundResponse() : array
    {
        // funcion cuando no encuentra nada en la query
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = "No se encontró nada con ese id"; // null era el valor que estaba antes
        return $response;
    }

    /**
     * funcion que se encon
     * return JSON
     */
    private function getAllContactos() : array
    {
        $result = $this->contactos->getAll();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createContactosFromRequest() 
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateContacto($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->contactos->set($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = json_encode(array("mensaje"=>"Contacto creado"));
        return $response;
    }

    private function updateContactosFromRequest($id) 
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $result = $this->contactos->get($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $this->contactos->edit($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 Ok';
        $response['body'] = json_encode($input);
        return $response;
    }

    private function deleteContactos($id) 
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $result = $this->contactos->get($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $this->contactos->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 201 Deleted';
        $response['body'] = json_encode(array("mensaje"=>"Contacto eliminado"));
        return $response;
    }

    private function validateContacto($input)
    {
        if (!isset($input['nombre'])) {
            return false;
        }
        if (!isset($input['telefono'])) {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse()
    {
        // funcion cuando no encuentra nada en la query
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid onput'
        ]);
        return $response;
    }

}



