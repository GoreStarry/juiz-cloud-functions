const axiosQL = require("./axiosQL");

module.exports = async function recordHouse({ name, url }) {
  const query = /* GraphQL */ `
    mutation {
      createHouse(input: { fields: { name: "${name}", url: "${url}" } }) {
        house {
          id
        }
      }
    }
  `;

  const {
    data: {
      data: {
        createHouse: { house },
      },
    },
  } = await axiosQL(query);
  return house;
};
