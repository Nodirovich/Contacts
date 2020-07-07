<template>
  <div class="container">
     <router-link
      :to="'/contact/' + this.$route.params.id"
      class="btn btn-light back"
    >
      Назад
    </router-link>

    <div class="loader" v-if="!informations.length">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="edit" v-else>
      <div class="user__icon">
        <span class="material-icons">
          account_circle
        </span>
      </div>

       <input
          type="text"
          name="name"
          v-model="user.name"
          class="input"
          placeholder="Полное Имя"
        >

        <div v-for="(info, index) in informations" :key="index">
          <Input :info="info" :id="index" />
        </div>

        <button
          class="btn__right btn btn-success"
          @click="editHandler"
        >
        <span class="material-icons">
          done
        </span>
      </button>

    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { mapState } from 'vuex'

export default {
  components: { Input },
  computed: {
    ...mapState({
      user: state => state.contact.user,
      informations: state => state.contact.info
    })
  },
  methods: {
    editUser () {
      this.$store.dispatch('contact/getEditUser', this.$route.params.id)
    },
    async editHandler () {
      const editUser = {
        name: this.user.name,
        info: this.informations,
        id: this.user.id,
        uid: this.$route.params.id
      }
      await this.$store.dispatch('contact/editUser', editUser)
      this.$router.push(`/contact/${this.$route.params.id}`)
    }
  },
  mounted () {
    this.editUser()
  },
  beforeDestroy () {
    this.$store.commit('contact/removeUser')
  }
}
</script>

<style>

</style>
