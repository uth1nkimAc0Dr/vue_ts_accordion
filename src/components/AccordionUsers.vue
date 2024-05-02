<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";
import type { User } from "@/types/index";

const props = defineProps({
  tabHeader: Object,
  users: Array as () => User[],
});
const { tabHeader, users } = toRefs(props);
const updatedUsersData = ref<User[]>([]);

const dataChanges = (id: number, key: keyof User, newValue: string) => {
  const trimmedValue = newValue.trim();
  //remove unused border and finalize vuex integration
  const userIndex = updatedUsersData.value.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    // пользователь в массиве updatedUsersData уже есть
    if (updatedUsersData.value[userIndex][key] !== trimmedValue) {
      updatedUsersData.value[userIndex][key] = trimmedValue;
    }
  } else {
    if (users && users.value) {
      const existingUser = users.value.find((user) => user.id === id);
      const currentValue = existingUser ? existingUser[key] : null;
      // надо сделать проверку, чтобы старые данные не были равны новым данным
      if (currentValue !== trimmedValue) {
        // если пользователя Нет в массиве, то добавляем его
        const newUserData: Partial<User> = { id, [key]: trimmedValue };
        updatedUsersData.value.push(newUserData as User);
      }
    }
  }
};
const showUpdates = (id: number) => {
  const user = updatedUsersData.value.find((user) => user.id === id);
  if (updatedUsersData.value.length === 0) {
    alert("Данные пользователей не изменены");
    return;
  }
  if (!user) {
    alert("У этого пользователя данные не изменились");
    return;
  }
  let changes = Object.entries(user)
    .filter(([key, value]) => key !== "id" && value !== undefined)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  if (changes) {
    alert(`Измененные данные пользователя № ${id}:\n${changes}`);
  }
};
</script>

<template>
  <div>
    <PrimeAccordion :multiple="true">
      <PrimeAccordionTab
        :expanded-icon="tabHeader?.expandedIcon"
        :collapsed-icon="tabHeader?.collapsedIcon"
        v-for="user in users"
        :key="user.id"
        class="content-row"
      >
        <template v-slot:header>
          <div
            v-for="key in ['name', 'email', 'phone', 'website']"
            :key="key"
            class="content-split"
          >
            <div>
              {{ user[key] }}
            </div>
          </div>
        </template>
        <div class="typesSave">
          <div class="table">
            <div class="row-up">
              <div class="cell">ADDRESS</div>
              <div class="cell">COMPANY</div>
              <div class="cell">BASIC INFO</div>
            </div>

            <div class="row-down">
              <div class="first-cell cell-padding cell">
                <div>
                  <div class="custom-label">Street</div>
                  <input
                    type="text"
                    v-model="user.address.street"
                    @change=" (e) => e.target && dataChanges(user.id, 'Street', (e.target as HTMLInputElement).value)
                    "
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Suite</div>
                  <input
                    type="text"
                    v-model="user.address.suite"
                    @change=" (e) => e.target && dataChanges(user.id,'Suite', (e.target as HTMLInputElement).value)
                "
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">City</div>
                  <input
                    type="text"
                    v-model="user.address.city"
                    @change="(e)=>e.target && dataChanges(user.id, 'City', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Zipcode</div>
                  <input
                    type="text"
                    v-model="user.address.zipcode"
                    @change="(e)=>e.target && dataChanges(user.id, 'Zipcode', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
              </div>

              <div class="second-cell cell-padding cell">
                <div>
                  <div class="custom-label">Name</div>
                  <input
                    type="text"
                    v-model="user.company.name"
                    @change="(e)=>e.target && dataChanges(user.id, 'Company name', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">CatchPhrase</div>
                  <input
                    type="text"
                    v-model="user.company.catchPhrase"
                    @change="(e)=>e.target && dataChanges(user.id, 'CatchPhrase', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Bs</div>
                  <input
                    type="text"
                    v-model="user.company.bs"
                    @change="(e)=>e.target && dataChanges(user.id, 'Bs', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
              </div>

              <div class="third-cell cell-padding cell">
                <div>
                  <div class="custom-label">Name</div>
                  <input
                    type="text"
                    v-model="user.name"
                    @change="(e)=>e.target && dataChanges(user.id, 'Name', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Username</div>
                  <input
                    type="text"
                    v-model="user.username"
                    @change="(e)=>e.target && dataChanges(user.id, 'Username', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Email</div>
                  <input
                    type="text"
                    v-model="user.email"
                    @change="(e)=>e.target && dataChanges(user.id, 'Email', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Phone</div>
                  <input
                    type="text"
                    v-model="user.phone"
                    @change="(e)=>e.target && dataChanges(user.id, 'Phone', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
                <div>
                  <div class="custom-label">Website</div>
                  <input
                    type="text"
                    v-model="user.website"
                    @change="(e)=>e.target && dataChanges(user.id, 'Website', (e.target as HTMLInputElement).value)"
                    class="input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="button-cell">
            <i
              class="pi pi-check"
              style="color: slateblue"
              @click="showUpdates(user.id)"
            ></i>
          </div>
        </div>
      </PrimeAccordionTab>
    </PrimeAccordion>
  </div>
</template>
<style lang="scss">
.typesSave {
  padding: 12px 32px 8px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}
.table {
  display: table;
  width: 100%;
  border-radius: 10px;
}
.p-accordion-toggle-icon {
  color: #ffd300;
  width: 2%;
  height: 20px;
  padding-left: 8px;
  padding-right: 16px;
}
.p-accordion-tab {
  padding: 12px 0px;
  width: 100%;
  outline: 1px solid #ffd200;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.p-accordion-header-link {
  height: 16px !important;
}
.p-accordion-header-action {
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  position: relative;
  text-decoration: none;
}

.pi-check:before {
  height: 24px;
  font-weight: 900;
  text-align: center;
  font-size: 25px;
  color: #5f7465;
}

.row-up,
.row-down {
  display: table-row;
}

.row-up > * {
  display: table-cell;
  width: 500px;
  padding-top: 12px;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 12px;
  padding-left: 32px;
}

.row-up {
  &:first-child {
    border-top-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
  }
}
.cell {
  display: table-cell;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.first-cell {
  border-bottom-left-radius: 4px;
  padding: 20px 32px 68px 32px;
}
.second-cell {
  padding: 0px 32px;
  padding-top: 20px;
}
.third-cell {
  padding: 20px 24px 24px 32px;
  border-bottom-right-radius: 4px;
}

.first-cell > *,
.second-cell > *,
.third-cell > * {
  margin-bottom: 12px;
}

.button-cell {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 32px;
  margin-left: 32px;
  padding-top: 8px;
  border-radius: 4px;
  background-color: #ffd300;
}
.custom-label {
  font-weight: 400;
  font-size: 12px;
}

.input {
  width: calc(100% - 40px);
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  border: 1px solid #d9dbda;
  border-radius: 4px;
  margin-top: 8px;
  padding-left: 20px;
}
</style>
