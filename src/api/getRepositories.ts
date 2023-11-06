import axios from "axios";

const getRepositories = async () => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc`
    );
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};

export default getRepositories;
