
import express from 'express'
import path from 'path';

interface Options {
    port:number
    public_path?:string
}

export class Server {

    private app = express();
     private readonly port: number;
     private readonly publicPath: string;

    constructor(options: Options){
        console.log(options);
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {

        this.app.use(express.static(this.publicPath));

        //es un comodin en el cual podemos interceptar todas las req y emitir una resp 
        //para todas las rutas que existan en req.url
        this.app.get('*', (req, resp) => {
            console.log(req.url);
            const indexPath = path.join(__dirname +`../../../${this.publicPath}/index.html`);
            resp.sendFile(indexPath);
            return;
        })

        this.app.listen(this.port, () =>{
            console.log(`runing in the port ${this.port}`)
        })
    }
}