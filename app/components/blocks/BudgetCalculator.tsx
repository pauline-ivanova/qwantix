'use client';
import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ComputerDesktopIcon, UsersIcon } from '@heroicons/react/24/outline';

type Goal = 'balanced' | 'aggressive' | 'awareness' | 'custom';

const goalPresets = {
  balanced: { seo: 40, ppc: 30, smm: 30 },
  aggressive: { seo: 20, ppc: 50, smm: 30 },
  awareness: { seo: 30, ppc: 20, smm: 50 },
};

const goalDescriptions = {
    balanced: "A mix of long-term growth (SEO) and immediate results (PPC, SMM). Good for steady development.",
    aggressive: "Prioritizes immediate lead generation through paid channels (PPC). Ideal for rapid market entry.",
    awareness: "Focuses on maximizing brand visibility through social media. Best for building brand recognition.",
    custom: "Your unique mix. Adjust the sliders below to match your specific strategy."
};

const channelInfo = {
    seo: {
        name: 'SEO',
        description: 'Focus on long-term organic growth and visibility in search engine results.',
        icon: ChartBarIcon,
    },
    ppc: {
        name: 'PPC',
        description: 'Drive immediate, targeted traffic to your site with paid advertising campaigns.',
        icon: ComputerDesktopIcon,
    },
    smm: {
        name: 'SMM',
        description: 'Build brand awareness and engage with your audience on social platforms.',
        icon: UsersIcon,
    }
}

