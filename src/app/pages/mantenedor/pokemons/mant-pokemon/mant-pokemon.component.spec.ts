import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPokemonComponent } from './mant-pokemon.component';

describe('MantPokemonComponent', () => {
  let component: MantPokemonComponent;
  let fixture: ComponentFixture<MantPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
