<template>
    <q-expansion-item :clickable="onePage" :icon="basePage.icon" :label="basePage.label" :hide-expand-icon="onePage" @click="basePage.click">
        <template v-if="!onePage">
            <q-expansion-item 
                clickable 
                v-for="(page, index) in pages" 
                :key="index" 
                :icon="page.icon" 
                :label="page.label" 
                :hide-expand-icon="true" 
                :header-inset-level="1"
                @click="page.click"
        />
        </template>
    </q-expansion-item>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { toRef } from 'vue'

const props = defineProps({
    route: {
        required: true,
        type: Object
    }
})

const router = useRouter()
const route = toRef(props.route)
const pages = route.value.pages

const onePage = pages.length == 1

const basePage = onePage ? pages[0] : Object.assign({}, route.value) 
basePage.chick = onePage ? () => { itemClick(basePage) } : () => {}

pages.forEach(page => {
    page.click = () => { itemClick(page) }
});

function itemClick(page) {
    router.push({name: page.name})
}
</script>