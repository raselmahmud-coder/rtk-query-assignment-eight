import Footer from "./components/Footer";
import FooterCompletedTask from "./components/FooterCompletedTask";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import NavbarCompletedTask from "./components/NavbarCompletedTask";
import TodoList from "./components/TodoList";
import TodoListCompletedTask from "./components/TodoListCompletedTask";

function App() {
    return (
            <div className="grid pb-4 place-items-center bg-blue-100 px-6 font-sans">
                <Navbar />

                <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
                    <Header />

                    <hr className="mt-4" />

                    <TodoList />

                    <hr className="mt-4" />

                    <Footer />
                </div>
            </div>


         
    );
}

export default App;
