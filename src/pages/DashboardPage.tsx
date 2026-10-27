import { Link } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '../components/icons'
import { ACTIVITY_LEVELS, DIET_PREFERENCES, GOALS, MEAL_SLOTS } from '../data/assessment'
import { estimateTargets } from '../data/targets'
import { buildSampleDay } from '../data/demoMeals'
import { PLANS, SUBSCRIPTION_DURATIONS } from '../data/plans'
import { useSession } from '../session'
import { TargetsPanel } from '../components/TargetsPanel'
import '../styles/dashboard.css'

const labelFrom = <T extends { id: string; label: string }>(options: readonly T[], id: string) =>
  options.find((option) => option.id === id)?.label ?? 'Not provided'

/* Illustrative demo numbers — clearly not real measurements. */
const SAMPLE_PROGRESS = [
  { label: 'Meals completed this week', detail: '12 of 14 meals', value: 86 },
  { label: 'Protein target hit', detail: '5 of 6 days', value: 83 },
  { label: 'Followed meal slots', detail: '6 of 7 slots', value: 86 },
]

function DashboardEmpty({ hasDraft }: { hasDraft: boolean }) {
  return (
    <div className="dashpage-body">
      <div className="site-container">
        <div className="planpage-empty">
          <p className="site-eyebrow">{hasDraft ? 'Almost there' : 'No dashboard yet'}</p>
          <h1>
            {hasDraft
              ? 'Choose a plan to open your dashboard'
              : 'Start the assessment to open your dashboard'}
          </h1>
          <p className="planpage-empty__lede">
            {hasDraft
              ? 'Your assessment answers are here, but no subscription has been chosen yet. Pick a plan and a length on the plan page to continue.'
              : 'The dashboard needs your assessment answers, which only exist in the current session. Run the five short steps first.'}
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

export function DashboardPage() {
  const { draft, subscription } = useSession()

  if (!draft) {
    return <DashboardEmpty hasDraft={false} />
  }
  if (!subscription) {
    return <DashboardEmpty hasDraft={true} />
  }

  const plan = PLANS.find((item) => item.id === subscription.plan) ?? PLANS[0]
  const duration =
    SUBSCRIPTION_DURATIONS.find((item) => item.id === subscription.duration) ??
    SUBSCRIPTION_DURATIONS[0]

  const targets = estimateTargets(draft)
  const schedule = buildSampleDay(draft)
  const goalLabel = labelFrom(GOALS, draft.goal)
  const activityLabel = labelFrom(ACTIVITY_LEVELS, draft.activityLevel)
  const dietLabel = labelFrom(DIET_PREFERENCES, draft.dietPreference)
  const slotLabels = draft.mealSlots.map((id) => labelFrom(MEAL_SLOTS, id))

  return (
    <div className="dashpage">
      <section className="page-hero" aria-labelledby="dashboard-title">
        <div className="site-container">
          <Link to="/" className="page-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">Customer dashboard · Demo</p>
          <h1 id="dashboard-title">Your week at a glance</h1>
          <p className="page-hero__lede">
            A sample view of your subscription and plan. Everything here is demo data — no real
            order, delivery, or measurement activity exists.
          </p>
          <div className="page-hero__actions">
            <Link className="btn btn--secondary" to="/plan">
              View meal plan
            </Link>
            <Link className="btn btn--ghost" to="/subscription">
              Review subscription
            </Link>
          </div>
        </div>
      </section>

      <section className="dashpage-section" aria-labelledby="overview-title">
        <div className="site-container dashpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Overview</p>
            <h2 id="overview-title">Your setup in one look</h2>
            <p className="planpage-head__lede">
              Your subscription, profile, and chosen slots — kept only for the current session.
            </p>
          </div>

          <div className="dash-overview">
            <div className="dash-panel">
              <span className="dash-panel__kicker">Subscription</span>
              <div className="dash-plan">
                <div>
                  <p className="dash-plan__name">
                    {plan.name}
                    <span> · </span>
                    {duration.months}
                  </p>
                  <p className="dash-plan__tagline">
                    {plan.tagline}
                    {plan.id === 'premium' ? ' — Super Flexibility' : ''}
                  </p>
                </div>
                <span className="dash-chip dash-chip--demo">Demo session</span>
              </div>
              <ul className="dash-plan__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="dash-panel">
              <span className="dash-panel__kicker">Profile</span>
              <dl className="dash-profile">
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
                  <dd>
                    {goalLabel} · {activityLabel}
                  </dd>
                </div>
                <div>
                  <dt>Diet preference</dt>
                  <dd>{dietLabel}</dd>
                </div>
                <div>
                  <dt>Meal slots</dt>
                  <dd>{slotLabels.length > 0 ? slotLabels.join(' · ') : '—'}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="planpage-head planpage-head--compact">
            <p className="site-eyebrow">Daily targets</p>
            <h2 id="targets-title">Estimated daily targets</h2>
            <p className="planpage-head__lede">
              The same simple estimates shown on your plan — illustrative, not medically
              validated.
            </p>
          </div>

          {targets ? (
            <TargetsPanel targets={targets} />
          ) : (
            <p className="dash-note">
              We couldn&rsquo;t estimate targets from the supplied answers — consider editing
              them.
            </p>
          )}
        </div>
      </section>

      <section className="dashpage-section dashpage-section--tinted" aria-labelledby="schedule-title">
        <div className="site-container dashpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Sample day</p>
            <h2 id="schedule-title">Today&rsquo;s sample schedule</h2>
            <p className="planpage-head__lede">
              One example meal per slot, picked from the sample menu using your diet and
              restrictions. Slots with no matching meals are skipped.
            </p>
          </div>

          {schedule.length > 0 ? (
            <ol className="dash-schedule">
              {schedule.map(({ slot, meal }, index) => (
                <li className="dash-schedule__row" key={slot}>
                  <span className="dash-schedule__index" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="dash-schedule__info">
                    <span className="dash-schedule__slot">{labelFrom(MEAL_SLOTS, slot)}</span>
                    <h3>{meal.name}</h3>
                    <p>{meal.description}</p>
                    <ul className="dash-schedule__macros" aria-label="Approximate nutrition">
                      <li>{meal.kcal} kcal</li>
                      <li>{meal.proteinGrams} g protein</li>
                      <li>{meal.carbsGrams} g carbs</li>
                      <li>{meal.fatGrams} g fat</li>
                    </ul>
                  </div>
                  <img
                    className="dash-schedule__thumb"
                    src={meal.img}
                    alt={meal.alt ?? meal.name}
                    width={160}
                    height={120}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ol>
          ) : (
            <p className="dash-note">
              No sample meals matched your selection. Head to the meal plan for details on the
              filtered list.
            </p>
          )}
        </div>
      </section>

      <section className="dashpage-section" aria-labelledby="progress-title">
        <div className="site-container dashpage-container">
          <div className="planpage-head">
            <p className="site-eyebrow">Progress</p>
            <h2 id="progress-title">Sample progress</h2>
            <p className="planpage-head__lede">
              An illustration of how progress could be shown. Values on this panel are demo data,
              not real measurements.
            </p>
          </div>

          <div className="dash-progress">
            {SAMPLE_PROGRESS.map((item) => (
              <div className="dash-progress__item" key={item.label}>
                <div className="dash-progress__row">
                  <span>{item.label}</span>
                  <strong>{item.detail}</strong>
                </div>
                <div className="dash-progress__track" aria-hidden="true">
                  <span style={{ width: `${item.value}%` }} />
                </div>
                <span className="dash-progress__tag">Sample data</span>
              </div>
            ))}
          </div>
          <p className="dash-note">
            No tracking or measurement backend exists — these numbers are fabricated for the demo.
          </p>
        </div>
      </section>

      <section className="dashpage-section">
        <div className="site-container">
          <div className="site-start__inner">
            <p className="site-eyebrow">Your demo dashboard</p>
            <h2>Where do you want to go next?</h2>
            <p className="site-start__lede">
              Nothing here is a real order, payment, or delivery — it&rsquo;s a demo session only.
            </p>
            <div className="site-start__actions">
              <Link className="btn btn--primary btn--lg" to="/plan">
                View my meal plan
              </Link>
              <Link className="btn btn--secondary btn--lg" to="/subscription">
                Review subscription
              </Link>
              <Link className="btn btn--ghost btn--lg" to="/assessment" state={{ draft }}>
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