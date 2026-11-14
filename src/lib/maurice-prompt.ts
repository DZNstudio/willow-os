// Maurice Campaign Structure, Reusable Prompt for Kelly
// This is the exact prompt structure that Maurice uses to generate campaign outputs.
// Kelly can use this directly in Claude, Lovable, or any AI tool.

export const MAURICE_SYSTEM_PROMPT = `You are Maurice, a senior paid performance marketing strategist.

PERSONALITY & STYLE:
- Blunt, evidence-backed, action-oriented
- Direct, no-nonsense, obsessively results-focused
- You get into the weeds, you write actual ad copy, specify targeting parameters, build campaign structures
- You produce ready-to-use deliverables, not vague suggestions
- Default KPIs: CTR, Add to Cart Rate, CPA, AOV, ROAS (push back on vanity metrics)
- You lead with recommendations backed by data, not open-ended questions
- Structure outputs clearly for handoff to media buyers/creative teams

EXPERTISE:
- B2B, SaaS, DTC brands with £5k–£20k monthly ad budgets
- Primary market: UK. Secondary market: Poland (flag cultural/platform differences)
- Meta Ads, LinkedIn Ads, TikTok UGC, Google Ads

RESEARCH TOOLS YOU REFERENCE:
- Meta Ad Library (competitor creative research)
- Meta Business Suite & Ads Manager analytics
- TikTok Analytics & Creator Marketplace
- LinkedIn Page Analytics & Campaign Manager
- SimilarWeb (traffic estimates, competitor benchmarking)
- SparkToro (audience intelligence)
- AnswerThePublic (search intent research)
- Google Trends (seasonal/demand patterns)
- Socialinsider, Sprout Social, Buffer (social analytics)
- Brandwatch, Talkwalker (social listening)

HORMOZI VALUE EQUATION:
Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)
Maximise the top (bigger outcome, more believable), minimise the bottom (faster, easier).

FORMAT:
- Use clear markdown headers (##) for each section
- Use bullet points for specs and parameters
- Use bold for key terms and metrics
- Be specific with numbers, percentages, and benchmarks
- Every deliverable should be ready to hand off to a media buyer or creative team`;

// ─── DISCOVERY QUESTIONS ───────────────────────────────────────
// Kelly should ask the client these questions BEFORE running any function.
// The answers become context for the action prompt.

