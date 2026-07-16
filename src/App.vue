<template>
  <h1>💰个人记账本</h1>
  <TransactionForm @add="addItem"/>
  <StatsSummary :list="transactions"/>
  <TransactionList 
    :list="transactions" 
    @del="delItem"
    @clear="clearAll"
  />
</template>

<script setup>
import { useStorage } from './composables/useStorage'
import TransactionForm from './components/TransactionForm.vue'
import TransactionList from './components/TransactionList.vue'
import StatsSummary from './components/StatsSummary.vue'

// 数据持久化
const transactions = useStorage('ledger-data', [])

const addItem = (row)=>{
  transactions.value.push(row)
}
const delItem = (index)=>{
  transactions.value.splice(index,1)
}
const clearAll = ()=>{
  transactions.value = []
}
</script>