
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviousCase } from "@/data/previousCases";

interface SimilarCasesDisplayProps {
  similarCases: PreviousCase[];
  isVisible: boolean;
}

export function SimilarCasesDisplay({ similarCases, isVisible }: SimilarCasesDisplayProps) {
  if (!isVisible || similarCases.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Similar Cases</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <div className="text-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Case #</th>
                  <th className="text-left py-2 font-medium">Title</th>
                  <th className="text-left py-2 font-medium">Solved By</th>
                </tr>
              </thead>
              <tbody>
                {similarCases.map((caseItem) => (
                  <tr key={caseItem.caseNumber} className="border-b hover:bg-muted/50">
                    <td className="py-2">{caseItem.caseNumber}</td>
                    <td className="py-2">{caseItem.title}</td>
                    <td className="py-2">{caseItem.solvedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
