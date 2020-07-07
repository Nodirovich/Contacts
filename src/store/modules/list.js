import axios from 'axios'
import URL from '@/static/url'

const state = () => ({
  contacts: [],
  search: ''
})

const getters = {
  contactsLength: s => s.contacts.length,
}

const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts
  },
  setSearch(state, val) {
    state.search = val.trim()
  },
  addContact(state, user) {
    state.contacts.push(user)
  }
}

const actions = {
  async getContacts({commit}) {
    const res = await axios.get(`${URL}.json`)
    const data = await res.data
    const contacts = Object.keys(data).map(key => ({
      ...data[key],
      id: key
    }))
    commit('setContacts', contacts)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
