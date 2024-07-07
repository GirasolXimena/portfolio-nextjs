import TitleBar from "./components/title-bar";
import ListExercises from "./components/list-exercises";
import { CODEPEN_URL } from "lib/data";

let links = [
  {
    path: "/labs/eloquent-js-exercises",
    title: "Eloquent JS Exercises",
    section: "📝",
  },
  {
    path: CODEPEN_URL,
    title: "Codepen",
    section: "🔗",
  },
  {
    path: "/labs/c-programming-language",
    title: "C Programming Language",
    section: "📝",
  },
];

export default async function LabsIndexPage() {
  return (
    <>
      <TitleBar title="Labs">
        <ListExercises items={links} />
      </TitleBar>
    </>
  );
}
