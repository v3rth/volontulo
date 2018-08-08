import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHeaderComponent } from './offer-header.component';
import {IconLabelComponent} from "../../icon-label/icon-label.component";
import {RouterTestingModule} from "@angular/router/testing";
import {IconComponent} from "../../icon/icon.component";
import {UserService} from "../../user.service";

describe('OfferHeaderComponent', () => {
  let component: OfferHeaderComponent;
  let fixture: ComponentFixture<OfferHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        OfferHeaderComponent,
        IconLabelComponent,
        IconComponent,
      ],
      providers: [
        { provide: UserService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy(); //TODO
  // });
});
