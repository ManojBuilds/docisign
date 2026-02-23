import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LANDING_DIR = path.join(ROOT, 'content/landing-pages');
const RESEARCH_DIR = path.join(ROOT, 'research');
const TODAY = '2026-02-23';

const FREELANCER_ROLES = [
  { slug: 'graphic-designers', role: 'Graphic Designers', coreDoc: 'design contract', pain: 'clients requesting unlimited revisions', outcome: 'protect revision scope and approvals' },
  { slug: 'web-developers', role: 'Web Developers', coreDoc: 'development agreement', pain: 'scope creep after kickoff', outcome: 'control change requests with signed addendums' },
  { slug: 'seo-consultants', role: 'SEO Consultants', coreDoc: 'consulting agreement', pain: 'ranking guarantees and unclear timelines', outcome: 'set expectation boundaries and reporting terms' },
  { slug: 'copywriters', role: 'Copywriters', coreDoc: 'copywriting contract', pain: 'late feedback loops and endless edits', outcome: 'lock review windows and acceptance criteria' },
  { slug: 'video-editors', role: 'Video Editors', coreDoc: 'video editing agreement', pain: 'new deliverables added mid-project', outcome: 'keep deliverables and revision rounds enforceable' },
  { slug: 'social-media-managers', role: 'Social Media Managers', coreDoc: 'social media service agreement', pain: 'always-on expectations', outcome: 'define response hours and escalation terms' },
  { slug: 'virtual-assistants', role: 'Virtual Assistants', coreDoc: 'virtual assistant contract', pain: 'urgent requests outside schedule', outcome: 'set turnaround and priority rules' },
  { slug: 'bookkeepers', role: 'Bookkeepers', coreDoc: 'bookkeeping service agreement', pain: 'unclear close timelines', outcome: 'standardize monthly close responsibilities' },
  { slug: 'photographers', role: 'Photographers', coreDoc: 'photography contract', pain: 'rights usage disputes', outcome: 'clarify licensing and usage permissions' },
  { slug: 'consultants', role: 'Independent Consultants', coreDoc: 'consulting contract', pain: 'delayed approvals from stakeholders', outcome: 'accelerate stakeholder signing paths' },
  { slug: 'coaches', role: 'Business Coaches', coreDoc: 'coaching agreement', pain: 'last-minute reschedules', outcome: 'enforce scheduling and cancellation terms' },
  { slug: 'motion-designers', role: 'Motion Designers', coreDoc: 'creative services contract', pain: 'asset handoff ambiguity', outcome: 'define source file ownership and usage rights' },
  { slug: 'podcast-editors', role: 'Podcast Editors', coreDoc: 'podcast production agreement', pain: 'approval bottlenecks before publishing', outcome: 'set approval windows that protect release dates' },
  { slug: 'ux-designers', role: 'UX Designers', coreDoc: 'UX design agreement', pain: 'expanding research scope', outcome: 'lock sprint deliverables and decision milestones' },
  { slug: 'email-marketers', role: 'Email Marketers', coreDoc: 'email marketing agreement', pain: 'missing campaign approvals', outcome: 'track approvals with a complete audit trail' },
  { slug: 'tutors', role: 'Private Tutors', coreDoc: 'tutoring agreement', pain: 'no-shows without notice', outcome: 'formalize cancellation windows' },
  { slug: 'translators', role: 'Translators', coreDoc: 'translation agreement', pain: 'rush work with undefined pricing', outcome: 'capture rush pricing and deadlines up front' },
  { slug: 'interior-designers', role: 'Interior Designers', coreDoc: 'design services agreement', pain: 'change requests after procurement', outcome: 'require signed change orders before spending' },
  { slug: 'event-planners', role: 'Event Planners', coreDoc: 'event planning agreement', pain: 'vendor and client misalignment', outcome: 'align approvals and responsibility boundaries' },
  { slug: 'real-estate-photographers', role: 'Real Estate Photographers', coreDoc: 'media licensing agreement', pain: 'unclear listing usage periods', outcome: 'set listing term and relicensing terms' },
];

const INDUSTRY_SEGMENTS = [
  { slug: 'agencies', name: 'Agencies', buyer: 'operations leads', workflow: 'client approval workflow', compliance: 'audit trail and signer attribution' },
  { slug: 'real-estate', name: 'Real Estate Teams', buyer: 'brokers and transaction coordinators', workflow: 'offer and disclosure workflow', compliance: 'time-stamped approvals' },
  { slug: 'healthcare-admin', name: 'Healthcare Admin Teams', buyer: 'practice administrators', workflow: 'patient intake and consent workflow', compliance: 'policy-based access controls' },
  { slug: 'staffing', name: 'Staffing Firms', buyer: 'recruiting operations', workflow: 'candidate onboarding workflow', compliance: 'document retention controls' },
  { slug: 'consulting-firms', name: 'Consulting Firms', buyer: 'engagement managers', workflow: 'SOW approval workflow', compliance: 'signer identity records' },
  { slug: 'property-management', name: 'Property Management Teams', buyer: 'property managers', workflow: 'lease renewal workflow', compliance: 'tamper-evident records' },
  { slug: 'finance-ops', name: 'Finance Operations Teams', buyer: 'finance managers', workflow: 'vendor agreement workflow', compliance: 'traceable approval history' },
  { slug: 'education-admin', name: 'Education Admin Teams', buyer: 'school administrators', workflow: 'parent authorization workflow', compliance: 'consent logging' },
  { slug: 'construction', name: 'Construction Teams', buyer: 'project managers', workflow: 'change order workflow', compliance: 'field-to-office signature traceability' },
  { slug: 'legal-ops', name: 'Legal Operations Teams', buyer: 'legal ops managers', workflow: 'contract intake workflow', compliance: 'document integrity validation' },
  { slug: 'insurance', name: 'Insurance Teams', buyer: 'claims and underwriting leads', workflow: 'claims authorization workflow', compliance: 'regulated data handling safeguards' },
  { slug: 'procurement', name: 'Procurement Teams', buyer: 'procurement managers', workflow: 'vendor onboarding workflow', compliance: 'approval policy enforcement' },
];

