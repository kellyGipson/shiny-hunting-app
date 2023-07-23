import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from '@ngrx/store/testing';
import { SelectedHuntCounterModifyComponent } from "./modify.component";
import { AppBusiness } from "src/app/business/app/app.business";
import { CurrentHuntsBusiness } from "src/app/business/currentHunts/currentHunts.business";
import { SelectedHuntsBusiness } from "src/app/business/selectedHunts/selectedHunts.business";
import { ActiveMenuEnum } from "src/app/types/activeMenu.types";

fdescribe('Given SelectedHuntCounterModifyComponent', () => {
  let fixture: ComponentFixture<SelectedHuntCounterModifyComponent>;
  let component: SelectedHuntCounterModifyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedHuntCounterModifyComponent],
      providers: [
        SelectedHuntsBusiness,
        CurrentHuntsBusiness,
        AppBusiness,
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedHuntCounterModifyComponent);
    component = fixture.componentInstance;
  });

  describe('And OnInit', () => {
    it('document addEventListener should be called', () => {
      const spy = spyOn(document, 'addEventListener');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith('keypress', component.keyPressCallback);
    });
  });

  describe('And OnDestroy', () => {
    it('document addEventListener should be called', () => {
      const spy = spyOn(document, 'removeEventListener');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalledWith('keypress', component.keyPressCallback);
    });
  });

  describe('And onKeypress', () => {
    it(`When active menu is not Current
        Then onCounterIncrease should not be called
        And onCounterDecrease should not be called`, () => {
      const event: KeyboardEvent = {} as KeyboardEvent;
      const increaseSpy = spyOn(component, 'onCounterIncrease');
      const decreaseSpy = spyOn(component, 'onCounterDecrease');
      spyOn(TestBed.inject(AppBusiness), 'getActiveMenu').and.returnValue(ActiveMenuEnum.New);
      component.onKeypress(event);
      expect(increaseSpy).not.toHaveBeenCalled();
      expect(decreaseSpy).not.toHaveBeenCalled();
    });
  });
});
