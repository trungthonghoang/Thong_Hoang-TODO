const API_URL = "http://127.0.0.1:3000/";

// Get data from api
const getApiData = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("The API response is", response);
    const data = await response.json();
    console.log("The API data is", data);
    let tasks = Object.keys(data).map((key) => ({
      id: data[key]["_id"],
      description: data[key].description,
      done: data[key].done,
    }));
    console.log("The tasks are:", tasks);
    return tasks;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Post data
const postDataToApi = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Retrieved the following data:", data);
    return { id: data.name };
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Delete data
const removeDataFromApi = async (id) => {
  try {
    await fetch(API_URL + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
