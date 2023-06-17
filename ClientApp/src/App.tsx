import { Routes, Route } from 'react-router';
import { Home } from "./routes/Home.tsx";
import { PropertiesList } from "./routes/properties/PropertiesList.tsx";
import { PropertiesEdit } from "./routes/properties/PropertiesEdit.tsx";
import { Layout } from "./Layout.tsx";
import { LiensList } from "./routes/liens/LiensList.tsx";
import { HomeownersList } from "./routes/homeowners/HomeownersList.tsx";
import { HomeownersEdit } from "./routes/homeowners/HomeownersEdit.tsx";
import { NewPayment } from "./routes/payments/NewPayment.tsx";
import { HomeownersDetails } from "./routes/homeowners/details/HomeownersDetails.tsx";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/Homeowners' element={<HomeownersList/>}/>
          <Route path='/Homeowners/:action' element={<HomeownersEdit/>}/>
          <Route path='/Homeowners/Details/:id' element={<HomeownersDetails/>}/>

          <Route path='/Liens' element={<LiensList/>}/>

          <Route path='/Payments/New' element={<NewPayment/>}/>
          
          <Route path='/Properties' element={<PropertiesList/>}/>
          <Route path='/Properties/:action' element={<PropertiesEdit/>}/>
        </Routes>
      </Layout>
  )
}

export default App
