<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb/>
        </div>
        <div class="tabbar_right">
            <Setting/>
        </div>
    </div>
</template>
<script setup lang="ts" name="Tabbar">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<style scoped lang="scss">
.tabbar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right, rgb(255, 255, 255), rgb(244, 249, 253),rgb(232, 244, 253));
    .tabbar_left{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display: flex;
        align-items: center;
    }
}
</style>
