import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeftIcon } from '../components/icons'
import {
  ACTIVITY_LEVELS,
  DIET_PREFERENCES,
  GOALS,
  MEAL_SLOTS,
  type AssessmentDraft,
} from '../data/assessment'
import { estimateTargets } from '../data/targets'
import { buildSlotMenus, type MealItem } from '../data/demoMeals'
import { PLAN_COMPARISON, SUBSCRIPTION_DURATIONS } from '../data/plans'
import '../styles/plan.css'

const labelFrom = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? 'Not provided'

function MealCard({ meal }: { meal: MealItem }) {
  return (
    <article className="mealcard">
      <div className="mealcard__media">
        <img
          src={meal.img}
          alt={meal.alt ?? meal.name}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="mealcard__body">
        <div className="mealcard__top">
          <h3>{meal.name}</h3>
          <span className="badge badge--neutral">{labelFrom(DIET_PREFERENCES, meal.diet)}</span>
        </div>
        <p className="mealcard__desc">{meal.description}</p>
        <p className="mealcard__portion">Portion: {meal.portion}</p>
        <ul className="mealcard__macros" aria-label="Approximate nutrition per serving">
          <li>{meal.kcal} kcal</li>
          <li>{meal.proteinGrams} g protein</li>
          <li>{meal.carbsGrams} g carbs</li>
          <li>{meal.fatGrams} g fat</li>
        </ul>
      </div>
    </article>
  )
}

