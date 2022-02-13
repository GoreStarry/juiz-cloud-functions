const axiosQL = require("./axiosQL");

module.exports = async function getHouse({ isoDate }) {
  const query = /* GraphQL */ `
    query {
      houses(
        first: 1000,
        # where: { createdAt: { greaterThan: "${isoDate}" } }
      ) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  `;

  const {
    data: {
      data: {
        houses: { edges: houseList },
      },
    },
  } = await axiosQL(query);
  return houseList.map(({ node: { name, url } }) => ({ name, url }));
};
