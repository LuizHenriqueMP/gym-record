const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WorkoutsPage.vue') },
      { path: 'exercisepage/:id?', name: 'exercise', component: () => import('pages/ExercisePage.vue') },
      { path: 'createworkoutpage', component: () => import('pages/CreateWorkoutPage.vue') },
      { path: 'editworkoutpage/:id?', name: 'editworkout', component: () => import('pages/EditWorkout.vue')},
      { path: 'registerworkoutpage/:id?', name: 'registerworkout', component: () => import('pages/RegisterWorkout.vue')},
      { path: 'doneworkout/:id?', name: 'doneworkout', component: () => import('pages/DoneWorkoutPage.vue')}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
