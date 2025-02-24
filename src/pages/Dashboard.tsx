
import { Building, MessageSquare, ParkingCircle, Users } from "lucide-react"
import { Container } from "@/components/ui/container"
import { StatsCard } from "@/components/stats-card"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Container>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mt-8">Tableau de bord</h1>
              <SidebarTrigger />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
              {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
              ))}
            </div>
          </Container>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
