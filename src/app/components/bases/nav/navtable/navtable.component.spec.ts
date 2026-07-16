import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavtableComponent } from "./navtable.component";

describe("NavtableComponent", () => 
{
    let component: NavtableComponent;
    let fixture: ComponentFixture<NavtableComponent>;

    beforeEach(async () => 
    {
        await TestBed.configureTestingModule({
            imports: [NavtableComponent]
        })
            .compileComponents();
    
        fixture = TestBed.createComponent(NavtableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => 
    {
        expect(component).toBeTruthy();
    });
});
