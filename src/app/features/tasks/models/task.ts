export type TaskStatus = 'pending' |'in-progress' |'done';
export interface Task {
    id:number;
    title:string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    dueDate?: Date;
}