export default function BudgetCalculator({ lang }: { lang: string }) {
  const locale = lang === 'ru' ? 'ru-RU' : (lang === 'en' ? 'en-GB' : (lang === 'es' ? 'es-ES' : 'de-DE'));
  const currency = lang === 'ru' ? 'RUB' : (lang === 'en' ? 'GBP' : 'EUR');
  const currencySymbol = currency === 'GBP' ? '£' : (currency === 'EUR' ? '€' : '₽');
  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';
  const [revenue, setRevenue] = useState(110000);
  const [revenueDisplay, setRevenueDisplay] = useState(revenue.toLocaleString(locale));
  const [percentage, setPercentage] = useState(10);
  const [goal, setGoal] = useState<Goal>('balanced');
  const [allocation, setAllocation] = useState(goalPresets.balanced);

  const totalBudget = revenue * (percentage / 100);

  useEffect(() => {
    if (document.activeElement?.id !== 'revenue-manual') {
      setRevenueDisplay(revenue.toLocaleString(locale));
    }
  }, [revenue, locale]);

  const handleGoalChange = (newGoal: 'balanced' | 'aggressive' | 'awareness') => {
    setGoal(newGoal);
  };

  const handleAllocationChange = (changedChannel: 'seo' | 'ppc' | 'smm', value: number) => {
      setGoal('custom');
      const channels: ('seo' | 'ppc' | 'smm')[] = ['seo', 'ppc', 'smm'];

      const newValue = Math.max(0, Math.min(100, Math.round(value)));

      const remainder = 100 - newValue;

      const otherChannels = channels.filter(c => c !== changedChannel);
      const otherChannel1 = otherChannels[0];
      const otherChannel2 = otherChannels[1];

      const oldVal1 = allocation[otherChannel1];
      const oldVal2 = allocation[otherChannel2];
      const oldSumOfOthers = oldVal1 + oldVal2;

      let newVal1: number;
      let newVal2: number;

      if (oldSumOfOthers === 0) {
          newVal1 = remainder / 2;
          newVal2 = remainder / 2;
      } else {
          newVal1 = remainder * (oldVal1 / oldSumOfOthers);
          newVal2 = remainder * (oldVal2 / oldSumOfOthers);
      }

      const newAllocation = {
          ...allocation, // ensures order is maintained
          [changedChannel]: newValue,
          [otherChannel1]: Math.round(newVal1),
          [otherChannel2]: Math.round(newVal2)
      };

      // Adjust for rounding errors
      const finalSum = newAllocation.seo + newAllocation.ppc + newAllocation.smm;
      if (finalSum !== 100) {
          newAllocation[otherChannel1] += (100 - finalSum);
      }

      setAllocation(newAllocation);
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setRevenueDisplay(rawValue);

    const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericValue)) {
        setRevenue(Math.min(numericValue, 500000));
    } else {
        setRevenue(0);
    }
  };

  const handleRevenueBlur = () => {
    setRevenueDisplay(revenue.toLocaleString(locale));
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseInt(rawValue.replace(/[^0-9]/g, ''), 10);

    if (!isNaN(numericValue)) {
        setPercentage(Math.min(numericValue, 25));
    } else {
        setPercentage(0);
    }
  };

  const handlePercentageBlur = () => {
      if (percentage < 5) {
          setPercentage(5);
      }
  };


  const handleManualAllocationChange = (channel: 'seo' | 'ppc' | 'smm', value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
        handleAllocationChange(channel, numericValue);
    } else if (value === '') {
        handleAllocationChange(channel, 0);
    }
  };

  const getChannelBudget = (channel: 'seo' | 'ppc' | 'smm') => {
    return (totalBudget * (allocation[channel] / 100)).toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl no-hyphen-break">
            {isEs ? 'Calculadora de presupuesto de marketing digital' : isDe ? 'Budget‑Rechner für Digitales Marketing' : isRu ? 'Калькулятор бюджета на цифровой маркетинг' : 'Digital Marketing Budget Calculator'}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {isEs ? 'Estima tu presupuesto y cómo podrías asignarlo según tus objetivos de negocio.' : isDe ? 'Schätzen Sie Ihr Budget und sehen Sie, wie Sie es entsprechend Ihren Zielen verteilen könnten.' : isRu ? 'Оцените бюджет и посмотрите, как распределить его под ваши бизнес‑цели.' : 'Estimate your budget and see how you could allocate it based on your business goals.'}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-xl ring-1 ring-gray-900/10 dark:ring-gray-700/20 sm:p-10">
          {/* Main Sliders */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 dark:border-gray-700/20 pb-10 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{isEs ? '1. Define tu presupuesto total' : isDe ? '1. Setzen Sie Ihr Gesamtbudget' : isRu ? '1. Задайте общий бюджет' : '1. Set Your Total Budget'}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{isEs ? 'Empieza indicando tus ingresos mensuales y el porcentaje que quieres destinar a marketing.' : isDe ? 'Beginnen Sie mit dem monatlichen Umsatz und dem Anteil, den Sie ins Marketing investieren möchten.' : isRu ? 'Укажите месячную выручку и долю на маркетинг.' : 'Start by defining your overall monthly revenue and the percentage you want to allocate to marketing.'}</p>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center">
                    <label id="revenue-label" htmlFor="revenue-manual" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        {isEs ? 'Ingresos mensuales' : isDe ? 'Monatlicher Umsatz' : isRu ? 'Месячная выручка' : 'Monthly Revenue'}
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
                        </div>
                        <input
                            type="text"
                            name="revenue-manual"
                            id="revenue-manual"
                            className="block w-32 rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-right"
                            value={revenueDisplay}
                            onChange={handleRevenueChange}
                            onBlur={handleRevenueBlur}
                        />
                    </div>
                </div>
                <label htmlFor="revenue" className="sr-only">{isEs ? 'Control deslizante de ingresos mensuales' : isDe ? 'Schieberegler für monatlichen Umsatz' : isRu ? 'Ползунок месячной выручки' : 'Monthly revenue allocation slider'}</label>
                <input
                  id="revenue"
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                    <label id="percentage-label" htmlFor="percentage-manual" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    {isEs ? 'Inversión en marketing' : isDe ? 'Marketing‑Budget' : isRu ? 'Маркетинговые затраты' : 'Marketing Spend'}
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="text"
                            name="percentage-manual"
                            id="percentage-manual"
                            className="block w-24 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-right"
                            value={percentage === 0 ? '' : percentage}
                            onChange={handlePercentageChange}
                            onBlur={handlePercentageBlur}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                    </div>
                </div>
                <label htmlFor="percentage" className="sr-only">{isEs ? 'Control deslizante de porcentaje de marketing' : isDe ? 'Schieberegler für Marketing‑Prozentsatz' : isRu ? 'Ползунок процента маркетинга' : 'Marketing spend percentage slider'}</label>
                <input
                  id="percentage"
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 dark:border-gray-700/20 py-10 md:grid-cols-2">
            <div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{isEs ? '2. Elige tu objetivo principal' : isDe ? '2. Wählen Sie Ihr Primärziel' : isRu ? '2. Выберите основную цель' : '2. Choose Your Primary Goal'}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {isEs ? 'Selecciona un objetivo para ver una asignación recomendada. Puedes personalizarla después.' : isDe ? 'Wählen Sie ein Ziel, um eine empfohlene Verteilung zu sehen. Danach können Sie anpassen.' : isRu ? 'Выберите цель, чтобы увидеть рекомендуемое распределение. Затем вы сможете его настроить.' : 'Select a goal to see a recommended budget allocation. You can customize it in the next step.'}
                </p>
            </div>
            <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <button
                    onClick={() => handleGoalChange('balanced')}
                    className={`rounded-md p-3 text-center text-sm font-semibold transition-colors ${
                        goal === 'balanced'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                    >
                    {isEs ? 'Equilibrado' : isDe ? 'Ausgewogen' : isRu ? 'Сбалансировано' : 'Balanced'}
                    </button>
                    <button
                    onClick={() => handleGoalChange('aggressive')}
                    className={`rounded-md p-3 text-center text-sm font-semibold transition-colors ${
                        goal === 'aggressive'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                    >
                    {isEs ? 'Agresivo' : isDe ? 'Aggressiv' : isRu ? 'Агрессивно' : 'Aggressive'}
                    </button>
                    <button
                    onClick={() => handleGoalChange('awareness')}
                    className={`rounded-md p-3 text-center text-sm font-semibold transition-colors ${
                        goal === 'awareness'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                    >
                    {isEs ? 'Reconocimiento' : isDe ? 'Awareness' : isRu ? 'Узнаваемость' : 'Awareness'}
                    </button>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 h-12">
                    <p>{isEs ? (
                      goal === 'balanced' ? 'Una mezcla de crecimiento a largo plazo (SEO) y resultados inmediatos (PPC, SMM). Buena para crecer de forma sostenida.' :
                      goal === 'aggressive' ? 'Prioriza la captación inmediata de leads mediante canales de pago (PPC). Ideal para entrar rápido al mercado.' :
                      'Se centra en maximizar la visibilidad de marca mediante redes sociales. Ideal para construir reconocimiento.'
                    ) : isDe ? (
                      goal === 'balanced' ? 'Mix aus langfristigem Wachstum (SEO) und schnellen Ergebnissen (PPC, SMM).' :
                      goal === 'aggressive' ? 'Fokus auf schnelle Lead‑Generierung über Paid (PPC).' :
                      'Максимизация видимости бренда через соцсети.'
                    ) : isRu ? (
                      goal === 'balanced' ? 'Баланс долгосрочного роста (SEO) и быстрых результатов (PPC, SMM).' :
                      goal === 'aggressive' ? 'Приоритет быстрой генерации лидов через платные каналы (PPC).' :
                      'Фокус на узнаваемости бренда через социальные сети.'
                    ) : goalDescriptions[goal]}</p>
                </div>
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="grid grid-cols-1 gap-x-8 pt-10 md:grid-cols-2">
             <div>
                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{isEs ? '3. Distribuye tu presupuesto' : isDe ? '3. Verteilen Sie Ihr Budget' : isRu ? '3. Распределите бюджет' : '3. Allocate Your Budget'}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{isEs ? 'Ajusta la asignación entre canales. El total debe ser 100%.' : isDe ? 'Feinjustierung der Verteilung auf die Kanäle. Die Summe muss 100% ergeben.' : isRu ? 'Отрегулируйте доли между каналами. В сумме должно быть 100%.' : 'Fine-tune your budget allocation across different channels. The total should be 100%.'}</p>
                <div className="mt-6 text-center md:text-left">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{isEs ? 'Presupuesto mensual total:' : isDe ? 'Gesamtbudget pro Monat:' : isRu ? 'Итоговый бюджет в месяц:' : 'Total Monthly Budget:'}</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                    {totalBudget.toLocaleString(locale, { style: 'currency', currency: currency, maximumFractionDigits: 0 })}
                  </p>
                </div>
             </div>
             <div className="space-y-8">
                {(['seo', 'ppc', 'smm'] as const).map(channel => {
                    const Info = channelInfo[channel];
                    return (
                        <div key={channel}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-x-2">
                                    <Info.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                    <label id={`${channel}-label`} htmlFor={`${channel}-manual`} className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                        {Info.name}
                                    </label>
                                </div>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name={`${channel}-manual`}
                                        id={`${channel}-manual`}
                                        className="block w-24 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-right"
                                        value={allocation[channel]}
                                        onChange={(e) => handleManualAllocationChange(channel, e.target.value)}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-gray-500 sm:text-sm">%</span>
                                    </div>
                                </div>
                            </div>
                        <label htmlFor={channel} className="sr-only">{isEs ? `Control deslizante de asignación: ${Info.name}` : isDe ? `Schieberegler Verteilung: ${Info.name}` : isRu ? `Ползунок распределения: ${Info.name}` : `${Info.name} allocation slider`}</label>
                        <input
                              id={channel}
                              type="range"
                              min="0"
                              max="100"
                              step="5"
                              value={allocation[channel]}
                              onChange={(e) => handleAllocationChange(channel, Number(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                            />
                            <p className="mt-1 text-right text-lg font-semibold text-gray-800 dark:text-gray-200">{getChannelBudget(channel)}</p>
                        </div>
                    )
                })}
              </div>
            </div>

          {/* CTA */}
          <div className="mt-10 pt-10 text-center">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-4">
                {isEs ? 'Habla de tu presupuesto' : isDe ? 'Sprechen wir über Ihr Budget' : isRu ? 'Обсудить бюджет' : 'Discuss Your Budget'}
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
