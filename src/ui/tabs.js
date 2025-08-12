import React, { createContext, useContext } from 'react';

const TabsContext = createContext();

export const Tabs = ({ children, value, onValueChange, className = '', ...props }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`space-y-4 ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`flex flex-wrap gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const TabsTrigger = ({ children, value, className = '', ...props }) => {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;
  
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, className = '', ...props }) => {
  const { value: activeValue } = useContext(TabsContext);
  
  if (activeValue !== value) return null;
  
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};