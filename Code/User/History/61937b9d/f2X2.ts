import { Routes} from "@angular/router";
import { SideBarComponent } from "./side-bar/side-bar.component";

const routerConfig:  Routes = [
    {
        path: '',
        component: SideBarComponent,
        title: 'Side bar'
    }
];

export default routerConfig;

