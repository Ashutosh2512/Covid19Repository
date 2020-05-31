import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{

    @HostBinding('style.color') color = 'darkgreen';



    constructor(){
        this.color = 'darkgreen';
    }
    ngOnInit(): void {
        this.color = 'darkgreen';
    }

    @HostListener('mouseenter') mouseover(eventdata: Event){
        this.color = 'red';
    }
    @HostListener('mouseleave') mouseleave(eventdata: Event){
        this.color = 'darkgreen';
    }

}
