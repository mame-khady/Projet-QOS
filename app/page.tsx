"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  Zap,
  Truck,
  Battery,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  User,
  FileText,
  AlertTriangle,
  Wrench,
  LogOut,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  Sun,
  Wind,
  Fuel,
  CheckCircle,
  UserCheck,
  Building,
  Wifi,
  Clock,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CircularProgress } from "@/components/circular-progress"
import { TrendingUp } from "lucide-react"

const performanceData = [
  { month: "Fév", production: 65, consommation: 45, solaire: 30, eolien: 25, fossile: 10 },
  { month: "Mar", production: 70, consommation: 50, solaire: 35, eolien: 25, fossile: 10 },
  { month: "Avr", production: 68, consommation: 48, solaire: 32, eolien: 26, fossile: 10 },
  { month: "Mai", production: 75, consommation: 55, solaire: 38, eolien: 27, fossile: 10 },
  { month: "Jun", production: 82, consommation: 62, solaire: 42, eolien: 30, fossile: 10 },
  { month: "Jul", production: 88, consommation: 68, solaire: 45, eolien: 33, fossile: 10 },
  { month: "Aoû", production: 85, consommation: 65, solaire: 43, eolien: 32, fossile: 10 },
  { month: "Sep", production: 90, consommation: 70, solaire: 46, eolien: 34, fossile: 10 },
  { month: "Oct", production: 87, consommation: 67, solaire: 44, eolien: 33, fossile: 10 },
  { month: "Nov", production: 92, consommation: 72, solaire: 47, eolien: 35, fossile: 10 },
  { month: "Déc", production: 89, consommation: 69, solaire: 45, eolien: 34, fossile: 10 },
  { month: "Jan", production: 94, consommation: 74, solaire: 48, eolien: 36, fossile: 10 },
]

const distributionData = [
  { name: "Particuliers", value: 810, color: "#10b981" },
  { name: "Entreprises", value: 150, color: "#3b82f6" },
  { name: "Collectivités", value: 30, color: "#f59e0b" },
]

const equipmentData = [
  {
    id: 1,
    name: "Panneau Solaire #1",
    type: "Solaire",
    status: "Actif",
    production: "2.5 kWh",
    lastMaintenance: "15/01/2024",
  },
  { id: 2, name: "Éolienne #1", type: "Éolien", status: "Actif", production: "3.2 kWh", lastMaintenance: "10/01/2024" },
  {
    id: 3,
    name: "Générateur Diesel #1",
    type: "Fossile",
    status: "Maintenance",
    production: "1.8 kWh",
    lastMaintenance: "20/01/2024",
  },
  {
    id: 4,
    name: "Panneau Solaire #2",
    type: "Solaire",
    status: "Panne",
    production: "0 kWh",
    lastMaintenance: "05/01/2024",
  },
]

const invoiceData = [
  { id: "INV-001", client: "Jean Dupont", amount: 125.5, status: "Payée", date: "15/01/2024", type: "Particulier" },
  {
    id: "INV-002",
    client: "Entreprise ABC",
    amount: 850.0,
    status: "En attente",
    date: "18/01/2024",
    type: "Entreprise",
  },
  {
    id: "INV-003",
    client: "Mairie de Ville",
    amount: 450.75,
    status: "Payée",
    date: "20/01/2024",
    type: "Collectivité",
  },
  {
    id: "INV-004",
    client: "Marie Martin",
    amount: 95.25,
    status: "En retard",
    date: "12/01/2024",
    type: "Particulier",
  },
]

const userData = [
  {
    id: 1,
    name: "Admin Principal",
    email: "admin@enertrack.com",
    role: "Administrateur",
    status: "Actif",
    lastLogin: "Aujourd'hui",
  },
  {
    id: 2,
    name: "Jean Superviseur",
    email: "jean@enertrack.com",
    role: "Superviseur",
    status: "Actif",
    lastLogin: "Hier",
  },
  {
    id: 3,
    name: "Marie Technicien",
    email: "marie@enertrack.com",
    role: "Technicien",
    status: "Actif",
    lastLogin: "Il y a 2 jours",
  },
  {
    id: 4,
    name: "Paul Comptable",
    email: "paul@enertrack.com",
    role: "Comptable",
    status: "Inactif",
    lastLogin: "Il y a 1 semaine",
  },
]

