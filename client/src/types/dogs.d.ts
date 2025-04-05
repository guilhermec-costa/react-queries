interface DogOwner {
  nome: string;
  telefone: string;
}

interface Dog {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  pesoKg: number;
  vacinas: string[];
  dono: Dono;
}

interface DogPaginationResponse {
  data: Dog[];
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
}