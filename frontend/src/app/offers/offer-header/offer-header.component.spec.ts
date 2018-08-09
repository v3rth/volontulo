import { Observable } from 'rxjs/Observable';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHeaderComponent } from './offer-header.component';
import {IconLabelComponent} from "../../icon-label/icon-label.component";
import {RouterTestingModule} from "@angular/router/testing";
import {IconComponent} from "../../icon/icon.component";
import {UserService} from "../../user.service";
import {Offer} from "../../homepage-offer/offers.model";

describe('OfferHeaderComponent', () => {
  const editButtonCaption = 'Edytuj ofertę';

  let component: OfferHeaderComponent;
  let editButton: Element|null;
  let fixture: ComponentFixture<OfferHeaderComponent>;
  let userService: jasmine.SpyObj<UserService>;

  function buildComponent() {
    fixture = TestBed.createComponent(OfferHeaderComponent);
    component = fixture.componentInstance;
    component.offer = new Offer();
    fixture.detectChanges();
    editButton = fixture.nativeElement.querySelector('a.btn');
  }

  beforeEach(async (() => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['canUserEditOffer']);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        OfferHeaderComponent,
        IconLabelComponent,
        IconComponent,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => buildComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide edit button by default', () => {
    expect(editButton).toBeNull();
  });

  it('should hide edit button for non authorized user', () => {
    expect(editButton).toBeNull();
  });

  it('should show edit button for authorized user', () => {
    userService.canUserEditOffer.and.returnValue(Observable.of(true));

    buildComponent();

    expect(editButton).not.toBeNull();
    expect(editButton.innerHTML.toString()).toContain(editButtonCaption);
  });
});
