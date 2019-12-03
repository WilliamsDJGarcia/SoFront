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
			component: lg
		},
		{
			path: "/home",
			name: "home",
			component: hw
		}
		//   {
		//     path: '/carrera',
		//     name: 'carrera',
		//     component: ca,
		//   },
	]
});

export default router;