const STATES = [
  { slug: 'california', name: 'California', law: 'California UETA and Civil Code 1633.1-1633.17' },
  { slug: 'texas', name: 'Texas', law: 'Texas UETA' },
  { slug: 'new-york', name: 'New York', law: 'ESRA (Electronic Signatures and Records Act)' },
  { slug: 'florida', name: 'Florida', law: 'Florida Electronic Signature Act' },
  { slug: 'illinois', name: 'Illinois', law: 'Illinois Electronic Commerce Security Act' },
  { slug: 'washington', name: 'Washington', law: 'Washington UETA framework' },
  { slug: 'georgia', name: 'Georgia', law: 'Georgia UETA' },
  { slug: 'arizona', name: 'Arizona', law: 'Arizona UETA' },
  { slug: 'colorado', name: 'Colorado', law: 'Colorado UETA' },
  { slug: 'north-carolina', name: 'North Carolina', law: 'North Carolina UETA' },
  { slug: 'virginia', name: 'Virginia', law: 'Virginia UETA' },
  { slug: 'massachusetts', name: 'Massachusetts', law: 'Massachusetts UETA' },
  { slug: 'pennsylvania', name: 'Pennsylvania', law: 'Pennsylvania Electronic Transactions Act' },
  { slug: 'ohio', name: 'Ohio', law: 'Ohio UETA' },
  { slug: 'michigan', name: 'Michigan', law: 'Michigan UETA' },
];

const DOC_TYPES = [
  { slug: 'contract', label: 'contract' },
  { slug: 'proposal', label: 'proposal' },
  { slug: 'statement-of-work', label: 'statement of work' },
  { slug: 'nda', label: 'NDA' },
  { slug: 'retainer-agreement', label: 'retainer agreement' },
  { slug: 'change-order', label: 'change order' },
];

