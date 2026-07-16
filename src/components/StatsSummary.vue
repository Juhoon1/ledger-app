<template>
<div class="card">
  <h3>📊 本月统计</h3>
  <p>总收入：<span style="color:green">{{incomeTotal}}</span></p>
  <p>总支出：<span style="color:red">{{expenseTotal}}</span></p>
  <p>结余：{{balance}}</p>

  <h4 style="margin-top:12px;">支出TOP5</h4>
  <div v-for="(v,k) in topSpend" :key="k">
    {{k}}：{{v}}
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['list'])

const incomeTotal = computed(()=>{
  return props.list.filter(i=>i.type==='income').reduce((s,i)=>s+i.amount,0)
})
const expenseTotal = computed(()=>{
  return props.list.filter(i=>i.type==='expense').reduce((s,i)=>s+i.amount,0)
})
const balance = computed(()=> incomeTotal.value - expenseTotal.value)

const topSpend = computed(()=>{
  const map = {}
  props.list.filter(i=>i.type==='expense').forEach(item=>{
    map[item.category] = (map[item.category]||0)+item.amount
  })
  return Object.fromEntries(Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5))
})
</script>