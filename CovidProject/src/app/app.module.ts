import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HighlightDirective } from './utility/highlight.directive';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { UserRemovalComponentComponent } from './user-removal-component/user-removal-component.component';
import {HttpClientModule} from '@angular/common/http';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ResultComponent } from './result/result.component';
import { UserLoginGuard } from './shared/UserLogin.guard';
import { AdminLoginGuard } from './shared/AdminLogin.guard';

const approute: Routes = [{path: '', component: HomeComponent, pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path:'questions', component: QuestionComponent, canActivate:[UserLoginGuard]},
{path:'adminregistration',component: AdminRegistrationComponent, canActivate:[AdminLoginGuard]},
{path:'removeuser',component: UserRemovalComponentComponent, canActivate:[AdminLoginGuard]},
{path:'editquestions', component: EditQuestionComponent,canActivate:[AdminLoginGuard]},
{path:'result', component: ResultComponent, canActivate:[UserLoginGuard]}];
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HighlightDirective,
    AdminRegistrationComponent,
    UserRemovalComponentComponent,
    EditQuestionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,  
    RouterModule.forRoot(approute),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
