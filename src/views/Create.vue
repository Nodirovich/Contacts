<template>
  <div class="container">
    <router-link
      to="/"
      class="btn btn-light back"
    >
      Назад
    </router-link>

    <button
      class="btn__right btn btn-success"
      @click="create"
    >
      <span class="material-icons">
        done
      </span>
    </button>

    <div class="create">
      <div class="user__icon">
        <span class="material-icons">
          account_circle
        </span>
      </div>

      <div class="create__info">
        <input
          type="text"
          name="name"
          v-model="name"
          class="input"
          placeholder="Полное Имя"
        >

        <div v-for="(info, index) in informations" :key="index">
          <Input :info="info" :id="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { mapState } from 'vuex'

export default {
  components: { Input },
  data() {
    return {
      name: ''
    }
  },
  computed: mapState({
    informations: state => state.contact.info
  }),
  methods: {
    async create() {
      const newUser = {name: this.name, info: this.informations}
      await this.$store.dispatch('contact/createUser', newUser)
      this.$router.push('/')
    }
  },
  mounted() {
    this.$store.commit('contact/addInfo')
  },
  beforeDestroy() {
    this.$store.commit('contact/removeUser')
  }
}
</script>

<style lang="scss">
  .create {
    padding-top: 15px;
  }
</style>