/**
 * Schema.org JSON-LD validation utilities
 */

export interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  pagePath: string;
  schemaType?: string;
}

export interface SchemaRequirements {
  requireBreadcrumb?: boolean;
  requireFAQ?: boolean;
  requireArticle?: boolean;
  requireOrganization?: boolean;
  requireService?: boolean; // Qwantix: for service pages
}

/**
 * Validates JSON-LD schema object
 */
export function validateSchema(
  schema: any,
  pagePath: string,
  requirements?: SchemaRequirements
): SchemaValidationResult {
  const result: SchemaValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    pagePath,
  };

  if (!schema) {
    result.isValid = false;
    result.errors.push('Schema is missing');
    return result;
  }

  // Check required fields
  if (!schema['@context']) {
    result.isValid = false;
    result.errors.push('Schema missing @context');
  }

  if (!schema['@type']) {
    result.isValid = false;
    result.errors.push('Schema missing @type');
  } else {
    result.schemaType = schema['@type'];
  }

  // Validate specific schema types
  if (schema['@type'] === 'FAQPage') {
    if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
      result.isValid = false;
      result.errors.push('FAQPage schema missing mainEntity array');
    } else {
      schema.mainEntity.forEach((item: any, index: number) => {
        if (!item['@type'] || item['@type'] !== 'Question') {
          result.errors.push(`FAQPage mainEntity[${index}] missing or invalid @type`);
        }
        if (!item.name) {
          result.errors.push(`FAQPage mainEntity[${index}] missing name`);
        }
        if (!item.acceptedAnswer || !item.acceptedAnswer.text) {
          result.errors.push(`FAQPage mainEntity[${index}] missing acceptedAnswer.text`);
        }
      });
    }
  }

  if (schema['@type'] === 'BreadcrumbList') {
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      result.isValid = false;
      result.errors.push('BreadcrumbList schema missing itemListElement array');
    } else {
      schema.itemListElement.forEach((item: any, index: number) => {
        if (!item['@type'] || item['@type'] !== 'ListItem') {
          result.errors.push(`BreadcrumbList itemListElement[${index}] missing or invalid @type`);
        }
        if (!item.name) {
          result.errors.push(`BreadcrumbList itemListElement[${index}] missing name`);
        }
        if (!item.item) {
          result.errors.push(`BreadcrumbList itemListElement[${index}] missing item (URL)`);
        }
        if (item.position !== index + 1) {
          result.warnings.push(`BreadcrumbList itemListElement[${index}] position should be ${index + 1}, got ${item.position}`);
        }
      });
    }
  }

  if (schema['@type'] === 'Article') {
    if (!schema.headline) {
      result.errors.push('Article schema missing headline');
    }
    if (!schema.description) {
      result.errors.push('Article schema missing description');
    }
    if (!schema.url) {
      result.errors.push('Article schema missing url');
    }
    if (!schema.publisher) {
      result.errors.push('Article schema missing publisher');
    }
  }

  if (schema['@type'] === 'Service') {
    if (!schema.name) {
      result.errors.push('Service schema missing name');
    }
    if (!schema.description) {
      result.errors.push('Service schema missing description');
    }
    if (!schema.provider) {
      result.errors.push('Service schema missing provider');
    }
  }

  if (schema['@type'] === 'Organization') {
    if (!schema.name) {
      result.errors.push('Organization schema missing name');
    }
    if (!schema.url) {
      result.errors.push('Organization schema missing url');
    }
  }

  if (schema['@type'] === 'WebSite') {
    if (!schema.name) {
      result.errors.push('WebSite schema missing name');
    }
    if (!schema.url) {
      result.errors.push('WebSite schema missing url');
    }
  }

  if (result.errors.length > 0) {
    result.isValid = false;
  }

  return result;
}

/**
 * Validates multiple schemas for a page
 */
export function validateSchemas(
  schemas: any[],
  pagePath: string,
  requirements?: SchemaRequirements
): SchemaValidationResult[] {
  return schemas.map((schema, index) => 
    validateSchema(schema, `${pagePath} (schema ${index + 1})`, requirements)
  );
}
