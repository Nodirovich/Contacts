<template>
  <div class="container">
    <h1 class="text-center">Контакты</h1>

    <div class="loader" v-if="!contacts.length">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else>
      <Search />

      <div v-for="contact in contacts" :key="contact.id">
        <router-link v-if="search(contact.name)" :to="'contact/' + contact.id">
          <Contact :name="contact.name" />
        </router-link>
      </div>
    </div>

    <router-link to="/create" class="add btn-primary">
      <span class="material-icons">
        add
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Search from "@/components/Search"
import Contact from "@/components/Contact"

export default {
  components: { Search, Contact },
  computed: {
    ...mapState({
      contacts: state => state.list.contacts,
      textSearch: state => state.list.search
    })
  },
  methods: {
    ...mapActions({
      getContact: 'list/getContacts'
    }),
    search(name) {
      let text = this.textSearch.trim().toLocaleLowerCase()
      return name.toLocaleLowerCase().includes(text)
    }
  },
  mounted() {
    this.getContact()
  }
}
</script>
