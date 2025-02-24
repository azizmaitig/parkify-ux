
import { Building, Home, MessageSquare, ParkingCircle, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    path: "/dashboard"
  },
  {
    title: "Utilisateurs",
    icon: Users,
    path: "/users"
  },
  {
    title: "Parkings",
    icon: Building,
    path: "/parkings"
  },
  {
    title: "Places",
    icon: ParkingCircle,
    path: "/spaces"
  },
  {
    title: "Réclamations",
    icon: MessageSquare,
    path: "/complaints"
  },
]

export function AppSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
