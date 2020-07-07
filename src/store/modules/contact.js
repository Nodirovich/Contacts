import axios from 'axios'
import URL from '@/static/url'

const info = {
  types: [
    {val: "tel", text: 'Номер'},
    {val: "email", text: 'Email'},
    {val: "text", text: 'Адрес'}
  ],
  type: {
    val: 'tel',
    text: 'Номер'
  },
  value: ''
}

const state = () => ({
  user: {},
  info: []
})

const getters = {}

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  removeUser(state) {
    state.user = {};
    state.info = [];
  },
  setType(state, id) {
    state.info[id].value = "";
  },
  addInfo(state, inform) {
    if (inform) {
      state.info.push(...inform);
    } else {
      state.info.push({ ...info });
    }
  },
  removeEmpty(state, id) {
    state.info = state.info.filter((el, index) => index !== id).reverse();
  }
};

const actions = {
  async createUser({commit}, newUser) {
    const user = structurData(newUser)
    await axios.post(`${URL}.json`, user)
  },
  async getUser({commit}, id) {
    const data = await axios.get(`${URL}/${id}.json`)
    const user = await data.data
    commit('setUser', user)
  },
  changeType({commit}, id) {
    commit('setType', id)
  },
  toggleInput({commit, state}) {
    const empty = state.info.filter(item => !item.value)
    if (empty.length === 0) {
      commit('addInfo')
    } else if (empty.length === 2) {
      const id = state.info.reverse().findIndex(el => el.value === '')
      commit('removeEmpty', id)
    }
  },
  async getEditUser({commit}, id) {
    const res = await axios.get(`${URL}/${id}.json`)
    const user = await res.data
    commit('setUser', user)
    commit('addInfo', structurInfo(user))
    commit('addInfo')
  },
  async editUser({commit}, editUser) {
    const user = structurData(editUser)
    await axios.put(`${URL}/${editUser.uid}.json`, user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function structurInfo(user) {
  return [
    ...typeHandler(user, 'email', 'email', 'Email'),
    ...typeHandler(user, 'phone', 'tel', 'Номер'),
    ...typeHandler(user, 'address', 'text', 'Адрес'),
  ]
}

function typeHandler(user, type, inpType, text) {
  let arr = []
  user[type].map(el => {
    let type = {
      val: inpType,
      text
    }
    let value = el
    let types = [...info.types]
    arr.push({types, type, value})
  })
  return arr
}

function structurData(user) {
  let email = [],
    phone = [],
    address = [];
  user.info
    .filter(el => el.value)
    .map(el => {
      if (el.type.val === 'tel') {
        phone.push(el.value)
      } else if (el.type.val === 'email') {
        email.push(el.value)
      } else {
        address.push(el.value)
      }
    })
  return {
    name: user.name,
    id: user.id || Date.now(),
    email,
    phone,
    address
  }
}
