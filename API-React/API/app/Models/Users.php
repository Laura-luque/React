<?php
namespace App\Models;

class Users extends DBAbstractModel 
{
    //Singleton
    private static $instancia;
    public static function getInstancia()
    {
        if (!isset(self::$instancia)) {
            $miclase = __CLASS__;
            self::$instancia = new $miclase;
        }
        return self::$instancia;
    }

    public function __clone()
    {
        trigger_error("La clonación no está permitida.", E_USER_ERROR);
    }

    public function login($usuario,$password) 
    {
        $this->query = "SELECT * FROM usuarios WHERE usuario =:usuario AND password =:password";
        //Cargamos los parámetros
        $this->parametros['usuario'] = $usuario;
        $this->parametros['password'] = $password;

        // Ejecutamos consulta que devuelve registros
        $this->get_results_from_query();
        if (count($this->rows) == 1) {
            foreach ($this->rows[0] as $propiedad => $valor) {
                $this->$propiedad = $valor;
            }
            $this->mensaje = 'sh encontrado';
        } else {
            $this->mensaje = 'sh no encontrado';
        }
        return $this->rows[0]??null;
    }

    public function get($id='') {}
    public function set() {}
    public function edit() {}
    public function delete() {}

}

