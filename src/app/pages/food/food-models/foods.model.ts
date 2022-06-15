export interface MealType {

	name: string;

}

export interface Course {
	courseId?: string;
	courseNameDutch: string;
	courseNameEnglish: string;
	mealType: string;
	seqNo: number;
	dishes?: Dish[];
}

export interface Dish {
	dishId?: string;
	seqNo: number;
	nameDutch: string;
	descriptionDutch: string;
	nameEnglish: string;
	descriptionEnglish: string;
	availableOutside: boolean;
	price: number;

	courseId: string
	mealType: string;
	// name: string;
}

export function sortBySeqNo(c1: Course, c2: Course) {
	return c1.seqNo - c2.seqNo;
}