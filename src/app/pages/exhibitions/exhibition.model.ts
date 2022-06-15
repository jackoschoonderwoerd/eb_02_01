import { Image } from "./add-exhibition/add-image-dialog/image.model";

export interface Exhibition {
	id?: string;
	title: string;
	start: number;
	end: number;
	images: Image[];
	artistNames: string[];
	description: string;
}