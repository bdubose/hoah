import { Routes, Route } from 'react-router';
import { Home } from './routes/Home';
import { PropertiesList } from './routes/properties/PropertiesList';
import { PropertiesEdit } from './routes/properties/PropertiesEdit';
import { Layout } from './Layout';
import { LiensList } from './routes/liens/LiensList';
import { HomeownersList } from './routes/homeowners/HomeownersList';
import { HomeownersEdit } from './routes/homeowners/HomeownersEdit';
import { NewPayment } from './routes/payments/NewPayment';
import { HomeownersDetails } from './routes/homeowners/details/HomeownersDetails';
import { AddLien } from './routes/liens/AddLien';
import { AddClosing } from './routes/closings/AddClosing';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/Closings/New" element={<AddClosing />} />

				<Route path="/Homeowners" element={<HomeownersList />} />
				<Route path="/Homeowners/:action" element={<HomeownersEdit />} />
				<Route path="/Homeowners/Details/:id" element={<HomeownersDetails />} />

				<Route path="/Liens" element={<LiensList />} />
				<Route path="/Liens/New" element={<AddLien />} />

				<Route path="/Payments/New" element={<NewPayment />} />

				<Route path="/Properties" element={<PropertiesList />} />
				<Route path="/Properties/:action" element={<PropertiesEdit />} />
			</Routes>
		</Layout>
	);
}

export default App;
