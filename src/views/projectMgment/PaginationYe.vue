<template>
  <a-pagination
    v-model="current"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    :page-size="pageSize"
    @showSizeChange="onShowSizeChange"
  >
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </a-pagination>
</template>

<script setup>
import { ref } from 'vue'

const pageSizeOptions = ref(['10', '20', '30', '40', '50'])
const current = ref(1)
const pageSize = ref(10)
const total = ref(50)

const onShowSizeChange = (currentPage, size) => {
  console.log(size)
  pageSize.value = size
}
</script>
