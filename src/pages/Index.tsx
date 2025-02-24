
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useNavigate } from "react-router-dom";
import { Car, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Container>
        <nav className="py-6">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-gray-900">Parkify</span>
          </div>
        </nav>
        
        <main className="py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="animate-fade-down text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                  Gérez votre parking intelligemment
                </h1>
                <p className="animate-fade-up text-lg text-gray-600">
                  Une solution simple et efficace pour la gestion de vos places de stationnement.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-6 font-medium text-white transition-all hover:bg-primary-dark"
                >
                  Accéder au tableau de bord
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/20 to-transparent rounded-2xl animate-float" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                  alt="Parking moderne"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Index;
