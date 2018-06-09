export class Task {
	id: number;
	name: string;
	description: string;
	status: string;
	project: number;
	estimatedTime: number;
	assigned_to?: any;
	can_edit?: any;
}