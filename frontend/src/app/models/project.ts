import { Task } from "./task";

export class Project {
    id: number;
    nickname: string;
    name: string;
    description: string;
    tasks: Task[];
}