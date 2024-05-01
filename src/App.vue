<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AccordionUsers from "@/components/AccordionUsers.vue";
import type { User, TabHeader } from "@/types/index";

export default defineComponent({
  components: {
    AccordionUsers,
  },

  setup() {
    const tabHeader = ref<TabHeader>({
      expandedIcon: "pi pi-chevron-circle-down",
      collapsedIcon: "pi pi-chevron-circle-up",
    });

    const users = ref<User[]>([]);

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        users.value = (await response.json()) as User[];
      } catch (error) {
        console.error("Failed to fecth user:", error);
      }
    };
    onMounted(fetchUserData);

    return { tabHeader, users };
  },
});
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="user">User</div>
    </header>
    <div class="content">
      <div class="content__types">
        <div
          v-for="key in ['Name', 'Email', 'Phone', 'Website']"
          :key="key"
          class="content-type content-split first-row"
        >
          {{ key }}
        </div>
      </div>
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
  border: 4px solid black;
}
.header {
  width: 100%;
  margin-top: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid black;
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
  }
  margin-left: 60px;
  margin-right: 64px;
  .first-row {
    font-size: 12px;
    &:nth-child(1) {
      // padding-left: 56px;
      padding-left: 3.4482%;
    }
  }
  .second-row {
    font-size: 14px;
  }
  .content-split {
    width: 400px;
    // font-size: 14px;
  }
}
</style>
// &:nth-child(1) { // padding-left: 40px; // // width: 16.748%; // width: 22%;
// } // // 16.748+18.942+22.044+19.95 // &:nth-child(2) { // // padding-left:
40px; // // width: 18.942%; // width: 24%; // } // &:nth-child(3) { // width:
28%; // } // &:nth-child(4) { // width: 26%; // }
