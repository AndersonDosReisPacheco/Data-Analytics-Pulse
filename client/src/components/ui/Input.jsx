export default function Input({ label, id, type = 'text', value, onChange, error, placeholder, required = false, className = '' }) {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1.5">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border-light dark:border-border-dark focus:ring-brand-500'
          } bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark input ${className}`}
        />
        {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
