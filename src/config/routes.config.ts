interface Rota {
  method: string;
  url: string;
}
const ROTAS_PUBLICAS: Rota[] = [
  {
    method: "POST",
    url: "/api/v1/url",
  },
  {
    method: "POST",
    url: "/api/v1/sessao",
  },
  {
    method: "GET",
    url: "/api/v1/url/",
  },
];

export default ROTAS_PUBLICAS;
