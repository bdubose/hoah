import { Routes, Route } from 'react-router';
import { Home } from "./routes/Home.tsx";
import { PropertiesList } from "./routes/PropertiesList.tsx";
import { PropertiesEdit } from "./routes/PropertiesEdit.tsx";
import { Layout } from "./Layout.tsx";
import { LiensList } from "./routes/LiensList.tsx";
import { HomeownersList } from "./routes/HomeownersList.tsx";
import { HomeownersEdit } from "./routes/HomeownersEdit.tsx";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/Homeowners' element={<HomeownersList/>}/>
          <Route path='/Homeowners/:action' element={<HomeownersEdit/>}/>

          <Route path='/Liens' element={<LiensList/>}/>

          <Route path='/Properties' element={<PropertiesList/>}/>
          <Route path='/Properties/:action' element={<PropertiesEdit/>}/>
        </Routes>
      </Layout>
  )
}

export default App
