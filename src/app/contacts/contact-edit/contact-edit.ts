import { Component, OnInit } from '@angular/core';
import { ContactItem } from '../contact-item/contact-item';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  imports: [ContactItem, FormsModule],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit implements OnInit {
  originalContact?: Contact;
  contact?: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id?: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];

      if (!this.id)
      {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);

      if (!this.originalContact)
      {
        return
      }

      this.editMode = true
      this.contact = <Contact>JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group)
      {
        this.groupContacts = this.contact.group.slice();
      }
    })
  }

  onSubmit(form: NgForm)
  {
    const value = form.value;
    let newContact: Contact = value;

    if (this.editMode && this.originalContact)
    {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else 
    {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(["/contacts"]);
  }

  onCancel()
  {
    this.router.navigate(["/contacts"]);
  }

  onRemoveItem(itemIndex: number)
  {
    
  }
}
