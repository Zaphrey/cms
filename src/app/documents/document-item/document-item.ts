import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-document-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './document-item.html',
  styleUrl: './document-item.css',
})
export class DocumentItem {
  @Input() document: Document | undefined;
}
