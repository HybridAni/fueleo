import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '../components/icons'
import {
  ACTIVITY_LEVELS,
  DIET_PREFERENCES,
  GOALS,
  MEAL_SLOTS,
} from '../data/assessment'
import { estimateTargets } from '../data/targets'
import { buildSlotMenus, type MealItem } from '../data/demoMeals'
import {
  PLAN_COMPARISON,
  PLANS,
  SUBSCRIPTION_DURATIONS,
  type SubscriptionDurationId,
  type SubscriptionPlanId,
} from '../data/plans'
import { useSession } from '../session'
import { TargetsPanel } from '../components/TargetsPanel'
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
  const navigate = useNavigate()
  const { draft, subscription, setSubscription } = useSession()
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId | null>(
    subscription?.plan ?? null,
  )
  const [selectedDuration, setSelectedDuration] = useState<SubscriptionDurationId | null>(
    subscription?.duration ?? null,
  )
  const [selectionError, setSelectionError] = useState<string | null>(null)

  if (!draft) {
    return <EmptyPlanState />
  }

  const goalLabel = labelFrom(GOALS, draft.goal)
  const activityLabel = labelFrom(ACTIVITY_LEVELS, draft.activityLevel)
  const dietLabel = labelFrom(DIET_PREFERENCES, draft.dietPreference)
  const slotLabels = draft.mealSlots.map((id) => labelFrom(MEAL_SLOTS, id))
  const targets = estimateTargets(draft)
  const menus = buildSlotMenus(draft)

  const planName = PLANS.find((plan) => plan.id === selectedPlan)?.name
  const durationLabel = SUBSCRIPTION_DURATIONS.find(
    (duration) => duration.id === selectedDuration,
  )?.months
  const continueLabel =
    planName && durationLabel ? `Continue with ${planName} · ${durationLabel}` : 'Continue'

  const handleContinueSelection = () => {
    if (!selectedPlan || !selectedDuration) {
      setSelectionError('Select both a plan and a subscription length to continue.')
      return
    }
    setSelectionError(null)
    setSubscription({ plan: selectedPlan, duration: selectedDuration })
    navigate('/subscription')
  }

  return (
    <div className="planpage">
      <section className="page-hero" aria-labelledby="plan-title">
        <div className="site-container">
          <Link to="/" className="page-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">Personalized meal plan</p>
          <h1 id="plan-title">Your meal plan</h1>
          <p className="page-hero__lede">
            Built from the assessment you just completed. Every estimate on this page is
            illustrative — rough numbers and sample suggestions, not a medical prescription.
          </p>
          <div className="page-hero__actions">
            <Link className="btn btn--secondary" to="/assessment" state={{ draft }}>
              Edit my answers
            </Link>
            {subscription ? (
              <Link className="btn btn--ghost" to="/subscription">
                View subscription summary
              </Link>
            ) : null}
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
            <span className="planpage-chip">Current: {draft.currentWeightKg} kg</span>
            <span className="planpage-chip">Target: {draft.targetWeightKg} kg</span>
            {slotLabels.length > 0 ? (
              <span className="planpage-chip planpage-chip--muted">
                Meals: {slotLabels.join(' · ')}
              </span>
            ) : null}
          </div>

          {targets ? (
            <TargetsPanel targets={targets} />
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
            <h2 id="meals-title">Meals for your slots</h2>
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
            allergy-safe. Always double-check ingredients before you choose.
          </p>
        </div>
      </section>

      <section className="planpage-section" aria-labelledby="plans-title">
        <div className="site-container planpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Subscription</p>
            <h2 id="plans-title">Choose how you&rsquo;d like to subscribe</h2>
            <p className="planpage-head__lede">
              Basic keeps structured meals and recommended portions. Premium adds Super
              Flexibility — portion sizes and meal slots that follow your appetite.
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

          <h3 className="planpage-subhead">Choose your plan</h3>
          <div className="planpick-grid" role="radiogroup" aria-label="Choose your plan">
            {PLANS.map((plan) => (
              <label
                key={plan.id}
                className={`planpick${selectedPlan === plan.id ? ' is-selected' : ''}${
                  plan.id === 'premium' ? ' planpick--premium' : ''
                }`}
              >
                <input
                  type="radio"
                  name="plan-choice"
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={() => setSelectedPlan(plan.id)}
                />
                <span className="planpick__name">
                  <strong>{plan.name}</strong>
                  <span className="planpick__tagline">{plan.tagline}</span>
                </span>
                <span className="planpick__desc">{plan.description}</span>
                <span className="planpick__features">
                  {plan.features.map((feature) => (
                    <span key={feature}>
                      <CheckIcon />
                      {feature}
                    </span>
                  ))}
                </span>
              </label>
            ))}
          </div>

          <h3 className="planpage-subhead">Subscription length</h3>
          <div className="planpage-durations" role="radiogroup" aria-label="Choose a length">
            {SUBSCRIPTION_DURATIONS.map((duration) => (
              <label
                key={duration.id}
                className={`planpage-duration${
                  selectedDuration === duration.id ? ' is-selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="duration-choice"
                  value={duration.id}
                  checked={selectedDuration === duration.id}
                  onChange={() => setSelectedDuration(duration.id)}
                />
                <strong>{duration.months}</strong>
                <span>{duration.note}</span>
              </label>
            ))}
          </div>

          <p className="planpage-note">
            Pricing will be confirmed later — nothing on this page is a quote. This is a
            prototype selection — no order, payment, or delivery happens.
          </p>

          {selectionError ? (
            <p className="planpage-error" role="alert">
              {selectionError}
            </p>
          ) : null}

          <div className="planpage-selection-actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={handleContinueSelection}
            >
              {continueLabel}
            </button>
            <Link className="btn btn--ghost" to="/">
              Back to the homepage
            </Link>
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