export default function EnerTrackDashboard() {
  const [activePage, setActivePage] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "production", label: "Production d'énergie", icon: Zap },
    { id: "distribution", label: "Distribution", icon: Truck },
    { id: "stockage", label: "Stockage & Autonomie", icon: Battery },
    { id: "analyse", label: "Analyse & Rapports", icon: BarChart3 },
    { id: "utilisateurs", label: "Utilisateurs", icon: Users },
    { id: "parametre", label: "Paramètre", icon: Settings },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      Actif: "bg-green-100 text-green-800",
      Panne: "bg-red-100 text-red-800",
      Maintenance: "bg-orange-100 text-orange-800",
      Payée: "bg-green-100 text-green-800",
      "En attente": "bg-yellow-100 text-yellow-800",
      "En retard": "bg-red-100 text-red-800",
      Inactif: "bg-gray-100 text-gray-800",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre système énergétique</p>
      </div>

      {/* Top Stats - 3 colonnes comme dans l'image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Production Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12,450 KWh</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Facturation & Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Factures</span>
              </div>
              <span className="font-semibold text-gray-900">250</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Factures en attente</span>
              </div>
              <span className="font-semibold text-gray-900">45</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Suivi de Production</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Actif</span>
              </div>
              <span className="font-semibold text-gray-900">16</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Panne</span>
              </div>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-700">Maintenance</span>
              </div>
              <span className="font-semibold text-gray-900">3</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data - Structure correcte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart - 2 colonnes */}
        <Card className="lg:col-span-2 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Rendement</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  12 Months
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  6 Months
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  30 Days
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  7 Days
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  <Download className="w-3 h-3 mr-1" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                production: { label: "Production", color: "#10b981" },
                consommation: { label: "Consommation", color: "#6b7280" },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="consommation" stroke="#6b7280" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Distribution Tracking - 1 colonne */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Suivi de Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Particuliers</span>
              </div>
              <span className="font-semibold text-gray-900">810</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Entreprises</span>
              </div>
              <span className="font-semibold text-gray-900">150</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Collectivités</span>
              </div>
              <span className="font-semibold text-gray-900">30</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Sources */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Sources d'Énergie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around items-center py-4">
              <CircularProgress percentage={45} label="Solaire" />
              <CircularProgress percentage={35} label="Éolien" />
              <CircularProgress percentage={20} label="Fossile" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Alertes Récentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Panne Panneau #2</p>
                  <p className="text-xs text-gray-500">Il y a 2h</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">Critique</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wrench className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Maintenance Éolienne</p>
                  <p className="text-xs text-gray-500">Il y a 4h</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">Planifiée</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Client
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              Générer Rapport
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Planifier Maintenance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProduction = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production d'Énergie</h1>
          <p className="text-gray-600">Surveillance et gestion des équipements de production</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter Équipement
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="solar">Solaire</TabsTrigger>
          <TabsTrigger value="wind">Éolien</TabsTrigger>
          <TabsTrigger value="fossil">Fossile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Sun className="w-4 h-4 mr-2 text-yellow-500" />
                  Production Solaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,602 kWh</div>
                <p className="text-sm text-green-600">45% du total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Wind className="w-4 h-4 mr-2 text-blue-500" />
                  Production Éolienne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,357 kWh</div>
                <p className="text-sm text-green-600">35% du total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                  <Fuel className="w-4 h-4 mr-2 text-gray-500" />
                  Production Fossile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,491 kWh</div>
                <p className="text-sm text-orange-600">20% du total</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>État des Équipements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Équipement</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">État</th>
                      <th className="text-left py-2">Production</th>
                      <th className="text-left py-2">Dernière Maintenance</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentData.map((equipment) => (
                      <tr key={equipment.id} className="border-b">
                        <td className="py-3">{equipment.name}</td>
                        <td className="py-3">{equipment.type}</td>
                        <td className="py-3">
                          <Badge className={getStatusBadge(equipment.status)}>{equipment.status}</Badge>
                        </td>
                        <td className="py-3">{equipment.production}</td>
                        <td className="py-3">{equipment.lastMaintenance}</td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderDistribution = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Distribution</h1>
          <p className="text-gray-600">Gestion de la distribution d'énergie aux clients</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">990</div>
            <p className="text-sm text-green-600">+8 ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Consommation Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,850 kWh</div>
            <p className="text-sm text-blue-600">95.2% de la production</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenus Mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€8,450</div>
            <p className="text-sm text-green-600">+12.3% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Factures Impayées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-sm text-red-600">€2,150 en retard</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Factures Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">N° Facture</th>
                  <th className="text-left py-2">Client</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Montant</th>
                  <th className="text-left py-2">État</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="py-3 font-mono">{invoice.id}</td>
                    <td className="py-3">{invoice.client}</td>
                    <td className="py-3">{invoice.type}</td>
                    <td className="py-3">€{invoice.amount}</td>
                    <td className="py-3">
                      <Badge className={getStatusBadge(invoice.status)}>{invoice.status}</Badge>
                    </td>
                    <td className="py-3">{invoice.date}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600">Gestion des comptes utilisateurs et des permissions</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nom</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Rôle</th>
                  <th className="text-left py-2">État</th>
                  <th className="text-left py-2">Dernière Connexion</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.role}</td>
                    <td className="py-3">
                      <Badge className={getStatusBadge(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="py-3">{user.lastLogin}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStockage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stockage & Autonomie</h1>
          <p className="text-gray-600">Gestion des systèmes de stockage et surveillance de l'autonomie énergétique</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter Batterie
        </Button>
      </div>

      {/* Métriques de stockage */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Battery className="w-4 h-4 mr-2 text-green-500" />
              Capacité Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500 kWh</div>
            <p className="text-sm text-green-600">8 batteries actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              Charge Actuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">387 kWh</div>
            <p className="text-sm text-blue-600">77.4% de charge</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              Autonomie Restante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5h</div>
            <p className="text-sm text-orange-600">À consommation actuelle</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-500" />
              Efficacité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-sm text-purple-600">Rendement moyen</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de charge/décharge */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Cycles de Charge/Décharge</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                charge: { label: "Charge", color: "#10b981" },
                decharge: { label: "Décharge", color: "#ef4444" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2} name="Charge" />
                  <Line type="monotone" dataKey="consommation" stroke="#ef4444" strokeWidth={2} name="Décharge" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* État des batteries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">État des Batteries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: "Batterie Tesla #1", capacity: "100 kWh", charge: 85, status: "Actif", temp: "25°C" },
                { id: 2, name: "Batterie Tesla #2", capacity: "100 kWh", charge: 92, status: "Actif", temp: "23°C" },
                { id: 3, name: "Batterie LG #1", capacity: "75 kWh", charge: 67, status: "Actif", temp: "27°C" },
                { id: 4, name: "Batterie LG #2", capacity: "75 kWh", charge: 45, status: "Maintenance", temp: "22°C" },
              ].map((battery) => (
                <div key={battery.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Battery className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium">{battery.name}</p>
                      <p className="text-sm text-gray-500">
                        {battery.capacity} • {battery.temp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">{battery.charge}%</p>
                      <Badge className={getStatusBadge(battery.status)}>{battery.status}</Badge>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${battery.charge}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prévisions et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Prévisions d'Autonomie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Consommation normale</span>
                <span className="font-bold text-green-600">18.5 heures</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">Pic de consommation</span>
                <span className="font-bold text-orange-600">12.3 heures</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">Consommation maximale</span>
                <span className="font-bold text-red-600">8.7 heures</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Alertes Stockage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Batterie LG #2 en maintenance</p>
                    <p className="text-xs text-gray-500">Capacité réduite de 15%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Battery className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Charge optimale atteinte</p>
                    <p className="text-xs text-gray-500">Toutes les batteries &gt; 80%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAnalyse = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analyse & Rapports</h1>
          <p className="text-gray-600">Analyses détaillées et génération de rapports personnalisés</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Période
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">
            <Download className="w-4 h-4 mr-2" />
            Exporter Rapport
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="financier">Financier</TabsTrigger>
          <TabsTrigger value="environnemental">Environnemental</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* KPIs de performance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Efficacité Globale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <p className="text-sm text-green-600">+2.1% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Temps d'Arrêt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">12.5h</div>
                <p className="text-sm text-red-600">+3.2h vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Production Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">415 kWh/j</div>
                <p className="text-sm text-green-600">+8.3% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Taux de Disponibilité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.7%</div>
                <p className="text-sm text-green-600">+0.5% vs mois dernier</p>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques de performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Évolution de la Production</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    solaire: { label: "Solaire", color: "#f59e0b" },
                    eolien: { label: "Éolien", color: "#3b82f6" },
                    fossile: { label: "Fossile", color: "#6b7280" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="solaire" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="eolien" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="fossile" stroke="#6b7280" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Comparaison Production/Consommation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    production: { label: "Production", color: "#10b981" },
                    consommation: { label: "Consommation", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="consommation" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financier" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Revenus Totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">€98,450</div>
                <p className="text-sm text-green-600">+15.2% vs année dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Coûts d'Exploitation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">€23,150</div>
                <p className="text-sm text-green-600">-8.3% vs année dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Bénéfice Net</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">€75,300</div>
                <p className="text-sm text-green-600">+22.1% vs année dernière</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Analyse des Revenus par Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Solaire</p>
                  <p className="text-xl font-bold text-yellow-600">€44,300</p>
                  <p className="text-xs text-green-600">45% du total</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Wind className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Éolien</p>
                  <p className="text-xl font-bold text-blue-600">€34,500</p>
                  <p className="text-xs text-green-600">35% du total</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Fossile</p>
                  <p className="text-xl font-bold text-gray-600">€19,650</p>
                  <p className="text-xs text-orange-600">20% du total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environnemental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">CO₂ Évité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">45.2 tonnes</div>
                <p className="text-sm text-green-600">+18% vs année dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Énergie Renouvelable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">80%</div>
                <p className="text-sm text-green-600">+5% vs année dernière</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Arbres Équivalents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2,260</div>
                <p className="text-sm text-gray-600">arbres plantés équivalent</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderParametre = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configuration du système et préférences utilisateur</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <Download className="w-4 h-4 mr-2" />
          Sauvegarder Config
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="alertes">Alertes</TabsTrigger>
          <TabsTrigger value="securite">Sécurité</TabsTrigger>
          <TabsTrigger value="integration">Intégrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Informations Générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'Organisation</label>
                  <Input defaultValue="EnerTrack PME" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <Input defaultValue="123 Rue de l'Énergie, 75001 Paris" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <Input defaultValue="+33 1 23 45 67 89" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input defaultValue="contact@enertrack.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Préférences Système</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau Horaire</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Europe/Paris (UTC+1)</option>
                    <option>Europe/London (UTC+0)</option>
                    <option>America/New_York (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Devise</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>EUR (€)</option>
                    <option>USD ($)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format de Date</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Seuils de Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Production Minimale (kWh/jour)</label>
                  <Input type="number" defaultValue="300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Production Optimale (kWh/jour)</label>
                  <Input type="number" defaultValue="450" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Production Maximale (kWh/jour)</label>
                  <Input type="number" defaultValue="600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Configuration des Alertes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Panne d'équipement", description: "Alerte immédiate en cas de panne", enabled: true },
                {
                  title: "Baisse de production",
                  description: "Alerte si production < 80% de la normale",
                  enabled: true,
                },
                { title: "Batterie faible", description: "Alerte si charge < 20%", enabled: true },
                { title: "Maintenance programmée", description: "Rappel 24h avant maintenance", enabled: false },
                { title: "Factures impayées", description: "Alerte après 30 jours de retard", enabled: true },
                { title: "Rapport mensuel", description: "Envoi automatique du rapport mensuel", enabled: false },
              ].map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={alert.enabled}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">Activé</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="securite" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Politique de Mot de Passe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Longueur minimale (8 caractères)</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Caractères spéciaux requis</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Chiffres requis</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Majuscules/minuscules</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Sessions & Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée de session (minutes)</label>
                  <Input type="number" defaultValue="120" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tentatives de connexion max</label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentification à deux facteurs</span>
                  <input type="checkbox" className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Journalisation des accès</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">APIs et Intégrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "API Météo",
                  description: "Prévisions météorologiques pour optimiser la production",
                  status: "Connecté",
                  color: "green",
                },
                {
                  name: "Système de Facturation",
                  description: "Intégration avec le système comptable",
                  status: "Connecté",
                  color: "green",
                },
                {
                  name: "Notifications SMS",
                  description: "Envoi d'alertes par SMS",
                  status: "Déconnecté",
                  color: "red",
                },
                {
                  name: "Monitoring IoT",
                  description: "Capteurs de surveillance des équipements",
                  status: "Connecté",
                  color: "green",
                },
                {
                  name: "Backup Cloud",
                  description: "Sauvegarde automatique des données",
                  status: "En cours",
                  color: "orange",
                },
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full bg-${integration.color}-500`}></div>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`bg-${integration.color}-100 text-${integration.color}-800`}>
                      {integration.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return renderDashboard()
      case "production":
        return renderProduction()
      case "distribution":
        return renderDistribution()
      case "stockage":
        return renderStockage()
      case "analyse":
        return renderAnalyse()
      case "utilisateurs":
        return renderUsers()
      case "parametre":
        return renderParametre()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-green-500 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-xl font-bold text-white">EnerTrack</span>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Tapez ici pour rechercher..." className="pl-10 bg-white border-0 rounded-full" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-600">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-600">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Container avec padding-top pour compenser le header fixe */}
      <div className="flex pt-16">
        {/* Sidebar - Fixed */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-1 pb-20">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activePage === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activePage === item.id
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="default"
              className="w-full justify-start bg-green-600 hover:bg-green-700 text-white border-0"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Main Content avec margin-left pour compenser la sidebar fixe */}
        <main className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">{renderContent()}</main>
      </div>
    </div>
  )
}
