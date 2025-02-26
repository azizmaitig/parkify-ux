
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface ParkingLevelsProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export function ParkingLevels({ currentLevel, onLevelChange }: ParkingLevelsProps) {
  const levels = [
    { id: 1, name: "Niveau -1", spaces: 50 },
    { id: 2, name: "Niveau -2", spaces: 45 },
    { id: 3, name: "Niveau -3", spaces: 55 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Niveaux de stationnement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
              currentLevel === level.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100"
            }`}
          >
            <button
              onClick={() => onLevelChange(level.id)}
              className="flex-1 flex items-center justify-between"
            >
              <span>{level.name}</span>
              <span className="text-sm text-muted-foreground">
                {level.spaces} places
              </span>
            </button>
            <Button variant="ghost" size="icon" className="ml-2">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
