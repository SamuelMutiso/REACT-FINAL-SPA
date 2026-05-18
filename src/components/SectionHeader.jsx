function SectionHeader({ title, context }) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="font-display text-4xl md:text-5xl tracking-wide text-white uppercase">
        {title}
      </h1>
      <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
        {context}
      </p>
    </div>
  )
}

export default SectionHeader