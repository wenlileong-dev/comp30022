import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarHeader from "../../components/Calendar/CalendarHeader";

test("Snaphot Testing for Calendar Title", () => {
  const component = renderer.create(<CalendarTitle month={9} year={2021} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Snapshot Testing for Calendar Header", () => {
  const component = renderer.create(<CalendarHeader />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
