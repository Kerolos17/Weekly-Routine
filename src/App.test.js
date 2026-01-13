import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders weekly routine checklist", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Weekly Routine Checklist/i)[0];
  expect(linkElement).toBeInTheDocument();
});

test("renders arabic text correctly", () => {
  render(<App />);
  const arabicText = screen.getByText(/الهدف: تمشي أسبوعك بهدوء/i);
  expect(arabicText).toBeInTheDocument();
});

test("renders habit sections", () => {
  render(<App />);
  const spiritualSection = screen.getByText(/الروحيات/i);
  expect(spiritualSection).toBeInTheDocument();
});
