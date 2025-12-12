/**
 * Metadata validation utilities
 */

import type { Metadata } from 'next';
import { STANDARD_METADATA_REQUIREMENTS } from './types';

export interface MetadataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  pagePath: string;
}

export interface MetadataRequirements {
  requireTitle?: boolean;
  requireDescription?: boolean;
  minTitleLength?: number;
  maxTitleLength?: number;
  minDescriptionLength?: number;
  maxDescriptionLength?: number;
  requireRobots?: boolean;
  requireKeywords?: boolean;
  requireHreflang?: boolean; // Qwantix: check for hreflang in alternates
  primaryKeywords?: string[];
  secondaryKeywords?: string[];
}

/**
 * Validates metadata object
 */
export function validateMetadata(
  metadata: Metadata | undefined,
  pagePath: string,
  requirements: MetadataRequirements = STANDARD_METADATA_REQUIREMENTS
): MetadataValidationResult {
  const result: MetadataValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    pagePath,
  };

  if (!metadata) {
    result.isValid = false;
    result.errors.push('Metadata is missing');
    return result;
  }

  // Check title
  const titleVal = metadata.title;
  let title = '';
  if (typeof titleVal === 'string') {
    title = titleVal;
  } else if (titleVal && typeof titleVal === 'object') {
    title = (titleVal as any).absolute || (titleVal as any).default || '';
  }
  
  if (requirements.requireTitle) {
    if (!title) {
      result.isValid = false;
      result.errors.push('Title is required but missing');
    } else {
      if (requirements.minTitleLength && title.length < requirements.minTitleLength) {
        result.warnings.push(`Title is too short (${title.length} chars, recommended: ${requirements.minTitleLength}+)`);
      }
      if (requirements.maxTitleLength && title.length > requirements.maxTitleLength) {
        result.warnings.push(`Title is too long (${title.length} chars, recommended: ${requirements.maxTitleLength} max)`);
      }
    }
  }

  // Check description
  const description = metadata.description || '';
  
  if (requirements.requireDescription) {
    if (!description) {
      result.isValid = false;
      result.errors.push('Description is required but missing');
    } else {
      if (requirements.minDescriptionLength && description.length < requirements.minDescriptionLength) {
        result.warnings.push(`Description is too short (${description.length} chars, recommended: ${requirements.minDescriptionLength}+)`);
      }
      if (requirements.maxDescriptionLength && description.length > requirements.maxDescriptionLength) {
        result.warnings.push(`Description is too long (${description.length} chars, recommended: ${requirements.maxDescriptionLength} max)`);
      }
    }
  }

  // Check robots
  if (requirements.requireRobots && !metadata.robots) {
    result.warnings.push('Robots meta tag is recommended for SEO');
  }

  // Check hreflang (Qwantix: multilingual support)
  if (requirements.requireHreflang) {
    if (!metadata.alternates?.languages || Object.keys(metadata.alternates.languages).length === 0) {
      result.warnings.push('Hreflang alternates are recommended for multilingual pages');
    } else {
      const languages = metadata.alternates.languages;
      const expectedLangs = ['en', 'de', 'es', 'ru'] as const;
      const missingLangs = expectedLangs.filter(lang => !(lang in languages) || !languages[lang as keyof typeof languages]);
      if (missingLangs.length > 0) {
        result.warnings.push(`Missing hreflang for languages: ${missingLangs.join(', ')}`);
      }
    }
  }

  // Check keywords in title and description
  if (requirements.requireKeywords && requirements.primaryKeywords && requirements.primaryKeywords.length > 0) {
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();
    
    // Check if at least one primary keyword appears in title
    const titleHasKeyword = requirements.primaryKeywords.some(keyword => 
      titleLower.includes(keyword.toLowerCase())
    );
    
    if (!titleHasKeyword) {
      result.warnings.push(`Title should contain at least one primary keyword: ${requirements.primaryKeywords.join(', ')}`);
    }
    
    // Check if at least one primary keyword appears in description
    const descriptionHasKeyword = requirements.primaryKeywords.some(keyword => 
      descriptionLower.includes(keyword.toLowerCase())
    );
    
    if (!descriptionHasKeyword) {
      result.warnings.push(`Description should contain at least one primary keyword: ${requirements.primaryKeywords.join(', ')}`);
    }
  }

  return result;
}

/**
 * Validates metadata from generateMetadata function
 */
export async function validateGeneratedMetadata(
  generateMetadataFn: (() => Promise<Metadata>) | (() => Metadata) | undefined,
  pagePath: string,
  params?: any,
  requirements: MetadataRequirements = STANDARD_METADATA_REQUIREMENTS
): Promise<MetadataValidationResult> {
  if (!generateMetadataFn) {
    return {
      isValid: false,
      errors: ['generateMetadata function is missing'],
      warnings: [],
      pagePath,
    };
  }

  try {
    const metadata = await Promise.resolve(generateMetadataFn());
    return validateMetadata(metadata, pagePath, requirements);
  } catch (error) {
    return {
      isValid: false,
      errors: [`Error generating metadata: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
      pagePath,
    };
  }
}
