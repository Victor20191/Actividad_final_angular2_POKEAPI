import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () =>
        import('./components/animation2/animation2.component')
}];
