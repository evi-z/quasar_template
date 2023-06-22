<template>
    <q-drawer 
            v-model="openValue" 
            bordered
            ref="sidebar"
            :mini="miniState"
            @mouseover="miniState = false"
            @mouseout="miniState = true"
            mini-to-overlay
        >
        <q-scroll-area class="fit">
            <q-list> 
                <SidebarItem v-for="(item, index) in menuList" :key="index" :route="item"/>
            </q-list> 
        </q-scroll-area>
    </q-drawer>
</template>

<script>
import router from 'src/router'
import { defineComponent, toRef, onMounted, ref, computed, nextTick } from 'vue'
import { useRoute, useRouter} from 'vue-router'

import SidebarItem from './SidebarItem.vue'
 
const menuList = [
    {
        label: 'Home',
        icon: 'home'
    },
    {
        label: 'About',
        icon: 'info'
    }
]

export default defineComponent({
    name: 'Sidebar',
    props: {
        open: {
            required: false,
            type: Boolean
        }
    },
    components: {
        SidebarItem
    },
    emits: 
        ['update:open']
    ,
    setup(props, context) {
        // Menu list / router
        const menuList = ref([])
        const router = useRouter()

        const menuItemParams = (route) => {
            const params = Object.assign({
                path: route.path,
                name: route.name
            }, route.meta)
            
            
            params.icon = params.icon ? params.icon : 'menu'
            params.label = params.title ? params.title : route.name

            delete params.title  // lable

            return params
        }

        for (const route of router.options.routes) {
            if (route.hidden) { continue }

            if (!route.children) {  // No pages
                console.error(`В роутере для пути "${route.path}" не указаны дочерние страницы (children)`)
                continue
            }
        
            const pages = []
            for (const page of route.children) {  // Check subpages
                if (page.hidden) { continue }

                if (!page.name) {  // No subpage name
                    console.error(
                        `В роутере у дочерней страницы по пути "${route.path + route.path}" не указан обязательный параметр "name"`
                    )
                    continue
                }
                
                const subPageItem = menuItemParams(page)
                pages.push(subPageItem)
            }

            if (!pages.length) {
                console.warn(`В роутере у пути "${route.path}" нет ни одной видимой дочерней страницы`)
                continue
            }

            const menuItem = menuItemParams(route)
            menuItem.pages = pages
            menuList.value.push(menuItem)
        }       

        // Sidebar open
        const openProps = toRef(props, 'open')
        const openValue = computed({
            get() { return openProps.value },
            set(val) { context.emit('update:open', val) }
        })

        return {
            openValue,
            miniState: ref(true),
            menuList
        }
    },
})

</script>