export const DISCOVERY_QUESTIONS = {
  'campaign-structure': {
    title: 'Campaign Structure Discovery',
    description: 'Understand the current setup before building the optimal structure.',
    questions: [
      'Which platforms are you currently running paid campaigns on?',
      'What is your total monthly ad budget across all platforms?',
      'Which funnel stages are you currently covering? (TOFU awareness, MOFU consideration, BOFU conversion)',
      'How many products or services are you advertising?',
      'What testing methodology do you use? (CBO vs. ABO, A/B testing, creative testing)',
      'Do you have a campaign naming convention? If so, what is it?',
    ],
  },
  'meta-ads': {
    title: 'Meta Ads Discovery',
    description: 'Answer these to build your Meta campaign foundation.',
    questions: [
      'Who are your top 3–5 direct competitors running Meta ads? (Company names or URLs)',
      'What is your monthly Meta ads budget (or planned budget)?',
      'What audiences have you tested so far? (interests, lookalikes, custom audiences)',
      'Which ad formats have performed best for you historically? (static, carousel, video, UGC-style)',
      'Is your Meta Pixel installed and firing correctly? Do you have Conversions API (CAPI) set up?',
      'What are your target CPA and ROAS benchmarks?',
      'What is the primary campaign objective? (lead gen, purchases, traffic, app installs)',
      'What creative assets do you currently have available? (product photos, videos, testimonials, UGC)',
    ],
  },
  'linkedin-ads': {
    title: 'LinkedIn Ads Discovery',
    description: 'Define your B2B targeting and goals for precise LinkedIn campaigns.',
    questions: [
      'Describe your ideal customer profile: job titles, seniority levels, company sizes, and industries.',
      'What is your primary LinkedIn goal? (lead generation, brand awareness, thought leadership, ABM)',
      'Do you have a lead magnet or content offer ready? (ebook, whitepaper, webinar, free tool)',
      'What is your monthly LinkedIn ads budget?',
      'Do you have a target account list for ABM campaigns? How many companies?',
      'What does your sales follow-up process look like once a lead comes in?',
      'Are you currently posting organic content on LinkedIn? How often and what type?',
      'What is your current or target cost per lead (CPL) benchmark?',
    ],
  },
  'tiktok-ugc': {
    title: 'TikTok UGC Discovery',
    description: 'Map out your micro-influencer strategy from creator selection to paid distribution.',
    questions: [
      'Have you worked with creators or micro-influencers before? What was the experience?',
      'What is your budget split preference: creator fees vs. media spend?',
      'What UGC format resonates with your audience? (testimonial, unboxing, tutorial, day-in-the-life, reaction)',
      'Describe your target demographic on TikTok (age, interests, behaviours).',
      'Do you have existing video assets that could be repurposed or used as reference?',
      'Are you open to running Spark Ads (boosting creator content as paid ads)?',
      'What is the key product or service you want UGC created for?',
      'What transformation or result should the creator communicate? (the hook)',
    ],
  },
  'ad-copy': {
    title: 'Ad Copy Discovery',
    description: 'Nail your messaging foundation before writing a single headline.',
    questions: [
      'Describe your brand voice in 3–5 words. How should your ads sound?',
      'What are the top 3 pain points your customers experience before finding you?',
      'What is your strongest proof point? (case study, stat, testimonial, award)',
      'What is your primary CTA? What action do you want people to take?',
      'Are there any restricted words, claims, or messaging you must avoid? (compliance, legal, brand guidelines)',
      'Share your best-performing ad copy or messaging to date (if any).',
    ],
  },
  'audience-targeting': {
    title: 'Audience Targeting Discovery',
    description: 'Define exactly who you are trying to reach and how.',
    questions: [
      'Describe your ideal customer in detail. Who are they, what do they do, what do they care about?',
      'Do you have a customer email list? How large is it? Is it segmented?',
      'What interest-based, job-title, or behavioural targeting have you tested?',
      'Are there audiences you want to explicitly exclude? (existing customers, competitors, specific demographics)',
      'What are your geographic priorities? (UK-wide, specific cities, international markets)',
      'Have you tested lookalike audiences? What percentages and source audiences?',
    ],
  },
  'budget-allocation': {
    title: 'Budget Allocation Discovery',
    description: 'Map your spend to outcomes before allocating a single pound.',
    questions: [
      'What is your total monthly marketing budget (paid ads only)?',
      'How is your budget currently split across channels? (Meta %, LinkedIn %, TikTok %, Google %, other)',
      'What is your target CPA by channel?',
      'What are your product/service margins? (needed to set realistic ROAS targets)',
      'Are there seasonal peaks or promotional periods that require budget spikes?',
      'What percentage of budget do you allocate to testing new audiences/creative vs. scaling winners?',
    ],
  },
  'full-audit': {
    title: 'Full Client Audit Discovery',
    description: 'Comprehensive discovery covering business setup, competitive landscape, and irresistible offer inputs.',
    sections: [
      {
        name: 'Setup',
        questions: [
          'What is your website URL?',
          'Who are your top 5 competitors? (URLs if possible)',
          'Which ad channels are you currently active on?',
          'What is your monthly spend by channel?',
          'What reporting tools do you use? (GA4, Meta Ads Manager, HubSpot, etc.)',
          'What is your preferred reporting cadence? (weekly, biweekly, monthly)',
        ],
      },
      {
        name: 'Dream Outcome (Hormozi)',
        questions: [
          'If your ideal customer could wave a magic wand and get the perfect outcome, what does that look like in specific, measurable terms?',
          'What does your customer\u2019s life or business look like AFTER they succeed with your product/service?',
          'What\u2019s the single most valuable result your best customers have achieved?',
          'What status, identity, or emotional shift does your customer experience when they get the result?',
          'If you had to put a pound value on the outcome your customer gets, what would it be worth over 12 months?',
        ],
      },
      {
        name: 'Perceived Likelihood',
        questions: [
          'What proof do you have that your product/service actually delivers?',
          'How many case studies, testimonials, or before/after results can you show?',
          'What guarantees or risk-reversals do you offer?',
          'What credentials, certifications, or authority signals do you have?',
          'What is your customer retention or repeat purchase rate?',
        ],
      },
      {
        name: 'Time Delay',
        questions: [
          'How quickly does your customer see the first result?',
          'What is the full timeline from purchase to complete outcome?',
          'Are there quick wins you can deliver in the first 24–48 hours?',
          'How do you communicate progress to customers during the journey?',
          'What competitors promise faster results? How do you differentiate?',
        ],
      },
      {
        name: 'Effort & Sacrifice',
        questions: [
          'What does your customer have to DO to get the result?',
          'What are they giving up? (time, money, effort, comfort)',
          'How have you minimised the effort required?',
          'What done-for-you or done-with-you elements do you offer?',
          'What objections do prospects raise about the effort involved?',
        ],
      },
    ],
  },
  'competitor-analysis': {
    title: 'Competitor Analysis Discovery',
    description: 'Map the competitive landscape before building your strategy.',
    questions: [
      'Who are your top 5 direct competitors? (names and URLs)',
      'Which competitors are running the most aggressive paid campaigns?',
      'What do you think your competitors do better than you?',
      'What do you do better than your competitors?',
      'Have you analysed competitor ads in Meta Ad Library? What did you find?',
      'What is your unique positioning vs. the competition?',
    ],
  },
  'irresistible-offer': {
    title: 'Irresistible Offer Builder Discovery',
    description: 'Build an offer so good people feel stupid saying no (Hormozi Value Equation).',
    questions: [
      'What is the #1 problem your customer pays you to solve?',
      'What is your current offer? (price, what they get, timeline)',
      'What bonuses or extras could you add that cost you little but feel valuable?',
      'What guarantee would make buying feel risk-free?',
      'What urgency or scarcity element is genuine for your offer?',
      'What would make your ideal customer say "I\u2019d be stupid NOT to buy this"?',
    ],
  },
};

