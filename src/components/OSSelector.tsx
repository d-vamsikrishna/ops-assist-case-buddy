
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OSSelectorProps {
  onSelect: (os: string) => void;
  onCancel: () => void;
}

export function OSSelector({ onSelect, onCancel }: OSSelectorProps) {
  const [selectedOS, setSelectedOS] = useState<string>("windows");

  const handleSubmit = () => {
    onSelect(selectedOS);
  };

  return (
    <div className="bg-muted p-4 rounded-lg mb-4">
      <h3 className="text-md font-medium mb-3">Please select your operating system:</h3>
      <RadioGroup 
        value={selectedOS} 
        onValueChange={setSelectedOS}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="windows" id="windows" />
          <Label htmlFor="windows">Windows</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="linux" id="linux" />
          <Label htmlFor="linux">Linux</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mac" id="mac" />
          <Label htmlFor="mac">macOS</Label>
        </div>
      </RadioGroup>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}
