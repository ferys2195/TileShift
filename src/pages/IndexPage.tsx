import Footer from "../components/Footer";
import Puzzle from "../components/Puzzle";

export default function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-3">
        <div className="text-center">
          <h1 className="mb-1 text-2xl font-bold">Box Puzzle Game</h1>
        </div>
      </header>
      <div className="container mx-auto flex-1">
        <Puzzle />
      </div>
      <footer className="container mx-auto">
        <Footer />
      </footer>
    </div>
  );
}
