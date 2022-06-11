import { AppFooter } from "./cmps/AppFooter";
import { AppHeader } from "./cmps/AppHeader";
//@ts-ignore
import { StaysApp } from "./pages/StaysApp";

function App() {
  return (
    <div className="app-root">
      <h1>App Root</h1>
      <AppHeader />
      <StaysApp></StaysApp>
      <AppFooter />
    </div>
  );
}

export default App;
