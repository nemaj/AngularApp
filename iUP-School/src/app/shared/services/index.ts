import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { ActivitiesService } from './activities.service';
import { OptionsService } from './options.service';
import { SchedulesService } from './schedules.service';
import { MaterialsService } from './materials.service';
import { CashierService } from './cashier.service';
import { ParentService } from './parent.service';
import { PupilsService } from './pupils.service';
import { TeacherService } from './teacher.service';
import { UtilityService } from './utility.service';
import { GradingService } from './grading.service';
import { ReportsService } from './reports.service';
import { PrintService } from './print.service';

export const Services = [
  AuthService,
  UsersService,
  ActivitiesService,
  OptionsService,
  SchedulesService,
  MaterialsService,
  CashierService,
  ParentService,
  PupilsService,
  TeacherService,
  UtilityService,
  GradingService,
  ReportsService,
  PrintService
];

export * from './auth.service';
export * from './app-load.service';
export * from './users.service';
export * from './activities.service';
export * from './options.service';
export * from './schedules.service';
export * from './materials.service';
export * from './cashier.service';
export * from './parent.service';
export * from './pupils.service';
export * from './teacher.service';
export * from './utility.service';
export * from './grading.service';
export * from './reports.service';
export * from './print.service';
