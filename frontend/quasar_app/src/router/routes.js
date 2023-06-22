
/*
Роутер обслуживается в компоненте @/components/layout/Sidebar.vue

"""
const routes = [
    {
        path: '/',
        component: MainLayout,  
        hidden: false,
        meta: {
            title: 'Home',
        },
        children: [     // [required] Страницы (страницы)
            { 
                path: '', 
                name: 'Home',    // [required] Имя для роутинга (должны быть уникальным!)
                component: () => import('pages/IndexPage.vue'),
                hidden: false,  // [optional]  Скрыта ли страница
                meta: {
                    title: 'Home'   // [optional] Видимое имя (если отсутсвует - будет использоваться "name"),
                }
            }
        ]
    },
]
"""

*/

import MainLayout from 'src/layouts/MainLayout.vue'


const routes = [
    {
        path: '/',
        component: MainLayout,
        hidden: false,
        meta: {
            title: 'Home',
            icon: 'home'
        },
        children: [
            { 
                path: '', 
                name: 'Sub Home',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: 'Sub Home',
                    icon: 'home',  
                }
            },
            { 
                path: '', 
                name: 'Sub Home 2',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: 'Pome'    
                }
            }
        ],
    },
    {
        path: '/todo',
        component: () => import('layouts/MainLayout.vue'),
        hidden: false,
        children: [
            { 
                path: '', 
                name: 'About',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    icon: 'info'
                }
            },
        ]
    },
    
    {  // Always last
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
        hidden: true
    }
]

export default routes
