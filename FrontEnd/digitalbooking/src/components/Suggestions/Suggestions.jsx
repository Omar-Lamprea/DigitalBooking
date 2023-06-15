import { useEffect, useState } from 'react';
import SuggestionCard from '../SuggestionCard/SuggestionsCard';
import { useContextGlobal } from '../../context/global.context';

const Suggestions = () => {

  const [data, setData] = useState();
  const {state} = useContextGlobal()

  useEffect(() => {
    setData(state.APIdata)
  },[state]);

  return (
    <section className="suggestions__container" id='suggestions-container'>
      <div className="suggestions__wrapper container">
        <h3>{state.titleProducts}</h3>
        <div className="suggestions__content">
          {data && data.length > 0
            ? data.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} />
            ))
            : <p>Ops, no hemos encontrado resultados 🥲</p>
          }
          
        </div>
      </div>
    </section>
  )
}

export default Suggestions;