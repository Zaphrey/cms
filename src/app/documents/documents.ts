import { Component, OnInit } from '@angular/core';
import { DocumentList } from './document-list/document-list';
import { DocumentDetail } from './document-detail/document-detail';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  imports: [DocumentList, DocumentDetail],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents implements OnInit {
  selectedDocument: Document | undefined;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    })
  }
}
