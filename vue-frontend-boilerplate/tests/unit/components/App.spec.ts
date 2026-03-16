import { render } from "@testing-library/vue";
import App from "@/App.vue";

const VAppStub = {
  name: "v-app",
  template: '<div data-testid="v-app"><slot /></div>',
};

const VAppBarStub = {
  name: "v-app-bar",
  template: '<header data-testid="v-app-bar"><slot /></header>',
};

const VImgStub = {
  name: "v-img",
  props: ["src", "alt"],
  template: '<img data-testid="logo" :src="src" :alt="alt">',
};

const VToolbarTitleStub = {
  name: "v-toolbar-title",
  template: '<h1 data-testid="toolbar-title"><slot /></h1>',
};

const VMainStub = {
  name: "v-main",
  template: '<main data-testid="v-main"><slot /></main>',
};

const VContainerStub = {
  name: "v-container",
  template: '<section data-testid="v-container"><slot /></section>',
};

const RouterViewStub = {
  name: "RouterView",
  template: '<div data-testid="router-view">Route content</div>',
};

const stubs = {
  "v-app": VAppStub,
  "v-app-bar": VAppBarStub,
  "v-img": VImgStub,
  "v-toolbar-title": VToolbarTitleStub,
  "v-main": VMainStub,
  "v-container": VContainerStub,
  "router-view": RouterViewStub,
};

describe("App.vue", () => {
  it("renders the application shell with title and logo", () => {
    const { getByTestId, getByText } = render(App, { stubs });

    expect(getByTestId("v-app")).toBeTruthy();
    expect(getByTestId("v-app-bar")).toBeTruthy();
    expect(getByText("Dronisos's drone tracking")).toBeTruthy();

    const logo = getByTestId("logo");
    expect(logo.getAttribute("alt")).toBe("Logo");
    expect(logo.getAttribute("src")).toBe("@/assets/logo.png");
  });

  it("renders the router outlet inside the main container", () => {
    const { getByTestId, getByText } = render(App, { stubs });

    expect(getByTestId("v-main")).toBeTruthy();
    expect(getByTestId("v-container")).toBeTruthy();
    expect(getByTestId("router-view")).toBeTruthy();
    expect(getByText("Route content")).toBeTruthy();
  });
});
