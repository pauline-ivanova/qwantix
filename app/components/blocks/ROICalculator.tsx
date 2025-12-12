'use client';
import React, { useState, useEffect } from 'react';
import { CurrencyDollarIcon, ChartBarIcon, CalendarIcon, ArrowTrendingUpIcon, PercentBadgeIcon } from '@heroicons/react/24/outline';

export default function ROICalculator() {
  const locale = 'en-US';
  const currencyCode = 'USD';
  const currencySym = '$';
  
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [averageOrderValue, setAverageOrderValue] = useState(100);
  const [timePeriod, setTimePeriod] = useState(12);
  
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [costPerLead, setCostPerLead] = useState(0);

  useEffect(() => {
    const P = monthlyBudget;
    const n = timePeriod;
    const CR = conversionRate / 100; // Convert percentage to decimal
    const AOV = averageOrderValue;

    // Total spent
    const spent = P * n;
    
    // Total leads (assuming 1000 visitors per $1000 spent, with conversion rate)
    // Simplified: leads = (budget / 1000) * 1000 * (conversionRate / 100)
    // More realistic: assume cost per click and click-through rate
    // For simplicity: assume 1% of budget converts to leads at given conversion rate
    const estimatedVisitors = (P * n) / 10; // Simplified: $10 per visitor
    const leads = Math.round(estimatedVisitors * CR);
    
    // Total sales (leads that convert to customers)
    // Assume 20% of leads convert to sales
    const leadToSaleRate = 0.2;
    const sales = Math.round(leads * leadToSaleRate);
    
    // Total revenue
    const revenue = sales * AOV;
    
    // ROI calculation: ((Revenue - Cost) / Cost) * 100
    const roiValue = spent > 0 ? ((revenue - spent) / spent) * 100 : 0;
    
    // Cost per lead
    const cpl = leads > 0 ? spent / leads : 0;
    
    setTotalSpent(Math.round(spent));
    setTotalLeads(leads);
    setTotalSales(sales);
    setTotalRevenue(Math.round(revenue));
    setRoi(Math.round(roiValue * 10) / 10); // Round to 1 decimal
    setCostPerLead(Math.round(cpl * 100) / 100); // Round to 2 decimals
  }, [monthlyBudget, conversionRate, averageOrderValue, timePeriod]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl no-hyphen-break">
            Marketing ROI Calculator
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Calculate the return on investment for your digital marketing campaigns. Estimate leads, sales, and revenue.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-xl ring-1 ring-gray-900/10 dark:ring-gray-700/20 sm:p-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            
            {/* Inputs Section */}
            <div className="space-y-8">
              
              {/* Monthly Budget */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="monthly-budget" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <CurrencyDollarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Monthly Budget
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="number"
                            id="monthly-budget"
                            className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 text-right bg-white dark:bg-gray-700"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                        />
                    </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="conversion-rate" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <PercentBadgeIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Conversion Rate
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">%</span>
                        </div>
                        <input
                            type="number"
                            id="conversion-rate"
                            className="block w-24 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 text-right bg-white dark:bg-gray-700"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(Number(e.target.value))}
                            step="0.1"
                            min="0.1"
                            max="10"
                        />
                    </div>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">Industry avg: 2-3%</p>
              </div>

              {/* Average Order Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="average-order-value" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Average Order Value
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="number"
                            id="average-order-value"
                            className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 text-right bg-white dark:bg-gray-700"
                            value={averageOrderValue}
                            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                        />
                    </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={averageOrderValue}
                  onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
              </div>

              {/* Time Period */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="time-period" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Time Period (Months)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="number"
                            id="time-period"
                            className="block w-24 rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 text-right bg-white dark:bg-gray-700"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(Number(e.target.value))}
                        />
                    </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                />
              </div>

            </div>

            {/* Results Section */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 flex flex-col justify-center space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(totalSpent)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
                    <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{totalLeads.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cost Per Lead</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{formatCurrency(costPerLead)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                    <p className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{totalSales.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ROI</p>
                    <p className={`text-4xl font-bold mt-2 ${roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
                    </p>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 italic">
                    *Figures are estimates based on assumed conversion rates. Actual results may vary based on industry, targeting, and campaign optimization.
                </div>
            </div>
            
          </div>

          {/* CTA */}
          <div className="mt-10 pt-10 text-center border-t border-gray-200 dark:border-gray-700">
            <a
              href="#contact-us"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 dark:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-4">
                Get Started with Qwantix
              </span>
              <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                &gt;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
