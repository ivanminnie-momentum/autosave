import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {animate, group, keyframes, query, style, transition, trigger} from "@angular/animations";

const optional = {optional: true};

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)'
        })
      ], optional),
      query(':enter', [
        animate('500ms ease', style({
          opacity: 1, transform: 'scale(1) translateY(0)'
        })),
      ], optional)
    ])
  ]);

export const stepper =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ], optional),
      group([
        query(':enter', [
          animate('1000ms ease', keyframes([
            style({transform: 'scale(0) translateX(100%)', offset: 0}),
            style({transform: 'scale(0.5) translateX(25%)', offset: 0.3}),
            style({transform: 'scale(1) translateX(0%)', offset: 1}),
          ])),
        ], optional),
        query(':leave', [
          animate('1000ms ease', keyframes([
            style({transform: 'scale(1)', offset: 0}),
            style({transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35}),
            style({opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1}),
          ])),
        ], optional)
      ]),
    ])

  ]);

@Component({
  selector: 'app-root',
  animations: [fader],//[routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'Do Something App';

  constructor(public router: Router, public ac: ActivatedRoute) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose(event: any) {
    event.returnValue = `Changes you have made might not be saved ?`;
    // event.returnValue = false;
  }
}
