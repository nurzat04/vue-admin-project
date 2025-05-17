<template>
    <el-card style="max-width: 1200px">
        <el-button type="primary" size="default" icon="Plus">Add Brand</el-button>
        <!-- 表格组件: 用于展示已有的平台数据 -->
        <el-table style="margin: 10px 0px" border :data="tradeMarkArr">
            <el-table-column label="No." max-width="150px" align="center" type="index"></el-table-column>
            <!-- 这里的tmName是后端返回的字段名 -->
            <el-table-column label="Brand Name" max-width="340px" align="center">
                <template #="{ row, $index }">
                    <pre style="color:black">{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="Brand Logo" max-width="320px" align="center">
                <template #="{ row }">
                    <img :src="row.logoUrl" style="width: 100px; height: 100px; border-radius: 10px;" />
                </template>
            </el-table-column>
            <el-table-column label="Action" max-width="340px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="Edit" circle></el-button>
                    <el-button type="danger" size="small" icon="Delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 
        Pagination 分页器组件: 用于分页展示数据 
        v-model:current-page -- 设置分页器当前的页码 
        v-model:page-size -- 设置分页器每页显示的条数
        :page-sizes -- 设置分页器每页显示的条数的选项
        :layout -- 设置分页器的布局 : prev, pager, next, jumper, ->, sizes, total,这里的->表示将sizes和total推到最右边
        :total -- 设置分页器的总条数
        :size -- 设置分页器的大小
        :disabled -- 设置分页器是否禁用
        -->
        <el-pagination @size-change="getHasTrademark" @current-change="getHasTrademark" :pager-count="9"
            v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev,pager,next,jumper,->,sizes,total" :total="total" />
    </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqHasTrademark } from '../../../api/product/brand';
import type { Records } from '../../../api/product/brand/type';

const pageNo = ref(1); // 当前页码

const limit = ref<number>(3) // 每页显示的条数

const total = ref<number>(0) // 总条数

const tradeMarkArr = ref<Records>([]); // 用于存储已有品牌的数据

//获取已有品牌的接口封装为一个函数：在任何情况下向获取数据，调用次函数即可
const getHasTrademark = async () => {
    const res = await reqHasTrademark(pageNo.value, limit.value);
    if (res.code === 200) {
        //获取数据成功
        total.value = res.data.total; //获取总条数
        tradeMarkArr.value = res.data.records; //获取已有品牌的数据
    } else {
        //获取数据失败
        console.error(res.message);
    }
};

//页面加载完成后，获取已有品牌数据
onMounted(() => {
    getHasTrademark();
});

</script>
<style scoped lang="scss"></style>
