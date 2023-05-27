import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import("./home/home.page").then((m) => m.HomePage),
  },
  {
    path: "attendant",
    loadComponent: () =>
      import("./attendant/attendant.page").then((m) => m.AttendantPage),
  },
  {
    path: "report",
    loadComponent: () =>
      import("./report/report.page").then((m) => m.ReportPage),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "report",
    loadComponent: () =>
      import("./report/report.page").then((m) => m.ReportPage),
  },
];
