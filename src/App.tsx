import { Toaster } from "./components/ui/sonner";
import Index from "./router/Routes";

function App() {
  return (
    <>
      <Index />
      <Toaster richColors />
    </>
  );
}

export default App;
