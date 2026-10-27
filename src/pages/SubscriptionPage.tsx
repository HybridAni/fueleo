import { Link } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '../components/icons'
import { DIET_PREFERENCES, GOALS, MEAL_SLOTS, RESTRICTIONS } from '../data/assessment'
import { PLANS, SUBSCRIPTION_DURATIONS } from '../data/plans'
import { useSession } from '../session'
import '../styles/subscription.css'

const labelFrom = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? 'Not provided'

function EmptySubscriptionState({ hasDraft }: { hasDraft: boolean }) {
  return (
    <div className="subpage-body">
      <div className="site-container">
        <div className="planpage-empty">
          <p className="site-eyebrow">{hasDraft ? 'Choose a plan first' : 'No summary yet'}</p>
          <h1>
            {hasDraft
              ? 'Pick a plan to see your summary'
              : 'Start the assessment to see your summary'}
          </h1>
          <p className="planpage-empty__lede">
            {hasDraft
              ? 'Your assessment is ready, but no subscription has been chosen yet. Select a plan and a length on the plan page to continue.'
              : 'This summary needs your assessment answers, and they only exist in the current session. Run the five short steps first.'}
          </p>
          <div className="planpage-empty__actions">
            {hasDraft ? (
              <Link className="btn btn--primary btn--lg" to="/plan">
                Choose a plan
              </Link>
            ) : (
              <Link className="btn btn--primary btn--lg" to="/assessment">
                Start the assessment
              </Link>
            )}
            <Link className="btn btn--ghost btn--lg" to="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SubscriptionPage() {
  const { draft, subscription } = useSession()

  if (!draft || !subscription) {
    return <EmptySubscriptionState hasDraft={!!draft} />
  }

  const plan = PLANS.find((item) => item.id === subscription.plan) ?? PLANS[0]
  const duration =
    SUBSCRIPTION_DURATIONS.find((item) => item.id === subscription.duration) ??
    SUBSCRIPTION_DURATIONS[0]

  const goalLabel = labelFrom(GOALS, draft.goal)
  const dietLabel = labelFrom(DIET_PREFERENCES, draft.dietPreference)
  const slotLabels =
    draft.mealSlots.length > 0
      ? draft.mealSlots.map((id) => labelFrom(MEAL_SLOTS, id)).join(' · ')
      : 'None selected'
  const restrictionsText =
    draft.restrictions.length === 0
      ? 'None noted — will be confirmed before finalizing'
      : draft.restrictions
          .map((id) =>
            id === 'other'
              ? draft.otherRestrictions.trim() !== ''
                ? `Other: ${draft.otherRestrictions.trim()}`
                : 'Other restrictions'
              : labelFrom(RESTRICTIONS, id),
          )
          .join(', ')

  return (
    <div className="subpage">
      <section className="page-hero" aria-labelledby="sub-title">
        <div className="site-container">
          <Link to="/" className="page-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">Subscription summary · Demo</p>
          <h1 id="sub-title">Your subscription, ready to review</h1>
          <p className="page-hero__lede">
            Demo selection only — no order was placed, no payment was collected, and no
            deliveries were scheduled.
          </p>
        </div>
      </section>

      <section className="subpage-body">
        <div className="site-container subpage-container">
          <div className="subpage-grid">
            <div>
              <div className="subpage-panel">
                <p className="subpage-panel__kicker">Plan</p>
                <h2>{plan.name}</h2>
                <p className="subpage-panel__tagline">{plan.tagline}</p>
                <p>{plan.description}</p>
                <ul className="subpage-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="subpage-panel">
                <p className="subpage-panel__kicker">Subscription length</p>
                <p className="subpage-duration">{duration.months}</p>
                <p className="subpage-panel__note">{duration.note}</p>
              </div>
            </div>

            <div>
              <div className="subpage-panel">
                <p className="subpage-panel__kicker">Planned around</p>
                <dl className="subpage-recap">
                  <div>
                    <dt>Current weight</dt>
                    <dd>{draft.currentWeightKg} kg</dd>
                  </div>
                  <div>
                    <dt>Target weight</dt>
                    <dd>{draft.targetWeightKg} kg</dd>
                  </div>
                  <div>
                    <dt>Goal</dt>
                    <dd>{goalLabel}</dd>
                  </div>
                  <div>
                    <dt>Diet preference</dt>
                    <dd>{dietLabel}</dd>
                  </div>
                  <div>
                    <dt>Meal slots</dt>
                    <dd>{slotLabels}</dd>
                  </div>
                  <div>
                    <dt>Restrictions</dt>
                    <dd>{restrictionsText}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <p className="subpage-note">
            <strong>Demo selection.</strong> Nothing was purchased, charged, or scheduled. In the
            real product, this step would continue with payment and delivery confirmation.
          </p>

          <div className="subpage-actions">
            <Link className="btn btn--primary btn--lg" to="/dashboard">
              Open my dashboard
            </Link>
            <Link className="btn btn--secondary btn--lg" to="/plan">
              Edit selection
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/assessment" state={{ draft }}>
              Edit my answers
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}