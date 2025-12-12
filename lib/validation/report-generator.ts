/**
 * Report generation utilities for validation system
 */

import { ValidationReport, PageValidationResult } from './page-validator';

export interface ReportOptions {
  format: 'text' | 'json' | 'markdown' | 'html';
  includeWarnings?: boolean;
  includeValidPages?: boolean;
  groupByType?: boolean;
}

/**
 * Generates a text report
 */
export function generateTextReport(report: ValidationReport, options: ReportOptions = { format: 'text' }): string {
  let output = '\n';
  output += '='.repeat(80) + '\n';
  output += 'PAGE VALIDATION REPORT\n';
  output += '='.repeat(80) + '\n\n';

  output += `Total Pages: ${report.totalPages}\n`;
  output += `Valid Pages: ${report.validPages} (${Math.round((report.validPages / report.totalPages) * 100)}%)\n`;
  output += `Invalid Pages: ${report.invalidPages} (${Math.round((report.invalidPages / report.totalPages) * 100)}%)\n\n`;

  output += 'Summary:\n';
  output += `  Metadata Errors: ${report.summary.metadataErrors}\n`;
  output += `  Metadata Warnings: ${report.summary.metadataWarnings}\n`;
  output += `  Schema Errors: ${report.summary.schemaErrors}\n`;
  output += `  Schema Warnings: ${report.summary.schemaWarnings}\n\n`;

  const invalidPages = report.pages.filter(p => !p.overallValid);
  if (invalidPages.length > 0) {
    output += '❌ Invalid Pages:\n';
    output += '-'.repeat(80) + '\n';
    invalidPages.forEach(page => {
      output += `\n${page.pagePath} (${page.pageType})\n`;
      
      if (page.metadataResult && (!page.metadataResult.isValid || page.metadataResult.errors.length > 0)) {
        output += '  Metadata:\n';
        page.metadataResult.errors.forEach(error => {
          output += `    ❌ ${error}\n`;
        });
        if (options.includeWarnings) {
          page.metadataResult.warnings.forEach(warning => {
            output += `    ⚠️  ${warning}\n`;
          });
        }
      }
      
      if (page.h1Result) {
        output += '  H1:\n';
        if (!page.h1Result.found) {
          output += `    ❌ ${page.h1Result.warnings.join(', ')}\n`;
        } else if (page.h1Result.warnings.length > 0) {
          page.h1Result.warnings.forEach(warning => {
            output += `    ⚠️  ${warning}\n`;
          });
        } else {
          output += `    ✅ Found: "${page.h1Result.text}"\n`;
        }
      }

      if (page.schemaResults) {
        page.schemaResults.forEach((sr, index) => {
          if (!sr.isValid || sr.errors.length > 0) {
            output += `  Schema ${index + 1} (${sr.schemaType || 'unknown'}):\n`;
            sr.errors.forEach(error => {
              output += `    ❌ ${error}\n`;
            });
            if (options.includeWarnings) {
              sr.warnings.forEach(warning => {
                output += `    ⚠️  ${warning}\n`;
              });
            }
          }
        });
      }
    });
  }

  if (options.includeWarnings) {
    const pagesWithWarnings = report.pages.filter(p => 
      (p.metadataResult && p.metadataResult.warnings.length > 0) ||
      (p.schemaResults && p.schemaResults.some(sr => sr.warnings.length > 0))
    );

    if (pagesWithWarnings.length > 0) {
      output += '\n\n⚠️  Pages with Warnings:\n';
      output += '-'.repeat(80) + '\n';
      pagesWithWarnings.forEach(page => {
        output += `\n${page.pagePath}\n`;
        
        if (page.metadataResult && page.metadataResult.warnings.length > 0) {
          page.metadataResult.warnings.forEach(warning => {
            output += `  ⚠️  ${warning}\n`;
          });
        }

        if (page.schemaResults) {
          page.schemaResults.forEach(sr => {
            sr.warnings.forEach(warning => {
              output += `  ⚠️  ${warning}\n`;
            });
          });
        }
      });
    }
  }

  if (options.includeValidPages) {
    const validPages = report.pages.filter(p => p.overallValid);
    if (validPages.length > 0) {
      output += '\n\n✅ Valid Pages:\n';
      output += '-'.repeat(80) + '\n';
      validPages.forEach(page => {
        output += `  ${page.pagePath} (${page.pageType})\n`;
      });
    }
  }

  output += '\n' + '='.repeat(80) + '\n';

  return output;
}

/**
 * Generates a markdown report
 */
export function generateMarkdownReport(report: ValidationReport, options: ReportOptions = { format: 'markdown' }): string {
  let output = '# Page Validation Report\n\n';
  
  output += `**Total Pages:** ${report.totalPages}  \n`;
  output += `**Valid Pages:** ${report.validPages} (${Math.round((report.validPages / report.totalPages) * 100)}%)  \n`;
  output += `**Invalid Pages:** ${report.invalidPages} (${Math.round((report.invalidPages / report.totalPages) * 100)}%)  \n\n`;

  output += '## Summary\n\n';
  output += `- Metadata Errors: ${report.summary.metadataErrors}\n`;
  output += `- Metadata Warnings: ${report.summary.metadataWarnings}\n`;
  output += `- Schema Errors: ${report.summary.schemaErrors}\n`;
  output += `- Schema Warnings: ${report.summary.schemaWarnings}\n\n`;

  const invalidPages = report.pages.filter(p => !p.overallValid);
  if (invalidPages.length > 0) {
    output += '## ❌ Invalid Pages\n\n';
    invalidPages.forEach(page => {
      output += `### ${page.pagePath}\n\n`;
      output += `**Type:** ${page.pageType}\n\n`;
      
      if (page.metadataResult && (!page.metadataResult.isValid || page.metadataResult.errors.length > 0)) {
        output += '#### Metadata Issues\n\n';
        page.metadataResult.errors.forEach(error => {
          output += `- ❌ ${error}\n`;
        });
        if (options.includeWarnings && page.metadataResult.warnings.length > 0) {
          page.metadataResult.warnings.forEach(warning => {
            output += `- ⚠️  ${warning}\n`;
          });
        }
        output += '\n';
      }

      if (page.schemaResults) {
        page.schemaResults.forEach((sr, index) => {
          if (!sr.isValid || sr.errors.length > 0) {
            output += `#### Schema ${index + 1} (${sr.schemaType || 'unknown'})\n\n`;
            sr.errors.forEach(error => {
              output += `- ❌ ${error}\n`;
            });
            if (options.includeWarnings && sr.warnings.length > 0) {
              sr.warnings.forEach(warning => {
                output += `- ⚠️  ${warning}\n`;
              });
            }
            output += '\n';
          }
        });
      }
    });
  }

  return output;
}

/**
 * Generates a report in the specified format
 */
export function generateReport(report: ValidationReport, options: ReportOptions = { format: 'text' }): string {
  switch (options.format) {
    case 'json':
      return JSON.stringify(report, null, 2);
    case 'markdown':
      return generateMarkdownReport(report, options);
    case 'text':
    default:
      return generateTextReport(report, options);
  }
}

/**
 * Saves report to file
 */
export async function saveReportToFile(
  report: ValidationReport,
  filePath: string,
  options: ReportOptions = { format: 'text' }
): Promise<void> {
  const fs = await import('fs/promises');
  const content = generateReport(report, options);
  await fs.writeFile(filePath, content, 'utf-8');
}
