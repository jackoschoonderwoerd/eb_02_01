import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoadingService } from './shared/loading/loading.service';
import { SubcollectionNotEmptyDialogComponent } from './shared/subcollection-not-empty-dialog/subcollection-not-empty-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiStore } from './shared/stores/ui.store';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SidenavComponent,
		FooterComponent,
		HomeComponent,
		ConfirmationDialogComponent,
		SubcollectionNotEmptyDialogComponent,

		// LoadingComponent,

	],
	imports: [
		MatIconModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		AppMaterialModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		provideFunctions(() => getFunctions()),
		provideStorage(() => getStorage()),
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
