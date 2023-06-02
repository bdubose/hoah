import {useGetAllHomeownersQuery} from "../api.ts";
import {Grid} from "../components/Grid.tsx";
import {Link} from "react-router-dom";
import styles from './HomeownersList.module.css';

export const HomeownersList = () => {
  const { data: homeowners } = useGetAllHomeownersQuery();
  
  return <>
    <div className={styles.titleBar}>
      <h1>Homeowners</h1>
      <Link to='/Homeowners/New' className='button'>Add Homeowner</Link>
    </div>
    <Grid entities={homeowners ?? []} config={[
      { title: 'Id', value: ho => ho.homeownerId },
      { title: 'Property Id', value: ho => ho.propertyId },
      { title: 'Name', value: ho => ho.fullName },
      { title: 'Email', value: ho => ho.email },
    ]}/>
  </>
}