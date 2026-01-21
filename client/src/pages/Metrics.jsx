import { useState } from 'react';
import useAnalyticsStore from '../store/analyticsStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Metrics() {
  const [metricName, setMetricName] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [category, setCategory] = useState('');
  const { addMetric, data } = useAnalyticsStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addMetric({ metricName, metricValue, category });
    if (result.success) {
      setMetricName('');
      setMetricValue('');
      setCategory('');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Manage Metrics</h1>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Add New Metric</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            id="metricName"
            placeholder="Metric Name"
            value={metricName}
            onChange={(e) => setMetricName(e.target.value)}
            required
          />
          <Input
            id="metricValue"
            placeholder="Value"
            type="number"
            value={metricValue}
            onChange={(e) => setMetricValue(e.target.value)}
            required
          />
          <Input
            id="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Button type="submit" className="h-full mt-1">Add Metric</Button>
        </form>
      </div>

      <div className="card">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Your Metrics</h2>
          {data.length === 0 ? (
            <div className="text-center py-8 text-text-secondary-light dark:text-text-secondary-dark">
              No metrics yet. Add your first one above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Metric</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-brand-50 hover:bg-opacity-50 dark:hover:bg-brand-900/20 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{item.metricName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark">{item.metricValue.toFixed(2)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark">{item.category}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
