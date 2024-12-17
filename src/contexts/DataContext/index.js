import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const getData = useCallback(async () => {
    try {
      const fetchedData = await api.loadData();  // On récupère les données
      setData(fetchedData);  // On met à jour l'état avec les données récupérées
    } catch (err) {
      setError(err);
    }
  }, []); 

 /* useEffect(() => {
    if (data) return;
    getData();
  }); */

   useEffect(() => {
    if (!data) {
      getData(); // Si les données sont null, on les charge
    }
  }, [data, getData]);

   // Récupérer le dernier événement de la propriété "events"
   const last = data && data.events
   ? data.events.slice(-1)[0] // On récupère le dernier événement sans modifier le tableau
   : null;

  /* useEffect(() => {
  console.log("Données actuelles:", data);
  console.log("Dernier élément:", last);
}, [data, last]); */

  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // Ajout du paramètre last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
