import { Router } from "express";
import { TodoController } from "./controller";



export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const todosController = new TodoController();

        router.get('/', todosController.getTodos);
        //Obtener
        router.get('/:id', todosController.getTodosById);
        //Mandar
        router.post('/', todosController.createTodo);
        //Actualizar   
        router.put('/:id', todosController.updateTodo );
        //Eliminar
        router.delete('/:id', todosController.deleteTodo );
        return router;
    }

}