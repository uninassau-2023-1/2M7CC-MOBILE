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
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
