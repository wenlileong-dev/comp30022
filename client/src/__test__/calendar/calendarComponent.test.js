import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CalendarTitle from "../../components/Calendar/CalendarTitle";
import CalendarHeader from "../../components/Calendar/CalendarHeader";
import CalendarDays from "../../components/Calendar/CalendarDays";
import CalendarDay from "../../components/Calendar/CalendarDay";

afterEach(() => {
  cleanup();
});

describe("Testing Calendar Title", () => {
  let month = 8;
  let year = 2021;
  const nextMonth = jest.fn();
  const prevMonth = jest.fn();
  test("testing calendar title display correct month", () => {
    render(<CalendarTitle month={month} year={year} />);

    const calendarTitleElement = screen.getByTitle("calendar-title");
    expect(calendarTitleElement).toBeInTheDocument();
    expect(calendarTitleElement).toHaveTextContent("September");
    expect(calendarTitleElement).toHaveTextContent("2021");
  });

  test("testing next month and previous month function", () => {
    render(
      <CalendarTitle
        month={month}
        year={year}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
    );
    const prevMonthElement = screen.getByTestId("ArrowLeftIcon");
    const nextMonthElement = screen.getByTestId("ArrowRightIcon");
    fireEvent.click(prevMonthElement);
    expect(prevMonth).toHaveBeenCalled();
    fireEvent.click(nextMonthElement);
    expect(nextMonth).toHaveBeenCalled();
  });

  test("render add event form when add new event button is clicked", () => {
    render(<CalendarTitle month={month} year={year} />);
    const addNewEventButton = screen.getByRole("button", { name: "New Event" });
    fireEvent.click(addNewEventButton);
    const popupElement = screen.getByTestId("modal-popup");
    const addEventFormElement = screen.getByTestId("add-event-form");
    expect(popupElement).toBeInTheDocument();
    expect(addEventFormElement).toBeInTheDocument();
  });
});

test("testing calendar header", () => {
  render(<CalendarHeader />);
  const calendarHElement = screen.getByTestId("mytestid");
  expect(calendarHElement).toBeInTheDocument();
});

describe("show calendar events", () => {
  let month = 8;
  let year = 2021;
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
  test("show number of days in a month", async () => {
    render(
      <CalendarDays
        month={month}
        year={year}
        events={[...Array(30)].map((e) => [])}
      />
    );
    let additionalSpace = new Date(year, month, 1).getDay();
    const calendarDayComponenet = screen.getAllByTestId("calendar-a-day");
    expect(calendarDayComponenet).toHaveLength(30 + additionalSpace);
  });

  test("show event for a day", () => {
    render(<CalendarDay day={1} month={month} year={year} event={event} />);
    const calendarHElement = screen.getByTestId("calendar-a-day");
    expect(calendarHElement).toBeInTheDocument();
    expect(calendarHElement).toHaveTextContent(event[0].title);
    expect(calendarHElement).toHaveTextContent(event[1].title);
  });

  test("event details popup when the day is clicked", () => {
    render(<CalendarDay day={1} month={month} year={year} event={event} />);
    const calendarDayElement = screen.getByTestId("calendar-a-day");
    fireEvent.click(calendarDayElement);
    const popupElement = screen.getByTestId("modal-popup");
    expect(popupElement).toBeInTheDocument();
    const eventDetailComponent = screen.getAllByTestId("event-day-component");
    expect(eventDetailComponent).toHaveLength(2);
    expect(eventDetailComponent[0]).toHaveTextContent(event[0].title);
    expect(eventDetailComponent[1]).toHaveTextContent(event[1].title);
  });

  test("render edit event form when edit event button is clicked", () => {
    render(<CalendarDay day={1} month={month} year={year} event={event} />);
    const calendarDayElement = screen.getByTestId("calendar-a-day");
    fireEvent.click(calendarDayElement);
    const editEventButton = screen.getAllByRole("button", {
      name: "Edit Event",
    });
    fireEvent.click(editEventButton[0]);
    const editEventFormComponent = screen.getByTestId("edit-event-form");
    expect(editEventFormComponent).toBeInTheDocument();
    expect(editEventFormComponent).toHaveTextContent(event[0].title);
  });
});
