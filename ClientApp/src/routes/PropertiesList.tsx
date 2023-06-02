import {useGetAllPropertiesQuery} from "../api.ts";
import {Grid} from "../components/Grid.tsx";
import styles from './PropertiesList.module.css';
import {Link} from "react-router-dom";
export const PropertiesList = () => {
  const { data: properties } = useGetAllPropertiesQuery();
  
  
  return <>
    <div className={styles.titleBar}>
      <h1>Properties</h1>
      <Link to='/Properties/New' className='button'>Add Property</Link>
    </div>
    <Grid entities={properties ?? []} config={[
      { title: 'Id', value: prop => prop.propertyId },
      { title: 'Street Number', value: prop => prop.streetNumber },
      { title: 'Street', value: prop => prop.street },
    ]}/>
  </>
}