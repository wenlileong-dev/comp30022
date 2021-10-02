import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarDays from "../../components/Calendar/CalendarDays";
import PopoverEventDetail from "../../components/Calendar/PopoverEventDetail";
const mockEvents = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    {
      people: [],
      meetingNotes: "",
      _id: "6155452462f2dd3e2ce8abda",
      title: "Test 24",
      description: "Description",
      date: "2021-09-24T05:03:21.000Z",
      time: "2021-09-30T07:00:00.018Z",
      eventType: "Online",
      location: "Zoom",
      userID: "614d7378de23b63284235ab6",
      timeInNumbers: 1020,
      id: "6155452462f2dd3e2ce8abda",
    },
  ],
  [
    {
      people: ["Anna", "Joe"],
      meetingNotes: "",
      _id: "6155456262f2dd3e2ce8abdd",
      title: "Test 25",
      date: "2021-09-25T05:04:19.000Z",
      time: "2021-09-30T08:00:00.823Z",
      eventType: "Online",
      location: "Zoom",
      userID: "614d7378de23b63284235ab6",
      timeInNumbers: 1080,
      id: "6155456262f2dd3e2ce8abdd",
    },
  ],
  [],
  [
    {
      people: [],
      meetingNotes: "",
      _id: "6155494c24739e1bd8d4b9a9",
      title: "Test 27",
      date: "2021-09-27T05:21:05.000Z",
      time: "2021-09-30T10:01:00.461Z",
      eventType: "Online",
      location: "Google Meet",
      userID: "614d7378de23b63284235ab6",
      timeInNumbers: 1201,
      id: "6155494c24739e1bd8d4b9a9",
    },
  ],
  [
    {
      people: [],
      meetingNotes: "",
      _id: "6155495724739e1bd8d4b9ac",
      title: "Test 28",
      date: "2021-09-28T05:21:18.000Z",
      time: "2021-09-30T11:00:00.332Z",
      eventType: "Online",
      location: "Microsoft Team",
      userID: "614d7378de23b63284235ab6",
      timeInNumbers: 1260,
      id: "6155495724739e1bd8d4b9ac",
    },
  ],
  [],
  [
    {
      people: [],
      meetingNotes: "",
      _id: "6155457a62f2dd3e2ce8abe0",
      title: "Test 30",
      date: "2021-09-30T05:04:48.000Z",
      time: "2021-09-30T13:00:00.859Z",
      eventType: "Online",
      location: "Zoom",
      userID: "614d7378de23b63284235ab6",
      timeInNumbers: 1380,
      id: "6155457a62f2dd3e2ce8abe0",
    },
  ],
];
const month = 8;
const year = 2021;
test("Snaphot Testing for Calendar Title", () => {
  const component = renderer.create(
    <CalendarTitle month={month} year={year} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Snapshot Testing for Calendar Header", () => {
  const component = renderer.create(<CalendarHeader />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Snapshot Testing for Calendar Days", () => {
  const component = renderer.create(
    <CalendarDays month={month} year={year} events={mockEvents} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Snaphot Testing for Event Details", () => {
  const component = renderer.create(
    <PopoverEventDetail events={mockEvents[29]} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
