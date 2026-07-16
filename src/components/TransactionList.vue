<template>
<div class="card">
  <h3>📋 收支流水</h3>
  <div class="flex-row">
    <select v-model="filterType">
      <option value="all">全部</option>
      <option value="expense">只看支出</option>
      <option value="income">只看收入</option>
    </select>
    <button @click="clearAll">清空全部记录</button>
  </div>
  <div v-if="list.length === 0">暂无记录</div>
  <div v-for="(item, idx) in filterList" :key="idx" style="margin:8px 0;display:flex;justify-content:space-between;">
    <span>{{item.time}} | {{item.category}} | {{item.remark}}</span>
    <span :style="{color: item.type==='income'?'green':'red'}">
      {{item.type==='income'?'+':'-'}}{{item.amount}}
    </span>
    <button @click="$emit('del', idx)">删除</button>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['list'])
const emit = defineEmits(['del','clear'])
const filterType = ref('all')

const filterList = computed(()=>{
  if(filterType.value === 'all') return props.list
  return props.list.filter(i=>i.type === filterType.value)
})

const clearAll = ()=>{
  if(window.confirm('确定清空所有记录？')) emit('clear')
}
</script>