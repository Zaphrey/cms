import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }
}
