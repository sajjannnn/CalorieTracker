const AiAnalysisShimmer = () => {
  return (
    <div className="w-full h-full p-6  colour animate-pulse">
      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded-md mb-6" />

      {/* Image preview shimmer */}
      <div className="h-48 w-full bg-gray-200 rounded-2xl mb-6" />

      {/* Nutrition rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded-md" />
            <div className="h-4 w-16 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiAnalysisShimmer;
