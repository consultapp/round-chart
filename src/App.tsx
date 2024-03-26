import UIContextProvider from "./UIContext/provider";
import FieldComponent from "./components/Field/FieldComponent";

function App() {
  return (
    <div className="root">
      <UIContextProvider>
        <FieldComponent />
      </UIContextProvider>
    </div>
  );
}

export default App;
