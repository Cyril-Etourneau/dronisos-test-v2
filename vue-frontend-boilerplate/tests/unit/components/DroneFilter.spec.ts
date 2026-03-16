import { fireEvent, render } from "@testing-library/vue";
import DroneFilter from "@/components/DroneFilter.vue";
import { DroneStatus } from "@/drones/status";

const VCardStub = {
  name: "v-card",
  template: '<div><slot /></div>',
};

const VCardTitleStub = {
  name: "v-card-title",
  template: '<div><slot /></div>',
};

const VCardTextStub = {
  name: "v-card-text",
  template: '<div><slot /></div>',
};

const VBtnStub = {
  name: "v-btn",
  template: '<button data-testid="toggle-btn" @click="$emit(\'click\')"><slot /></button>',
};

const VIconStub = {
  name: "v-icon",
  template: '<span data-testid="toggle-icon"><slot /></span>',
};

const VSpacerStub = {
  name: "v-spacer",
  template: '<div />',
};

const VChipStub = {
  name: "v-chip",
  template: '<div data-testid="active-chip"><slot /></div>',
};

const VDividerStub = {
  name: "v-divider",
  template: '<div />',
};

const VExpandTransitionStub = {
  name: "v-expand-transition",
  template: '<div><slot /></div>',
};

const VTextFieldStub = {
  name: "v-text-field",
  props: ["value"],
  template: `
    <input
      data-testid="name-filter"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  `,
};

const VSelectStub = {
  name: "v-select",
  props: ["value", "items"],
  template: `
    <input
      data-testid="status-filter"
      :data-items="JSON.stringify(items)"
      :value="value.join(',')"
      @input="$emit('input', $event.target.value ? $event.target.value.split(',') : [])"
    >
  `,
};

const stubs = {
  "v-card": VCardStub,
  "v-card-title": VCardTitleStub,
  "v-card-text": VCardTextStub,
  "v-btn": VBtnStub,
  "v-icon": VIconStub,
  "v-spacer": VSpacerStub,
  "v-chip": VChipStub,
  "v-divider": VDividerStub,
  "v-expand-transition": VExpandTransitionStub,
  "v-text-field": VTextFieldStub,
  "v-select": VSelectStub,
};

describe("DroneFilter.vue", () => {
  it("emits a change payload when name filter changes", async () => {
    const { emitted, getByTestId } = render(DroneFilter, { stubs });

    await fireEvent.update(getByTestId("name-filter"), "Alpha");

    const changeEvents = emitted().change;

    expect(changeEvents).toBeTruthy();
    expect(changeEvents?.[changeEvents.length - 1][0]).toEqual({
      name: "Alpha",
      status: [],
    });
  });

  it("emits a change payload when status filter changes", async () => {
    const { emitted, getByTestId } = render(DroneFilter, { stubs });

    await fireEvent.update(getByTestId("status-filter"), "OK,LOW_BATTERY");

    const changeEvents = emitted().change;

    expect(changeEvents).toBeTruthy();
    expect(changeEvents?.[changeEvents.length - 1][0]).toEqual({
      name: "",
      status: [DroneStatus.Ok, DroneStatus.LowBattery],
    });
  });

  it("provides DroneStatus values to status options", () => {
    const { getByTestId } = render(DroneFilter, { stubs });

    const statusFilter = getByTestId("status-filter");

    expect(statusFilter.getAttribute("data-items")).toBe(
      JSON.stringify(Object.values(DroneStatus)),
    );
  });

  it("shows active filter count and toggles collapse icon", async () => {
    const { queryByTestId, getByTestId } = render(DroneFilter, { stubs });

    expect(queryByTestId("active-chip")).toBeNull();
    expect(getByTestId("toggle-icon").textContent?.trim()).toBe("mdi-chevron-up");

    await fireEvent.update(getByTestId("name-filter"), "A");

    expect(getByTestId("active-chip").textContent).toContain("1 active");

    await fireEvent.click(getByTestId("toggle-btn"));

    expect(getByTestId("toggle-icon").textContent?.trim()).toBe("mdi-chevron-down");
  });
});
