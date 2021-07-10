import Form from "./components/Form";
import Header from "./components/Header";
import Login from "./components/Login";
import Post from "./components/PostList";
import Register from "./components/Register";

function App() {
  return (
    <div className="container">

      <Header />
      <Form />
      <Post />
      <Login />
      <Register />

    </div>
  );
}

export default App;
