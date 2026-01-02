
import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../types';

interface InquiryFormProps {
  selectedColors: string[];
  suggestedProduct?: string;
}

const ARS_PRODUCT_LINES = [
  "ARS 320 Viscose",
  "ARS 600S Wool",
  "ARS 600R Wool",
  "ARS 700 Viscose",
  "ARS 1000 Viscose",
  "ARS 1200 Wool",
  "ARS 1400 Wool"
];

const InquiryForm: React.FC<InquiryFormProps> = ({ selectedColors, suggestedProduct }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    project: '',
    productLine: '',
    selectedColors: selectedColors,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (suggestedProduct && ARS_PRODUCT_LINES.includes(suggestedProduct)) {
      setFormData(prev => ({ ...prev, productLine: suggestedProduct }));
    }
  }, [suggestedProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending inquiry...', { ...formData, selectedColors });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-indigo-600 rounded-2xl p-12 text-center text-white mt-16 shadow-2xl">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold">Request Sent</h3>
        <p className="mt-4 text-indigo-100 text-lg">Thank you for your interest in ARS Colors. A textile expert will review your {formData.productLine || 'project'} inquiry and contact you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg"
        >
          New Color Match
        </button>
      </div>
    );
  }

  return (
    <div id="inquiry" className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mt-16 max-w-5xl mx-auto">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-900 p-10 text-white">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-[10px] font-bold">ARS</div>
            <span className="font-bold tracking-tight">Direct Access</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">ARS Product Specialist</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Specify the primary range for your project inquiry. Our specialists can mix ranges for complex custom designs.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-sm font-medium">sales@arscolors.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-sm font-medium">+1 (800) ARS-COLR</span>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Supported Ranges</p>
            <div className="grid grid-cols-1 gap-2">
              {ARS_PRODUCT_LINES.map(range => (
                <div key={range} className="text-xs text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></span>
                  {range}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Technical Inquiry</h4>
              <p className="text-sm text-gray-500">Submit your palette and preferred range for a detailed quote.</p>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                placeholder="john@studio.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">ARS Product Range</label>
              <select 
                required
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all ${formData.productLine ? 'text-indigo-600 font-bold' : ''}`}
                value={formData.productLine}
                onChange={(e) => setFormData({...formData, productLine: e.target.value})}
              >
                <option value="">Select Primary Range...</option>
                {ARS_PRODUCT_LINES.map(line => (
                  <option key={line} value={line}>{line}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Project Scope / Industry</label>
              <select 
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
              >
                <option value="">Select Scope / Industry...</option>
                
                <optgroup label="Carpet Industry">
                  <option value="carpet-hand-knotted">Hand-knotted carpets</option>
                  <option value="carpet-hand-tufted">Hand-tufted carpets</option>
                  <option value="carpet-machine-made">Machine-made carpets</option>
                  <option value="carpet-rugs-durries">Rugs & durries</option>
                </optgroup>

                <optgroup label="Textile Manufacturing Industry">
                  <option value="textile-home">Home textiles (fabrics, furnishings)</option>
                  <option value="textile-upholstery">Upholstery textiles</option>
                  <option value="textile-decorative">Decorative textiles</option>
                </optgroup>

                <optgroup label="Yarn & Fibre Industry">
                  <option value="yarn-wool">Wool yarn manufacturers</option>
                  <option value="yarn-viscose">Viscose yarn producers</option>
                  <option value="yarn-blended">Cotton & blended fibre producers</option>
                </optgroup>

                <optgroup label="Home Furnishing Industry">
                  <option value="furnish-mats">Rugs & mats</option>
                  <option value="furnish-cushions">Cushions & poufs</option>
                  <option value="furnish-curtains">Curtains & soft furnishings</option>
                </optgroup>

                <optgroup label="Interior Design & Interior Fit-Out">
                  <option value="interior-residential">Residential interior projects</option>
                  <option value="interior-hospitality">Hospitality interiors (hotels, resorts)</option>
                  <option value="interior-commercial">Commercial interiors</option>
                </optgroup>

                <optgroup label="Export & Handicraft Manufacturing">
                  <option value="export-carpet">Carpet exporters</option>
                  <option value="export-textile">Textile exporters</option>
                  <option value="export-artisan">Artisan-based manufacturing units</option>
                </optgroup>

                <optgroup label="Design & Product Development Industry">
                  <option value="design-textile-studio">Textile design studios</option>
                  <option value="design-carpet-house">Carpet design houses</option>
                  <option value="design-lab">Sampling & product-development labs</option>
                </optgroup>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Selected Palette ({selectedColors.length})</label>
              <div className="flex flex-wrap gap-2 min-h-[50px] p-3 bg-gray-50 border border-gray-200 rounded-xl">
                {selectedColors.length > 0 ? (
                  selectedColors.map(code => (
                    <span key={code} className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm">
                      {code}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 self-center italic">Select colors from the analysis cards above...</span>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Additional Requirements</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition-all"
                placeholder="Mention specific pile heights, dimensions, or if you need a physical sample kit..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit" 
                disabled={selectedColors.length === 0}
                className="w-full bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all"
              >
                {selectedColors.length === 0 ? 'Select Colors Above First' : 'Request Official Color Match Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
