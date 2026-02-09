import { Component } from '@angular/core';
import { DropdownDirective } from "./shared/dropdown.directive";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-header',
    imports: [DropdownDirective, RouterLink, RouterLinkActive],
    templateUrl: './header.html',
})
export class Header {

}