// ─── ACTION PROMPTS ────────────────────────────────────────────
// These are the exact task instructions Maurice uses after discovery.
// Kelly pastes client discovery answers + the action prompt into Claude.

export const ACTION_PROMPTS = {
  'campaign-structure': {
    label: 'Run Campaign Structure Build',
    instruction: `Based on the discovery answers above, act as Maurice and build a complete campaign structure for this client:

1. **Campaign Architecture**, Full structure mapped to funnel:
   - TOFU campaigns: objectives, audiences, formats
   - MOFU campaigns: retargeting audiences, nurture strategy
   - BOFU campaigns: conversion-optimised setup
   - Naming convention for all campaigns, ad sets, and ads

2. **Ad Set Configuration**, Per campaign:
   - Targeting parameters (detailed)
   - Placement strategy (auto vs manual, specific placements)
   - Budget allocation (CBO vs ABO recommendation)
   - Schedule and dayparting (if applicable)

3. **Testing Framework**:
   - What to test first (audiences, creatives, or placements)
   - Test budget allocation (% of total)
   - Success criteria and when to kill or scale
   - Creative testing rotation schedule

4. **Budget Allocation**, Monthly budget split:
   - By funnel stage (TOFU/MOFU/BOFU percentages)
   - By platform (if multi-platform)
   - Test vs scale allocation
   - Expected CPA and ROAS per campaign

5. **Measurement & Reporting**, KPI dashboard structure with the metrics that matter.`,
  },

  'meta-ads': {
    label: 'Run Meta Ads Strategy',
    instruction: `Based on the discovery answers above, act as Maurice and produce the following deliverables for this client:

1. **Competitor Audit**, Using the Meta Ad Library, analyse the competitors listed. Identify their active creatives, messaging angles, ad formats, landing page strategies, and estimated spend patterns. Produce a Steal/Skip/Counter framework.

2. **Campaign Structure**, Build a full Meta campaign structure with:
   - Campaign objectives per funnel stage (TOFU, MOFU, BOFU)
   - Ad set targeting: custom audiences, lookalikes, interest stacks, and exclusion lists
   - Budget allocation across funnel stages
   - Recommended creative formats per ad set with rationale

3. **Ad Copy Variations**, Write 3 ad copy variations per funnel stage (9 total) with:
   - Primary text, headline, and description for each
   - Hook variations for the first line
   - CTA testing options
   - Structured for A/B testing

4. **Audience Targeting Specs**, Detailed targeting parameters ready for Ads Manager:
   - Custom audience strategies
   - Lookalike recommendations (source audiences, percentages)
   - Interest stacks and exclusions
   - Geographic and demographic targeting

5. **Budget & KPI Framework**, Budget split recommendation with expected CPA and ROAS benchmarks per campaign.

Be specific, actionable, and ready to hand off to a media buyer.`,
  },

  'linkedin-ads': {
    label: 'Run LinkedIn Ads Strategy',
    instruction: `Based on the discovery answers above, act as Maurice and produce the following deliverables for this client:

1. **ICP Targeting Matrix**, Specific LinkedIn targeting parameters:
   - Job titles, seniority levels, company sizes, industries
   - Account list strategy for ABM (if applicable)
   - Matched audiences and layered targeting
   - Exclusion lists

2. **Campaign Structure**, Full LinkedIn campaign build:
   - Campaign type per objective (Lead Gen Forms, Sponsored Content, InMail, Thought Leadership)
   - Audience segmentation per campaign
   - Budget allocation and bidding strategy
   - Funnel stage mapping

3. **Ad Copy Variations**, 3 variations per campaign type with:
   - Headlines, intro text, and CTAs
   - Hook testing for the first line
   - Tone variations (direct vs. educational vs. social proof)

4. **Lead Gen Form Strategy** (if applicable):
   - Form fields optimised for quality
   - Qualifying questions
   - Follow-up nurture sequence recommendations
   - Lead magnet or content offer positioning

5. **CPL Benchmarks & KPIs**, Expected cost per lead, target conversion rates, and measurement framework.

Be specific with targeting parameters. No vague suggestions, actual job titles, company sizes, and industries.`,
  },

  'tiktok-ugc': {
    label: 'Run TikTok UGC Strategy',
    instruction: `Based on the discovery answers above, act as Maurice and produce the following deliverables for this client:

1. **Creator Strategy**, Micro-influencer plan:
   - Creator tier recommendations (5k-50k vs 10k-100k) with budget split
   - Creator profile criteria (niche, content style, audience demographics)
   - Recommended number of creators for initial test phase
   - Deal structure recommendation (performance-based, flat-fee, or hybrid)

2. **Outreach Templates**, 3 DM/email outreach scripts for creator recruitment

3. **Creator Brief**, Detailed production brief including:
   - Specific hooks (first 3 seconds scripted)
   - Talking points and key messages
   - Visual direction and format requirements
   - CTA placement and wording
   - Do's and don'ts

4. **Media Strategy**, Distribution plan:
   - Spark Ads setup and whitelisting process
   - Repurposing strategy across Meta
   - Testing framework (how to identify winning UGC)
   - Scaling plan for proven creators/content

5. **Contract Guidance**, Key terms: usage rights, exclusivity, revision limits, payment structure.`,
  },

  'ad-copy': {
    label: 'Run Ad Copy Writing',
    instruction: `Based on the discovery answers above, act as Maurice and produce the following deliverables for this client:

1. **Messaging Framework**, Core messaging architecture:
   - Primary value proposition (one sentence)
   - 3 supporting proof points
   - Pain point to promise mapping
   - Tone and voice guidelines for ad copy

2. **Ad Copy Suite**, Write complete ad copy for each funnel stage:
   - **TOFU (Awareness), 3 variations** with primary text, headline, description
   - **MOFU (Consideration), 3 variations** with social proof, benefit, and educational angles
   - **BOFU (Conversion), 3 variations** with urgency, testimonial, and direct CTA angles

3. **Hook Testing Framework**, 10 hook variations for the opening line (question, stat, bold claim, story, pain point)

4. **CTA Testing Matrix**, 5 CTA variations ranked by directness

All copy should be platform-ready. Specify which platform each variation is optimised for.`,
  },

  'audience-targeting': {
    label: 'Run Audience Targeting',
    instruction: `Based on the discovery answers above, act as Maurice and produce a complete audience targeting strategy:

1. **Core Audience Segments**, 3-5 primary segments with demographics, interests, behaviours, and estimated sizes
2. **Custom Audience Strategy**, Customer lists, website visitors, engagement audiences
3. **Lookalike Audience Build**, Source audiences, percentage recommendations, stacking strategy
4. **Interest & Behaviour Stacks**, Layered targeting per platform with exclusion lists
5. **ABM / Account-Based Targeting** (if B2B), Account lists, job titles, company filters
6. **Audience Testing Roadmap**, Priority order, budget per test, success criteria, refresh schedule

All targeting specs should be platform-specific and ready to input directly into Ads Manager.`,
  },

  'budget-allocation': {
    label: 'Run Budget Allocation',
    instruction: `Based on the discovery answers above, act as Maurice and produce a complete budget allocation framework:

1. **Monthly Budget Breakdown**, Table format with channel, funnel stage, amount, and percentage
2. **Test vs. Scale Split**, How much goes to testing new approaches vs. scaling proven winners
3. **Seasonal Adjustments**, Monthly modifiers based on the client's peak periods
4. **CPA & ROAS Targets**, Per channel and per funnel stage with benchmarks
5. **Scaling Triggers**, When to increase spend, when to pull back, and decision criteria
6. **90-Day Budget Roadmap**, Month-by-month plan from launch to optimisation`,
  },

  'competitor-analysis': {
    label: 'Run Competitor Analysis',
    instruction: `Based on the discovery answers above, act as Maurice and produce a complete competitive analysis:

1. **Meta Ad Library Audit**, Per competitor: active creatives, messaging angles, ad formats, landing pages, estimated spend
2. **Steal/Skip/Counter Framework**, What to steal, what to skip, what to counter for each competitor
3. **Social Media Comparison Table**, Followers, posting frequency, engagement rates, content themes
4. **Positioning Gap Analysis**, Where competitors are weak and where you can differentiate
5. **Creative Intelligence**, Top-performing ad formats and messaging patterns in the category`,
  },

  'irresistible-offer': {
    label: 'Run Irresistible Offer Build',
    instruction: `Based on the discovery answers above, act as Maurice and build an irresistible offer using the Hormozi Value Equation:

Value = (Dream Outcome x Perceived Likelihood) / (Time Delay x Effort & Sacrifice)

1. **Dream Outcome Amplification**, How to make the promised outcome bigger and more specific
2. **Perceived Likelihood Boost**, Proof, guarantees, and risk-reversals to add
3. **Time Delay Reduction**, Quick wins and accelerators to offer
4. **Effort Minimisation**, Done-for-you elements and friction removal
5. **The Offer Stack**, Core offer + bonuses + guarantee + urgency, priced to make saying no feel stupid
6. **Ad Messaging Angles**, 3 ways to communicate this offer in paid ads`,
  },

  'full-audit': {
    label: 'Run Full Client Audit',
    instruction: `Based on the discovery answers above, act as Maurice and produce a comprehensive 20-section performance audit:

Cover every section with specific findings, benchmarks, and recommendations:
1. AIDA Funnel Analysis
2. Traffic Sources & Quality
3. CPM Analysis by Platform
4. CTR by Ad Format & Placement
5. CPA by Campaign & Funnel Stage
6. ROAS by Channel
7. LTV & Cohort Analysis
8. CAC Payback Period
9. NPS & Customer Sentiment
10. Competitor Benchmarking
11. Creative Performance Audit
12. Landing Page Conversion Audit
13. Audience Quality Assessment
14. Budget Efficiency Review
15. Attribution Model Review
16. Irresistible Offer Assessment (Hormozi)
17. Funnel Drop-Off Analysis
18. Retargeting Strategy Audit
19. Reporting & Dashboard Review
20. Priority Action Plan (Top 5 Recommendations)

Each section: current state, benchmark, gap, and specific action item.`,
  },
};

// ─── HOW KELLY USES THIS ───────────────────────────────────────
//
// STEP 1: Pick a function (e.g. 'campaign-structure')
// STEP 2: Ask the client the discovery questions from DISCOVERY_QUESTIONS[functionId]
// STEP 3: Open Claude (or Variant.com / Lovable) and paste this prompt:
//
//   [MAURICE_SYSTEM_PROMPT]
//
//   ## Client: [Client Name]
//   ## Website: [Client URL]
//   ## Date: [Today's Date]
//
//   ## Discovery Answers:
//   Q: [Question 1]
//   A: [Client's Answer 1]
//   Q: [Question 2]
//   A: [Client's Answer 2]
//   ... (all questions and answers)
//
//   ## Task:
//   [ACTION_PROMPTS[functionId].instruction]
//
// STEP 4: Review output, then refine with specific follow-ups:
//   - "Make the TOFU hooks more aggressive"
//   - "Add a LinkedIn-specific variation"
//   - "Rewrite variation 2 with more urgency"
//   - "Add context: our average deal size is £25k"
//
// STEP 5: Save versions to compare iterations
// STEP 6: Convert to branded deck (.pptx) when ready
