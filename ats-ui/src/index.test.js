import Index from "./index.js";

it("renders without crashing", () => {
    expect(JSON.stringify(Index)).toMatchSnapshot();
});