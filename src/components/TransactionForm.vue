<template>
  <div class="card">
    <h3>📝 新增收支</h3>
    <div class="flex-row">
      <select v-model="type">
        <option value="expense">支出</option>
        <option value="income">收入</option>
      </select>
      <select v-model="category">
        <option v-for="c in categoryList" :key="c">{{ c }}</option>
      </select>
      <input v-model.number="amount" type="number" placeholder="金额" />
      <input v-model="remark" placeholder="备注" />
      <button @click="submit">添加</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])

const type = ref('expense')
const category = ref('餐饮')
const amount = ref('')
const remark = ref('')

const categoryList = ['餐饮', '交通', '购物', '娱乐', '医疗', '工资', '奖金', '兼职']

const submit = () => {
  if (!amount || amount <= 0) return alert('请输入有效金额')
  emit('add', {
    type: type.value,
    category: category.value,
    amount: amount.value,
    remark: remark.value,
    time: new Date().toLocaleString()
  })
  amount.value = ''
  remark.value = ''
}
</script>