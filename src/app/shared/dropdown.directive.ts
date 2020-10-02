//THis directive allows us to add certain CSS class to element it sits on (when the element is clicked),
//and removes the class when we clicks again
//(For our case , we need to make the "manage" dropdown work. For that 'open' class must be added)

import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective
{   
    @HostBinding('class.open') isOpen = false;

    //for listening to click , we can add hostListener
    @HostListener('click') toggleOpen()
    {
        this.isOpen = !this.isOpen;
    }
}

