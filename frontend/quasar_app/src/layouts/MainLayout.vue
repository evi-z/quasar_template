<template>
    <q-layout view="hHh Lpr lff">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleSidebar" />

                <q-toolbar-title>
                    Quasar App
                </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>

        <Sidebar :open="sidebarOpen"/>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Sidebar from 'src/components/layout/Sidebar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        Sidebar
    },
    setup() {
        const sidebarOpen = ref(false)

        return {
            sidebarOpen,
            toggleSidebar() {
                sidebarOpen.value = !sidebarOpen.value
            }
        }
    }
})
</script>
