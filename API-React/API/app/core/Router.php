<?php
namespace App\Core; // declaramos el espacio de nombres
class Router // Enrutador, coge la ruta, busca a esa ruta que controlador y que accion le corresponde, y lo lanza
{
    private $routes = array();
    public function add($route) // definimos la ruta en forma de array
    {
        $this->routes[] = $route;
    }
    public function match (string $request) // coge una request y ve si esa peticion esta en el array mediante preg_match(porque se usa con expresiones regulares)
    {
        $matches = array();
        foreach ($this->routes as $route) {
            $patron = $route['path'];
            if (preg_match($patron, $request)) {
                $matches = $route;
            }
        }
    return $matches;
    }
}

