import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "./pages/Layout.tsx";
import MainPageService from "./services/MainPageService.tsx";
import Services from "./pages/Services.tsx";

const App = () => {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<MainPageService/>}/>
                  <Route path={`/services`} element={<Services/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
