import { User } from "@/types";
import { createStore } from "vuex";
// import { storeKey } from "vuex/types/index.js";

interface State {
  users: User[];
}

const store = createStore<State>({
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = (await response.json()) as User[];
        commit("setUsers", data);
      } catch (error) {
        console.error(`Failed to fetch users:`, error);
      }
    },
  },
});

export default store;