function EmptyPlanState() {
  return (
    <div className="planpage-body">
      <div className="site-container">
        <div className="planpage-empty">
          <p className="site-eyebrow">No plan yet</p>
          <h1>Complete the assessment to see your plan</h1>
          <p className="planpage-empty__lede">
            This page needs your assessment answers, and they only exist in the current browser
            session. Run through the five short steps first, and we&rsquo;ll sketch a sample plan
            for you here.
          </p>
          <div className="planpage-empty__actions">
            <Link className="btn btn--primary btn--lg" to="/assessment">
              Start the assessment
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PlanPage() {
  const location = useLocation()
  const incoming = (location.state as { draft?: AssessmentDraft } | null)?.draft
  const [demoNotice, setDemoNotice] = useState<'basic' | 'premium' | null>(null)

  if (!incoming) {
    return <EmptyPlanState />
  }

  const draft = incoming
  const goalLabel = labelFrom(GOALS, draft.goal)
  const activityLabel = labelFrom(ACTIVITY_LEVELS, draft.activityLevel)
  const dietLabel = labelFrom(DIET_PREFERENCES, draft.dietPreference)
  const slotLabels = draft.mealSlots.map((id) => labelFrom(MEAL_SLOTS, id))
  const targets = estimateTargets(draft)
  const menus = buildSlotMenus(draft)

  return (
    <div className="planpage">
      <section className="planpage-hero" aria-labelledby="plan-title">
        <div className="site-container">
          <Link to="/" className="planpage-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">Your meal plan · Demo</p>
          <h1 id="plan-title">Your sample plan, sketched out</h1>
          <p className="planpage-hero__lede">
            Based on the assessment you just completed. Everything on this page is illustrative —
            rough estimates and sample suggestions, not a medical prescription.
          </p>
          <div className="planpage-hero__actions">
            <Link className="btn btn--secondary" to="/assessment" state={{ draft }}>
              Edit my answers
            </Link>
            <Link className="btn btn--ghost" to="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>

      <section className="planpage-section" aria-labelledby="summary-title">
        <div className="site-container planpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Your profile at a glance</p>
            <h2 id="summary-title">Planned around these answers</h2>
          </div>
          <div className="planpage-summary" aria-label="Assessment summary">
            <span className="planpage-chip">{goalLabel}</span>
            <span className="planpage-chip">{activityLabel}</span>
            <span className="planpage-chip">{dietLabel}</span>
            {slotLabels.length > 0 ? (
              <span className="planpage-chip planpage-chip--muted">
                Meals: {slotLabels.join(' · ')}
              </span>
            ) : null}
          </div>

          {targets ? (
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
          ) : (
            <p className="planpage-note">
              We couldn&rsquo;t estimate targets from the supplied answers. Use &ldquo;Edit my
              answers&rdquo; above to fix any missing or implausible values.
            </p>
          )}

          <p className="planpage-disclaimer planpage-disclaimer--standalone">
            <strong>Illustrative only.</strong> These figures come from a simple formula and were
            not validated clinically. Use them as a rough starting point, not as advice or a
            prescription.
          </p>
        </div>
      </section>

      <section className="planpage-section planpage-section--tinted" aria-labelledby="meals-title">
        <div className="site-container planpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Meal suggestions</p>
            <h2 id="meals-title">Sample meals for your slots</h2>
            <p className="planpage-head__lede">
              Only the slots you selected are listed, and every meal was filtered against your
              diet preference and restrictions.
            </p>
          </div>

          {menus.map((slotMenu) => (
            <div className="slot-block" key={slotMenu.slot}>
              <h3 className="slot-block__title">{labelFrom(MEAL_SLOTS, slotMenu.slot)}</h3>
              {slotMenu.meals.length > 0 ? (
                <div className="meal-grid">
                  {slotMenu.meals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                  ))}
                </div>
              ) : (
                <p className="slot-block__empty">
                  {slotMenu.blockedByOtherRestriction
                    ? 'You listed custom restrictions that the sample menu cannot verify against, so no meals are suggested here until your list is reviewed manually.'
                    : 'No sample meals match this slot for your diet and restrictions. The demo menu is intentionally small — a full menu would offer more options here.'}
                </p>
              )}
            </div>
          ))}

          <p className="planpage-note">
            <strong>Allergy caution:</strong> meals are tagged with the intersections we know
            about (dairy, gluten, nuts, and so on), but a missing tag never means a meal is
            allergy-safe. Always double-check ingredients before ordering.
          </p>
        </div>
      </section>

      <section className="planpage-section" aria-labelledby="plans-title">
        <div className="site-container planpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Subscription</p>
            <h2 id="plans-title">Basic vs Premium</h2>
            <p className="planpage-head__lede">
              Both levels keep the same structured meals and recommended portions. Premium adds
              Super Flexibility — portion sizes and meal slots that follow your appetite.
            </p>
          </div>

          <div className="planpage-panel">
            <table className="planpage-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Basic</th>
                  <th scope="col" className="is-premium">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>{row.basic}</td>
                    <td className="is-premium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="planpage-subhead">Subscription lengths</h3>
          <div className="planpage-durations">
            {SUBSCRIPTION_DURATIONS.map((duration) => (
              <div className="planpage-duration" key={duration.months}>
                <strong>{duration.months}</strong>
                <span>{duration.note}</span>
              </div>
            ))}
          </div>
          <p className="planpage-note">
            Pricing will be confirmed later — nothing on this page is a quote.
          </p>

          <div className="planpage-demo">
            <button type="button" className="btn btn--secondary" onClick={() => setDemoNotice('basic')}>
              Choose Basic
            </button>
            <button type="button" className="btn btn--primary" onClick={() => setDemoNotice('premium')}>
              Choose Premium
            </button>
            {demoNotice ? (
              <p className="planpage-demo__notice" role="status">
                {demoNotice === 'premium' ? 'Premium selected (demo).' : 'Basic selected (demo).'}{' '}
                Ordering, payment, and delivery aren&rsquo;t part of this prototype — no
                subscription was started.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="planpage-section site-start" aria-labelledby="plan-cta-title">
        <div className="site-container">
          <div className="site-start__inner">
            <p className="site-eyebrow">Not quite right?</p>
            <h2 id="plan-cta-title">Tweak your answers anytime.</h2>
            <p className="site-start__lede">
              Your answers live only in this session — refresh the page and they&rsquo;re gone.
              Returning to the form keeps them while you edit.
            </p>
            <div className="site-start__actions">
              <Link className="btn btn--primary btn--lg" to="/assessment" state={{ draft }}>
                Edit my answers
              </Link>
              <Link className="btn btn--ghost btn--lg" to="/">
                Back to the homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}