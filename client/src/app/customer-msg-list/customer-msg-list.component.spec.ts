import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMsgListComponent } from './customer-msg-list.component';

describe('CustomerMsgListComponent', () => {
  let component: CustomerMsgListComponent;
  let fixture: ComponentFixture<CustomerMsgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMsgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
