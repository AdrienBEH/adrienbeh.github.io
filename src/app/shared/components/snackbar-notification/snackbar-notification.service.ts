import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

import {
    E_CloseSnackBarBehaviour,
    NotificationMessageType
} from '.';
import { SnackbarNotificationComponent } from './snackbar-notification.component';

@Injectable({
    providedIn: 'root'
})
export class SnackbarNotificationService {

    /**
     * Class constructor.
     */
    constructor (private snackBar: MatSnackBar) {}

    /**
     * TODO comment
     * 
     * @param config 
     */
    public openSnackBar(
        config: {
            duration: number;
            horizontalPosition?: MatSnackBarHorizontalPosition;
            icon: string;
            message: string;
            type: keyof typeof NotificationMessageType;
            verticalPosition?: MatSnackBarVerticalPosition;
        },
        openBehaviour: keyof typeof E_CloseSnackBarBehaviour = 'CLOSE_DEFINED_TIME_VALUE_SNACKBAR'
    ): void {
        if (this.snackBar._openedSnackBarRef === null) {
            this._openSnackBar(config);
            return;
        }
        switch (openBehaviour) {
            case 'CLOSE_UNDEFINED_TIME_VALUE_SNACKBAR': {
                if (this.snackBar._openedSnackBarRef.instance.data.duration === undefined) {
                    this._openSnackBar(config);
                }
                break;
            }
            case 'CLOSE_DEFINED_TIME_VALUE_SNACKBAR': {
                if (this.snackBar._openedSnackBarRef.instance.data.duration !== undefined) {
                    this._openSnackBar(config);
                }
                break;
            }
            case 'CLOSE_ANYWAY': {
                this._openSnackBar(config);
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * TODO comment
     * 
     * @param config 
     */
    private _openSnackBar(config: {
            duration: number;
            horizontalPosition?: MatSnackBarHorizontalPosition;
            icon: string;
            message: string;
            type: keyof typeof NotificationMessageType;
            verticalPosition?: MatSnackBarVerticalPosition;
    }): void {
        this.snackBar.openFromComponent(SnackbarNotificationComponent, {
            duration: config.duration,
            horizontalPosition: config.horizontalPosition || 'center',
            verticalPosition: config.verticalPosition || 'top',
            data: {
                icon: config.icon,
                message: config.message,
                type: config.type,
                duration: config.duration
            }
        });
    }

    /**
     * TODO comment
     */
    public closeSnackBar(behaviour?: keyof typeof E_CloseSnackBarBehaviour): void {
        if (this.snackBar._openedSnackBarRef === null) {
            this.snackBar.dismiss();
            return;
        }
        switch (behaviour) {
            case 'CLOSE_UNDEFINED_TIME_VALUE_SNACKBAR': {
                if (this.snackBar._openedSnackBarRef.instance.data.duration === undefined) {
                    this.snackBar.dismiss();
                }
                break;
            }
            case 'CLOSE_DEFINED_TIME_VALUE_SNACKBAR': {
                if (this.snackBar._openedSnackBarRef.instance.data.duration !== undefined) {
                    this.snackBar.dismiss();
                }
                break;
            }
            case 'CLOSE_ANYWAY': {
                this.snackBar.dismiss();
                break;
            }
            default: {
                this.snackBar.dismiss();
                break;
            }
        }
    }
}
