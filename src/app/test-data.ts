 import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";

export class TestData implements InMemoryDbService { 
    createDb() {
        const tasks = [
            {
                id: 1, title: 'Diseñar la BD', description: 'Se debe crear un modelo de datos con su respectivo diagrama',
                status: 'pending', createdAt: new Date()
            },
            {
                id: 2, title: 'Configurar proyecto', description: 'Se deben configurar todas las dependencias del proyecto',
                status: 'done', createdAt: new Date()
            },
            {
                id: 3, title: 'Prueba', description: 'Tarea de pruebas',
                status: 'done', createdAt: new Date()
            }
        ];
        return { tasks };
    }
}

