import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarDay from "../../components/Calendar/CalendarDay";

afterEach(() => {
  cleanup();
});
test("testing calendar title", () => {
  render(<CalendarTitle month={8} year={2021} />);
  const calendarTitleElement = screen.getByText(/September/i);
  expect(calendarTitleElement).toBeInTheDocument();
});

test("testing calendar header", () => {
  render(<CalendarHeader />);
  const calendarHElement = screen.getByTestId("mytestid");
  expect(calendarHElement).toBeInTheDocument();
});

test("testing calendar day", () => {
  const event = [
    {
      people: [],
      meetingNotes: "",
      _id: "61457c79f8277f402cd5069f",
      title: "Testing 1",
      description: "Description for Testing 1",
      date: "2021-09-18T00:00:00.000Z",
      time: "2021-09-17T23:00:00.992Z",
      eventType: "Offline",
      location: "CBD",
      timeInNumbers: 540,
      id: "61457c79f8277f402cd5069f",
    },
    {
      people: [],
      meetingNotes: "",
      _id: "61457c96f8277f402cd506a2",
      title: "Testing 2",
      description: "Description for Testing 2",
      date: "2021-09-18T00:00:00.000Z",
      time: "2021-09-18T02:00:00.993Z",
      eventType: "Online",
      location: "Microsoft Team",
      timeInNumbers: 720,
      id: "61457c96f8277f402cd506a2",
    },
  ];
  render(<CalendarDay day={1} month={8} year={2021} event={event} />);
  const calendarHElement = screen.getByTestId("1-8");
  expect(calendarHElement).toBeInTheDocument();
  expect(calendarHElement).toHaveTextContent(event[0].title);
  expect(calendarHElement).toHaveTextContent(event[1].title);
});
