import { Task } from "./task";

export class Project {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
}