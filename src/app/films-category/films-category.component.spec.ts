import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsCategoryComponent } from './films-category.component';

describe('FilmsCategoryComponent', () => {
  let component: FilmsCategoryComponent;
  let fixture: ComponentFixture<FilmsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
