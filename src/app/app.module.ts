import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/profile/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AdminprofileComponent } from './components/profile/adminprofile/adminprofile.component';
import { WelcomeComponent } from './components/profile/welcome/welcome.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MentorComponent } from './components/mentor/mentor.component';
import { AddLectureMentorComponent } from './components/mentor/add-lecture-mentor/add-lecture-mentor.component';
import { SidebarMentorComponent } from './components/mentor/sidebar-mentor/sidebar-mentor.component';
import { AddQuizMentorComponent } from './components/mentor/add-quiz-mentor/add-quiz-mentor.component';
import { ShowQuizMentorComponent } from './components/mentor/show-quiz-mentor/show-quiz-mentor.component';
import { AddAssignmentMentorComponent } from './components/mentor/add-assignment-mentor/add-assignment-mentor.component';
import { ShowAssignmentMentorComponent } from './components/mentor/show-assignment-mentor/show-assignment-mentor.component';
import { ProfileMentorComponent } from './components/mentor/profile-mentor/profile-mentor.component';
import { WelcomeMentorComponent } from './components/mentor/welcome-mentor/welcome-mentor.component';


import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AddQuestionMentorComponent } from './components/mentor/add-question-mentor/add-question-mentor.component';
import { AddCourseMentorComponent } from './components/mentor/add-course-mentor/add-course-mentor.component';
import { CoursesMentorComponent } from './components/mentor/courses-mentor/courses-mentor.component';
import { ShowLectureMentorComponent } from './components/mentor/show-lecture-mentor/show-lecture-mentor.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AddmentorComponent } from './components/profile/addmentor/addmentor.component';
import { ShowmentorComponent } from './components/profile/showmentor/showmentor.component';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { UsersidebarComponent } from './components/user/usersidebar/usersidebar.component';
import { UsercourseComponent } from './components/user/usercourse/usercourse.component';
import { UserComponent } from './components/user/user.component';
import { ShowCourseUserComponent } from './components/user/show-course-user/show-course-user.component';
import { ShowLectureUserComponent } from './components/user/show-lecture-user/show-lecture-user.component';
import { AssignmentsUserComponent } from './components/user/assignments-user/assignments-user.component';
import { SubmitAssignmentUserComponent } from './components/user/submit-assignment-user/submit-assignment-user.component';
import { QuizesUserComponent } from './components/user/quizes-user/quizes-user.component';
import { UpdateCourseComponent } from './components/mentor/update-course/update-course.component';
import { UpdateMentorComponent } from './components/profile/update-mentor/update-mentor.component';
import { UpdateLectureComponent } from './components/mentor/update-lecture/update-lecture.component';
import { UpdateQuizComponent } from './components/mentor/update-quiz/update-quiz.component';
import { ShowAllAssignmentsComponent } from './components/mentor/show-all-assignments/show-all-assignments.component';
import { ShowAllLecturesComponent } from './components/mentor/show-all-lectures/show-all-lectures.component';
import { ShowAllQuizComponent } from './components/mentor/show-all-quiz/show-all-quiz.component';
import { UpdateAssignmentMentorComponent } from './components/mentor/update-assignment-mentor/update-assignment-mentor.component';
import { UpdateQuestionMentorComponent } from './components/mentor/update-question-mentor/update-question-mentor.component';
import { AddLabTaskMentorComponent } from './components/mentor/add-lab-task-mentor/add-lab-task-mentor.component';
import { ShowAllLabTaskMentorComponent } from './components/mentor/show-all-lab-task-mentor/show-all-lab-task-mentor.component';
import { ShowLabTaskMentorComponent } from './components/mentor/show-lab-task-mentor/show-lab-task-mentor.component';
import { UpdateLabTaskMentorComponent } from './components/mentor/update-lab-task-mentor/update-lab-task-mentor.component';
import { WelcomeUserComponent } from './components/user/welcome-user/welcome-user.component';
import { CompanyComponent } from './components/company/company.component';
import { SidebarCompanyComponent } from './components/company/sidebar-company/sidebar-company.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { AddJobsCompanyComponent } from './components/company/add-jobs-company/add-jobs-company.component';
import { ViewJobsCompanyComponent } from './components/company/view-jobs-company/view-jobs-company.component';
import { AddCompanyComponent } from './components/profile/add-company/add-company.component';
import { ViewApplicationCompanyComponent } from './components/company/view-application-company/view-application-company.component';
import { UpdateJobComponent } from './components/company/update-job/update-job.component';
import { FindJobUserComponent } from './components/user/find-job-user/find-job-user.component';
import { QuizInstructionsUserComponent } from './components/user/quiz-instructions-user/quiz-instructions-user.component';
import { StartQuizUserComponent } from './components/user/start-quiz-user/start-quiz-user.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LabTaskUserComponent } from './components/user/lab-task-user/lab-task-user.component';
import { SubmitLabTaskUserComponent } from './components/user/submit-lab-task-user/submit-lab-task-user.component';
import { GraddingAssignmentMentorComponent } from './components/mentor/gradding-assignment-mentor/gradding-assignment-mentor.component';
import { MarksAssignmentMentorComponent } from './components/mentor/marks-assignment-mentor/marks-assignment-mentor.component';
import { GraddingLabTaskMentorComponent } from './components/mentor/gradding-lab-task-mentor/gradding-lab-task-mentor.component';
import { MarksLabTaskMentorComponent } from './components/mentor/marks-lab-task-mentor/marks-lab-task-mentor.component';
import { ShowCompanyAdminComponent } from './components/profile/show-company-admin/show-company-admin.component';
import { UpdateCompanyAdminComponent } from './components/profile/update-company-admin/update-company-admin.component';
import { ViewJobComponent } from './components/user/view-job/view-job.component';
import { ShowUsersAdminComponent } from './components/profile/show-users-admin/show-users-admin.component';
import { NgChartsModule } from 'ng2-charts';
import { WelcomeCompanyComponent } from './components/company/welcome-company/welcome-company.component';
import { ViewCoursesAdminComponent } from './components/profile/view-courses-admin/view-courses-admin.component';
import { ShowAllLecturesAdminComponent } from './components/profile/show-all-lectures-admin/show-all-lectures-admin.component';
import { ShowLectureAdminComponent } from './components/profile/show-lecture-admin/show-lecture-admin.component';
import { ShowQuizAdminComponent } from './components/profile/show-quiz-admin/show-quiz-admin.component';
import { ShowAssignmentAdminComponent } from './components/profile/show-assignment-admin/show-assignment-admin.component';
import { ShowLabtaskAdminComponent } from './components/profile/show-labtask-admin/show-labtask-admin.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ShowJobsComponent } from './components/profile/show-jobs/show-jobs.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    AdminprofileComponent,
    WelcomeComponent,
    MentorComponent,
    AddLectureMentorComponent,
    SidebarMentorComponent,
    AddQuizMentorComponent,
    ShowQuizMentorComponent,
    AddAssignmentMentorComponent,
    ShowAssignmentMentorComponent,
    ProfileMentorComponent,
    WelcomeMentorComponent,
    AddQuestionMentorComponent,
    AddCourseMentorComponent,
    CoursesMentorComponent,
    ShowLectureMentorComponent,
    AddmentorComponent,
    ShowmentorComponent,
    UserprofileComponent,
    UsersidebarComponent,
    UsercourseComponent,
    UserComponent,
    ShowCourseUserComponent,
    ShowLectureUserComponent,
    AssignmentsUserComponent,
    SubmitAssignmentUserComponent,
    QuizesUserComponent,
    UpdateCourseComponent,
    UpdateMentorComponent,
    UpdateLectureComponent,
    UpdateQuizComponent,
    ShowAllAssignmentsComponent,
    ShowAllLecturesComponent,
    ShowAllQuizComponent,
    UpdateAssignmentMentorComponent,
    UpdateQuestionMentorComponent,
    AddLabTaskMentorComponent,
    ShowAllLabTaskMentorComponent,
    ShowLabTaskMentorComponent,
    UpdateLabTaskMentorComponent,
    WelcomeUserComponent,
    CompanyComponent,
    SidebarCompanyComponent,
    CompanyProfileComponent,
    AddJobsCompanyComponent,
    ViewJobsCompanyComponent,
    AddCompanyComponent,
    ViewApplicationCompanyComponent,
    UpdateJobComponent,
    FindJobUserComponent,
    QuizInstructionsUserComponent,
    StartQuizUserComponent,
    LabTaskUserComponent,
    SubmitLabTaskUserComponent,
    GraddingAssignmentMentorComponent,
    MarksAssignmentMentorComponent,
    GraddingLabTaskMentorComponent,
    MarksLabTaskMentorComponent,
    ShowCompanyAdminComponent,
    UpdateCompanyAdminComponent,
    ViewJobComponent,
    ShowUsersAdminComponent,
    WelcomeCompanyComponent,
    ViewCoursesAdminComponent,
    ShowAllLecturesAdminComponent,
    ShowLectureAdminComponent,
    ShowQuizAdminComponent,
    ShowAssignmentAdminComponent,
    ShowLabtaskAdminComponent,
    NotFoundPageComponent,
    AboutUsComponent,
    ShowJobsComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatSlideToggleModule,
    CKEditorModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgChartsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),

  ],
  providers: [MatSnackBar, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
