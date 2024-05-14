import { Router } from "express";
import { envs } from "./config/env";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";


(async() => {
    main();
})();

function main() {

    const server = new Server({
        routes: AppRoutes.routes,
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    });

    server.start();
    
}


