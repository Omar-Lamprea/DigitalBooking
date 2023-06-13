import PropTypes from 'prop-types';
import './DPolitic.scss'

const DPolitic = ({politic}) => {
  return (
    <section className='politic'>
      {Object.keys(politic).length != 0 &&
        <>
          <h3 className='politic_title'>Lo que debes tener en cuenta</h3>
          <div className='politic_container'>
            <article className='politic_acticle'>
              <h4>Normas de la casa</h4>
              <ul className='politic_acticle_list'>
                {politic.homeRules.map((rule, i) => 
                  <li key={rule.homeRuleId + "-" + i}>
                    {rule.homeRuleDescription}
                  </li>)
                }
              </ul>
            </article>

            <article className='politic_acticle'>
              <h4>Salud y seguridad</h4>
              <ul className='politic_acticle_list'>
                {politic.healthAndSecurityRules.map((rule, i) => 
                  <li key={rule.healthAndSecurityRuleId + "-" + i}>
                    {rule.healthAndSecurityRuleDescription}
                  </li>)
                }
              </ul>
            </article>

            <article className='politic_acticle'>
              <h4>Politica de cancelación</h4>
              <ul className='politic_acticle_list cancelationPolitic'>
                <li>{politic.cancelationPolitic}</li>
              </ul>
            </article>
          </div>
        </>
      }
    </section>
  )
}

export default DPolitic

DPolitic.propTypes = {
  politic: PropTypes.object.isRequired,
}