import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-document-list',
  imports: [DocumentItem, RouterLink],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    })
  }
}
