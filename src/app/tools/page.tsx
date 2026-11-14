'use client';

import { useState } from 'react';
import { toolCategories, vibeCodingMethodology } from '@/lib/constants';

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = toolCategories[activeCategory];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tool Library</h1>
        <p className="text-sm text-gray-500 mt-1">Ranked tool recommendations across every discipline</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {toolCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              i === activeCategory
                ? 'bg-[#00796B] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#00796B]/30 hover:text-[#00796B]'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tool Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">{category.icon}</span>
            {category.name}
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-semibold w-16">Rank</th>
              <th className="text-left px-6 py-3 font-semibold w-56">Tool</th>
              <th className="text-left px-6 py-3 font-semibold">Best For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {category.tools.map(tool => (
              <tr key={tool.name} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    tool.rank === 1 ? 'bg-[#00796B] text-white' :
                    tool.rank === 2 ? 'bg-[#E0F2F1] text-[#00796B]' :
                    tool.rank === 3 ? 'bg-[#E0F2F1] text-[#00796B]' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {tool.rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900">{tool.name}</span>
                  {tool.preferred && (
                    <span className="ml-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#FF6F00] text-white">
                      Preferred
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{tool.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preferred Platform Banner */}
      <div className="bg-gradient-to-r from-[#004D40] to-[#00796B] rounded-xl p-6 text-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
            &#9733;
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Preferred Platform: {vibeCodingMethodology.preferredPlatform}</h3>
            <p className="text-sm text-white/80 mt-0.5">{vibeCodingMethodology.preferredNote}</p>
          </div>
          <span className="px-4 py-1.5 bg-[#FF6F00] text-white text-xs font-bold rounded-full uppercase">
            Use First
          </span>
        </div>
      </div>

      {/* Vibe Coding Methodology */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Vibe Coding Methodology</h2>
        <p className="text-sm text-gray-500 mb-4">Best practices for getting clean, professional output from AI coding tools</p>
        <div className="grid grid-cols-2 gap-5">
          {vibeCodingMethodology.rules.map((rule, i) => (
            <div key={rule.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-[#00796B] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-gray-900">{rule.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
              <ul className="space-y-1.5">
                {rule.tips.map(tip => (
                  <li key={tip} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-[#00796B] mt-0.5 flex-shrink-0">&#9679;</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* All Categories Overview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Pick Per Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {toolCategories.map(cat => {
            const preferred = cat.tools.find(t => t.preferred);
            const topPick = preferred || cat.tools[0];
            return (
              <div key={cat.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{cat.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${
                    topPick.preferred ? 'bg-[#FF6F00]' : 'bg-[#00796B]'
                  }`}>
                    {topPick.preferred ? '\u2605' : '1'}
                  </span>
                  <span className={`text-sm font-medium ${topPick.preferred ? 'text-[#FF6F00]' : 'text-[#00796B]'}`}>
                    {topPick.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-7">{topPick.bestFor}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
