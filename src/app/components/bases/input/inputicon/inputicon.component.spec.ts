import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InputiconComponent } from "./inputicon.component";

describe("InputiconComponent", () => 
{
    let component: InputiconComponent;
    let fixture: ComponentFixture<InputiconComponent>;

    beforeEach(async () => 
    {
        await TestBed.configureTestingModule({
            imports: [InputiconComponent]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(InputiconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => 
    {
        expect(component).toBeTruthy();
    });
});
