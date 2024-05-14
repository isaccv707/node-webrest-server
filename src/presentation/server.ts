import express from 'express';
import path from 'path';
import { Router } from 'express';

interface Options {
  routes: Router;
  port: number;
  public_path?: string;
}

export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    console.log(options);
    const { port, public_path = 'public', routes} = options;
    this.routes = routes;
    this.port = port;
    this.publicPath = public_path ;
  }
  
  //Metodo start para iniciar el servidor
  async start() {

    //* Un middleware es una funcion que se va a ejecutar cuando una peticion pase por la misma
    this.app.use( express.json() ); //RAW
    this.app.use( express.urlencoded({extended: true}) ); //FORMATO x-www-form.urlencoded
    
    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    
    this.app.use(this.routes);

//* rutas no definitidas van a pasar por aqui
    //SPA single page application
    this.app.get('*', (req,res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath } /index.html`);
      res.sendFile(indexPath);
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

}