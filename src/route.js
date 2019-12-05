import Vue from "vue";
import Router from "vue-router";

import hw from "@/components/HelloWorld";
import lg from "@/components/Login";
// import ca from '@/components/Carreras'

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "start",
			component: lg,
		},
		{
			path: "/home",
			name: "home",
			component: hw,
			beforeEnter: (to, from, next) => {
				if (localStorage.getItem("token") == null) {
					next("/");
				} else {
					next();
				}
			}
		}
	]
});

// router.beforeEach((to, from, next) => {
//     if (from.path!= '/' && localStorage.getItem("token") != isNull) {
//         next();
//     } else {
//         next('/');
//     }
// });

export default router;
