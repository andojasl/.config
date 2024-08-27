import { Routes} from "@angular/router";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { GenerateThemeComponent } from "./generate-theme/generate-theme.component";
import { LibraryComponent } from "./library/library.component";
import { CreateThemeComponent } from "./create-theme/create-theme.component";
import { GenerateFromPicComponent } from "./generate-from-pic/generate-from-pic.component";

const routeConfig:  Routes = [
    {
        path: '',
        component: SideBarComponent,
        title: 'Side bar'
    },
    {
        path: '/generate-theme',
        component: GenerateThemeComponent,
        title: 'generate-theme'

    },
    {
        path: '/library',
        component: LibraryComponent,
        title: 'library'
    },
    {
        path:'/create-theme',
        component: CreateThemeComponent,
        title: 'create-theme'
    },
    {
        path:'generate-from-pic',
        component: GenerateFromPicComponent,
        title: 'generate-from-pic'
    }
];

export default routeConfig;

