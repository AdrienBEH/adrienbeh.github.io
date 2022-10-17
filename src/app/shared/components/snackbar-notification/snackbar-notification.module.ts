import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SnackbarNotificationComponent } from './snackbar-notification.component';
import { SnackbarNotificationService } from './snackbar-notification.service';

@NgModule({
    declarations: [
        SnackbarNotificationComponent
    ],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        CommonModule,
    ],
    exports: [
        SnackbarNotificationComponent
    ],
    providers: [
        SnackbarNotificationService
    ],
    entryComponents: [
        SnackbarNotificationComponent
    ],
})

export class SnackbarNotificationModule {}
