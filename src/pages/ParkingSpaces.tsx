
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Download, Grid, Trash, Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ParkingMap } from "@/components/parking-map";
import { ParkingLevels } from "@/components/parking-levels";

export default function ParkingSpaces() {
  const [showGrid, setShowGrid] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [parkingImage, setParkingImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setParkingImage(reader.result as string);
        toast.success("Plan du parking importé avec succès");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    toast.success("Carte du parking publiée avec succès");
  };

  const handleClearMarkers = () => {
    toast.success("Marqueurs supprimés avec succès");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Container>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mt-8">Carte du Parking</h1>
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Button onClick={handlePublish} className="bg-primary">
                  Publier la carte
                </Button>
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              <div className="w-72 space-y-6">
                <ParkingLevels 
                  currentLevel={currentLevel}
                  onLevelChange={setCurrentLevel}
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-grid"
                        checked={showGrid}
                        onCheckedChange={setShowGrid}
                      />
                      <Label htmlFor="show-grid">Afficher la grille d'aide</Label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleClearMarkers}>
                      <Trash className="h-4 w-4 mr-2" />
                      Supprimer les marqueurs
                    </Button>
                    <Button variant="outline" className="relative">
                      <Upload className="h-4 w-4 mr-2" />
                      Télécharger une image
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-white min-h-[600px]">
                  <ParkingMap
                    showGrid={showGrid}
                    level={currentLevel}
                    parkingImage={parkingImage}
                  />
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </SidebarProvider>
  );
}
