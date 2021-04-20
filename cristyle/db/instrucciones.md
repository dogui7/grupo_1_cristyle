Para crear la base de datos desde 0, seguir los siguientes pasos:

    * Utilizando Workbench o un software similar, correr el código incluido en el archivo "cristyle_db.sql"(En caso de que se queje porque el DELETE no tiene WHERE, Ir a Edit -> Preferences -> Sql Editor y desmarcar Safe update).
    * Luego de eso correr el código del archivo "populate.sql".
    * Eliminar todo archivo que se encuentre en la ruta "public > images > users", y copiar y pegar alli los archivos ubicados en la ruta "db > images > users".
    * Eliminar todo archivo que se encuentre en la ruta "public > images > products", y copiar y pegar alli los archivos ubicados en la ruta "db > images > products".

En caso de que se quiera reiniciar la base de datos para tener solamente los productos y usuarios iniciales, hacer la misma secuencia de pasos evitando el primer punto, es decir, sin correr el código del archivo "cristyle_db.sql"

Esto dejará la base de datos con productos cargados, y dos usuarios, uno administrador y el otro cliente.

Admin:
    Correo electrónico: admin@gmail.com
    Contraseña: 123456789
Cliente:
    Correo electrónico: cliente@gmail.com
    Contraseña: 123456789