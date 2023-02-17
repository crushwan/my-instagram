import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <main className="grid grid-cols-9">
      <section className="pt-5 xl:pt-10 grid grid-cols-1 col-span-9 lg:col-span-5 max-w-full mx-auto">
        <div className="max-w-xs md:max-w-xl">
          <Stories />
        </div>
        <div className="max-w-xs md:max-w-xl xl:pl-20">
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
