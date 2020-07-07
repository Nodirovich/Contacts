<template>
  <div class="edit__block" :class="toggleClass">
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
    >
  </div>
</template>

<script>

export default {
  props: ['info', 'id'],
  data() {
    return {
      errors: false,
    }
  },
  computed: {
    toggleClass() {
      if (this.info.value == '' && this.id !== 0) {
        return ''
      }
      return this.errors ? 'error' : ''
    }
  },
  methods: {
    changeHandler() {
      this.$store.dispatch('contact/changeType', this.id)
      this.$store.dispatch('contact/setInput')
    },
    changeValue() {
      this.errors = false
      if (this.info.type.val === 'tel') {
        this.info.value = this.info.value.replace(/[A-Za-z!@#$%^&*()]/g, '')
      }
      this.$store.dispatch('contact/setInput')
      this.valid()
    },
    valid() {
      const type = this.info.type.val
      const value = this.info.value
      if (type === 'email') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.errors = !re.test(String(value).toLowerCase());
      }

      if (value.length < 5) {
        this.errors = true
      }
    }
  }
}
</script>

<style lang="scss">
  .edit {
    &__block {
      display: flex;
      margin-bottom: 10px;
      &.error {
        border-radius: 10px;
      }
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
