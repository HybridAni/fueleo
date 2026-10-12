import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '../components/icons'
import {
  ACTIVITY_LEVELS,
  DIET_PREFERENCES,
  EMPTY_DRAFT,
  GOALS,
  MEAL_SLOTS,
  RESTRICTIONS,
  STEP_TITLES,
  validateStep,
  type AssessmentDraft,
  type MealSlotId,
  type RestrictionId,
  type StepErrors,
  type StepField,
} from '../data/assessment'
import '../styles/assessment.css'

/* --------------------------------------------------------------------------
   Small presentational helpers (assessment only).
   -------------------------------------------------------------------------- */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="assess-error" id={id}>
      {message}
    </p>
  )
}

function NumericField({
  id,
  label,
  unit,
  value,
  onChange,
  hint,
  error,
}: {
  id: string
  label: string
  unit?: string
  value: string
  onChange: (value: string) => void
  hint?: string
  error?: string
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {unit ? <span className="assess-unit">{unit}</span> : null}
      </label>
      <input
        className="input"
        id={id}
        name={id}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {hint && !error ? (
        <span className="helper" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

function StepRail({ step, onGoTo }: { step: number; onGoTo: (index: number) => void }) {
  return (
    <ol className="assess-rail" aria-label="Assessment steps">
      {STEP_TITLES.map((title, index) => {
        const isCurrent = index === step
        const isDone = index < step
        const className = [
          'assess-rail__cell',
          isCurrent ? 'is-current' : '',
          isDone ? 'is-done' : '',
        ]
          .filter(Boolean)
          .join(' ')
        const content = (
          <>
            <span className="assess-rail__num" aria-hidden="true">
              {isDone ? <CheckIcon /> : index + 1}
            </span>
            <span className="assess-rail__label">{title}</span>
          </>
        )
        return (
          <li key={title}>
            {isDone ? (
              <button
                type="button"
                className={className}
                onClick={() => onGoTo(index)}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {content}
              </button>
            ) : (
              <span className={className} aria-current={isCurrent ? 'step' : undefined}>
                {content}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function ReviewRow({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="assess-review__row">
      <dt>{term}</dt>
      <dd>{detail}</dd>
    </div>
  )
}

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: ReactNode
}) {
  return (
    <section className="assess-review">
      <header className="assess-review__head">
        <h3>{title}</h3>
        <button type="button" className="assess-review__edit" onClick={onEdit}>
          Edit
        </button>
      </header>
      <dl className="assess-review__list">{children}</dl>
    </section>
  )
}

/* Which element to focus when a step fails validation. */
const FOCUS_IDS: Partial<Record<StepField, string>> = {
  age: 'age',
  heightCm: 'heightCm',
  currentWeightKg: 'currentWeightKg',
  targetWeightKg: 'targetWeightKg',
  activityLevel: 'activityLevel-sedentary',
  goal: 'goal-weight-loss',
  dietPreference: 'dietPreference-vegetarian',
  otherRestrictions: 'otherRestrictions',
  mealSlots: 'mealSlots-breakfast',
}

/* --------------------------------------------------------------------------
   Assessment page
   -------------------------------------------------------------------------- */

export function AssessmentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const incoming = (location.state as { draft?: AssessmentDraft } | null)?.draft
  const [step, setStep] = useState(() => (incoming ? STEP_TITLES.length - 1 : 0))
  const [draft, setDraft] = useState<AssessmentDraft>(() => {
    if (!incoming) return { ...EMPTY_DRAFT }
    return { ...EMPTY_DRAFT, ...incoming }
  })
  const [errors, setErrors] = useState<StepErrors>({})

  const setField = <K extends keyof AssessmentDraft>(key: K, value: AssessmentDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const toggleRestriction = (id: RestrictionId) => {
    setDraft((current) => ({
      ...current,
      restrictions: current.restrictions.includes(id)
        ? current.restrictions.filter((item) => item !== id)
        : [...current.restrictions, id],
    }))
  }

  const toggleMealSlot = (id: MealSlotId) => {
    setDraft((current) => ({
      ...current,
      mealSlots: current.mealSlots.includes(id)
        ? current.mealSlots.filter((item) => item !== id)
        : [...current.mealSlots, id],
    }))
  }

  const goTo = (index: number) => {
    if (index > step) return
    setStep(index)
    setErrors({})
    window.scrollTo({ top: 0, left: 0 })
  }

  const handleBack = () => {
    if (step === 0) return
    goTo(step - 1)
  }

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === STEP_TITLES.length - 1) {
      navigate('/plan', { state: { draft } })
      return
    }
    const nextErrors = validateStep(step, draft)
    const keys = Object.keys(nextErrors) as StepField[]
    if (keys.length > 0) {
      setErrors(nextErrors)
      const focusId = FOCUS_IDS[keys[0]]
      document.getElementById(focusId ?? '')?.focus({ preventScroll: true })
      return
    }
    goTo(step + 1)
  }

  const optionClassName = (selected: boolean) => `assess-option${selected ? ' is-selected' : ''}`
  const chipClassName = (selected: boolean) => `assess-chip${selected ? ' is-selected' : ''}`

  const labelFor = <T extends { id: string; label: string }>(
    options: readonly T[],
    id: string,
  ) => options.find((option) => option.id === id)?.label ?? 'Not provided'

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderAboutYou()
      case 1:
        return renderGoal()
      case 2:
        return renderPreferences()
      case 3:
        return renderSchedule()
      default:
        return renderReview()
    }
  }

  function renderAboutYou() {
    return (
      <div className="assess-step">
        <p className="assess-step__meta">
          Step 1 of {STEP_TITLES.length}
        </p>
        <h2 className="assess-step__title">{STEP_TITLES[0]}</h2>
        <p className="assess-step__lede">A few numbers, then how your typical week looks.</p>

        <div className="assess-group">
          <h3>Body basics</h3>
          <div className="assess-row assess-row--3">
            <NumericField
              id="age"
              label="Age"
              value={draft.age}
              onChange={(value) => setField('age', value)}
              error={errors.age}
            />
            <NumericField
              id="heightCm"
              label="Height"
              unit="cm"
              value={draft.heightCm}
              onChange={(value) => setField('heightCm', value)}
              error={errors.heightCm}
            />
            <NumericField
              id="currentWeightKg"
              label="Current weight"
              unit="kg"
              value={draft.currentWeightKg}
              onChange={(value) => setField('currentWeightKg', value)}
              error={errors.currentWeightKg}
            />
          </div>
        </div>

        <fieldset className="assess-fieldset">
          <legend>How active is a typical week?</legend>
          <p className="assess-group__hint">Pick the closest fit — a rough estimate is fine.</p>
          <div className="assess-options assess-options--activity">
            {ACTIVITY_LEVELS.map((level) => (
              <label key={level.id} className={optionClassName(draft.activityLevel === level.id)}>
                <input
                  type="radio"
                  id={`activityLevel-${level.id}`}
                  name="activityLevel"
                  value={level.id}
                  checked={draft.activityLevel === level.id}
                  onChange={() => setField('activityLevel', level.id)}
                  aria-invalid={errors.activityLevel ? true : undefined}
                  aria-describedby={errors.activityLevel ? 'activityLevel-error' : undefined}
                />
                <span className="assess-option__label">{level.label}</span>
                <span className="assess-option__hint">{level.hint}</span>
              </label>
            ))}
          </div>
          <FieldError id="activityLevel-error" message={errors.activityLevel} />
        </fieldset>

        <div className="assess-group">
          <h3>Target weight</h3>
          <div className="assess-row">
            <NumericField
              id="targetWeightKg"
              label="Target weight (optional)"
              unit="kg"
              value={draft.targetWeightKg}
              onChange={(value) => setField('targetWeightKg', value)}
              hint="Only needed if your goal is weight loss."
              error={errors.targetWeightKg}
            />
          </div>
        </div>
      </div>
    )
  }

  function renderGoal() {
    return (
      <div className="assess-step">
        <p className="assess-step__meta">
          Step 2 of {STEP_TITLES.length}
        </p>
        <h2 className="assess-step__title">{STEP_TITLES[1]}</h2>
        <p className="assess-step__lede">
          Pick the direction — the future plan is built backward from this.
        </p>

        <fieldset className="assess-fieldset">
          <legend>What is your main goal?</legend>
          <div className="assess-options assess-options--goal">
            {GOALS.map((goal) => (
              <label key={goal.id} className={optionClassName(draft.goal === goal.id)}>
                <input
                  type="radio"
                  id={`goal-${goal.id}`}
                  name="goal"
                  value={goal.id}
                  checked={draft.goal === goal.id}
                  onChange={() => setField('goal', goal.id)}
                  aria-invalid={errors.goal ? true : undefined}
                  aria-describedby={errors.goal ? 'goal-error' : undefined}
                />
                <span className="assess-option__label">{goal.label}</span>
                <span className="assess-option__hint">{goal.description}</span>
              </label>
            ))}
          </div>
          <FieldError id="goal-error" message={errors.goal} />
        </fieldset>

        {draft.goal === 'weight-loss' && (
          <div className="assess-callout">
            <h3>About a target weight</h3>
            {draft.targetWeightKg.trim() !== '' ? (
              <p>
                Your target weight is set to {draft.targetWeightKg} kg — portions in the future
                plan would be sized toward a gradual change. You can adjust it in the About-you
                step at any time.
              </p>
            ) : (
              <p>
                You haven&rsquo;t entered a target weight yet. Go back to the About-you step to
                add one — it helps size portions for a gradual, sustainable change.
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  function renderPreferences() {
    return (
      <div className="assess-step">
        <p className="assess-step__meta">
          Step 3 of {STEP_TITLES.length}
        </p>
        <h2 className="assess-step__title">{STEP_TITLES[2]}</h2>
        <p className="assess-step__lede">How you eat — and what to keep off the plate.</p>

        <fieldset className="assess-fieldset">
          <legend>Diet preference</legend>
          <div className="assess-options assess-options--diet">
            {DIET_PREFERENCES.map((diet) => (
              <label key={diet.id} className={optionClassName(draft.dietPreference === diet.id)}>
                <input
                  type="radio"
                  id={`dietPreference-${diet.id}`}
                  name="dietPreference"
                  value={diet.id}
                  checked={draft.dietPreference === diet.id}
                  onChange={() => setField('dietPreference', diet.id)}
                  aria-invalid={errors.dietPreference ? true : undefined}
                  aria-describedby={errors.dietPreference ? 'dietPreference-error' : undefined}
                />
                <span className="assess-option__label">{diet.label}</span>
                <span className="assess-option__hint">{diet.hint}</span>
              </label>
            ))}
          </div>
          <FieldError id="dietPreference-error" message={errors.dietPreference} />
        </fieldset>

        <fieldset className="assess-fieldset">
          <legend>Allergies and dietary restrictions</legend>
          <p className="assess-group__hint">
            Select everything that applies. If you leave this blank, we treat it as
            &ldquo;not specified&rdquo; and will confirm restrictions with you before finalizing
            anything — never as &ldquo;no allergies&rdquo;.
          </p>
          <div className="assess-chips">
            {RESTRICTIONS.map((restriction) => (
              <label
                key={restriction.id}
                className={chipClassName(draft.restrictions.includes(restriction.id))}
              >
                <input
                  type="checkbox"
                  id={`restriction-${restriction.id}`}
                  checked={draft.restrictions.includes(restriction.id)}
                  onChange={() => toggleRestriction(restriction.id)}
                />
                <span>{restriction.label}</span>
              </label>
            ))}
            <label className={chipClassName(draft.restrictions.includes('other'))}>
              <input
                type="checkbox"
                id="restriction-other"
                checked={draft.restrictions.includes('other')}
                onChange={() => toggleRestriction('other')}
              />
              <span>Other restrictions</span>
            </label>
          </div>

          {draft.restrictions.includes('other') && (
            <div className="field assess-other">
              <label className="label" htmlFor="otherRestrictions">
                Describe your other restrictions
              </label>
              <textarea
                className="textarea"
                id="otherRestrictions"
                name="otherRestrictions"
                rows={3}
                value={draft.otherRestrictions}
                onChange={(event) => setField('otherRestrictions', event.target.value)}
                placeholder="E.g. low-FODMAP, no garlic or onion, no mushroom…"
                aria-invalid={errors.otherRestrictions ? true : undefined}
                aria-describedby={errors.otherRestrictions ? 'otherRestrictions-error' : undefined}
              />
              <FieldError id="otherRestrictions-error" message={errors.otherRestrictions} />
            </div>
          )}
        </fieldset>
      </div>
    )
  }

  function renderSchedule() {
    return (
      <div className="assess-step">
        <p className="assess-step__meta">
          Step 4 of {STEP_TITLES.length}
        </p>
        <h2 className="assess-step__title">{STEP_TITLES[3]}</h2>
        <p className="assess-step__lede">
          Pick one or more slots. These decide which meals your future plan will cover each day.
        </p>

        <fieldset className="assess-fieldset">
          <legend>Meal slots</legend>
          <div className="assess-chips assess-chips--slots">
            {MEAL_SLOTS.map((slot) => (
              <label key={slot.id} className={chipClassName(draft.mealSlots.includes(slot.id))}>
                <input
                  type="checkbox"
                  id={`mealSlots-${slot.id}`}
                  checked={draft.mealSlots.includes(slot.id)}
                  onChange={() => toggleMealSlot(slot.id)}
                />
                <span>
                  {slot.label}
                  {slot.optional ? <small className="assess-chip__tag">optional</small> : null}
                </span>
              </label>
            ))}
          </div>
          <FieldError id="mealSlots-error" message={errors.mealSlots} />
          <p className="assess-group__hint assess-group__hint--bottom">
            Only the slots you select here will be covered by the meal plan we build next.
          </p>
        </fieldset>
      </div>
    )
  }

  function renderReview() {
    const targetWeight = draft.targetWeightKg.trim()
    const activityLabel = labelFor(ACTIVITY_LEVELS, draft.activityLevel)
    const goalLabel = labelFor(GOALS, draft.goal)
    const dietLabel = labelFor(DIET_PREFERENCES, draft.dietPreference)
    const restrictionsText =
      draft.restrictions.length === 0
        ? 'Not specified — we will confirm before finalizing'
        : draft.restrictions
            .map((id) =>
              id === 'other'
                ? draft.otherRestrictions.trim() !== ''
                  ? `Other: ${draft.otherRestrictions.trim()}`
                  : 'Other restrictions'
                : labelFor(RESTRICTIONS, id),
            )
            .join(', ')
    const slotsText =
      draft.mealSlots.length === 0
        ? 'No slots selected'
        : draft.mealSlots
            .map((id) => {
              const slot = MEAL_SLOTS.find((item) => item.id === id)
              return slot ? (slot.optional ? `${slot.label} (optional)` : slot.label) : id
            })
            .join(', ')

    return (
      <div className="assess-step">
        <p className="assess-step__meta">
          Step 5 of {STEP_TITLES.length}
        </p>
        <h2 className="assess-step__title">{STEP_TITLES[4]}</h2>
        <p className="assess-step__lede">
          Check everything, then confirm. You can jump back to edit any section.
        </p>

        <ReviewBlock title="About you" onEdit={() => goTo(0)}>
          <ReviewRow term="Age" detail={draft.age ? `${draft.age} years` : '—'} />
          <ReviewRow term="Height" detail={draft.heightCm ? `${draft.heightCm} cm` : '—'} />
          <ReviewRow
            term="Current weight"
            detail={draft.currentWeightKg ? `${draft.currentWeightKg} kg` : '—'}
          />
          <ReviewRow term="Activity level" detail={activityLabel} />
          <ReviewRow
            term="Target weight"
            detail={targetWeight ? `${targetWeight} kg` : 'Not set'}
          />
        </ReviewBlock>

        <ReviewBlock title="Your goal" onEdit={() => goTo(1)}>
          <ReviewRow term="Goal" detail={goalLabel} />
        </ReviewBlock>

        <ReviewBlock title="Food preferences" onEdit={() => goTo(2)}>
          <ReviewRow term="Diet preference" detail={dietLabel} />
          <ReviewRow term="Allergies & restrictions" detail={restrictionsText} />
        </ReviewBlock>

        <ReviewBlock title="Meal schedule" onEdit={() => goTo(3)}>
          <ReviewRow term="Meal slots" detail={slotsText} />
        </ReviewBlock>
      </div>
    )
  }

  return (
    <div className="assess-page">
      <section className="assess-hero">
        <div className="site-container">
          <Link to="/" className="assess-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">Personal nutrition assessment</p>
          <h1>Tell us how you eat and live.</h1>
          <p className="assess-hero__lede">
            Five short steps build the profile a future Fueleo plan will be shaped around. Your
            answers stay in this page&rsquo;s memory only — nothing is saved or sent anywhere.
          </p>
        </div>
      </section>

      <section className="assess-body">
        <div className="site-container assess-container">
          <StepRail step={step} onGoTo={goTo} />

          <div className="assess-progress">
            <div
              className="assess-progress__track"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={STEP_TITLES.length}
              aria-valuenow={step + 1}
              aria-label={`Step ${step + 1} of ${STEP_TITLES.length}`}
            >
              <span
                className="assess-progress__fill"
                style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
              />
            </div>
          </div>

          <form className="assess-form" onSubmit={handleContinue} noValidate>
            {renderStepContent()}
            <div className="assess-actions">
              {step > 0 ? (
                <button type="button" className="btn btn--secondary" onClick={handleBack}>
                  Back
                </button>
              ) : (
                <span aria-hidden="true" />
              )}
              <button type="submit" className="btn btn--primary">
                {step === STEP_TITLES.length - 1 ? 'Confirm & continue' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}