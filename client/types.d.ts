export interface IClient {
	id?: string;
	name: string;
	email: string;
	phone: string;
}

export interface IClients {
	clients: IClient[];
}

export interface IProject {
	id?: string;
	name: string;
	description: string;
	status: string;
	client?: IClient;
}

export interface IProjects {
	projects: IProject[];
}
