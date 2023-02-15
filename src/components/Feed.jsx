import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <main className="grid grid-cols-9">
      <section className="flex flex-col col-span-9 lg:col-span-5 max-w-full mx-auto">
        <div className="max-w-xs md:max-w-lg">
          <Stories />
        </div>
        <div className="max-w-xs md:max-w-lg">
          <Posts />
        </div>
      </section>

      <section className="hidden lg:block lg:col-span-4">
        <div className="h-32" />

        <div className="sticky top-10 max-w-sm">
          <MiniProfile />
          <Suggestions />
        </div>
        <div></div>
      </section>
    </main>
  );
}

export default Feed;
