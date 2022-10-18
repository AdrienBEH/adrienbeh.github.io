import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarRef
} from '@angular/material/snack-bar';

import {
    ProgressBar,
    SnackBarData
} from '.';

@Component({
    selector: 'app-snackbar-notification',
    styleUrls: ['./snackbar-notification.component.scss'],
    templateUrl: './snackbar-notification.component.html'
})
export class SnackbarNotificationComponent implements OnInit, OnDestroy {

    public progressBar: ProgressBar;

    /**
     * Class constructor.
     * 
     * @param {SnackbarNotificationService} _snackbarNotificationService - SnackbarNotificationService.
     * @param {ChangeDetectorRef} ref - Call render refresh.
     */
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData,
        private ref: ChangeDetectorRef,
        private snackBar: MatSnackBarRef<SnackbarNotificationComponent>
    ) {}

    /**
     * Called when component is initialised.
     */
    ngOnInit(): void {
        if (this.data.duration !== undefined) {
            this.progressBar = new ProgressBar({ duration: this.data.duration });
            this.progressBar.startAnimation(this.ref);
        }
    }

    /**
     * Called when component is destroy.
     */
    ngOnDestroy(): void {
        if (this.progressBar) this.progressBar.endAnimation();
    }

    /**
     * Close.
     * 
     * @public
     */
    public close(): void {
        this.snackBar.dismiss();
    }
}
