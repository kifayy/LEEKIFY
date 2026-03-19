import { Button } from "@/components/ui/button";

interface NoSchoolsFoundProps {
  onResetFilters: () => void;
}

export function NoSchoolsFound({ onResetFilters }: NoSchoolsFoundProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🤔</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No schools match your filters</h3>
      <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
      <Button
        onClick={onResetFilters}
        variant="outline"
        className="border-[#A084FF] text-[#A084FF] hover:bg-[#A084FF]/10"
      >
        Reset Filters
      </Button>
    </div>
  );
}
