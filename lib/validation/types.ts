/**
 * Type definitions for validation system
 */

import type { Metadata } from 'next';

/**
 * Standard metadata requirements for all pages
 */
export const STANDARD_METADATA_REQUIREMENTS = {
  requireTitle: true,
  requireDescription: true,
  minTitleLength: 30,
  maxTitleLength: 60,
  minDescriptionLength: 120,
  maxDescriptionLength: 155, // Google optimal: 150-155 chars to avoid truncation
  requireRobots: false,
} as const;

/**
 * Standard schema requirements
 */
export const STANDARD_SCHEMA_REQUIREMENTS = {
  requireBreadcrumb: true,
  requireFAQ: false,
  requireArticle: false,
  requireOrganization: false,
} as const;

/**
 * Helper to create valid metadata object
 */
export function createMetadata(
  title: string,
  description: string,
  options?: Partial<Metadata>
): Metadata {
  return {
    title,
    description,
    ...options,
  };
}

/**
 * Validates metadata at build time (for use in generateMetadata)
 */
export function validateMetadataInPlace(metadata: Metadata): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  const titleVal = metadata.title;
  let title = '';
  if (typeof titleVal === 'string') {
    title = titleVal;
  } else if (titleVal && typeof titleVal === 'object') {
    title = (titleVal as any).absolute || (titleVal as any).default || '';
  }

  if (!title) {
    errors.push('Title is required');
  } else {
    if (title.length < STANDARD_METADATA_REQUIREMENTS.minTitleLength) {
      warnings.push(`Title is too short (${title.length} chars, recommended: ${STANDARD_METADATA_REQUIREMENTS.minTitleLength}+)`);
    }
    if (title.length > STANDARD_METADATA_REQUIREMENTS.maxTitleLength) {
      warnings.push(`Title is too long (${title.length} chars, recommended: ${STANDARD_METADATA_REQUIREMENTS.maxTitleLength} max)`);
    }
  }

  const description = metadata.description || '';
  if (!description) {
    errors.push('Description is required');
  } else {
    if (description.length < STANDARD_METADATA_REQUIREMENTS.minDescriptionLength) {
      warnings.push(`Description is too short (${description.length} chars, recommended: ${STANDARD_METADATA_REQUIREMENTS.minDescriptionLength}+)`);
    }
    if (description.length > STANDARD_METADATA_REQUIREMENTS.maxDescriptionLength) {
      warnings.push(`Description is too long (${description.length} chars, recommended: ${STANDARD_METADATA_REQUIREMENTS.maxDescriptionLength} max)`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
