#!/usr/bin/env tsx
/**
 * Script to validate all pages metadata and schemas for Qwantix
 * 
 * Usage:
 *   npm run validate:pages
 *   npm run validate:pages -- --json
 *   npm run validate:pages -- --strict
 */

import { validateAllPages, ValidationReport } from '@/lib/validation/page-validator';
import { MetadataRequirements } from '@/lib/validation/metadata-validator';
import { SchemaRequirements } from '@/lib/validation/schema-validator';
import { generateReport, saveReportToFile, ReportOptions } from '@/lib/validation/report-generator';

const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');
const strictMode = args.includes('--strict');
const markdownOutput = args.includes('--markdown');
const saveToFile = args.find(arg => arg.startsWith('--output='))?.split('=')[1];
const includeWarnings = !args.includes('--no-warnings');
const includeValidPages = args.includes('--include-valid');

const metadataRequirements: MetadataRequirements = {
  requireTitle: true,
  requireDescription: true,
  minTitleLength: strictMode ? 30 : 20,
  maxTitleLength: 60,
  minDescriptionLength: strictMode ? 120 : 100,
  maxDescriptionLength: 155, // Google optimal: 150-155 chars
  requireRobots: false,
  requireHreflang: true, // Qwantix: require hreflang for multilingual pages
};

const schemaRequirements: SchemaRequirements = {
  requireBreadcrumb: strictMode,
  requireFAQ: false,
  requireArticle: false,
  requireOrganization: false,
  requireService: false,
};

async function main() {
  try {
    console.log('Validating all pages for Qwantix...\n');
    
    const report = await validateAllPages(metadataRequirements, schemaRequirements);

    const reportOptions: ReportOptions = {
      format: jsonOutput ? 'json' : markdownOutput ? 'markdown' : 'text',
      includeWarnings,
      includeValidPages,
    };

    const reportContent = generateReport(report, reportOptions);

    if (saveToFile) {
      await saveReportToFile(report, saveToFile, reportOptions);
      console.log(`Report saved to ${saveToFile}`);
    } else {
      console.log(reportContent);
    }

    // Exit with error code if there are invalid pages
    if (report.invalidPages > 0) {
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

main();
