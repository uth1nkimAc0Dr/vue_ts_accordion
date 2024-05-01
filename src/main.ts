import { createApp } from "vue";
import App from "./App.vue";
import PrimeAccordion from "primevue/accordion";
import PrimeAccordionTab from "primevue/accordiontab";
import "primeicons/primeicons.css";
const app = createApp(App);
app.component("PrimeAccordion", PrimeAccordion);
app.component("PrimeAccordionTab", PrimeAccordionTab);
app.mount("#app");
