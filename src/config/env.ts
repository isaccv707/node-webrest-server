//La bibliote env se utiliza para cargar las variables de entorno desde un archivo .env
//importa y carga automáticamente las variables de entorno definidas en el archivo 
import 'dotenv/config';

//Esta línea importa la función get de la biblioteca env-var, que se utilizará para acceder 
//a las variables de entorno y realizar algunas validaciones sobre ellas.
import {get} from 'env-var'


export const envs = {
    /* Esta línea utiliza la función get para acceder al valor de la variable de entorno
     PORT. El método required() asegura que esta variable debe estar presente en el entorno,
      y asPortNumber() convierte el valor de la variable en un número de puerto. Si la 
      variable PORT no está definida en el entorno, se generará un error.*/
    PORT: get('PORT').required().asPortNumber(),
    /*sta línea accede al valor de la variable de entorno PUBLIC_PATH. 
    La función default('public') proporciona un valor predeterminado de 'public' en caso de 
    que la variable no esté definida en el entorno. Finalmente, asString() convierte el 
    valor de la variable en una cadena de caracteres. */
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}