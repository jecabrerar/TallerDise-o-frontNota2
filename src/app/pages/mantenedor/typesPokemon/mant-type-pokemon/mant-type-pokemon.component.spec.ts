import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantTypePokemonComponent } from './mant-type-pokemon.component';

describe('MantTypePokemonComponent', () => {
  let component: MantTypePokemonComponent;
  let fixture: ComponentFixture<MantTypePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantTypePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantTypePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
