import { Routes} from "@angular/router";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { GenerateThemeComponent } from "./generate-theme/generate-theme.component";

const routeConfig:  Routes = [
    {
        path: '',
        component: SideBarComponent,
        title: 'Side bar'
    },
    {
        path: 'generate-theme',
        component: GenerateThemeComponent,
        title: 'Generate theme page'

    }
];

export default routeConfig;

