import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  imports: [FormsModule],
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css',
})
export class DocumentEdit implements OnInit {
  @ViewChild("f") documentForm?: NgForm;
  originalDocument?: Document;
  document?: Document
  editMode: boolean = false;

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];

      if (!id) {
        this.editMode = false;
        return;
      };

      this.originalDocument = this.documentService.getDocument(id);

      if(!this.originalDocument)
      {
        return;
      }

      this.editMode = true;

      this.document = <Document>JSON.parse(JSON.stringify(this.originalDocument));
    })
  }

  onSubmit(form: NgForm)
  {
    const value = form.value;
    let newDocument: Document = value;

    if (this.editMode && this.originalDocument)
    {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else 
    {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(["/documents"]);
  }

  onCancel()
  {
    this.router.navigate(["/documents"]);
  }
}
