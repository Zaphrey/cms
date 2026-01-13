import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [ CommonModule ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList {
  contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonK@byui.edu", "208-496-3771", "images/jacksonk.jpg", null),
    new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "images/barzeer.jpg", null),
  ];
}
