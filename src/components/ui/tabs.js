import * as React from "react"

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = React.useState(defaultValue)
  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  )
}

export function TabsList({ children, active, setActive }) {
  return (
    <div className="flex space-x-2 border-b mb-4">
      {React.Children.map(children, child =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  )
}

export function TabsTrigger({ value, children, active, setActive }) {
  const isActive = active === value
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 ${
        isActive ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, active }) {
  return active === value ? <div>{children}</div> : null
}
