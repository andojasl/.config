import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule, Router } from '@angular/router';


declare function acquireVsCodeApi(): {
  postMessage(options: { command: string; data: unknown }): void;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [SideBarComponent, RouterModule],
  standalone: true,
  styleUrl: './app.component.css'
})

//implements OnInit
export class AppComponent  {
  title = 'dahu';
  vscode = acquireVsCodeApi();
  constructor(private router: Router) {}

  // ngOnInit() {
  //   this.preventDefaultNavigation();
  // }

  // preventDefaultNavigation() {
  //   document.body.addEventListener('click', (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (target.tagName === 'A' || target.closest('a')) {
  //       event.preventDefault();
  //       const href = target.getAttribute('href') || target.closest('a')?.getAttribute('href');
  //       if (href) {
  //         this.router.navigateByUrl(href);
  //       }
  //     }
  //   }, true);
  // }

}
