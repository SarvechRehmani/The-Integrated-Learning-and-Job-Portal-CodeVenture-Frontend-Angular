import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { WelcomeMentorComponent } from './components/mentor/welcome-mentor/welcome-mentor.component';
import { AddLectureMentorComponent } from './components/mentor/add-lecture-mentor/add-lecture-mentor.component';
import { AddQuizMentorComponent } from './components/mentor/add-quiz-mentor/add-quiz-mentor.component';
import { ShowQuizMentorComponent } from './components/mentor/show-quiz-mentor/show-quiz-mentor.component';
import { AddAssignmentMentorComponent } from './components/mentor/add-assignment-mentor/add-assignment-mentor.component';
import { ShowAssignmentMentorComponent } from './components/mentor/show-assignment-mentor/show-assignment-mentor.component';
import { ProfileMentorComponent } from './components/mentor/profile-mentor/profile-mentor.component';
import { HomeComponent } from './components/home/home.component';
import { AddQuestionMentorComponent } from './components/mentor/add-question-mentor/add-question-mentor.component';
import { AddCourseMentorComponent } from './components/mentor/add-course-mentor/add-course-mentor.component';
import { CoursesMentorComponent } from './components/mentor/courses-mentor/courses-mentor.component';
import { ShowLectureMentorComponent } from './components/mentor/show-lecture-mentor/show-lecture-mentor.component';
import { ProfileGuard } from './services/profile.guard';
import { AddmentorComponent } from './components/admin/addmentor/addmentor.component';
import { ShowmentorComponent } from './components/admin/showmentor/showmentor.component';
import { UserComponent } from './components/user/user.component';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { UsercourseComponent } from './components/user/usercourse/usercourse.component';
import { NormalGuard } from './services/normal.guard';
import { mentorGuard } from './services/mentor.guard';
import { ShowCourseUserComponent } from './components/user/show-course-user/show-course-user.component';
import { ShowLectureUserComponent } from './components/user/show-lecture-user/show-lecture-user.component';
import { AssignmentsUserComponent } from './components/user/assignments-user/assignments-user.component';
import { SubmitAssignmentUserComponent } from './components/user/submit-assignment-user/submit-assignment-user.component';
import { QuizesUserComponent } from './components/user/quizes-user/quizes-user.component';
import { UpdateCourseComponent } from './components/mentor/update-course/update-course.component';
import { UpdateMentorComponent } from './components/admin/update-mentor/update-mentor.component';
import { UpdateLectureComponent } from './components/mentor/update-lecture/update-lecture.component';
import { UpdateQuizComponent } from './components/mentor/update-quiz/update-quiz.component';
import { ShowAllLecturesComponent } from './components/mentor/show-all-lectures/show-all-lectures.component';
import { ShowAllQuizComponent } from './components/mentor/show-all-quiz/show-all-quiz.component';
import { ShowAllAssignmentsComponent } from './components/mentor/show-all-assignments/show-all-assignments.component';
import { UpdateAssignmentMentorComponent } from './components/mentor/update-assignment-mentor/update-assignment-mentor.component';
import { UpdateQuestionMentorComponent } from './components/mentor/update-question-mentor/update-question-mentor.component';
import { AddLabTaskMentorComponent } from './components/mentor/add-lab-task-mentor/add-lab-task-mentor.component';
import { ShowAllLabTaskMentorComponent } from './components/mentor/show-all-lab-task-mentor/show-all-lab-task-mentor.component';
import { ShowLabTaskMentorComponent } from './components/mentor/show-lab-task-mentor/show-lab-task-mentor.component';
import { UpdateLabTaskMentorComponent } from './components/mentor/update-lab-task-mentor/update-lab-task-mentor.component';
import { AdminprofileComponent } from './components/admin/adminprofile/adminprofile.component';
import { WelcomeUserComponent } from './components/user/welcome-user/welcome-user.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyProfileComponent } from './components/company/company-profile/company-profile.component';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import { companyGuard } from './services/company.guard';
import { AddJobsCompanyComponent } from './components/company/add-jobs-company/add-jobs-company.component';
import { ViewJobsCompanyComponent } from './components/company/view-jobs-company/view-jobs-company.component';
import { ViewApplicationCompanyComponent } from './components/company/view-application-company/view-application-company.component';
import { UpdateJobComponent } from './components/company/update-job/update-job.component';
import { FindJobUserComponent } from './components/user/find-job-user/find-job-user.component';
import { QuizInstructionsUserComponent } from './components/user/quiz-instructions-user/quiz-instructions-user.component';
import { StartQuizUserComponent } from './components/user/start-quiz-user/start-quiz-user.component';
import { LabTaskUserComponent } from './components/user/lab-task-user/lab-task-user.component';
import { SubmitLabTaskUserComponent } from './components/user/submit-lab-task-user/submit-lab-task-user.component';
import { GraddingAssignmentMentorComponent } from './components/mentor/gradding-assignment-mentor/gradding-assignment-mentor.component';
import { MarksAssignmentMentorComponent } from './components/mentor/marks-assignment-mentor/marks-assignment-mentor.component';
import { GraddingLabTaskMentorComponent } from './components/mentor/gradding-lab-task-mentor/gradding-lab-task-mentor.component';
import { MarksLabTaskMentorComponent } from './components/mentor/marks-lab-task-mentor/marks-lab-task-mentor.component';
import { ShowCompanyAdminComponent } from './components/admin/show-company-admin/show-company-admin.component';
import { UpdateCompanyAdminComponent } from './components/admin/update-company-admin/update-company-admin.component';
import { ViewJobComponent } from './components/user/view-job/view-job.component';
import { ShowUsersAdminComponent } from './components/admin/show-users-admin/show-users-admin.component';
import { WelcomeCompanyComponent } from './components/company/welcome-company/welcome-company.component';
import { ViewCoursesAdminComponent } from './components/admin/view-courses-admin/view-courses-admin.component';
import { ShowAllLecturesAdminComponent } from './components/admin/show-all-lectures-admin/show-all-lectures-admin.component';
import { ShowLectureAdminComponent } from './components/admin/show-lecture-admin/show-lecture-admin.component';
import { ShowQuizAdminComponent } from './components/admin/show-quiz-admin/show-quiz-admin.component';
import { ShowAssignmentAdminComponent } from './components/admin/show-assignment-admin/show-assignment-admin.component';
import { ShowLabtaskAdminComponent } from './components/admin/show-labtask-admin/show-labtask-admin.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ShowJobsComponent } from './components/admin/show-jobs/show-jobs.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  // {
  //   path: "/**",
  //   component: NotFoundPageComponent,
  //   pathMatch: "full"
  // },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ProfileGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: AdminprofileComponent,
      },
      {
        path: 'courses',
        component: ViewCoursesAdminComponent,
      },
      {
        path: 'lectures/:cId/:cTitle',
        component: ShowAllLecturesAdminComponent,
      },
      {
        path: 'lecture/:lId',
        component: ShowLectureAdminComponent,
      },
      {
        path: 'quiz/:lId',
        component: ShowQuizAdminComponent,
      },
      {
        path: 'assignment/:lId',
        component: ShowAssignmentAdminComponent,
      },
      {
        path: 'labtask/:lId',
        component: ShowLabtaskAdminComponent,
      },
      {
        path: 'showusers',
        component: ShowUsersAdminComponent,
      },
      {
        path: 'addcompany',
        component: AddCompanyComponent,
      },
      {
        path: 'addmentor',
        component: AddmentorComponent,
      },
      {
        path: 'showmentor',
        component: ShowmentorComponent,
      },
      {
        path: 'showcompanies',
        component: ShowCompanyAdminComponent,
      },
      {
        path: 'showjobs',
        component: ShowJobsComponent,
      },
      {
        path: 'updatementor/:id',
        component: UpdateMentorComponent,
      },
      {
        path: 'updatecompany/:id',
        component: UpdateCompanyAdminComponent,
      },
    ],
  },
  {
    path: 'mentor',
    component: MentorComponent,
    canActivate: [mentorGuard],
    children: [
      {
        path: '',
        component: WelcomeMentorComponent,
      },
      {
        path: 'profile',
        component: ProfileMentorComponent,
      },
      {
        path: 'addcourse',
        component: AddCourseMentorComponent,
      },
      {
        path: 'updatecourse/:id',
        component: UpdateCourseComponent,
      },
      {
        path: 'courses',
        component: CoursesMentorComponent,
      },
      {
        path: 'addlecture',
        component: AddLectureMentorComponent,
      },
      {
        path: 'updatelecture/:id',
        component: UpdateLectureComponent,
      },
      {
        path: 'lectures',
        component: ShowAllLecturesComponent,
      },
      {
        path: 'lectures/:cId/:cTitle',
        component: ShowAllLecturesComponent,
      },
      {
        path: 'lecture/:id',
        component: ShowLectureMentorComponent,
      },
      {
        path: 'addquiz',
        component: AddQuizMentorComponent,
      },
      {
        path: 'updatequiz/:id',
        component: UpdateQuizComponent,
      },
      {
        path: 'quizzes',
        component: ShowAllQuizComponent,
      },
      {
        path: 'quiz/:id',
        component: ShowQuizMentorComponent,
      },
      {
        path: 'gradding/assignment/:aId',
        component: GraddingAssignmentMentorComponent,
      },
      {
        path: 'assignment/assign/:aId/:uId',
        component: MarksAssignmentMentorComponent,
      },
      {
        path: 'addassignment',
        component: AddAssignmentMentorComponent,
      },
      {
        path: 'assignments',
        component: ShowAllAssignmentsComponent,
      },
      {
        path: 'assignment/:id',
        component: ShowAssignmentMentorComponent,
      },
      {
        path: 'updateassignment/:id',
        component: UpdateAssignmentMentorComponent,
      },
      {
        path: 'addquestion/:qid/:qTitle',
        component: AddQuestionMentorComponent,
      },
      {
        path: 'updatequestion/:qid',
        component: UpdateQuestionMentorComponent,
      },
      {
        path: 'gradding/labtask/:lId',
        component: GraddingLabTaskMentorComponent,
      },
      {
        path: 'labtask/assign/:lId/:uId',
        component: MarksLabTaskMentorComponent,
      },
      {
        path: 'addlabtask',
        component: AddLabTaskMentorComponent,
      },
      {
        path: 'labtasks',
        component: ShowAllLabTaskMentorComponent,
      },
      {
        path: 'labtask/:id',
        component: ShowLabTaskMentorComponent,
      },
      {
        path: 'updatelabtask/:id',
        component: UpdateLabTaskMentorComponent,
      },
    ],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [companyGuard],
    children: [
      {
        path: '',
        component: WelcomeCompanyComponent,
      },
      {
        path: 'profile',
        component: CompanyProfileComponent,
      },
      {
        path: 'addjob',
        component: AddJobsCompanyComponent,
      },
      {
        path: 'viewjobs',
        component: ViewJobsCompanyComponent,
      },
      {
        path: 'applications',
        component: ViewApplicationCompanyComponent,
      },
      {
        path: 'applications/:jId',
        component: ViewApplicationCompanyComponent,
      },
      {
        path: 'updatejob/:jId',
        component: UpdateJobComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: WelcomeUserComponent,
      },
      {
        path: 'dashboard',
        component: WelcomeUserComponent,
      },
      {
        path: 'profile',
        component: UserprofileComponent,
      },
      {
        path: 'course',
        component: UsercourseComponent,
      },
      {
        path: 'lectures/:cId/:cTitle',
        component: ShowCourseUserComponent,
      },
      {
        path: 'lectures',
        component: ShowCourseUserComponent,
      },
      {
        path: 'showlecture/:lId',
        component: ShowLectureUserComponent,
      },
      {
        path: 'assignments',
        component: AssignmentsUserComponent,
      },
      {
        path: 'assignment/:lId',
        component: SubmitAssignmentUserComponent,
      },
      {
        path: 'quizess',
        component: QuizesUserComponent,
      },
      {
        path: 'quiz/instructions/:lId',
        component: QuizInstructionsUserComponent,
      },
      {
        path: 'labtasks',
        component: LabTaskUserComponent,
      },
      {
        path: 'labtask/:lId',
        component: SubmitLabTaskUserComponent,
      },
      {
        path: 'findjob',
        component: FindJobUserComponent,
      },
      {
        path: 'viewjob/:jId',
        component: ViewJobComponent,
      },
    ],
  },
  // it is separated because we dont want SIDEBAR.
  {
    path: 'quiz/start/:qId',
    component: StartQuizUserComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
