import { Link } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon } from '../components/icons'
import { IMAGES } from '../data/meals'
import '../styles/how-page.css'

const profileGroups = [
  {
    title: 'About you',
    fields: ['Age, height, weight', 'How active your days are — workouts, walking, standing work'],
  },
  {
    title: 'Your goal',
    fields: ['Weight loss, muscle gain, or maintenance', 'A target weight, where one applies'],
  },
  {
    title: 'Food preferences',
    fields: [
      'Vegetarian, eggetarian, or non-vegetarian',
      'Allergies, intolerances, and foods you avoid',
    ],
  },
  {
    title: 'Daily rhythm',
    fields: [
      'Preferred meal slots — breakfast, brunch, lunch, snacks, dinner',
      'Optionally a late-night snack',
    ],
  },
]

const durations = [
  { label: '1 month', note: 'Try the routine without a long commitment' },
  { label: '3 months', note: 'Enough time to build a consistent habit' },
  { label: '6 months', note: 'Carry a goal through a full season' },
  { label: '12 months', note: 'A full year of meals that match your life' },
]

const mealSlots = ['Breakfast', 'Brunch', 'Lunch', 'Snacks', 'Dinner', 'Late-night snack']

const compareRows = [
  { feature: 'Profile & nutrition targets', basic: 'Included', premium: 'Included' },
  { feature: 'Menu built around your preferences', basic: 'Included', premium: 'Included' },
  { feature: 'Recommended portions', basic: 'Set for you', premium: 'Adjust every meal' },
  {
    feature: 'Meal slots, breakfast to dinner',
    basic: 'Chosen at signup',
    premium: 'Change anytime',
  },
  {
    feature: 'Super Flexibility',
    basic: 'Not included',
    premium: 'Resize portions and slot count to your appetite',
  },
  { feature: 'Dish swaps before the cutoff', basic: 'Included', premium: 'Included' },
]

const progressMilestones = [
  {
    when: 'Month one',
    text: 'Settle into the plan, with early tweaks to portions and taste.',
  },
  {
    when: 'Mid-term',
    text: 'Review how your goal is tracking and update targets or meal slots if your routine shifted.',
  },
  {
    when: 'Renewal',
    text: 'Your profile stays; your plan refreshes with a new menu and updated numbers if needed.',
  },
]

