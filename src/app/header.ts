import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
})
export class Header {
    @Output() selectedFeatureEvent = new EventEmitter<string>();

    onSelected(selectedEvent: string) {
        this.selectedFeatureEvent.emit(selectedEvent);
    }
}
