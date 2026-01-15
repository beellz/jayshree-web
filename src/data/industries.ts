export interface Industry {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  status: string;
  display_order: number | null;
}

export const industries: Industry[] = [
  {
    id: "88845cad-62cb-40c7-8e20-b74d1e14dae0",
    name: "Social Welfare & Community Development",
    description: "Non-profit organizations and charitable trusts",
    icon: "heart",
    color: "#e07a38",
    status: "active",
    display_order: 1,
  },
  {
    id: "5344fae3-11ce-4e05-a956-1681283e497d",
    name: "Information Technology & Digital Solutions",
    description: "Information Technology and software services",
    icon: "laptop",
    color: "#e07a38",
    status: "active",
    display_order: 2,
  },
  {
    id: "aff8ac42-1f9d-488f-9081-9053ddc59410",
    name: "Energy, Petroleum & Biofuel Solutions",
    description: "Oil, gas, and petroleum products",
    icon: "fuel",
    color: "#e07a38",
    status: "active",
    display_order: 3,
  },
  {
    id: "02536f9a-643f-4939-ae37-9ba72cd333f8",
    name: "Business Consulting, Tax & Advisory Services",
    description: "Business and professional consulting services",
    icon: "briefcase",
    color: "#e07a38",
    status: "active",
    display_order: 4,
  },
  {
    id: "7570451c-3a43-4716-b879-5aaedecf4468",
    name: "Infrastructure Development & Construction Services",
    description: "Real estate, infrastructure, and construction",
    icon: "building",
    color: "#e07a38",
    status: "active",
    display_order: 5,
  },
  {
    id: "b6fa2acd-9283-415e-b151-40834dbd3553",
    name: "Fashion, Apparel & Lifestyle Brands",
    description: "Fashion and textile manufacturing",
    icon: "shirt",
    color: "#e07a38",
    status: "active",
    display_order: 6,
  },
  {
    id: "e381190a-3a8a-4452-9865-d2de6c4a8072",
    name: "Renewable Energy & Solar Solutions",
    description: "Renewable energy and solar power solutions",
    icon: "sun",
    color: "#e07a38",
    status: "active",
    display_order: 7,
  },
  {
    id: "67325961-d37d-4cc3-8bd4-b7dab380c511",
    name: "Healthcare, Pharmaceuticals & Medical Services",
    description: "Healthcare and pharmaceutical products",
    icon: "pill",
    color: "#e07a38",
    status: "active",
    display_order: 8,
  },
  {
    id: "8e9b4f64-14fa-4fa6-bca0-277fea0c46e9",
    name: "Food Processing & Agro-Based Industries",
    description: "Food manufacturing and processing",
    icon: "apple",
    color: "#e07a38",
    status: "active",
    display_order: 9,
  },
  {
    id: "b0d5a050-87d7-4dfc-94b9-940625221ed2",
    name: "Logistics, Supply Chain & International Trade",
    description: "International trade and logistics",
    icon: "ship",
    color: "#e07a38",
    status: "active",
    display_order: 10,
  },
  {
    id: "0350df4f-4d50-4f29-a6e6-e20d64c6b0e2",
    name: "Media, Entertainment & Digital Content Production",
    description: "Entertainment, film production, and gaming",
    icon: "film",
    color: "#e07a38",
    status: "active",
    display_order: 11,
  },
  {
    id: "c72e7f16-aacb-482f-9b36-d4866f40a048",
    name: "Steel Manufacturing & Industrial Materials",
    description: "Steel manufacturing and metal products",
    icon: "hammer",
    color: "#e07a38",
    status: "active",
    display_order: 12,
  },
];
