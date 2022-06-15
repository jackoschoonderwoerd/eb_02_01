import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';

import {
	Storage,
	ref,
	deleteObject,
	uploadBytes,
	uploadString,
	uploadBytesResumable,
	percentage,
	getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class ImageStorageService {

	uploadPercent: Observable<number>;

	constructor(
		private storage: Storage,

	) { }

	async upload(
		folder: string,
		filename: string,
		file: File | null
	): Promise<string> {
		console.log(file.name)

		const ext = file!.name.split('.').pop();

		const path = `${folder}/${filename}.${ext}`; {

			if (file) {
				try {
					const storageRef = ref(this.storage, path);
					const task = uploadBytesResumable(storageRef, file);
					// this.uploadPercent = percentage(task);
					await task;
					const url = await getDownloadURL(storageRef);
					console.log(url)
					return url;
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}
}
