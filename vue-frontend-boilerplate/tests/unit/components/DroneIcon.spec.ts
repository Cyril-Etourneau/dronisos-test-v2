import { render } from "@testing-library/vue";
import DroneIcon from "@/components/DroneIcon.vue";

const LIconStub = {
  name: "LIcon",
  props: ["iconSize", "iconAnchor", "popupAnchor"],
  template: `
    <div
      data-testid="l-icon"
      :data-icon-size="JSON.stringify(iconSize)"
      :data-icon-anchor="JSON.stringify(iconAnchor)"
      :data-popup-anchor="JSON.stringify(popupAnchor)"
    >
      <slot />
    </div>
  `,
};

const VIconStub = {
  name: "v-icon",
  template: '<i class="drone-icon-stub"><slot /></i>',
};

describe("DroneIcon.vue", () => {
  it("passes icon geometry props to LIcon", () => {
    const { getByTestId } = render(DroneIcon, {
      stubs: {
        LIcon: LIconStub,
        "v-icon": VIconStub,
      },
    });

    const lIcon = getByTestId("l-icon");

    expect(lIcon.getAttribute("data-icon-size")).toBe("[16,16]");
    expect(lIcon.getAttribute("data-icon-anchor")).toBe("[8,8]");
    expect(lIcon.getAttribute("data-popup-anchor")).toBe("[0,0]");
  });

  it("uses the matching class for each supported color", () => {
    const colors = ["green", "orange", "red", "black"];

    colors.forEach((color) => {
      const { container } = render(DroneIcon, {
        props: {
          color,
        },
        stubs: {
          LIcon: LIconStub,
          "v-icon": VIconStub,
        },
      });

      const icon = container.querySelector(".drone-icon");

      expect(icon).not.toBeNull();
      expect(icon?.classList.contains(`drone-status--${color}`)).toBe(true);
    });
  });

  it("uses black class when color is not provided", () => {
    const { container } = render(DroneIcon, {
      stubs: {
        LIcon: LIconStub,
        "v-icon": VIconStub,
      },
    });

    const icon = container.querySelector(".drone-icon");

    expect(icon).not.toBeNull();
    expect(icon?.classList.contains("drone-status--black")).toBe(true);
  });
});
