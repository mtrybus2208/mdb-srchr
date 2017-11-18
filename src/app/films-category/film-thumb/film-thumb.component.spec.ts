import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmThumbComponent } from './film-thumb.component';

describe('FilmThumbComponent', () => {
  let component: FilmThumbComponent;
  let fixture: ComponentFixture<FilmThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
