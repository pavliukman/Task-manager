import { Task } from "./task";

export class Project {
	id: any;
	name: string;
	description: string;
	assigned_to: number[];
	assigned_to_users_object: any;
	can_edit: any;
	tasks: Task[];
}