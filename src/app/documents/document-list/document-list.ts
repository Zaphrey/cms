import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "document cms 1", "First document in the list", "/documents/document_cms_1.docx", []),
    new Document(2, "document cms 2", "Second document in the list", "/documents/document_cms_2.pdf", []),
    new Document(3, "document cms 3", "Third document in the list", "/documents/document_cms_3.png", []),
    new Document(4, "document cms 4", "Fourth document in the list", "/documents/document_cms_4.docx", []),
    new Document(5, "document cms 5", "Fifth document in the list", "/documents/document_cms_5.jpg", [])
  ]

  onSelectedDocument(document: Document) {
    console.log(document);
    this.selectedDocumentEvent.emit(document);
  }
}
