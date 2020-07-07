<template>
  <div class="search">
    <span class="material-icons">
      search
    </span>
    <input
      type="text"
      name="name"
      v-model="name"
      :placeholder="length"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    length () {
      const length = this.$store.getters['list/contactsLength'] || 0
      return length + ' контакта'
    }
  },
  watch: {
    name (newVal, val) {
      this.$store.commit('list/setSearch', newVal)
    }
  }
}
</script>

<style lang="scss">
  .search {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    padding: 0 10px;
    margin: 20px 0;
    border-radius: 20px;
    color: #666;
    span {
      font-size: 22px;
    }
    input {
      width: 100%;
      padding: 6px 10px;
      border: 0;
      outline: none;
      background: #f5f5f5;
    }
  }
</style>
