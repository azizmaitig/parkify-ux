
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "sonner";
import { useState } from "react";

export default function Complaints() {
  const [date, setDate] = useState("");
  const [requester, setRequester] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [measures, setMeasures] = useState("");
  const [severity, setSeverity] = useState([0]);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Réclamation envoyée avec succès");
  };

  const severityLabels = [
    "Pas de dommages",
    "Dommages modérés",
    "Dommages importants",
    "Dommages catastrophiques",
  ];

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => window.history.back()}>
            ← Retour
          </Button>
          <h1 className="text-2xl font-bold">Transmettre une réclamation</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Informations essentielles</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Quand la réclamation a-t-elle été déposée ?</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">D'où provient la réclamation ?</Label>
                <Input
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Email, Lettre, Téléphone..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requester">Identité du requérant</Label>
                <Input
                  id="requester"
                  value={requester}
                  onChange={(e) => setRequester(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie de réclamation</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Hygiène et propreté..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Intitulé de la réclamation</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Décrire la réclamation</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] p-2 rounded-md border"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="measures">Quelles mesures immédiates ont été prises ?</Label>
              <textarea
                id="measures"
                className="w-full min-h-[100px] p-2 rounded-md border"
                value={measures}
                onChange={(e) => setMeasures(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Noter la gravité</Label>
              <Slider
                value={severity}
                onValueChange={setSeverity}
                max={3}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                {severityLabels.map((label, index) => (
                  <span
                    key={index}
                    className={`${
                      severity[0] === index ? "font-semibold text-primary" : ""
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Ajouter des pièces jointes</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Transmettre
          </Button>
        </form>
      </div>
    </Container>
  );
}
