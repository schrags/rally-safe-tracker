import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Map = () => import('@/views/Map')
const Entries = () => import('@/views/Entries')
const Results = () => import('@/views/Results')

//Errors
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

router.beforeEach((to, from, next) => { 
  //make them select a rally
  var menuPages = ["/entries", "/map", "/results"];
  var eventId = store.state.selectedEvent.EventId;

  //meh i'll fix later
  if (to.params.eventId && eventId < 0)
  {
    store.commit("selectedEvent", {
      Name: "",
      EventId: to.params.eventId
    });
  }

  if (menuPages.includes(to.path)) { 
    
      if (eventId < 0) { 
          next({ path: '/'});
      } else { 
          next({path: '/Events/' + eventId + to.path});
      } 
  } else { 
      next() 
  } 
}) 

export default router

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'events/:eventId/Entries',
          name: 'entries',
          component: Entries,
          props: true
        },
        {
          path: 'events/:eventId/map',
          name: 'map', component: Map,
          props: true
        },
        {
          path: 'events/:eventId/results',
          name: 'results', component: Results,
          props: true
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    }
  ]
}

