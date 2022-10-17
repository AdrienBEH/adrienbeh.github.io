import { ChangeDetectorRef } from '@angular/core';

export enum E_CloseSnackBarBehaviour {
    CLOSE_UNDEFINED_TIME_VALUE_SNACKBAR,
    CLOSE_DEFINED_TIME_VALUE_SNACKBAR,
    CLOSE_ANYWAY,
}

export enum NotificationMessageType {
    ERROR = 'ERROR',
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
}

export interface SnackBarData {
    duration: number | undefined;   // Time in ms for display duration, or infinite display with undefined value
    icon: string;
    message: string;
    type: NotificationMessageType;
}

/**
 * Class ProgressBar.
 */
export class ProgressBar {
    private readonly REFRESH_FREQUENCY: number = 50;
    private duration: number;
    public value: number = 100;
    private timerInterval: NodeJS.Timer;

    /**
     * Constructor whith dependencies injection.
     * 
     * @public
     */
    public constructor (config: {
        duration: number;
    }) {
        this.duration = config.duration;
    }

    /**
     * Starts an animation.
     * 
     * @public
     * @param {ChangeDetectorRef} ref - Call for refresh component render.
     */
    public startAnimation(ref: ChangeDetectorRef): void {
        const increment: number = 100 / ( this.duration / this.REFRESH_FREQUENCY )
        this.timerInterval = setInterval(
            () => {
                this.value -= increment;
                ref.markForCheck();
                if( this.value === 0 ) {
                    clearInterval( this.timerInterval );
                }
            },
            this.REFRESH_FREQUENCY
        );
    }

    /**
     * End an animation.
     * 
     * @public
     */
    public endAnimation(): void {
        clearInterval( this.timerInterval );
    }
}
