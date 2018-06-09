import { Task } from "./task";

export class Project {
	id: number;
	nickname: string;
	name: string;
	description: string;
	assigned_to: any;
	can_edit: any;
	tasks: Task[];
}