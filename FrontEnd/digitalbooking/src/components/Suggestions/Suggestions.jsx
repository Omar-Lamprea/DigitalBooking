import { useEffect, useState } from 'react';
import SuggestionCard from '../SuggestionCard/SuggestionsCard';

const Suggestions = () => {

  const [data, setData] = useState();

  const getSuggestions = async () => {
    const suggestions = await fetch('http://18.218.175.122:8080/digital-booking/product/all');
    const parsedSuggestions = await suggestions.json();
    console.log('suggestions', parsedSuggestions);
    setData(parsedSuggestions);
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <section className="suggestions__container">
      <div className="suggestions__wrapper container">
        <h3>Buscar por tipo de alojamiento</h3>
        <div className="suggestions__content">
          {data && data.map((suggestion, index) => (
            <SuggestionCard key={index} suggestion={suggestion} />
          ))}
            
        </div>
      </div>
    </section>
  )
};

export default Suggestions;