const VALUE_PILLARS = [
  'no client account required for signing',
  'mobile-first signer experience',
  'tamper-evident audit trail',
  'faster send-to-sign cycle for cashflow',
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toTitleFromSlug(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDocTitle(slug) {
  if (slug === 'nda') return 'NDA';
  if (slug === 'statement-of-work') return 'Statement of Work';
  return toTitleFromSlug(slug);
}

function withArticle(phrase) {
  const normalized = phrase.trim().toLowerCase();
  const useAn = normalized.startsWith('n') || /^[aeiou]/.test(normalized);
  return `${useAn ? 'an' : 'a'} ${phrase}`;
}

function yamlSafe(text) {
  return String(text).replace(/"/g, '\\"');
}

function keywordRow(keyword, cluster, intent, difficulty, volume, slug) {
  const intentValue = intent === 'transactional' ? 3 : intent === 'commercial' ? 2 : 1;
  const volumeWeight = volume === 'med' ? 4 : volume === 'low-med' ? 3 : 2;
  const opportunity = Math.round((volumeWeight * intentValue * 100) / Math.max(difficulty, 1));
  return { keyword, cluster, intent, difficulty, volume, opportunity, slug };
}

function createRoleKeywordRows(role) {
  const base = role.role.toLowerCase();
  return [
    keywordRow(`best e signature for ${base} with no client login`, 'freelancer-role', 'commercial', 28, 'low-med', `best-esignature-${role.slug}-small-business`),
    keywordRow(`send ${role.coreDoc} for signature as ${base}`, 'freelancer-role', 'transactional', 24, 'low-med', `freelancer-${role.slug}-sign-${DOC_TYPES[0].slug}-online`),
    keywordRow(`contract signing software for ${base} small business`, 'freelancer-role', 'commercial', 27, 'low-med', `freelancer-${role.slug}-contract-signing-software`),
    keywordRow(`no account e signature for ${base} clients`, 'freelancer-role', 'transactional', 22, 'low', `no-login-esignature-for-${role.slug}-clients`),
  ];
}

function createIndustryKeywordRows(industry) {
  return [
    keywordRow(`esignature workflow for ${industry.slug.replace('-', ' ')} teams`, 'industry-workflow', 'commercial', 31, 'low-med', `esignature-workflow-for-${industry.slug}-teams`),
    keywordRow(`secure ${industry.slug.replace('-', ' ')} document signing software`, 'industry-workflow', 'commercial', 34, 'low-med', `secure-${industry.slug}-document-signing`),
    keywordRow(`how to improve ${industry.workflow} with e signatures`, 'industry-workflow', 'informational', 26, 'low', `improve-${industry.slug}-signing-workflow`),
  ];
}

function createStateKeywordRows(state) {
  return DOC_TYPES.slice(0, 4).map((doc, idx) => {
    const difficulties = [23, 24, 25, 27];
    return keywordRow(
      `${state.name.toLowerCase()} ${doc.label} signature online no account`,
      'state-document',
      'transactional',
      difficulties[idx],
      'low',
      `sign-${doc.slug}-online-${state.slug}`
    );
  });
}

function pageSectionsForRole(role, docLabel) {
  return {
    checklist: [
      `Define scope and out-of-scope items before sending the ${docLabel}.`,
      'Use signer roles so each participant sees only their fields.',
      'Add due dates and automated reminders before sending.',
      'Require explicit consent language for electronic records.',
      'Store signed copies in one location shared with the client.',
    ],
    mistakes: [
      `Sending a generic ${docLabel} without role-specific terms for ${role.role}.`,
      'Skipping approval deadlines, which delays kickoff and invoicing.',
      'Relying on email attachments with no audit trail.',
      `Allowing ${role.pain} to continue because terms were never signed.`,
    ],
    outcomes: [
      `Outcome 1: ${role.outcome}.`,
      'Outcome 2: Faster cycle time from proposal acceptance to paid work.',
      'Outcome 3: Fewer disputes because the signed record is complete and searchable.',
    ],
  };
}

function pageSectionsForIndustry(industry) {
  return {
    checklist: [
      `Map the current ${industry.workflow} across every signer involved.`,
      'Define approval owners and fallback approvers to prevent bottlenecks.',
      'Standardize templates by document type and risk level.',
      `Embed ${industry.compliance} into every completed packet.`,
      'Review rejection reasons monthly and remove avoidable friction.',
    ],
    mistakes: [
      `Using one template for every ${industry.name} scenario regardless of risk.`,
      'Publishing pages with generic copy that does not match search intent.',
      'Not linking role pages, use-case pages, and legal pages internally.',
      'Ignoring mobile signer behavior in high-volume workflows.',
    ],
  };
}

function pageSectionsForState(state, docLabel) {
  return {
    checklist: [
      `Confirm the ${docLabel} flow captures intent to sign and consent to electronic records.`,
      `Reference ${state.law} in your internal compliance notes.`,
      'Retain final PDFs and event logs in a searchable archive.',
      'Ensure signer email and timestamps are attached to each completion record.',
      'Define when legal review is required for edge-case documents.',
    ],
    mistakes: [
      `Assuming a typed name alone is enough for every ${docLabel} use case.`,
      'Skipping retention policies after the document is signed.',
      'Sending high-stakes agreements without a complete audit package.',
      `Using outdated assumptions instead of current ${state.name} electronic signature rules.`,
    ],
  };
}

function frontmatterBlock(page) {
  const keywordsYaml = page.keywords.map((k) => `    - \"${yamlSafe(k)}\"`).join('\n');
  const cardItemsYaml = page.cardItems.map((item) => `  - title: \"${yamlSafe(item.title)}\"\n    description: \"${yamlSafe(item.description)}\"\n    icon: \"${item.icon}\"\n    color: \"${item.color}\"`).join('\n');
  const useCaseItemsYaml = page.useCaseItems.map((item) => `    - \"${yamlSafe(item)}\"`).join('\n');
  const comparisonRowsYaml = page.comparisonRows
    .map((row) => `    - feature: \"${yamlSafe(row.feature)}\"\n      us: \"${yamlSafe(row.us)}\"\n      them: \"${yamlSafe(row.them)}\"`)
    .join('\n');
  const faqsYaml = page.faqs
    .map(
      (faq, index) =>
        `  - id: \"faq-${index + 1}\"\n    question: \"${yamlSafe(faq.question)}\"\n    answer: \"${yamlSafe(faq.answer)}\"`
    )
    .join('\n');

  return `---
title: \"${yamlSafe(page.title)}\"
description: \"${yamlSafe(page.description)}\"
date: \"${TODAY}\"
category: \"${yamlSafe(page.category)}\"
seo:
  title: \"${yamlSafe(page.title)}\"
  description: \"${yamlSafe(page.description)}\"
  keywords:
${keywordsYaml}
  canonical: \"https://www.boopsign.com/landing/${page.slug}\"
hero:
  badge: \"${yamlSafe(page.hero.badge)}\"
  title: \"${yamlSafe(page.hero.title)}\"
  subtitle: \"${yamlSafe(page.hero.subtitle)}\"
  highlights:
    - \"${VALUE_PILLARS[0]}\"
    - \"${VALUE_PILLARS[1]}\"
    - \"${VALUE_PILLARS[2]}\"
    - \"${VALUE_PILLARS[3]}\"
  testimonial: \"${yamlSafe(page.hero.testimonial)}\"
whyUse:
  title: \"${yamlSafe(page.whyUse.title)}\"
  description: \"${yamlSafe(page.whyUse.description)}\"
cardItems:
${cardItemsYaml}
useCaseSection:
  title: \"${yamlSafe(page.useCaseTitle)}\"
  items:
${useCaseItemsYaml}
  stats:
    - label: \"Friction removed from signer journey.\"
      value: \"High\"
    - label: \"Time-to-sign after optimization.\"
      value: \"Faster\"
comparisonTable:
  title: \"${yamlSafe(page.comparisonTitle)}\"
  headers:
    - \"Feature\"
    - \"Boopsign\"
    - \"Traditional tools\"
  rows:
${comparisonRowsYaml}
faqs:
${faqsYaml}
schema:
  \"@context\": \"https://schema.org\"
  \"@type\": \"SoftwareApplication\"
  \"name\": \"Boopsign\"
  \"applicationCategory\": \"BusinessApplication\"
  \"operatingSystem\": \"Web\"
  \"url\": \"https://www.boopsign.com/${page.slug}\"
  \"offers\":
    \"@type\": \"Offer\"
    \"price\": \"39\"
    \"priceCurrency\": \"USD\"
---`;
}

function bodyForPage(page) {
  const checklist = page.checklist.map((item) => `- ${item}`).join('\n');
  const mistakes = page.mistakes.map((item) => `- ${item}`).join('\n');
  const outcomes = page.outcomes.map((item) => `- ${item}`).join('\n');
  const related = page.relatedLinks.map((item) => `- [${item.label}](/${item.slug})`).join('\n');

  return `
## ${page.h1}

${page.intro}

## Why This Long-Tail Query Converts

People searching this phrase are usually at implementation stage, not browsing stage. They need to send real documents, remove signer friction, and complete agreements without a long onboarding process.

For this use case, good pages must include:

- Clear workflow steps for the exact audience.
- Legal confidence signals without legal overpromises.
- Mobile-first signer guidance.
- Internal links to next-step transactional pages.

## Recommended Signing Workflow

1. Prepare a role-specific template before sending.
2. Add fields only where signer action is required.
3. Keep signer instructions concise and goal-oriented.
4. Trigger reminder logic for unopened and incomplete documents.
5. Archive signed output with complete event logs.

## Implementation Checklist

${checklist}

## Common Mistakes To Avoid

${mistakes}

## Expected Outcomes

${outcomes}

## Internal Linking Plan For This Topic

Use this page as a spoke under your no-account and freelancer hubs. Link to adjacent pages by role, document type, and legal context to reduce orphaned URLs and improve crawl depth.

Recommended links for this query:

${related}
- [No-account eSignature](/landing/no-account-esignature)
- [Send contract without client login](/landing/send-contract-without-client-login)
- [Pricing](/pricing)

## FAQ Expansion Notes

If this page starts ranking for additional modifiers, expand with sections covering integrations, signer authentication options, and template governance patterns. Keep updates tied to real customer objections and support tickets.

## Final Takeaway

${page.conclusion}
`;
}

function rolePage(role, patternType) {
  if (patternType === 'software') {
    const slug = `freelancer-${role.slug}-contract-signing-software`;
    const title = `Contract Signing Software for ${role.role} Small Business`;
    const sections = pageSectionsForRole(role, role.coreDoc);
    return {
      slug,
      title,
      description: `Compare and implement contract signing software for ${role.role.toLowerCase()} with no client login and faster send-to-sign turnaround.`,
      category: 'Freelancer Workflows',
      hero: {
        badge: role.role,
        title: `Contract signing software for ${role.role}`,
        subtitle: `Built for ${role.role.toLowerCase()} who need faster approvals and fewer delays.`,
        testimonial: `\"This removed approval friction from our ${role.role.toLowerCase()} workflow.\"`,
      },
      whyUse: {
        title: `Why ${role.role} teams choose no-login signing`,
        description: `Reduce turnaround time, protect ${role.coreDoc} terms, and keep client onboarding lightweight.`,
      },
      keywords: [
        `contract signing software for ${role.role.toLowerCase()} small business`,
        `best esignature for ${role.role.toLowerCase()}`,
        `no login signature for ${role.role.toLowerCase()} clients`,
        `${role.role.toLowerCase()} ${role.coreDoc}`,
      ],
      cardItems: [
        { title: 'No Client Account Wall', description: 'Clients review and sign immediately from a secure link.', icon: 'Zap', color: 'orange' },
        { title: 'Cleaner Project Start', description: 'Signed terms are complete before project kickoff.', icon: 'Shield', color: 'blue' },
        { title: 'Faster Cashflow', description: 'Less signature delay means earlier invoicing and payment.', icon: 'Clock', color: 'green' },
      ],
      useCaseTitle: `${role.role} use cases`,
      useCaseItems: [
        `${toTitleFromSlug(role.coreDoc.replace(/ /g, '-'))} approvals`,
        'Client onboarding packets',
        'Change request confirmations',
        'Renewal and retainer updates',
      ],
      comparisonTitle: `Signing stack comparison for ${role.role}`,
      comparisonRows: [
        { feature: 'Signer account required', us: 'No', them: 'Often yes' },
        { feature: 'Time to complete', us: 'Minutes', them: 'Hours or days' },
        { feature: 'Mobile completion', us: 'Optimized', them: 'Inconsistent' },
      ],
      faqs: [
        { question: `Is this suitable for ${role.role.toLowerCase()} contracts?`, answer: `Yes. The workflow is designed around ${role.coreDoc} and client approval speed.` },
        { question: 'Do clients need to register before signing?', answer: 'No. Clients can sign from a secure link without creating an account.' },
        { question: 'Can I keep an audit record for disputes?', answer: 'Yes. Completed documents include event history and timestamped actions.' },
        { question: 'Is this mobile friendly?', answer: 'Yes. The signer journey is optimized for phones and tablets.' },
      ],
      h1: title,
      intro: `${role.role} projects lose momentum when agreements sit unsigned in inboxes. This page outlines a practical implementation for contract signing software that reduces signing friction while keeping legal records complete and defensible.`,
      checklist: sections.checklist,
      mistakes: sections.mistakes,
      outcomes: sections.outcomes,
      conclusion: `For ${role.role.toLowerCase()}, the winning setup is simple: remove account friction, standardize templates, and track every signature event from send to completion.`,
      relatedLinks: [
        { label: `Best eSignature for ${role.role}`, slug: `best-esignature-${role.slug}-small-business` },
        { label: `No-login eSignature for ${role.role} clients`, slug: `no-login-esignature-for-${role.slug}-clients` },
      ],
    };
  }

  if (patternType === 'best') {
    const slug = `best-esignature-${role.slug}-small-business`;
    const title = `Best eSignature for ${role.role} Small Business`;
    const sections = pageSectionsForRole(role, role.coreDoc);
    return {
      slug,
      title,
      description: `Evaluate the best eSignature setup for ${role.role.toLowerCase()} and deploy a low-friction process that signs faster.`,
      category: 'Freelancer Comparisons',
      hero: {
        badge: 'Best Fit Analysis',
        title: `Best eSignature for ${role.role}`,
        subtitle: `What ${role.role.toLowerCase()} should prioritize before choosing a signing stack.`,
        testimonial: `\"We reduced signature delays after switching to a no-login flow.\"`,
      },
      whyUse: {
        title: `Buying criteria for ${role.role} in 2026`,
        description: `Optimize for completion rate, legal confidence, and minimal setup overhead.`,
      },
      keywords: [
        `best e signature for ${role.role.toLowerCase()} with no client login`,
        `${role.role.toLowerCase()} esignature software`,
        `freelancer signature software ${role.role.toLowerCase()}`,
        `contract signing for ${role.role.toLowerCase()}`,
      ],
      cardItems: [
        { title: 'Completion Rate First', description: 'The best tool is the one clients actually finish.', icon: 'CheckCircle', color: 'green' },
        { title: 'Low Operational Drag', description: 'Keep setup lightweight for solo or small teams.', icon: 'Gauge', color: 'blue' },
        { title: 'Defensible Records', description: 'Keep evidence and signed PDFs organized.', icon: 'FileText', color: 'orange' },
      ],
      useCaseTitle: `What ${role.role} teams evaluate`,
      useCaseItems: [
        'No-login signer UX',
        'Template governance by document type',
        'Reminder automation',
        'Audit trail completeness',
      ],
      comparisonTitle: `Best eSignature criteria for ${role.role}`,
      comparisonRows: [
        { feature: 'Client friction', us: 'Low', them: 'Medium to high' },
        { feature: 'Implementation speed', us: 'Fast', them: 'Longer' },
        { feature: 'Fit for small business', us: 'Strong', them: 'Mixed' },
      ],
      faqs: [
        { question: `What matters most for ${role.role.toLowerCase()}?`, answer: 'Signer completion rate and fast document turnaround matter most.' },
        { question: 'Should I optimize for enterprise integrations first?', answer: 'Not usually. For small teams, friction reduction and reliability are higher ROI.' },
        { question: 'Can I standardize templates?', answer: 'Yes. Build a minimal template set by agreement type and iterate monthly.' },
        { question: 'How do I avoid thin SEO pages?', answer: 'Publish role-specific implementation details, not generic feature lists.' },
      ],
      h1: title,
      intro: `This long-tail query typically comes from buyers ready to choose a tool. For ${role.role.toLowerCase()}, the best option is usually the one that gets agreements signed with the least friction and keeps records audit-ready.`,
      checklist: sections.checklist,
      mistakes: sections.mistakes,
      outcomes: sections.outcomes,
      conclusion: `The best eSignature setup for ${role.role.toLowerCase()} is practical and measurable: higher completion rates, fewer stuck deals, and stronger documentation.`,
      relatedLinks: [
        { label: `${role.role} contract signing software`, slug: `freelancer-${role.slug}-contract-signing-software` },
        { label: `No-login eSignature for ${role.role} clients`, slug: `no-login-esignature-for-${role.slug}-clients` },
      ],
    };
  }

  if (patternType === 'nologin') {
    const slug = `no-login-esignature-for-${role.slug}-clients`;
    const title = `No Login eSignature for ${role.role} Clients`;
    const sections = pageSectionsForRole(role, role.coreDoc);
    return {
      slug,
      title,
      description: `Implement no-login eSignature for ${role.role.toLowerCase()} clients to remove signing drop-off and speed approvals.`,
      category: 'No-Account Signing',
      hero: {
        badge: 'No Login Signing',
        title: `No-login eSignature for ${role.role} clients`,
        subtitle: `Remove the registration wall and get faster approvals from clients.`,
        testimonial: `\"Our clients sign faster when no account is required.\"`,
      },
      whyUse: {
        title: `Why no-login matters for ${role.role.toLowerCase()}`,
        description: `Account creation is one of the biggest signature blockers in freelance workflows.`,
      },
      keywords: [
        `no account e signature for ${role.role.toLowerCase()} clients`,
        `${role.role.toLowerCase()} sign contract without login`,
        `no login signature workflow ${role.role.toLowerCase()}`,
        `send ${role.coreDoc} without client account`,
      ],
      cardItems: [
        { title: 'Fewer Abandonments', description: 'No password setup means less drop-off before completion.', icon: 'TrendingUp', color: 'green' },
        { title: 'Client-Friendly UX', description: 'Works on phones and desktops with the same flow.', icon: 'Smartphone', color: 'blue' },
        { title: 'Maintained Compliance', description: 'Low friction without sacrificing records and traceability.', icon: 'ShieldCheck', color: 'orange' },
      ],
      useCaseTitle: 'No-login signing flow',
      useCaseItems: [
        'Proposal acceptance',
        `${toTitleFromSlug(role.coreDoc.replace(/ /g, '-'))} execution`,
        'Retainer renewals',
        'Scope change approvals',
      ],
      comparisonTitle: `No-login impact for ${role.role}`,
      comparisonRows: [
        { feature: 'Login wall for signer', us: 'Removed', them: 'Common' },
        { feature: 'Support tickets for signer access', us: 'Lower', them: 'Higher' },
        { feature: 'Median time-to-sign', us: 'Lower', them: 'Higher' },
      ],
      faqs: [
        { question: 'Is no-login still legally valid?', answer: 'Yes, when consent and signature events are captured with document integrity controls.' },
        { question: 'Will this work for returning clients?', answer: 'Yes. Returning clients can still sign quickly through secure document links.' },
        { question: 'Can teams monitor pending signatures?', answer: 'Yes. Track sent, opened, and completed states with reminders.' },
        { question: 'Does no-login reduce security?', answer: 'Not when implemented with secure links, timestamps, and complete event logs.' },
      ],
      h1: title,
      intro: `If your clients delay signatures, the issue is often flow friction, not price or document quality. A no-login process removes extra steps and speeds document completion for ${role.role.toLowerCase()}.`,
      checklist: sections.checklist,
      mistakes: sections.mistakes,
      outcomes: sections.outcomes,
      conclusion: `No-login signing is usually the highest-leverage workflow change for ${role.role.toLowerCase()} teams that need faster contract completion.`,
      relatedLinks: [
        { label: `Best eSignature for ${role.role}`, slug: `best-esignature-${role.slug}-small-business` },
        { label: `${role.role} contract signing software`, slug: `freelancer-${role.slug}-contract-signing-software` },
      ],
    };
  }

  const slug = `freelancer-${role.slug}-sign-contract-online`;
  const title = `Send ${toTitleFromSlug(role.coreDoc.replace(/ /g, '-'))} for Signature as ${role.role}`;
  const sections = pageSectionsForRole(role, role.coreDoc);
  return {
    slug,
    title,
    description: `Step-by-step process to send a ${role.coreDoc} for signature as ${role.role.toLowerCase()} and reduce approval delays.`,
    category: 'Freelancer Execution',
    hero: {
      badge: 'How-To Workflow',
      title: `Send ${role.coreDoc} for signature as ${role.role}`,
      subtitle: `Practical process to move from draft to signed document quickly.`,
      testimonial: `\"This workflow helped us start projects faster.\"`,
    },
    whyUse: {
      title: `Execution guide for ${role.role.toLowerCase()}`,
      description: `Use this playbook to improve document completion and reduce back-and-forth.`,
    },
    keywords: [
      `send ${role.coreDoc} for signature as ${role.role.toLowerCase()}`,
      `how to sign ${role.coreDoc} online`,
      `${role.role.toLowerCase()} signature workflow`,
      `${role.role.toLowerCase()} no login contract signing`,
    ],
    cardItems: [
      { title: 'Template First', description: 'Start from a repeatable, role-specific template.', icon: 'File', color: 'blue' },
      { title: 'Reminder Logic', description: 'Automate nudges for unopened and incomplete documents.', icon: 'Bell', color: 'orange' },
      { title: 'Audit Ready', description: 'Store completed records with signer event history.', icon: 'Shield', color: 'green' },
    ],
    useCaseTitle: 'Where this process is used',
    useCaseItems: ['New client onboarding', 'Mid-project scope updates', 'Retainer agreements', 'Final acceptance sign-off'],
    comparisonTitle: `Execution speed for ${role.role} signature workflow`,
    comparisonRows: [
      { feature: 'From draft to sent', us: 'Fast', them: 'Variable' },
      { feature: 'Client steps required', us: 'Minimal', them: 'Longer flow' },
      { feature: 'Audit package readiness', us: 'Strong', them: 'Inconsistent' },
    ],
    faqs: [
      { question: `How long should a ${role.coreDoc} signing flow take?`, answer: 'For most teams, sending should take minutes and completion should happen the same day.' },
      { question: 'Should I request signatures before kickoff?', answer: 'Yes. Final signatures should be complete before paid work begins.' },
      { question: 'Can I reuse this process for renewals?', answer: 'Yes. Keep a separate renewal template and timeline reminders.' },
      { question: 'What if multiple stakeholders must sign?', answer: 'Assign signer order and deadlines to avoid parallel confusion.' },
    ],
    h1: title,
    intro: `This long-tail query comes from practitioners ready to execute, not just research. The goal is to send a clean ${role.coreDoc} package, capture signatures quickly, and preserve compliance evidence.`,
    checklist: sections.checklist,
    mistakes: sections.mistakes,
    outcomes: sections.outcomes,
    conclusion: `For ${role.role.toLowerCase()}, a documented send-and-sign process is one of the fastest ways to reduce project delays and protect revenue.`,
    relatedLinks: [
      { label: `${role.role} contract signing software`, slug: `freelancer-${role.slug}-contract-signing-software` },
      { label: `No-login eSignature for ${role.role} clients`, slug: `no-login-esignature-for-${role.slug}-clients` },
    ],
  };
}

function industryPage(industry, kind) {
  const sections = pageSectionsForIndustry(industry);
  if (kind === 'workflow') {
    const slug = `esignature-workflow-for-${industry.slug}-teams`;
    const title = `eSignature Workflow for ${industry.name}`;
    return {
      slug,
      title,
      description: `Build a scalable eSignature workflow for ${industry.name.toLowerCase()} with lower signer friction and stronger controls.`,
      category: 'Industry Workflows',
      hero: {
        badge: industry.name,
        title,
        subtitle: `Guide for ${industry.buyer} who need faster approvals and better process reliability.`,
        testimonial: `\"We stabilized our ${industry.workflow} in two iterations.\"`,
      },
      whyUse: {
        title: `${industry.name} workflow optimization`,
        description: `Design a workflow that balances signer speed with governance and auditability.`,
      },
      keywords: [
        `esignature workflow for ${industry.slug.replace('-', ' ')} teams`,
        `${industry.slug.replace('-', ' ')} document signing process`,
        `${industry.workflow} e signature`,
        `${industry.name.toLowerCase()} signing automation`,
      ],
      cardItems: [
        { title: 'Process Reliability', description: 'Define clear signer order and fallback routing.', icon: 'Route', color: 'blue' },
        { title: 'Faster Throughput', description: 'Reduce stalled approvals with reminders and ownership.', icon: 'Clock', color: 'green' },
        { title: 'Governance Ready', description: `Keep ${industry.compliance} attached to final records.`, icon: 'Shield', color: 'orange' },
      ],
      useCaseTitle: `${industry.name} document flows`,
      useCaseItems: [industry.workflow, 'Template approvals', 'Policy acknowledgments', 'Renewal packages'],
      comparisonTitle: `${industry.name} workflow maturity model`,
      comparisonRows: [
        { feature: 'Signer path clarity', us: 'Defined', them: 'Ad hoc' },
        { feature: 'Template governance', us: 'Versioned', them: 'Scattered' },
        { feature: 'Completion analytics', us: 'Trackable', them: 'Manual' },
      ],
      faqs: [
        { question: `How should ${industry.name.toLowerCase()} start?`, answer: 'Start with one high-volume document flow, then scale after proving completion gains.' },
        { question: 'Do we need separate templates by risk level?', answer: 'Yes. Segmenting by risk improves both compliance and speed.' },
        { question: 'How often should workflows be reviewed?', answer: 'Monthly review is a good baseline for optimization and QA.' },
        { question: 'Can this support mobile signers?', answer: 'Yes. Mobile completion support is essential in modern workflows.' },
      ],
      h1: title,
      intro: `Most ${industry.name.toLowerCase()} organizations do not have a signing problem, they have a process problem. This page outlines a repeatable eSignature workflow that improves throughput without weakening controls.`,
      checklist: sections.checklist,
      mistakes: sections.mistakes,
      outcomes: [
        'Outcome 1: Faster approval cycle time for high-volume documents.',
        'Outcome 2: Fewer compliance exceptions during audits.',
        'Outcome 3: More predictable handoff from request to execution.',
      ],
      conclusion: `${industry.name} get better results when they treat signatures as an operational system, not a one-off task.`,
      relatedLinks: [
        { label: `Secure ${industry.name} document signing`, slug: `secure-${industry.slug}-document-signing` },
        { label: `Improve ${industry.name} signing workflow`, slug: `improve-${industry.slug}-signing-workflow` },
      ],
    };
  }

  if (kind === 'secure') {
    const slug = `secure-${industry.slug}-document-signing`;
    const title = `Secure ${industry.name} Document Signing Software`;
    return {
      slug,
      title,
      description: `Security-first document signing guidance for ${industry.name.toLowerCase()} handling sensitive approvals.`,
      category: 'Industry Security',
      hero: {
        badge: 'Security and Compliance',
        title,
        subtitle: `How ${industry.buyer} can enforce security controls without hurting completion rates.`,
        testimonial: `\"Security controls improved while completion speed stayed strong.\"`,
      },
      whyUse: {
        title: `Secure signing patterns for ${industry.name}`,
        description: `Pair fast signer UX with defensible records and consistent policy enforcement.`,
      },
      keywords: [
        `secure ${industry.slug.replace('-', ' ')} document signing software`,
        `${industry.name.toLowerCase()} secure e signature`,
        `${industry.slug.replace('-', ' ')} audit trail signature workflow`,
        `compliant signing for ${industry.slug.replace('-', ' ')}`,
      ],
      cardItems: [
        { title: 'Policy-Driven Access', description: 'Control who can send, edit, and approve templates.', icon: 'Lock', color: 'blue' },
        { title: 'Immutable Records', description: 'Keep tamper-evident outputs for each completed document.', icon: 'ShieldCheck', color: 'green' },
        { title: 'Operational Fit', description: 'Maintain speed while adding governance checkpoints.', icon: 'Gauge', color: 'orange' },
      ],
      useCaseTitle: `${industry.name} security priorities`,
      useCaseItems: [industry.compliance, 'Signer attribution', 'Retention policy alignment', 'Exception handling'],
      comparisonTitle: `${industry.name} secure signing approach`,
      comparisonRows: [
        { feature: 'Auditability', us: 'Comprehensive', them: 'Partial' },
        { feature: 'Signer confidence', us: 'Higher', them: 'Mixed' },
        { feature: 'Operational overhead', us: 'Lower', them: 'Higher' },
      ],
      faqs: [
        { question: 'Does higher security always slow signatures?', answer: 'No. Good workflow design preserves speed while raising assurance.' },
        { question: 'What should be retained after completion?', answer: 'Keep the final signed file and full signer event metadata.' },
        { question: 'How can teams reduce compliance risk?', answer: 'Standardize templates, approval routing, and access policies by document type.' },
        { question: 'Is this practical for small teams?', answer: 'Yes. Start with core controls and expand as volume grows.' },
      ],
      h1: title,
      intro: `Security and speed are often treated as tradeoffs, but they do not have to be. ${industry.name} teams can implement secure document signing that still completes quickly when process ownership is clear.`,
      checklist: sections.checklist,
      mistakes: sections.mistakes,
      outcomes: [
        'Outcome 1: Stronger compliance posture for sensitive documents.',
        'Outcome 2: Lower signer abandonment from clearer workflows.',
        'Outcome 3: Better incident readiness with complete records.',
      ],
      conclusion: `${industry.name} teams should measure security and completion together to build a signing system that scales responsibly.`,
      relatedLinks: [
        { label: `eSignature workflow for ${industry.name}`, slug: `esignature-workflow-for-${industry.slug}-teams` },
        { label: `Improve ${industry.name} signing workflow`, slug: `improve-${industry.slug}-signing-workflow` },
      ],
    };
  }

  const slug = `improve-${industry.slug}-signing-workflow`;
  const title = `How to Improve ${industry.name} Signing Workflow`;
  return {
    slug,
    title,
    description: `Practical improvements for ${industry.name.toLowerCase()} signing workflows that increase completion and reduce manual rework.`,
    category: 'Industry Optimization',
    hero: {
      badge: 'Workflow Optimization',
      title,
      subtitle: `Operational guide for ${industry.buyer} running high-volume documents.`,
      testimonial: `\"Small workflow changes produced outsized completion gains.\"`,
    },
    whyUse: {
      title: `Improve ${industry.workflow}`,
      description: 'Target bottlenecks, remove avoidable signer friction, and measure completion speed weekly.',
    },
    keywords: [
      `how to improve ${industry.workflow} with e signatures`,
      `${industry.name.toLowerCase()} signing workflow optimization`,
      `${industry.slug.replace('-', ' ')} reduce signature delays`,
      `document approval process for ${industry.slug.replace('-', ' ')}`,
    ],
    cardItems: [
      { title: 'Bottleneck Mapping', description: 'Find where approvals stall by role and document type.', icon: 'Map', color: 'blue' },
      { title: 'Template Hygiene', description: 'Reduce edits with cleaner, versioned templates.', icon: 'FileText', color: 'green' },
      { title: 'Feedback Loop', description: 'Use monthly review cycles for process upgrades.', icon: 'RefreshCw', color: 'orange' },
    ],
    useCaseTitle: `${industry.name} workflow fixes`,
    useCaseItems: ['Approval ownership', 'Reminder tuning', 'Template simplification', 'Completion analytics'],
    comparisonTitle: `${industry.name} before vs after optimization`,
    comparisonRows: [
      { feature: 'Manual follow-ups', us: 'Reduced', them: 'Heavy' },
      { feature: 'Completion visibility', us: 'Real-time', them: 'Delayed' },
      { feature: 'Template consistency', us: 'High', them: 'Uneven' },
    ],
    faqs: [
      { question: 'What should teams optimize first?', answer: 'Start with one high-volume flow and improve signer friction there.' },
      { question: 'Should legal and ops co-own templates?', answer: 'Yes. Shared ownership improves speed and policy compliance.' },
      { question: 'How do we measure workflow quality?', answer: 'Track send-to-sign time, completion rate, and rejection reasons.' },
      { question: 'How often should pages be refreshed for SEO?', answer: 'Refresh quarterly or when objections/requirements change.' },
    ],
    h1: title,
    intro: `${industry.name} teams can significantly improve signing outcomes by treating approvals as an operational system. This page provides a repeatable optimization method grounded in conversion and governance requirements.`,
    checklist: [
      `Define baseline metrics for ${industry.workflow}.`,
      'Prioritize high-frequency templates first.',
      'Reduce signer steps for mobile users.',
      'Set SLA targets for internal approvers.',
      'Review unresolved documents every week.',
    ],
    mistakes: [
      'Optimizing low-volume templates before core flows.',
      'Changing too many variables at once and losing attribution.',
      'Ignoring signer objections collected by support and sales.',
      'Leaving old templates live after governance updates.',
    ],
    outcomes: [
      'Outcome 1: Increased completion rate on priority workflows.',
      'Outcome 2: Lower operational overhead from fewer manual follow-ups.',
      'Outcome 3: Improved trust in document records during reviews.',
    ],
    conclusion: `Sustained workflow improvement in ${industry.name.toLowerCase()} comes from measurement discipline and consistent template governance.`,
    relatedLinks: [
      { label: `eSignature workflow for ${industry.name}`, slug: `esignature-workflow-for-${industry.slug}-teams` },
      { label: `Secure ${industry.name} document signing`, slug: `secure-${industry.slug}-document-signing` },
    ],
  };
}

function statePage(state, doc) {
  const sections = pageSectionsForState(state, doc.label);
  const slug = `sign-${doc.slug}-online-${state.slug}`;
  const title = `${state.name} ${formatDocTitle(doc.slug)} Signature Online No Account`;
  return {
    slug,
    title,
    description: `Guide to signing ${withArticle(doc.label)} online in ${state.name} with no client login and complete audit evidence.`,
    category: 'State Signing Guides',
    hero: {
      badge: `${state.name} Guide`,
      title,
      subtitle: `Practical workflow aligned with ${state.law}.`,
      testimonial: `\"We simplified ${state.name} signer completion without losing compliance.\"`,
    },
    whyUse: {
      title: `${state.name} compliance + fast completion`,
      description: `Use a signer-friendly process that still captures legally relevant records.`,
    },
    keywords: [
      `${state.name.toLowerCase()} ${doc.label} signature online no account`,
      `${state.name.toLowerCase()} electronic signature ${doc.label}`,
      `${state.name.toLowerCase()} sign ${doc.label} online`,
      `${state.name.toLowerCase()} no login e signature`,
    ],
    cardItems: [
      { title: 'State-Aware Workflow', description: `Align signer records with ${state.law}.`, icon: 'Scale', color: 'blue' },
      { title: 'Low Friction UX', description: 'Let signers complete documents without account creation.', icon: 'Zap', color: 'green' },
      { title: 'Defensible Evidence', description: 'Maintain event records for legal and operational review.', icon: 'ShieldCheck', color: 'orange' },
    ],
    useCaseTitle: `${state.name} ${doc.label} use cases`,
    useCaseItems: ['Client onboarding', 'Vendor agreements', 'Renewals', 'Change confirmations'],
    comparisonTitle: `${state.name} ${doc.label} signing options`,
    comparisonRows: [
      { feature: 'Signer account needed', us: 'No', them: 'Often yes' },
      { feature: 'Completion speed', us: 'Faster', them: 'Slower' },
      { feature: 'Record quality', us: 'Comprehensive', them: 'Varies' },
    ],
    faqs: [
      { question: `Is ${doc.label} e-signature legal in ${state.name}?`, answer: `In most business scenarios, yes, when consent, intent, and retention are handled correctly under ${state.law}.` },
      { question: 'Can signers complete this on mobile?', answer: 'Yes. Mobile-friendly signing is essential for timely completion.' },
      { question: 'Do we need signer accounts?', answer: 'No. Signers can use secure links without registration.' },
      { question: 'What should be archived after signing?', answer: 'Archive final documents plus event metadata and timestamps.' },
    ],
    h1: title,
    intro: `This query indicates immediate intent to execute a ${doc.label} workflow in ${state.name}. The strongest pages pair clear legal context with an easy signer path that minimizes delay.`,
    checklist: sections.checklist,
    mistakes: sections.mistakes,
    outcomes: [
      `Outcome 1: Faster ${doc.label} completion in ${state.name}.`,
      'Outcome 2: Lower signer drop-off due to no-login flow.',
      'Outcome 3: Better readiness for compliance and dispute review.',
    ],
    conclusion: `For ${state.name}, combine a no-login signer flow with rigorous record retention to maximize both speed and defensibility.`,
    relatedLinks: [
      { label: `${state.name} proposal signature online`, slug: `sign-proposal-online-${state.slug}` },
      { label: `${state.name} NDA signature online`, slug: `sign-nda-online-${state.slug}` },
    ],
  };
}

function writePage(page) {
  const filePath = path.join(LANDING_DIR, `${page.slug}.mdx`);
  const content = `${frontmatterBlock(page)}\n${bodyForPage(page)}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

function generateKeywordResearchDoc(keywordRows) {
  const sorted = [...keywordRows].sort((a, b) => b.opportunity - a.opportunity);
  const topRows = sorted.slice(0, 120);

  const byCluster = keywordRows.reduce((acc, row) => {
    acc[row.cluster] = (acc[row.cluster] || 0) + 1;
    return acc;
  }, {});

  const header = `# Long-Tail Keyword Research + Programmatic SEO Map\n\nDate: ${TODAY}\nSite: boopsign.com\nGoal: High-intent long-tail acquisition for no-login e-signature workflows\n\n## Summary\n\n- Total long-tail keywords researched: ${keywordRows.length}\n- Clusters: ${Object.keys(byCluster).join(', ')}\n- Priority model: Opportunity = (volume weight x intent value) / difficulty\n- Intent values: informational=1, commercial=2, transactional=3\n\n## Cluster Distribution\n\n${Object.entries(byCluster)
    .map(([cluster, count]) => `- ${cluster}: ${count}`)
    .join('\n')}\n\n## Priority Long-Tail Keywords\n\n| Keyword | Cluster | Intent | Difficulty | Volume Band | Opportunity | Target URL |\n|---|---|---|---:|---|---:|---|\n`;

  const rows = topRows
    .map((row) => `| ${row.keyword} | ${row.cluster} | ${row.intent} | ${row.difficulty} | ${row.volume} | ${row.opportunity} | /${row.slug} |`)
    .join('\n');

  const implementation = `\n\n## Programmatic SEO Implementation\n\n- Playbook mix used: Personas + Industry workflows + State-document intent\n- Page generation strategy: one page per high-intent long-tail phrase with audience-specific guidance\n- Thin-content guardrails:\n  - Role and industry specific checklists\n  - Distinct mistakes/outcomes blocks\n  - Query-matched FAQ set\n  - Internal link mesh across related long-tail pages\n\n## Launch Checklist\n\n- Confirm generated pages build in content collections\n- Submit updated sitemap in Search Console\n- Track indexation and rankings by cluster weekly\n- Prune low-value variants after 8-12 weeks based on performance\n`;

  const filePath = path.join(RESEARCH_DIR, 'long-tail-keywords-programmatic-seo-2026-02-23.md');
  fs.writeFileSync(filePath, `${header}${rows}${implementation}\n`, 'utf8');
}

function main() {
  ensureDir(LANDING_DIR);
  ensureDir(RESEARCH_DIR);

  const keywordRows = [];
  const pages = [];

  for (const role of FREELANCER_ROLES) {
    keywordRows.push(...createRoleKeywordRows(role));
    pages.push(rolePage(role, 'software'));
    pages.push(rolePage(role, 'best'));
    pages.push(rolePage(role, 'nologin'));
    pages.push(rolePage(role, 'howto'));
  }

  for (const industry of INDUSTRY_SEGMENTS) {
    keywordRows.push(...createIndustryKeywordRows(industry));
    pages.push(industryPage(industry, 'workflow'));
    pages.push(industryPage(industry, 'secure'));
    pages.push(industryPage(industry, 'optimize'));
  }

  for (const state of STATES) {
    keywordRows.push(...createStateKeywordRows(state));
    for (const doc of DOC_TYPES.slice(0, 4)) {
      pages.push(statePage(state, doc));
    }
  }

  writePageIndex(pages);

  for (const page of pages) {
    writePage(page);
  }

  generateKeywordResearchDoc(keywordRows);

  console.log(`Generated ${pages.length} programmatic landing pages.`);
  console.log(`Generated ${keywordRows.length} long-tail keyword rows.`);
}

function writePageIndex(pages) {
  const indexPath = path.join(RESEARCH_DIR, 'programmatic-seo-page-index-2026-02-23.md');
  const byCategory = pages.reduce((acc, page) => {
    acc[page.category] = acc[page.category] || [];
    acc[page.category].push(page);
    return acc;
  }, {});

  const lines = [
    '# Programmatic SEO Page Index',
    '',
    `Date: ${TODAY}`,
    `Total pages: ${pages.length}`,
    '',
  ];

  for (const [category, categoryPages] of Object.entries(byCategory)) {
    lines.push(`## ${category}`);
    lines.push('');
    for (const page of categoryPages) {
      lines.push(`- /${page.slug} - ${page.title}`);
    }
    lines.push('');
  }

  fs.writeFileSync(indexPath, lines.join('\n'), 'utf8');
}

main();