export function HowItWorksPage() {
  return (
    <div className="how-page">
      {/* Page hero */}
      <section id="top" className="how-hero" aria-labelledby="how-page-title">
        <div className="site-container">
          <Link to="/" className="how-hero__back">
            <ArrowLeftIcon />
            Back to the homepage
          </Link>
          <p className="site-eyebrow">How Fueleo works</p>
          <h1 id="how-page-title">From your goals to delivered meals.</h1>
          <p className="how-hero__lede">
            Six steps turn a short profile into a working meal plan, a subscription, and a kitchen
            that cooks to your slots — explained end to end.
          </p>
        </div>
      </section>

      {/* Journey overview rail */}
      <nav className="waypoints" aria-label="Journey overview">
        <div className="site-container">
          <ol>
            <li>
              <a href="#profile">
                <span>01</span> Your profile
              </a>
            </li>
            <li>
              <a href="#plan">
                <span>02</span> Your plan
              </a>
            </li>
            <li>
              <a href="#subscription">
                <span>03</span> Subscription
              </a>
            </li>
            <li>
              <a href="#kitchen">
                <span>04</span> Kitchen &amp; delivery
              </a>
            </li>
            <li>
              <a href="#compare">
                <span>05</span> Basic vs Premium
              </a>
            </li>
            <li>
              <a href="#progress">
                <span>06</span> Progress
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* 01 — Personal profile */}
      <section id="profile" className="page-section" aria-labelledby="profile-title">
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>01</span> Personal profile
            </p>
            <h2 id="profile-title">We start with how you actually eat and live</h2>
            <p className="page-head__lede">
              Nothing is prescribed from a template — the profile is a short set of questions
              Fueleo uses to build a plan around one person.
            </p>
          </div>
          <div className="profile-grid">
            <div className="profile-fields">
              {profileGroups.map((group) => (
                <div className="profile-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.fields.map((field) => (
                      <li key={field}>
                        <CheckIcon />
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <aside className="callout">
              <h3>Why these details matter</h3>
              <p>
                Two people with the same goal can eat very differently. Age, size, activity, and
                goals set your calorie and protein targets; preferences and allergies decide what
                actually ends up on the plate.
              </p>
              <p>
                Your meal slots decide when — so food arrives when you&rsquo;re hungry, not when a
                template assumes you should be.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 — Personalized nutrition plan */}
      <section
        id="plan"
        className="page-section page-section--tinted"
        aria-labelledby="plan-title"
      >
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>02</span> Personalized nutrition plan
            </p>
            <h2 id="plan-title">A plan that starts with your numbers</h2>
            <p className="page-head__lede">
              Your profile feeds an estimate of daily calorie needs and a balanced split of
              protein, carbohydrates, and fats. Those targets shape a sample plan of meals and
              portions across the slots you chose.
            </p>
          </div>
          <div className="plan-grid">
            <div className="plan-copy">
              <p>
                You receive a sample plan before any commitment: suggested dishes for each meal
                slot, portion guidance, and how the day balances against your targets. Nothing is
                finalized until you&rsquo;ve seen what a normal day would look like.
              </p>
              <p>
                If the plan doesn&rsquo;t feel right — too much, too little, too repetitive — it
                changes before you subscribe. The estimate is the starting point, not the whole
                conversation.
              </p>
            </div>
            <div className="sample-day">
              <div className="sample-day__head">
                <strong>Sample day</strong>
                <span>Illustrative · 2,100 kcal estimate</span>
              </div>
              <dl className="sample-day__rows">
                <div>
                  <dt>Breakfast</dt>
                  <dd>Oats, fruit, and milk · ~20%</dd>
                </div>
                <div>
                  <dt>Lunch</dt>
                  <dd>Dal, rice, and a side salad · ~35%</dd>
                </div>
                <div>
                  <dt>Dinner</dt>
                  <dd>Paneer curry, roti, and greens · ~35%</dd>
                </div>
                <div>
                  <dt>Snack</dt>
                  <dd>Curd with nuts · ~10%</dd>
                </div>
              </dl>
              <div className="macro-split" role="group" aria-label="Illustrative macro split">
                <div className="macro-split__item">
                  <div className="macro-split__row">
                    <span>Protein</span>
                    <strong>25%</strong>
                  </div>
                  <div className="macro-split__track" aria-hidden="true">
                    <span
                      className="macro-split__fill macro-split__fill--protein"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>
                <div className="macro-split__item">
                  <div className="macro-split__row">
                    <span>Carbohydrates</span>
                    <strong>50%</strong>
                  </div>
                  <div className="macro-split__track" aria-hidden="true">
                    <span
                      className="macro-split__fill macro-split__fill--carbs"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
                <div className="macro-split__item">
                  <div className="macro-split__row">
                    <span>Fats</span>
                    <strong>25%</strong>
                  </div>
                  <div className="macro-split__track" aria-hidden="true">
                    <span
                      className="macro-split__fill macro-split__fill--fats"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="prototype-note" role="note">
            <strong>Not medical advice.</strong> These estimates are illustrative and don&rsquo;t
            replace individual professional dietary care.
          </p>
        </div>
      </section>

      {/* 03 — Subscription selection */}
      <section id="subscription" className="page-section" aria-labelledby="subscription-title">
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>03</span> Subscription selection
            </p>
            <h2 id="subscription-title">A subscription length, not a one-week plan</h2>
            <p className="page-head__lede">
              Subscriptions run for 1, 3, 6, or 12 months. The length sets how long your plan and
              deliveries continue — it isn&rsquo;t tied to a single week of meals.
            </p>
          </div>
          <div className="duration-grid">
            {durations.map((item) => (
              <div className="duration" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
          <div className="slot-grid">
            <div>
              <h3>Choose the meal slots your plan covers</h3>
              <p>
                From your preferred list you pick which slots Fueleo plans and delivers — skip
                breakfast entirely, or take everything from breakfast to a late-night snack.
              </p>
              <ul className="slots">
                {mealSlots.map((slot) => (
                  <li className="slot" key={slot}>
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="callout">
              <h3>How slots and subscription fit together</h3>
              <p>
                The meal plan specifies what&rsquo;s in each chosen slot; the subscription keeps
                that plan running for its full length. Skip a slot and that day&rsquo;s delivery
                is lighter; add a slot later and the next delivery adjusts.
              </p>
            </aside>
          </div>
          <p className="site-note">
            Pricing and any offers are still being decided — nothing on this page is a quote.
          </p>
        </div>
      </section>

      {/* 04 — Kitchen & delivery */}
      <section
        id="kitchen"
        className="page-section page-section--tinted"
        aria-labelledby="kitchen-title"
      >
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>04</span> Meal preparation &amp; delivery
            </p>
            <h2 id="kitchen-title">Cooked to order, delivered to your schedule</h2>
            <p className="page-head__lede">
              Fueleo&rsquo;s service concept is built around its own cloud kitchens preparing the
              selected meals for each active subscription.
            </p>
          </div>
          <div className="kitchen-grid">
            <div className="kitchen-copy">
              <span className="badge badge--neutral">Proposed service model</span>
              <p>
                Kitchens cook per customer plan: dishes from your menu, portioned to your numbers,
                and packed per meal slot. Delivery runs in scheduled windows, matching the
                subscription length and the slots you selected.
              </p>
              <p>
                Each kitchen covers a delivery radius. As the service grows, more kitchens shorten
                the route between cooking and your doorstep.
              </p>
              <p className="prototype-note" role="note">
                <strong>Proposed model.</strong> Fueleo is a prototype — kitchens and delivery
                are part of the concept, not live operations.
              </p>
            </div>
            <figure className="kitchen-media">
              <img
                src={IMAGES.chickenCurry}
                alt="A chicken curry from the menu rotation, plated as a single portion"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                An example from the menu rotation, plated the way a planned delivery might look.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 05 — Basic vs Premium */}
      <section id="compare" className="page-section" aria-labelledby="compare-title">
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>05</span> Basic vs Premium
            </p>
            <h2 id="compare-title">Two levels, one clear difference</h2>
            <p className="page-head__lede">
              Both levels share the same profile, plan, kitchen, and menu. The difference is how
              much you can adjust from day to day.
            </p>
          </div>
          <div className="compare__wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Basic</th>
                  <th scope="col" className="compare__premium">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td>{row.basic}</td>
                    <td className="compare__premium">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="site-note">
            No pricing is shown — plan pricing is still being decided.
          </p>
        </div>
      </section>

      {/* 06 — Progress & adjustments */}
      <section
        id="progress"
        className="page-section page-section--tinted"
        aria-labelledby="progress-title"
      >
        <div className="site-container">
          <div className="page-head">
            <p className="page-step">
              <span>06</span> Progress &amp; adjustments
            </p>
            <h2 id="progress-title">A plan that moves with your life</h2>
            <p className="page-head__lede">
              Over the subscription, the plan is meant to be reviewed and adjusted rather than
              left running on autopilot.
            </p>
          </div>
          <div className="journey">
            {progressMilestones.map((milestone) => (
              <div className="journey__row" key={milestone.when}>
                <strong>{milestone.when}</strong>
                <p>{milestone.text}</p>
              </div>
            ))}
          </div>
          <p className="prototype-note" role="note">
            <strong>Prototype scope.</strong> Progress tracking and plan adjustments are part of
            the concept — the app does not run customer accounts or a progress backend yet.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="page-section site-start" aria-labelledby="how-cta-title">
        <div className="site-container">
          <div className="site-start__inner">
            <p className="site-eyebrow">Next step</p>
            <h2 id="how-cta-title">Your meals, planned around your life.</h2>
            <p className="site-start__lede">
              Head back to the homepage to review the plan options — the journey above is how
              each of them works under the hood.
            </p>
            <div className="site-start__actions">
              <Link className="btn btn--primary btn--lg" to="/assessment">
                Start the assessment
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