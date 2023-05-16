import SuggestionCard from '../SuggestionCard/SuggestionsCard';

const Suggestions = () => {
  return (
    <div className="suggestions__container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="suggetions__content">
      <SuggestionCard />
      </div>
    </div>
  )
};

export default Suggestions;