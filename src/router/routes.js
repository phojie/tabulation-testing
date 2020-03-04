const routes = [
  {
    path: "/",
    component: () => import("layouts/DashboardLayout.vue"),
    meta: { authRequired: true },
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("pages/dashboard.vue")
      }
    ]
  },
  {
    path: "/eventId/:eventId",
    component: () => import("layouts/MainLayout.vue"),
    meta: { authRequired: true },
    children: [
      {
        path: "",
        name: "eventDash",
        //overview
        component: () => import("pages/score.vue")
      },
      {
        path: "contestants",
        name: "contestants",
        component: () => import("pages/contestants.vue")
      },
      {
        path: "criteria",
        name: "criteria",
        component: () => import("pages/criteria.vue")
      },
      {
        path: "judges",
        name: "judges",
        component: () => import("pages/judges.vue")
      },
      {
        path: "score",
        name: "score",
        component: () => import("pages/score.vue")
      },
      {
        path: "organizer",
        name: "organizer",
        component: () => import("pages/organizer.vue")
      },
      {
        path: "reports",
        name: "reports",
        component: () => import("pages/reports.vue")
      },
      {
        path: "settings",
        name: "eventSettings",
        component: () => import("pages/settings.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { loginRequired: true },
    component: () => import("pages/Auth/login.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
