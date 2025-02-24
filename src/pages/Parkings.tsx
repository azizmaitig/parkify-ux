
import { Building, Edit, MapPin, Plus, Trash } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Parking {
  id: string
  name: string
  address: string
  totalSpaces: number
  availableSpaces: number
  openingHours: string
  closingHours: string
}

const parkings: Parking[] = [
  {
    id: "1",
    name: "Parking Central",
    address: "123 Rue Principale, 75001 Paris",
    totalSpaces: 100,
    availableSpaces: 45,
    openingHours: "07:00",
    closingHours: "22:00",
  },
  {
    id: "2",
    name: "Parking Gare",
    address: "45 Avenue de la Gare, 75002 Paris",
    totalSpaces: 200,
    availableSpaces: 120,
    openingHours: "06:00",
    closingHours: "23:00",
  },
  {
    id: "3",
    name: "Parking Commercial",
    address: "67 Rue du Commerce, 75015 Paris",
    totalSpaces: 150,
    availableSpaces: 32,
    openingHours: "08:00",
    closingHours: "20:00",
  },
]

export default function Parkings() {
  const [selectedParking, setSelectedParking] = useState<Parking | null>(null)

  const getOccupancyColor = (total: number, available: number) => {
    const occupancyRate = (available / total) * 100
    if (occupancyRate > 50) return "bg-green-100 text-green-700"
    if (occupancyRate > 20) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  const handleEdit = (parking: Parking) => {
    setSelectedParking(parking)
  }

  const handleDelete = (parkingId: string) => {
    console.log("Delete parking:", parkingId)
  }

  return (
    <SidebarProvider>
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
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Ajouter un nouveau parking</SheetTitle>
                      <SheetDescription>
                        Remplissez les informations du parking ci-dessous
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
              {parkings.map((parking) => (
                <Card key={parking.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-semibold">
                      {parking.name}
                    </CardTitle>
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span className="text-sm">{parking.address}</span>
                    </div>
                    <div
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${getOccupancyColor(
                        parking.totalSpaces,
                        parking.availableSpaces
                      )}`}
                    >
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
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(parking)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Modifier le parking</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(parking.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Supprimer le parking</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Container>
        </main>
      </div>
    </SidebarProvider>
  )
}
