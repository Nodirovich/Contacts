<template>
  <div class="container">
    <router-link
      to="/"
      class="btn btn-light back"
    >
      Назад
    </router-link>

    <div class="loader" v-if="!user.id">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="user" v-else>
      <div class="user__icon">
        <span class="material-icons">
          account_circle
        </span>
      </div>
      <h3 class="user__name">
        {{ user.name }}
      </h3>

      <div class="information">
        <div class="information__block">
          <strong>Номер:</strong>
          <div class="information__list">
            <div
              v-for="number in user.phone"
              :key="number"
            >
              {{ number }}
            </div>
          </div>
        </div>

        <div class="information__block">
          <strong>Email:</strong>
          <div class="information__list">
            <div
              v-for="email in user.email"
              :key="email"
            >
              {{email}}
            </div>
          </div>
        </div>

        <div class="information__block">
          <strong>Адрес:</strong>
          <div class="information__list">
            <div
              v-for="address in user.address"
              :key="address"
            >
              {{ address }}
            </div>
          </div>
        </div>
      </div>

      <router-link :to="edit" class="btn__right btn btn-info">
        <span class="material-icons">
          launch
        </span>
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.contact.user
    }),
    edit () {
      return '/edit/' + this.$route.params.id
    }
  },
  methods: {
    getUser () {
      this.$store.dispatch('contact/getUser', this.$route.params.id)
    }
  },
  mounted () {
    this.getUser()
  },
  beforeDestroy () {
    this.$store.commit('contact/removeUser')
  }
}
</script>

<style lang="scss">
  .user {
    &__name {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .information {
    &__block {
      display: flex;
      margin-bottom: 10px;
      strong {
        flex-basis: 15%;
        margin-right: 10px;
        padding: 10px 15px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background: #f5f5f5;
        height: 44px;
      }
    }
    &__list {
      width: 100%;
      div {
        display: flex;
        align-items: center;
        height: 44px;
        width: 100%;
        padding: 0 10px;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
</style>
