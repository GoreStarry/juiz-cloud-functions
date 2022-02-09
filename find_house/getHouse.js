import axiosQL from "./axiosQL";

export default async function getHouse({ name }) {
  const query = /* GraphQL */ `
    query {
      houses(where: { name: { equalTo: "${name}" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `;

  const {
    data: {
      data: {
        houses: {
          edges: [house],
        },
      },
    },
  } = await axiosQL(query);
  return house;
}
