<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import AccordionUsers from "@/components/AccordionUsers.vue";
import type { User, TabHeader } from "@/types/index";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    AccordionUsers,
  },

  setup() {
    const store = useStore();
    const tabHeader = ref<TabHeader>({
      expandedIcon: "pi pi-chevron-circle-down",
      collapsedIcon: "pi pi-chevron-circle-up",
    });

    const users = computed(() => store.state.users);

    onMounted(() => {
      store.dispatch("fetchUsers");
    });

    return { tabHeader, users };
  },
});
</script>

<template>
  <div class="container">
    <header class="container__header">
      <div class="user">User</div>
    </header>
    <div class="content">
      <div class="content__types">
        <div
          v-for="key in ['Name', 'Email', 'Phone', 'Website']"
          :key="key"
          class="content-type content-split header-row"
        >
          {{ key }}
        </div>
      </div>
      <!-- заголовки аккордеона динамически создаются для каждого и меняются -->
      <AccordionUsers :tabHeader="tabHeader" :users="users"> </AccordionUsers>
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: "Roboto";
}
.container {
  margin: auto;
  max-width: 1752px;
  padding-bottom: 12px;
  &__header {
    width: 100%;
    margin-top: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid black;
  }
}
.user {
  margin-bottom: 32px;
  padding-left: 52px;
  font-weight: 500;
  font-size: 20px;
}
.content {
  &__types {
    display: flex;
    flex-direction: row;
    color: white;
    margin-bottom: 12px;

    .content-type {
      color: #696969;
      font-size: 12px;
      font-weight: 400;
    }
    // Стилизация заголовков
    .header-row {
      font-size: 12px;
      &:nth-child(1) {
        // padding-left: 56px;
        padding-left: 3.4482%;
      }
    }
  }
  margin-left: 60px;
  margin-right: 64px;

  // Стилизация заголовковых динамически прилетающих данных для каждого пользователя
  .content-row {
    font-size: 14px;
  }
  .content-split {
    width: 400px;
  }
}
</style>
