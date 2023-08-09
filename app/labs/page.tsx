import TitleBar from "./components/title-bar";
import ListExercises from "./components/list-exercises";

let links = [
  {
    path: '/labs/gradient-generator',
    title: 'Gradient Generator',
    section: 'tools'
  },
  {
    path: '/labs/eloquent-js-exercises',
    title: 'Eloquent JS Exercises',
    section: 'exercises'
  },
  {
    path: "https://codepen.io/abstract_code",
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
