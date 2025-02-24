import { Building, Edit, MapPin, Plus, Trash } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
interface Parking {
  id: string;
  name: string;
  address: string;
  totalSpaces: number;
  availableSpaces: number;
  openingHours: string;
  closingHours: string;
  maxCarHeight: number;
  maxCarLength: number;
  maxCarWidth: number;
  numberOfFloors: number;
  floorCapacities: number[];
  hourlyRate: number;
  dailyRate: number;
  monthlyRate: number;
}
const parkings: Parking[] = [{
  id: "1",
  name: "Parking Central",
  address: "123 Rue Principale, 75001 Paris",
  totalSpaces: 100,
  availableSpaces: 45,
  openingHours: "07:00",
  closingHours: "22:00",
  maxCarHeight: 2.1,
  maxCarLength: 5.5,
  maxCarWidth: 2.3,
  numberOfFloors: 2,
  floorCapacities: [50, 50],
  hourlyRate: 3.5,
  dailyRate: 25,
  monthlyRate: 200
}, {
  id: "2",
  name: "Parking Gare",
  address: "45 Avenue de la Gare, 75002 Paris",
  totalSpaces: 200,
  availableSpaces: 120,
  openingHours: "06:00",
  closingHours: "23:00",
  maxCarHeight: 2.0,
  maxCarLength: 5.0,
  maxCarWidth: 2.2,
  numberOfFloors: 3,
  floorCapacities: [70, 70, 60],
  hourlyRate: 4,
  dailyRate: 30,
  monthlyRate: 250
}, {
  id: "3",
  name: "Parking Commercial",
  address: "67 Rue du Commerce, 75015 Paris",
  totalSpaces: 150,
  availableSpaces: 32,
  openingHours: "08:00",
  closingHours: "20:00",
  maxCarHeight: 1.9,
  maxCarLength: 4.8,
  maxCarWidth: 2.1,
  numberOfFloors: 1,
  floorCapacities: [150],
  hourlyRate: 3,
  dailyRate: 20,
  monthlyRate: 180
}];
interface NewParking extends Omit<Parking, 'id' | 'availableSpaces'> {}
export default function Parkings() {
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
  const [newParking, setNewParking] = useState<NewParking>({
    name: "",
    address: "",
    totalSpaces: 0,
    openingHours: "",
    closingHours: "",
    maxCarHeight: 0,
    maxCarLength: 0,
    maxCarWidth: 0,
    numberOfFloors: 1,
    floorCapacities: [0],
    hourlyRate: 0,
    dailyRate: 0,
    monthlyRate: 0
  });
  const getOccupancyColor = (total: number, available: number) => {
    const occupancyRate = available / total * 100;
    if (occupancyRate > 50) return "bg-green-100 text-green-700";
    if (occupancyRate > 20) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };
  const handleEdit = (parking: Parking) => {
    setSelectedParking(parking);
  };
  const handleDelete = (parkingId: string) => {
    console.log("Delete parking:", parkingId);
  };
  const handleAddParking = () => {
    console.log("New parking data:", newParking);
  };
  const handleFloorCapacityChange = (index: number, value: string) => {
    const newCapacities = [...newParking.floorCapacities];
    newCapacities[index] = parseInt(value) || 0;
    setNewParking({
      ...newParking,
      floorCapacities: newCapacities
    });
  };
  const handleNumberOfFloorsChange = (value: string) => {
    const floors = parseInt(value) || 1;
    const capacities = new Array(floors).fill(0);
    newParking.floorCapacities.forEach((cap, index) => {
      if (index < floors) capacities[index] = cap;
    });
    setNewParking({
      ...newParking,
      numberOfFloors: floors,
      floorCapacities: capacities
    });
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Container>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mt-8">Gestion des Parkings</h1>
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4" />
                      Ajouter un parking
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Ajouter un nouveau parking</SheetTitle>
                      <SheetDescription>
                        Remplissez les informations du parking ci-dessous
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name">Nom du parking</label>
                        <Input id="name" value={newParking.name} onChange={e => setNewParking({
                        ...newParking,
                        name: e.target.value
                      })} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="address">Adresse</label>
                        <Input id="address" value={newParking.address} onChange={e => setNewParking({
                        ...newParking,
                        address: e.target.value
                      })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="openingHours">Heure d'ouverture</label>
                          <Input id="openingHours" type="time" value={newParking.openingHours} onChange={e => setNewParking({
                          ...newParking,
                          openingHours: e.target.value
                        })} />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="closingHours">Heure de fermeture</label>
                          <Input id="closingHours" type="time" value={newParking.closingHours} onChange={e => setNewParking({
                          ...newParking,
                          closingHours: e.target.value
                        })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="totalSpaces">Nombre total de places</label>
                        <Input id="totalSpaces" type="number" value={newParking.totalSpaces} onChange={e => setNewParking({
                        ...newParking,
                        totalSpaces: parseInt(e.target.value) || 0
                      })} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Dimensions maximales des véhicules</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="maxHeight">Hauteur (m)</label>
                            <Input id="maxHeight" type="number" step="0.1" value={newParking.maxCarHeight} onChange={e => setNewParking({
                            ...newParking,
                            maxCarHeight: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="maxLength">Longueur (m)</label>
                            <Input id="maxLength" type="number" step="0.1" value={newParking.maxCarLength} onChange={e => setNewParking({
                            ...newParking,
                            maxCarLength: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="maxWidth">Largeur (m)</label>
                            <Input id="maxWidth" type="number" step="0.1" value={newParking.maxCarWidth} onChange={e => setNewParking({
                            ...newParking,
                            maxCarWidth: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="numberOfFloors">Nombre d'étages</label>
                          <Input id="numberOfFloors" type="number" min="1" value={newParking.numberOfFloors} onChange={e => handleNumberOfFloorsChange(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <label>Capacité par étage</label>
                          {newParking.floorCapacities.map((capacity, index) => <div key={index} className="flex items-center gap-2">
                              <span className="w-24">Étage {index + 1}</span>
                              <Input type="number" value={capacity} onChange={e => handleFloorCapacityChange(index, e.target.value)} />
                            </div>)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Tarifs</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="hourlyRate">Tarif horaire (€)</label>
                            <Input id="hourlyRate" type="number" step="0.5" value={newParking.hourlyRate} onChange={e => setNewParking({
                            ...newParking,
                            hourlyRate: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="dailyRate">Tarif journalier (€)</label>
                            <Input id="dailyRate" type="number" step="0.5" value={newParking.dailyRate} onChange={e => setNewParking({
                            ...newParking,
                            dailyRate: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="monthlyRate">Tarif mensuel (€)</label>
                            <Input id="monthlyRate" type="number" step="0.5" value={newParking.monthlyRate} onChange={e => setNewParking({
                            ...newParking,
                            monthlyRate: parseFloat(e.target.value) || 0
                          })} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button onClick={handleAddParking}>Ajouter le parking</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
              {parkings.map(parking => <Card key={parking.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-semibold">
                      {parking.name}
                    </CardTitle>
                    <Building className="h-5 w-5 text-muted-foreground rounded-none" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span className="text-sm">{parking.address}</span>
                    </div>
                    <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${getOccupancyColor(parking.totalSpaces, parking.availableSpaces)}`}>
                      <span>Places disponibles</span>
                      <span className="font-semibold">
                        {parking.availableSpaces} / {parking.totalSpaces}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Heures d'ouverture</span>
                      <span>
                        {parking.openingHours} - {parking.closingHours}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Dimensions max</span>
                        <span>
                          {parking.maxCarLength}x{parking.maxCarWidth}x
                          {parking.maxCarHeight}m
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tarif horaire</span>
                        <span>{parking.hourlyRate}€</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleEdit(parking)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Modifier le parking</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(parking.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Supprimer le parking</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>)}
            </div>
          </Container>
        </main>
      </div>
    </SidebarProvider>;
}