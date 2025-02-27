import { ArrowLeft, Building, Calendar, MessageSquare, ParkingCircle, Users } from "lucide-react"
import { Container } from "@/components/ui/container"
import { StatsCard } from "@/components/stats-card"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const stats = [
  {
    title: "Utilisateurs Total",
    value: "2,853",
    icon: Users,
  },
  {
    title: "Parkings",
    value: "15",
    icon: Building,
  },
  {
    title: "Places Disponibles",
    value: "234",
    description: "Sur 500 places totales",
    icon: ParkingCircle,
  },
  {
    title: "Réclamations",
    value: "23",
    description: "5 en attente",
    icon: MessageSquare,
  },
]

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold mt-8">Tableau de bord</h1>
              </div>
              <SidebarTrigger />
            </div>

            <div className="grid gap-6 mt-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Que souhaitez-vous réserver ?</h2>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 text-primary bg-primary/10 rounded-md font-medium">
                      Aujourd'hui
                      <div className="text-sm text-primary">27 Février</div>
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Demain
                      <div className="text-sm text-gray-500">28 Février</div>
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded-md">
                      Samedi
                      <div className="text-sm text-gray-500">1 Mars</div>
                    </button>
                  </div>
                </div>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-4">
                  <CardHeader>
                    <CardTitle>Calendrier des Réservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Calendar className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-semibold">Février 2024</h3>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <Calendar className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 text-center gap-1">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                          <div key={day} className="py-2 text-sm font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 35 }).map((_, i) => (
                          <button
                            key={i}
                            className={`p-2 rounded-full hover:bg-gray-100 ${
                              i === 15 ? "bg-primary text-white hover:bg-primary/90" : ""
                            }`}
                          >
                            {((i + 1) % 31) + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {stats.map((stat) => (
                        <StatsCard key={stat.title} {...stat} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
