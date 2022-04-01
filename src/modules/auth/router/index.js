
export default {

    name: 'auth',
    component: () => import(/* webpackChunckName: "Auth Layout"*/ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunckName: "Login Form"*/ '@/modules/auth/views/Login.vue'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunckName: "Register Form"*/ '@/modules/auth/views/Register.vue'),
        }
    ]
}