import {useGetAllHomeownersQuery} from "../../api.ts";
import {Grid} from "../../components/Grid.tsx";
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
      { title: 'Property', value: ho => ho.property },
      { title: 'Name', value: ho => ho.fullName },
      { title: 'Email', value: ho => ho.email },
      { title: '', value: ho => <>
          <Link to={`/Homeowners/${ho.homeownerId}`}>Edit</Link>
          <Link to={`/Homeowners/Details/${ho.homeownerId}`}>Details</Link>
      </>}
    ]}/>
  </>
}