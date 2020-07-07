<template>
  <div class="edit__block">
    <select name="type" v-model="info.type" @change="changeHandler">
      <option
        v-for="type in info.types"
        :key="type.val"
        :value="type"
      >
        {{ type.text }}
      </option>
    </select>

    <input
      :type="info.type.val"
      :placeholder="'Введите свой ' + info.type.text"
      v-model="info.value"
      @input="changeValue"
      @blur="changeValue"
    >
  </div>
</template>

<script>

export default {
  props: ['info', 'id'],
  methods: {
    changeHandler() {
      this.$store.dispatch('contact/changeType', this.id)
      this.$store.dispatch('contact/toggleInput')
    },
    changeValue() {
      this.$store.dispatch('contact/toggleInput')
    }
  }
}
</script>

<style lang="scss">
  .edit {
    &__block {
      display: flex;
      margin-bottom: 10px;
      select {
        flex-basis: 20%;
        min-width: 100px;
        text-align: center;
        padding: 10px;
        border-right: 1px solid #eeeeee;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        cursor: pointer;
      }
      input {
        flex-basis: 80%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px;
      }
    }
  }
</style>
