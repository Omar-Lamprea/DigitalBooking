import SuggestionCard from '../SuggestionCard/SuggestionsCard';

const Suggestions = () => {
  return (
    <section className="suggestions__container">
      <h3>Buscar por tipo de alojamiento</h3>
      <div className="suggestions__content">
        {Array(4).fill().map((_, index) => {
          <SuggestionCard key={index} />
        })}
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </section>
  )
};

export default Suggestions;