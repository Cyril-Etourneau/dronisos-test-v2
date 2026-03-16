import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";

Vue.use(VueRouter);

const DemoPage = {
    template: `
    <div style="padding: 16px;">
      <h2 style="margin: 0 0 8px;">Dashboard</h2>
      <p style="margin: 0;">This content is rendered from router-view.</p>
    </div>
  `,
};

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            component: DemoPage,
        },
    ],
});

export default {
    title: "App/AppShell",
    component: App,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Top-level application shell with app bar branding and router-view content area.",
            },
        },
    },
};

const Template = () => ({
    components: { App },
    router,
    render(h) {
        return h(App);
    },
});

export const Default = Template.bind({});
