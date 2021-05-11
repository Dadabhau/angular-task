import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { OrganizationComponent } from './organization/organization.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: OrganizationComponent, canActivate: [AuthGuard] },
    { path: 'organization-role', component: RoleComponent },
    { path: 'users', component: UsersComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);