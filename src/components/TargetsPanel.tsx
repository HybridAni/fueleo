import type { TargetEstimate } from '../data/targets'

/* Shared presentation for the estimated calorie + macro targets.
   Styles live in src/styles/plan.css. */
export function TargetsPanel({ targets }: { targets: TargetEstimate }) {
  return (
    <div className="planpage-panel targets">
      <div className="targets__main">
        <p className="targets__label">Estimated daily calorie target</p>
        <p className="targets__value">
          {targets.calories}
          <span> kcal</span>
        </p>
        {targets.clampedToRange ? (
          <p className="targets__clamp">
            Adjusted into a safe range (1,200–3,500 kcal) instead of reporting an extreme
            number.
          </p>
        ) : null}
        <p className="planpage-method">
          <strong>How it was estimated:</strong> {targets.methodNote}
        </p>
      </div>
      <ul className="targets__macros" aria-label="Estimated daily macro targets">
        <li className="targets__macro">
          <div className="targets__row">
            <span>Protein</span>
            <strong>{targets.proteinGrams} g</strong>
            <em>{targets.proteinPct}%</em>
          </div>
          <div className="targets__track" aria-hidden="true">
            <span
              className="targets__fill targets__fill--protein"
              style={{ width: `${targets.proteinPct}%` }}
            />
          </div>
        </li>
        <li className="targets__macro">
          <div className="targets__row">
            <span>Carbohydrates</span>
            <strong>{targets.carbsGrams} g</strong>
            <em>{targets.carbsPct}%</em>
          </div>
          <div className="targets__track" aria-hidden="true">
            <span
              className="targets__fill targets__fill--carbs"
              style={{ width: `${targets.carbsPct}%` }}
            />
          </div>
        </li>
        <li className="targets__macro">
          <div className="targets__row">
            <span>Fats</span>
            <strong>{targets.fatGrams} g</strong>
            <em>{targets.fatPct}%</em>
          </div>
          <div className="targets__track" aria-hidden="true">
            <span
              className="targets__fill targets__fill--fats"
              style={{ width: `${targets.fatPct}%` }}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}