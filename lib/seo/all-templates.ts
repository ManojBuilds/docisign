import { BASE_TEMPLATES, BaseTemplate } from "./base-templates";
import { ADDITIONAL_TEMPLATES, AdditionalTemplate } from "./additional-templates";

// Unified template type
export type Template = {
    id: string;
    slug: string;
    name: string;
    title: string;
    description: string;
    legalContext: string;
    keyFeatures: string[];
    docUrl?: string;
    pdfUrl?: string;
    category: "General" | "Real Estate" | "Specialized";
    priority?: "high" | "medium" | "low";
    relatedRoles?: string[];
};

// Convert BaseTemplate to Template
function baseToTemplate(base: BaseTemplate): Template {
    return {
        ...base,
        priority: undefined,
        relatedRoles: undefined,
    };
}

// Convert AdditionalTemplate to Template
function additionalToTemplate(additional: AdditionalTemplate): Template {
    return {
        ...additional,
    };
}

// Merge all templates
export const ALL_TEMPLATES: Template[] = [
    ...BASE_TEMPLATES.map(baseToTemplate),
    ...ADDITIONAL_TEMPLATES.map(additionalToTemplate),
];

// Export for backward compatibility
export { BASE_TEMPLATES } from "./base-templates";
export { ADDITIONAL_TEMPLATES } from "./additional-templates";

// Helper functions
export function getTemplateBySlug(slug: string): Template | undefined {
    return ALL_TEMPLATES.find(t => t.slug === slug);
}

export function getTemplateById(id: string): Template | undefined {
    return ALL_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category: "General" | "Real Estate" | "Specialized"): Template[] {
    return ALL_TEMPLATES.filter(t => t.category === category);
}

export function getTemplatesByPriority(priority: "high" | "medium" | "low"): Template[] {
    return ALL_TEMPLATES.filter(t => t.priority === priority);
}

export function getTemplatesForRole(roleSlug: string): Template[] {
    return ALL_TEMPLATES.filter(t =>
        !t.relatedRoles || // Base templates work for all roles
        t.relatedRoles.includes(roleSlug)
    );
}

// Statistics
export const TEMPLATE_STATISTICS = {
    total: ALL_TEMPLATES.length,
    base: BASE_TEMPLATES.length,
    additional: ADDITIONAL_TEMPLATES.length,
    byCategory: {
        general: getTemplatesByCategory("General").length,
        realEstate: getTemplatesByCategory("Real Estate").length,
        specialized: getTemplatesByCategory("Specialized").length,
    },
    byPriority: {
        high: getTemplatesByPriority("high").length,
        medium: getTemplatesByPriority("medium").length,
        low: getTemplatesByPriority("low").length,
    },
};
