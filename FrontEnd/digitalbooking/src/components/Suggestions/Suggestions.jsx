import SuggestionCard from '../SuggestionCard/SuggestionsCard';

const Suggestions = () => {
  return (
    <section className="suggestions__container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="suggestions__content">
        <SuggestionCard />
      </div>
    </section>
  )
};

export default Suggestions;