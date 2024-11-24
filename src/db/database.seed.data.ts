import { PartnerDriver } from '@modules/partnerDrivers/partnerDriver.entity';

export const SeedData = {
  partnerDrivers: [
    {
      name: 'Homer Simpson',
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      priceRate: 2.5,
      minimumMileage: 1,
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      ratings: [
        {
          grade: 2,
          comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        },
      ],
    },
    {
      name: 'Dominic Toretro',
      car: 'Dodge Charger R/T 1970 modificado',
      priceRate: 5.0,
      minimumMileage: 5,
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      ratings: [
        {
          grade: 4,
          comment:
            'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        },
      ],
    },
    {
      name: 'James Bond',
      car: 'Aston Martin DB5 clássico',
      priceRate: 10.0,
      minimumMileage: 10,
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      ratings: [
        {
          grade: 5,
          comment:
            'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        },
      ],
    },
  ] as PartnerDriver[],
};
