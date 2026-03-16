import DroneFilter from "@/components/DroneFilter.vue";

export default {
    title: "Components/DroneFilter",
    component: DroneFilter,
    tags: ["autodocs"],
};

const Template = (args, { argTypes }) => ({
    components: { DroneFilter },
    props: Object.keys(argTypes),
    data() {
        return {
            currentFilter: {
                name: "",
                status: [],
            },
            lastEmitted: null,
        };
    },
    methods: {
        onChange(filter) {
            this.currentFilter = filter;
            this.lastEmitted = JSON.stringify(filter);
        },
    },
    template: `
    <div>
      <DroneFilter v-bind="$props" @change="onChange" />
      <div class="mt-4 text-body-2">
        Last emitted: {{ lastEmitted || "(none)" }}
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
